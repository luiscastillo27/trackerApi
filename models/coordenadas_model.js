const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let coordenadaModel = {};

//LISTAR TODOS LOS SENSORES
coordenadaModel.listarCoordenada = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM coordenadas ORDER BY idCoordenada";
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

//OBTENER SENSORES
coordenadaModel.obtenerCoordenada = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM coordenadas WHERE idCoordenada = ${connection.escape(id)}`;
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

//INSERTAR SENSORES
coordenadaModel.insertarCoordenada = (data, resp) => {

    if (connection) {
        
                var sql = 'INSERT INTO coordenadas SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "La coordenada  ha sido registrado con exito",
                        "id": result.insertId
                      });
                    }
                });

               }

};

//ELIMINAR SENSORES
coordenadaModel.eliminarCoordenada = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM coordenadas WHERE idCoordenada = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM coordenadas WHERE idCoordenada = ${connection.escape(id)}`;
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
                  'mensaje': 'La coordenada ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
coordenadaModel.actualizarCoordenada = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM coordenadas WHERE idCoordenada = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE coordenadas SET 
                  latitud = ${connection.escape(data.latitud)} ,
                  logitud = ${connection.escape(data.logitud)} 
                  WHERE idCoordenada = ${connection.escape(id)}
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
                  'mensaje': 'La coordenada no existe'
                })
            }
            
        });
    }

};


module.exports = coordenadaModel;
