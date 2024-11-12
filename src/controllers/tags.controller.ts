import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { CreateTagDto, UpdateTagDto } from '@dtos/tags.dto';
import { Tag } from '@interfaces/tags.interface';
import { TagService } from '@services/tags.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class TagController {
  private tagService = Container.get(TagService);

  public getTags = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { offset = 0, limit = 10, fromAt, toAt, ...query } = req.query;
      const fromDate = fromAt ? new Date(fromAt as string) : undefined;
      const toDate = toAt ? new Date(toAt as string) : undefined;
      const userId = req.user.id;

      const { tags, count } = await this.tagService.findAllTag(userId, Number(offset), Number(limit), query, fromDate, toDate);
      res.status(200).json({ count, data: tags, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTagById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tagId = Number(req.params.id);
      const tag: Tag = await this.tagService.findTagById(tagId);
      res.status(200).json({ data: tag, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tagData: CreateTagDto = req.body;
      const newTag: Tag = await this.tagService.createTag(tagData);
      res.status(201).json({ data: newTag, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tagId = Number(req.params.id);
      const tagData: UpdateTagDto = req.body;
      const updatedTag: Tag = await this.tagService.updateTag(tagId, tagData);
      res.status(200).json({ data: updatedTag, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const tagId = Number(req.params.id);
      const deletedTag: Tag = await this.tagService.deleteTag(tagId);
      res.status(200).json({ data: deletedTag, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
