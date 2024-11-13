import { PassType } from '@interfaces/passes.interface';

export interface Title {
  id?: number;
  userId?: number;
  name: string;
  type: PassType;
  icon?: string;
}
