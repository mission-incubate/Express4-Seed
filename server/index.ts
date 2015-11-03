/// <reference path="./typings.d.ts" />
import * as express from 'express';
import * as http from  'http';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';
import * as favicon from 'serve-favicon';

//import * as admin from  './routes/admin';
import { Base } from './routes/routes';

export class WebServer {
    private Express: any;
    private Port: number;
    constructor(port: number) {
        var self = this;
        self.Port = port;
        self.Express = express();
    }
    public init(): WebServer {
        var self = this;
        self.Express.set('port', self.Port);
        self.Express.use(logger('dev'));
        self.Express.use(bodyParser.json());
        self.Express.use(bodyParser.urlencoded({ extended: false }));
        self.Express.use(favicon(__dirname + '/www/favicon.ico'));
        self.registerModules();
        return self;
    }
    public start() : void {
        var self = this;
        let Server = http.createServer(self.Express);
        Server.listen(self.Port, null, (self.listenerCallback).bind(self));
    }
    private registerModules() :void {
        var self = this;
        //self.Express.use(['/adm*n', '/manager'], admin);
        self.Express.use('/', new Base());
        self.Express.use(self.handlerFor404);
        self.Express.use((self.errorHandler).bind(self));
    }
    private handlerFor404(req, res, next):void {
        let err = new Error('Resource Not Found.');
        err['status'] = 404;
        next(err);
    }
    private errorHandler(err: any, req, res, next): void {
        var self = this;
        res.status(err['status'] || 500);
        res.json({ 'error': {
            message: err.message,
            error: self.Express.get('env') === 'development' ? {} : err }
        });
    }
    private listenerCallback(): void {
        var self = this;
        let port = self.Express.get('port');
        console.log('Express server listening on port ' + port);
    }
}
new WebServer(3000).init().start();
