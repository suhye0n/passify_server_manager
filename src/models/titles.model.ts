import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Title } from '@interfaces/titles.interface';
import { CouponType } from '@interfaces/coupons.interface';

export type TitleCreationAttributes = Optional<Title, 'id' | 'userId' | 'type' | 'icon'>;

export class TitleModel extends Model<Title, TitleCreationAttributes> implements Title {
  public id: number;
  public userId?: number;
  public name: string;
  public type: CouponType;
  public icon?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof TitleModel {
  TitleModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
      type: {
        type: DataTypes.ENUM(...Object.values(CouponType)),
        allowNull: false,
        defaultValue: CouponType.COUPON,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: 'titles',
      sequelize,
      defaultScope: {
        raw: true,
      },
    },
  );

  return TitleModel;
}
