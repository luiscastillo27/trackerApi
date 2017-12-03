const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const token = require('../token/token.js');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

const userModel = {};
const ok = {};
//var fechaactual = new Date();
//var fecha = dateFormat(fechaactual,'yyyy-mm-dd hh:MM:ss');

//LISTAR TODOS LOS USUARIOS
userModel.listarUsuarios = (resp) => {

    if (connection) {
        var sql = "SELECT idUsuario, email, state, rango FROM usuarios ORDER BY idUsuario";
        connection.query(sql,(err, result) => {
            if (err) {
              throw err;
            }
            else {
              resp(null, result);
            }
        });
    }

};

//OBTENER USUARIOS
userModel.obtenerUsuarios = (id, resp) => {

    if (connection) {
        var sql = `SELECT idUsuario, email, state, rango FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
        connection.query(sql,(err, result) => {
            if (err) {
              throw errl
            }
            else {
              resp(null, result);
            }
        });
    }

};

//INSERTAR USUARIO
userModel.insertarUsuarios = (data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM usuarios WHERE email = ${connection.escape(data.email)}`;

        connection.query(exist, (err, ok) => {

            if(ok.length == 0){

                var sql = 'INSERT INTO usuarios SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        'mensaje': 'El usuario ha sido registrado con exito',
                        'id': result
                      });
                    }
                });

            } else {
                resp(null, {
                  'mensaje': 'Usuario ya existe'
                })
            }

        });
        
    }

};

//ELIMINAR USUARIOS
userModel.eliminarUsuarios = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
                connection.query(sql, (err, result) => {
                    if (err) {
                      throw err;
                    }
                    else {
                      resp(null, {
                        "mensaje": "Se ha eliminado con exito"
                      })
                    }
                });
            } else {
                resp(null, {
                  'mensaje': 'Usuario no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR USUARIOS
userModel.actualizarUsuarios = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE usuarios SET 
                  email = ${connection.escape(data.email)} ,
                  rango = ${connection.escape(data.rango)}
                  WHERE idUsuario = ${connection.escape(id)}
                `;

                connection.query(sql, function(err, res) {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "Se ha actualizado con exito"
                      })
                    }
                });

            } else {
                resp(null, {
                  'mensaje': 'Usuario no existe'
                })
            }
            
        });
    }

};



//AUTENTICAR USUARIOS
userModel.autenticarUsuarios = (data, resp) => {

    if (connection) {

        var sql = `SELECT idUsuario, email, password, state, rango FROM usuarios WHERE email = ${connection.escape(data.email)}`;
        connection.query(sql, function(err, ok) {
                
            if (err) {
                throw err;
            } else {

                var pass = ok[0].password;
                bcrypt.compare(data.password, pass, function(error, success){

                    if (err) {
                        throw error;
                    } else {

                        if(success){

                            var setoken = {
                                idUsuario: ok[0].idUsuario,
                                email: ok[0].email,
                                state: ok[0].state,
                                rango: ok[0].rango
                            }

                            resp(null, {
                                "mensaje": "Haz ingresado correctamente",
                                "rango": ok[0].rango,
                                "token": token.crearToken(setoken)
                            });

                        } else {

                          resp(null, {
                              "mensaje": "Credenciales no validas"
                          });

                        }
                        
                    }
                          
                });
                        
            }

        });
    }

};



module.exports = userModel;
