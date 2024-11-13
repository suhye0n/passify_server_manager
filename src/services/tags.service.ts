import { Service } from 'typedi';
import { DB } from '@database';
import { CreateTagDto, UpdateTagDto } from '@dtos/tags.dto';
import { HttpException } from '@/exceptions/httpException';
import { Tag } from '@interfaces/tags.interface';
import { Op } from 'sequelize';

@Service()
export class TagService {
  public async findAllTag(
    userId: number,
    offset: number,
    limit: number,
    query: { [key: string]: any },
    fromDate?: Date,
    toDate?: Date,
  ): Promise<{ tags: Tag[]; count: number }> {
    const whereOptions: any = { userId };
    const modelAttributes = Object.keys(DB.Tags.rawAttributes);

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

    const { rows: tags, count } = await DB.Tags.findAndCountAll({
      where: whereOptions,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return { tags, count };
  }

  public async findTagById(tagId: number): Promise<Tag> {
    const tag: Tag = await DB.Tags.findByPk(tagId);
    if (!tag) throw new HttpException(409, "Tag doesn't exist");

    return tag;
  }

  public async createTag(userId: number, tagData: CreateTagDto): Promise<Tag> {
    const existingTag: Tag = await DB.Tags.findOne({
      where: { name: tagData.name, userId },
    });
    if (existingTag) throw new HttpException(409, `This name ${tagData.name} already exists`);

    const newTag: Tag = await DB.Tags.create({ ...tagData, userId });
    return newTag;
  }

  public async updateTag(tagId: number, tagData: UpdateTagDto): Promise<Tag> {
    const tagToUpdate: Tag = await DB.Tags.findByPk(tagId);
    if (!tagToUpdate) throw new HttpException(409, "Tag doesn't exist");

    await DB.Tags.update(tagData, { where: { id: tagId } });

    const updatedTag: Tag = await DB.Tags.findByPk(tagId);
    return updatedTag;
  }

  public async deleteTag(tagId: number): Promise<Tag> {
    const tagToDelete: Tag = await DB.Tags.findByPk(tagId);
    if (!tagToDelete) throw new HttpException(409, "Tag doesn't exist");

    await DB.Tags.destroy({ where: { id: tagId } });

    return tagToDelete;
  }
}
