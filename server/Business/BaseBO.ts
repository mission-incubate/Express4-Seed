import {BaseDal, config } from '../Dal/BaseDal';
import {Request, Response } from '../common/common';

export class BaseBO {
    public Dal: BaseDal;
    constructor() {
        let config: config = {
            userName: 'sa',
            password: 'irtt',
            server: 'localhost\\SQLEXPRESS',
            options: {
                database: 'Natarajan',
                rowCollectionOnDone: true
            }
        };
        this.Dal = new BaseDal(config);
    }
    public GetById(request: Request): Response {
        this.Dal.ExecSql('select * from [user]');
        return '';
    }

    public TestMethod(request: Request, callback: Function): void {
        this.Dal.ExecSqlTest('select * from [user]', function(rows) {
            callback(rows);
        });
    }
}

export class BOFactory {
    public static CreateBO<T extends BaseBO>(type: { new (): T }): T {
        return new type();
    }
}
