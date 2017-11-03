"use strict"

var momento = require('moment');
var result = 'Correcto';

//VALIDAR REGISTRAR USUARIOS
exports.agregarValid = function(data){

	var correo = data.body.email;
	var password = data.body.password;
	var state = data.body.state;
	var rango = data.body.rango;

	if(!correo && !password && !state && !rango){
		
		if(correo == null || correo.length == 0 || /^\s+$/.test(correo)){
			result = 'El correo es obligatorio';
		}

		if(password == null || password.length == 0 || /^\s+$/.test(password)){
			result = 'El password es obligatorio';
		}

		if(state == null || state.length == 0 || /^\s+$/.test(state)){
			result = 'El state es obligatorio';
		}

		if(rango == null || rango.length == 0 || /^\s+$/.test(rango)){
			result = 'El rango es obligatorio';
		}

	} else {

		if(!(/\S+@\S+\.\S+/.test(correo))){
		  	result = 'Este no es un correo valido';
		}

		if(password.length < 8) {
			result = 'El password debe tener mas de 8 digitos';
		}

		if(state > 2) {
			result = 'El state debe ser 1 o 2';
		}

		if(rango > 2) {
			result = 'El rango debe ser 1 o 2';
		}
		
	}

	return result;

}

//VALIDAR LOGIN
exports.loginValid = function(data){

	var correo = data.body.email;
	var password = data.body.password;

	if(!correo && !password){
		
		if(correo == null || correo.length == 0 || /^\s+$/.test(correo)){
			result = 'El correo es obligatorio';
		}

		if(password == null || password.length == 0 || /^\s+$/.test(password)){
			result = 'El password es obligatorio';
		}

	} else {

		if(!(/\S+@\S+\.\S+/.test(correo))){
		  	result = 'Este no es un correo valido';
		}

		if(password.length < 8) {
			result = 'El password debe tener mas de 8 digitos';
		}
		
	}

	return result;

}