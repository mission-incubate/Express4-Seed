/// <reference path="../../typings.d.ts" />
import * as express from 'express';

var admin = express();
admin.get('/', (req: express.Request, res: express.Response, next: Function): any => {
	return res.send({ success: true, message: 'Admin Get Method' });
});
admin.post('/', (req: express.Request, res: express.Response, next: Function): any => {
	return res.send({ success: true, message: 'Admin Post Method' });
});
export = admin;
