const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let vehiculosModel = {};

//LISTAR TODOS LOS SENSORES
vehiculosModel.listarSensores = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM vehiculos ORDER BY idVehiculo";
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
vehiculosModel.obtenerSensores = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM vehiculos WHERE idVehiculo = ${connection.escape(id)}`;
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
vehiculosModel.insertarSensores = (data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM vehiculos WHERE matricula = ${connection.escape(data.matricula)}`;

        connection.query(exist, (err, ok) => {

            
            if(ok.length == 0){

                var sql = 'INSERT INTO vehiculos SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "El vehiculo ha sido registrado con exito",
                        "id": result.insertId
                      });
                    }
                });

            } else {
                resp(null, {
                  'mensaje': 'El vehiculo ya existe'
                })
            }

        });
        
    }

};

//ELIMINAR SENSORES
vehiculosModel.eliminarSensores = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM vehiculos WHERE idVehiculo = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM vehiculos WHERE idVehiculo = ${connection.escape(id)}`;
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
                  'mensaje': 'El vehiculo ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
vehiculosModel.actualizarSensores = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM vehiculos WHERE idVehiculo = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE vehiculos SET 
                  marca = ${connection.escape(data.marca)} ,
                  modelo = ${connection.escape(data.modelo)} ,
                  matricula = ${connection.escape(data.matricula)} ,
                  tipo = ${connection.escape(data.tipo)} ,
                  anio = ${connection.escape(data.anio)}
                  WHERE idVehiculo = ${connection.escape(id)}
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
                  'mensaje': 'El vehiculo no existe'
                })
            }
            
        });
    }

};


module.exports = vehiculosModel;
