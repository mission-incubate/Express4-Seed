import {UserDto} from '../../Common/Model/UserDto';
import {BaseBO} from '../BaseBO';

export class UserBO extends BaseBO {
	public GetByName(name:string): UserDto {
		 this.Dal.ExecSql('');
		 return new UserDto();
	}
}
