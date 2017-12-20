const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let sensoresModel = {};

//LISTAR TODOS LOS SENSORES
sensoresModel.listarSensores = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM sensores ORDER BY idSensor";
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
sensoresModel.obtenerSensores = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM sensores WHERE idSensor = ${connection.escape(id)}`;
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
sensoresModel.insertarSensores = (data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM sensores WHERE nombre = ${connection.escape(data.nombre)}`;

        connection.query(exist, (err, ok) => {

            
            if(ok.length == 0){

                var sql = 'INSERT INTO sensores SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "El sensor ha sido registrado con exito",
                        "id": result.insertId
                      });
                    }
                });

            } else {
                resp(null, {
                  'mensaje': 'El sensor ya existe'
                })
            }

        });
        
    }

};

//ELIMINAR SENSORES
sensoresModel.eliminarSensores = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM sensores WHERE idSensor = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM sensores WHERE idSensor = ${connection.escape(id)}`;
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
                  'mensaje': 'El sensor ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
sensoresModel.actualizarSensores = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM sensores WHERE idSensor = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE sensores SET 
                  valor = ${connection.escape(data.valor)},
                  fecha = ${connection.escape(data.fecha)},
                  nombre = ${connection.escape(data.nombre)}
                  WHERE idSensor = ${connection.escape(id)}
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
                  'mensaje': 'El sensor no existe'
                })
            }
            
        });
    }

};


module.exports = sensoresModel;
