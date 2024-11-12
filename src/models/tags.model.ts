import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Tag } from '@/interfaces/tags.interface';

export type TagCreationAttributes = Optional<Tag, 'id' | 'userId'>;

export class TagModel extends Model<Tag, TagCreationAttributes> implements Tag {
  public id: number;
  public userId: number;
  public name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TagModel {
  TagModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
    },
    {
      tableName: 'tags',
      sequelize,
      defaultScope: {
        raw: true,
      },
    },
  );

  return TagModel;
}
