import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';

//Routes Import 
//TODO: Need to automate for register all routes.
import * as admin from  './routes/admin';


let app = express();
//let jsonParser = bodyParser.json();
app.use(bodyParser());

//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app

//app.use((req, res, newxt) => { res.sendStatus(200); });

let server = app.listen(process.env.PORT || 3000, () => {
	console.log('ENV Port No: ' + process.env.PORT);
	let host = server.address().address;
	let port = server.address().port;
	console.log('Api listening at http://%s:%s', host, port);
});

// error handlers

//catch 404 and forward to error handler
app.use((req, res, next) => {
   var err = new Error('Not Found');
   err['status'] = 404;
   next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

	app.use((err: any, req, res, next) => {
		res.status(err['status'] || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});
export = app;
