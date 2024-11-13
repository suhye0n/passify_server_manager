import { Service } from 'typedi';
import { DB } from '@database';
import { CreatePassDto, UpdatePassDto } from '@dtos/passes.dto';
import { HttpException } from '@/exceptions/httpException';
import { Pass } from '@interfaces/passes.interface';
import { Op } from 'sequelize';

@Service()
export class PassService {
  public async findAllPass(
    userId: number,
    offset: number,
    limit: number,
    query: { [key: string]: any },
    fromDate?: Date,
    toDate?: Date,
  ): Promise<{ passes: Pass[]; count: number }> {
    const whereOptions: any = { userId };
    const modelAttributes = Object.keys(DB.Passes.rawAttributes);

    for (const [key, value] of Object.entries(query)) {
      if (modelAttributes.includes(key) && value !== '' && key !== 'isDeleted') {
        if (key === 'id') {
          whereOptions[key] = Number(value);
        } else {
          whereOptions[key] = {
            [Op.like]: `%${value}%`,
          };
        }
      }
    }

    if (fromDate && toDate) {
      whereOptions.createdAt = {
        [Op.between]: [fromDate, toDate],
      };
    } else if (fromDate) {
      whereOptions.createdAt = {
        [Op.gte]: fromDate,
      };
    } else if (toDate) {
      whereOptions.createdAt = {
        [Op.lte]: toDate,
      };
    }

    const { rows: passes, count } = await DB.Passes.findAndCountAll({
      where: whereOptions,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return { passes, count };
  }

  public async findPassById(passId: number): Promise<Pass> {
    const pass: Pass = await DB.Passes.findByPk(passId);
    if (!pass) throw new HttpException(409, "Pass doesn't exist");

    return pass;
  }

  public async createPass(userId: number, passData: CreatePassDto): Promise<Pass> {
    const existingPass: Pass = await DB.Passes.findOne({
      where: { barcode: passData.barcode, userId, type: passData.type },
    });
    if (existingPass) throw new HttpException(409, `This barcode ${passData.barcode} already exists`);

    const newPass: Pass = await DB.Passes.create({ ...passData, userId });
    return newPass;
  }

  public async updatePass(passId: number, passData: UpdatePassDto): Promise<Pass> {
    const passToUpdate: Pass = await DB.Passes.findByPk(passId);
    if (!passToUpdate) throw new HttpException(409, "Pass doesn't exist");

    await DB.Passes.update(passData, { where: { id: passId } });

    const updatedPass: Pass = await DB.Passes.findByPk(passId);
    return updatedPass;
  }

  public async deletePass(passId: number): Promise<Pass> {
    const passToDelete: Pass = await DB.Passes.findByPk(passId);
    if (!passToDelete) throw new HttpException(409, "Pass doesn't exist");

    await DB.Passes.destroy({ where: { id: passId } });

    return passToDelete;
  }
}
