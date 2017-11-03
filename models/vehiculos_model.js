const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let userModel = {};

//LISTAR TODOS LOS USUARIOS
userModel.listarUsuarios = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM usuarios ORDER BY idUsuario";
        connection.query(sql,(err, result) => {
            if (err) {
              throw err
            }
            else {
              resp(null, result);
            }
        });
    }

};

//OBTENER USUARIOS
userModel.obtenerUsuario = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
        connection.query(sql,(err, result) => {
            if (err) {
              throw err
            }
            else {
              resp(null, result);
            }
        });
    }

};

//INSERTAR USUARIO
userModel.insertarUsuario = (data, resp) => {

    if (connection) {
        var sql = 'INSERT INTO usuarios SET ?';
        connection.query(sql, data, (err, result) => {
            if (err) {
              throw err;
            } else {
              resp(null, {'insertId': result.insertId})
            }
        });
    }

};

//ELIMINAR USUARIOS
userModel.eliminarUsuario = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
                connection.query(sql, (err, result) => {
                    if (err) {
                      throw err
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
userModel.actualizarUsuario = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE usuarios SET 
                  email = ${connection.escape(data.email)} ,
                  password = ${connection.escape(data.password)} ,
                  state = ${connection.escape(data.state)} ,
                  rango = ${connection.escape(data.rango)}
                  WHERE idUsuario = ${connection.escape(id)}
                `;

                connection.query(sql, function(err, res) {
                    if (err) {
                      throw err
                    } else {
                      resp(null, {
                        "mensaje": "Se ha actualizado con exito",
                        "data": res
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


module.exports = userModel;
