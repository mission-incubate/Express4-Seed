import {BaseDal, ConnectionConfig } from '../Dal/BaseDal';
import {Request, Response} from '../common/common';

export class BaseBO {
	public Dal: BaseDal;
	constructor() {
		let config :ConnectionConfig  = {
			userName: 'sa', password:'irtt', server:'MAC-WIN\SQLEXPRESS',
			options: { database : 'Natarajan', instanceName:'MAC-WIN\SQLEXPRESS'}
		};
		this.Dal = new BaseDal(config);
	}
	public GetById(request: Request): Response {
		this.Dal.ExecSql('select * from [user]');
		return '';
	}
}

export class BOFactory {
	public static CreateBO<T extends BaseBO>(type: { new (): T }): T {
		return new type();
	}
}
