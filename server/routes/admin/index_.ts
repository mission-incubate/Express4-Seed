import * as express from 'express';

let admin = express();

admin.get('/', function (req, res) {
  res.send('Admin Homepage get');
});

admin.post('/', function (req, res) {
  res.send('Admin Homepage post');
});


let secret = express();
secret.get('/', function (req, res) {
 // console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app

export = admin;
