import * as express from 'express';
import * as http from  'http';
import * as bodyParser from 'body-parser';
import * as logger from  'morgan';
import * as favicon from 'serve-favicon';
//import * as serveIndex  from 'serve-index';

//Routes Import 
//TODO: Need to automate for register all routes.
import * as admin from  './routes/admin';


let app = express();
//let jsonParser = bodyParser.json();
app.use(bodyParser());


// all environments
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve URLs like /ftp/thing as public/ftp/thing
//app.use('/www', serveIndex('public/www', {'icons': true}));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(['/adm*n', '/manager'], admin); // load the 'admin' router on '/adm*n' and '/manager', on the parent app

// let server = app.listen(process.env.PORT || 3000, () => {
// 	console.log('ENV Port No: ' + process.env.PORT);
// 	let host = server.address().address;
// 	let port = server.address().port;
// 	console.log('Api listening at http://%s:%s', host, port);
// });

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
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
