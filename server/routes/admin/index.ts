/// <reference path="../../typings.d.ts" />
import * as express from 'express';
import {BOFactory} from '../../Business/baseBO';
import {UserBO} from '../../Business/User/UserBO';
import {UserDto} from '../../Common/Model/UserDto';

let admin = express();
let userBO = BOFactory.CreateBO(UserBO);
admin.get('/', (req: express.Request, res: express.Response, next: Function): any => {
	let userDto = <UserDto>userBO.GetById(req.params);
	return res.send({ success: true, message: 'Admin Get Method', val: userDto });
});
admin.post('/', (req: express.Request, res: express.Response, next: Function): any => {
	let userDto = <UserDto>userBO.GetByName(req.params);
	return res.send({ success: true, message: 'Admin Post Method', val: userDto });
});
export = admin;
