import { Service } from 'typedi';
import { DB } from '@database';
import { CreateTitleDto, UpdateTitleDto } from '@dtos/titles.dto';
import { HttpException } from '@/exceptions/httpException';
import { Title } from '@interfaces/titles.interface';
import { Op } from 'sequelize';
import { deleteFile } from '@utils/fileUtils';

@Service()
export class TitleService {
  public async findAllTitle(
    userId: number,
    offset: number,
    limit: number,
    query: { [key: string]: any },
    fromDate?: Date,
    toDate?: Date,
  ): Promise<{ titles: Title[]; count: number }> {
    const whereOptions: any = { userId };
    const modelAttributes = Object.keys(DB.Titles.rawAttributes);

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

    const { rows: titles, count } = await DB.Titles.findAndCountAll({
      where: whereOptions,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return { titles, count };
  }

  public async findTitleById(titleId: number): Promise<Title> {
    const title: Title = await DB.Titles.findByPk(titleId);
    if (!title) throw new HttpException(409, "Title doesn't exist");

    return title;
  }

  public async createTitle(titleData: CreateTitleDto): Promise<Title> {
    const existingTitle: Title = await DB.Titles.findOne({
      where: { name: titleData.name, userId: titleData.userId, type: titleData.type },
    });
    if (existingTitle) throw new HttpException(409, `This name ${titleData.name} already exists`);

    const newTitle: Title = await DB.Titles.create(titleData);
    return newTitle;
  }

  public async updateTitle(titleId: number, titleData: UpdateTitleDto): Promise<Title> {
    const titleToUpdate: Title = await DB.Titles.findByPk(titleId);
    if (!titleToUpdate) throw new HttpException(409, "Title doesn't exist");

    if (titleData.icon && titleData.icon !== titleToUpdate.icon) {
      const oldIconPath = titleToUpdate.icon;
      if (oldIconPath) {
        deleteFile(oldIconPath);
      }
    }

    if (titleData.icon === '' || titleData.icon === null) {
      const oldIconPath = titleToUpdate.icon;
      if (oldIconPath) {
        deleteFile(oldIconPath);
      }

      titleData.icon = null;
    }

    await DB.Titles.update(titleData, { where: { id: titleId } });

    const updatedTitle: Title = await DB.Titles.findByPk(titleId);
    return updatedTitle;
  }

  public async deleteTitle(titleId: number): Promise<Title> {
    const titleToDelete: Title = await DB.Titles.findByPk(titleId);
    if (!titleToDelete) throw new HttpException(409, "Title doesn't exist");

    if (titleToDelete.icon) {
      deleteFile(titleToDelete.icon);
    }

    await DB.Titles.destroy({ where: { id: titleId } });

    return titleToDelete;
  }
}
