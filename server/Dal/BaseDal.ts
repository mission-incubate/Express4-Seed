/// <reference path="../typings.d.ts" />
import {Connection, Request, ConnectionConfig } from 'tedious';
export {ConnectionConfig} from 'tedious';

export class BaseDal {
	private Connection: Connection;
	constructor(config: ConnectionConfig) {
		this.Connection = new Connection(config);
	}
	public ExecSql(sql: string): void {
		//var event = this.Connection.on('connect', ()=>{});
		let req = new Request(sql, this.Callback);
		this.Connection.execSql(req);
	}

	private Callback(error: Error, rowCount: number, rows: any[]): void {
		if (error) {
			console.log(error);
		}
	}
}
