"use strict"
//REQUERIMOS JWT SIMPLE PARA CREAR EL TOKEN
var token = require('jwt-simple');
//MOMEMN FECHA DE INICIO Y DE EXPIRACION DEL TOKEN
var momento = require('moment');
//CLAVE SECRETA PARA EL TOKEN
var claveSecreta = 'lcz-2_mjp-7';

//METODO DE LA AUTENTICACION
exports.autenticacion = function(request, resp, next){

	if(!request.headers.authorization){
		return resp.status(422).send({mensaje: 'No tienes la autorizacion'})
	} else {
		//QUITAMOS COMILLAS AL TOKEN
		var tokenSend = request.headers.authorization.replace(/[' "]+/g, '');
		// MANEJO DE EXEPSIONES
		try{
			var cargarToken =  token.decode(tokenSend, claveSecreta);
			if( cargarToken.fechaFn <= momento().unix() ){
				return resp.status(403).send({mensaje: 'El token ha expirado'});
			} 
		} catch(excepcion){
			console.log(excepcion);
			return  resp.status(403).send({mensaje: 'El token no es valido'});
		}

		request.usuarioToken = cargarToken;
		next();
	}

}