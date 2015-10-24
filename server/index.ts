import * as express from 'express';
var app = express();

app.use((req, res, newxt) => { return false; });
