/// <reference path="../../typings.d.ts" />
import * as express from 'express';
import {BOFactory} from '../../Business/baseBO';
import {UserBO} from '../../Business/User/UserBO';
import {UserDto} from '../../Common/Model/UserDto';

import {Connection, Request, ConnectionConfig } from 'tedious';

let admin = express();
let userBO = BOFactory.CreateBO(UserBO);
// admin.get('/', (req: express.Request, res: express.Response, next: Function): any => {
//     let userDto = <UserDto>userBO.GetById(req);
//     return res.send({ success: true, message: 'Admin Get Method', val: userDto });
// });
admin.post('/', (req: express.Request, res: express.Response, next: Function): any => {
    let userDto = <UserDto>userBO.GetByName(req.params);
    return res.send({ success: true, message: 'Admin Post Method', val: userDto });
});
admin.get('/test', (req: express.Request, res: express.Response, next: Function): any => {

    let config: ConnectionConfig = {
        userName: 'sa',
        password: 'irtt',
        server: 'localhost',
        options: {
            instanceName: 'SQLEXPRESS',
            database: 'Natarajan',
            rowCollectionOnDone: true
        }
    };

    var connection = new Connection(config);

    connection.on('connect', function(err) {
        if (err) {
            console.log(err);
        }
        try {
            let request = new Request('select * from [user]', function(err, rowCount) {
                if (err) {
                    console.log('ERROR');
                    console.log(err);
                } else {
                    console.log(rowCount + ' rows');
                }
            });

            req.on('done', function(rowCount, more, rows) {
                console.log(rows);
                return rows;
            });

            // request.on('row', function(columns) {
            //     columns.forEach(function(column) {
            //         console.log(column.value);
            //     });
            // });
            connection.execSql(request);
        } catch (e) {
            console.log(e);
        }
    });
});

export = admin;
