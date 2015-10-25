import * as express from 'express';

let admin = express();

admin.get('/', function (req, res) {
  //console.log(admin.mountpath); // [ '/adm*n', '/manager' ]
  res.send('Admin Homepage');
});

let secret = express();
secret.get('/', function (req, res) {
 // console.log(secret.mountpath); // /secr*t
  res.send('Admin Secret');
});

admin.use('/secr*t', secret); // load the 'secret' router on '/secr*t', on the 'admin' sub app

export = admin;
