import roles from '../../config/Roles';
import { Authority } from './Authority.model';

export type Role = {
  id: string;
  name: roles;
  authorities: Authority[];
};
