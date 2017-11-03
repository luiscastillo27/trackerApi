const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();


// settings
app.set('port', process.env.PORT || 2715);
app.set('views', path.join(__dirname, 'views'));

//configuracion cabeceras http
app.use((req, res, next) => {
 	res.header("Access-Control-Allow-Origin", "*");
 	res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
 	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
 	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
 	next();
});
// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
require('./routes/usuarios_route')(app);
//require('./routes/sensores_route')(app);
//require('./routes/vehiculos_route')(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
