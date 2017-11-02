const http = require('http');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();


// settings
app.set('port', process.env.PORT || 2715);
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
require('./routes/usuarios_route')(app);

// static files
app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
