/// <reference path="../typings.d.ts" />
// import {Request, Connection, Transaction, config} from 'mssql';
// export {config} from 'mssql';
// 
// export class BaseDal {
// 	private Connection: Connection;
// 	private Transaction: Transaction;
// 	constructor(config: config, trans: boolean) {
// 		this.Connection = new Connection(config, (err) => { console.log(err); });
// 		if (trans) {
// 			this.Transaction = new Transaction(this.Connection);
// 		}
// 	}
// 	public ExecSql(query: string, params?: any, trans?: boolean): any {
// 		let outValue: any;
// 		this.Connection.connect((err) => {
// 			let req: Request;
// 			if (trans) {
// 				req = new Request(this.Transaction);
// 			} else {
// 				req = new Request(this.Connection);
// 			}
// 			if (params) {
// 				params.forEach((val, index) => {
// 					req.input(index, val);
// 				});
// 			}
// 			req.query(query, (err, recordset) => {
// 				if (err) { console.log(err); }
// 				outValue = recordset;
// 			});
// 			req.on('error', (drr) => {
// 				console.log(err);
// 			});
// 		});
// 		return outValue;
// 	}
// }
//ExecuteQuery()
//ExecuteSclar()
//ExecuteSP()
//ExecuteNonQuery()
//

import {Connection, Request, ConnectionConfig } from 'tedious';
//import {TediumOption} from 'tedium';
export {ConnectionConfig as config} from 'tedious';


export class BaseDal {
	private Connection: Connection;
	constructor(config: ConnectionConfig) {
		this.Connection = new Connection(config);
	}
	public ExecSql(sql: string): void {
		let req = new Request(sql, this.Callback);
		this.Connection.on('connect', () => {
			req.on('row', (columns) => {
				columns.forEach(function(column) {
					console.log(column.value);
				});
			});
		});
		this.Connection.execSql(req);
	}

	private Callback(error: Error, rowCount: number, rows: any[]): void {
		if (error) {
			console.log(error);
		}
	}
}
