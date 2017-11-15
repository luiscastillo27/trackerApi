const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let RutasModel = {};

//LISTAR TODOS LOS SENSORES
RutasModel.listarRutas = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM rutas ORDER BY idRuta";
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

//OBTENER RUTA
RutasModel.obtenerRuta = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM rutas WHERE idRuta = ${connection.escape(id)}`;
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

//INSERTAR RUTA
RutasModel.insertarRuta = (data, resp) => {

    if (connection) {
        
                var sql = 'INSERT INTO rutas SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "La ruta ha sido registrada con exito",
                        "id": result.insertId
                      });
                    }
                });

               }

};

//ELIMINAR SENSORES
RutasModel.eliminarRuta = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM rutas WHERE idRuta = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM rutas WHERE idRuta = ${connection.escape(id)}`;
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
                  'mensaje': 'La ruta ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
RutasModel.actualizarRutas = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM rutas WHERE idRuta = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE rutas SET 
                  idDireccion = ${connection.escape(data.idDireccion)} ,
                  idUsuario = ${connection.escape(data.idUsuario)}, 
				  fechaI = ${connection.escape(data.fechaI)}
                  WHERE idRuta = ${connection.escape(id)}
                `;

                connection.query(sql, function(err, res) {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "Se ha actualizado con exito",
                        "data": res
                      })
                    }
                });

            } else {
                resp(null, {
                  'mensaje': 'La ruta no existe'
                })
            }
            
        });
    }

};


module.exports = RutasModel;
