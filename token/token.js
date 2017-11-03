"use strict"
//REQUERIMOS JWT SIMPLE PARA CREAR EL TOKEN
var token = require('jwt-simple');
//MOMEMN FECHA DE INICIO Y DE EXPIRACION DEL TOKEN
var momento = require('moment');
//CLAVE SECRETA PARA EL TOKEN
var claveSecreta = 'lcz-2_mjp-7';

//METODO DEL TOKEN
exports.crearToken = function(data){

	var cargarToken = {
		idUsuario: data.idUsuario,
		email: data.email,
		state: data.state,
		rango: data.rango,
		fechaIn: momento().unix(),
		fechaFn: momento().add(30, 'days').unix()
	}

	return token.encode(cargarToken, claveSecreta);

}