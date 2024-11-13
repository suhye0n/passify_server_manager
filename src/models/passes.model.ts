import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Pass, PassType } from '@interfaces/passes.interface';

export type PassCreationAttributes = Optional<Pass, 'id' | 'barcode' | 'memo' | 'userId' | 'type'>;

export class PassModel extends Model<Pass, PassCreationAttributes> implements Pass {
  public id: number;
  public userId: number;
  public titleId?: number; // TODO: 필수값으로 변경
  public name?: string; // TODO: 삭제
  public barcode: string;
  public memo?: string;
  public tagId?: number;
  public type: PassType;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof PassModel {
  PassModel.init(
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
      titleId: {
        type: DataTypes.INTEGER,
        allowNull: true, // TODO: 필수값으로 변경
        references: {
          model: 'titles',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        // TODO: 삭제
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      barcode: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      memo: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      type: {
        type: DataTypes.ENUM(...Object.values(PassType)),
        allowNull: false,
        defaultValue: PassType.COUPON,
      },
    },
    {
      tableName: 'passes',
      sequelize,
      defaultScope: {
        raw: true,
      },
    },
  );

  return PassModel;
}
