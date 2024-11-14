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
    const whereOptions: any = {
      [Op.or]: [{ userId: null }, { userId }],
    };

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
      order: [
        [DB.Sequelize.literal('userId IS NULL'), 'DESC'],
        ['createdAt', 'ASC'],
      ],
    });

    return { titles, count };
  }

  public async findTitleById(titleId: number): Promise<Title> {
    const title: Title = await DB.Titles.findByPk(titleId);
    if (!title) throw new HttpException(409, "Title doesn't exist");

    return title;
  }

  public async createTitle(userId: number, titleData: CreateTitleDto): Promise<Title> {
    const existingTitle: Title = await DB.Titles.findOne({
      where: { name: titleData.name, userId, type: titleData.type },
    });
    if (existingTitle) throw new HttpException(409, `This name ${titleData.name} already exists`);

    const newTitle: Title = await DB.Titles.create({ ...titleData, userId });
    return newTitle;
  }

  public async updateTitle(userId: number, titleId: number, titleData: UpdateTitleDto): Promise<Title> {
    const titleToUpdate: Title = await DB.Titles.findByPk(titleId);
    if (!titleToUpdate) throw new HttpException(409, "Title doesn't exist");

    if (titleToUpdate.userId !== userId) {
      throw new HttpException(403, 'You do not have permission to update this title');
    }

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

  public async deleteTitle(userId: number, titleId: number): Promise<Title> {
    const titleToDelete: Title = await DB.Titles.findByPk(titleId);
    if (!titleToDelete) throw new HttpException(409, "Title doesn't exist");

    if (titleToDelete.userId !== userId) {
      throw new HttpException(403, 'You do not have permission to delete this title');
    }

    if (titleToDelete.icon) {
      deleteFile(titleToDelete.icon);
    }

    await DB.Titles.destroy({ where: { id: titleId } });

    return titleToDelete;
  }
}
