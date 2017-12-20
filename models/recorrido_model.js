const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let recorridoModel = {};

//LISTAR TODOS LOS SENSORES
recorridoModel.listarRecorrido = (resp) => {

    if (connection) {
        var sql =  `select vehiculos.idVehiculo, usuarios.email, vehiculos.marca, vehiculos.modelo, vehiculos.matricula,
                    vehiculos.tipo, vehiculos.anio, vehiculos.idUsuario
                    from vehiculos 
                    join usuarios on vehiculos.idUsuario = usuarios.idUsuario`;
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
recorridoModel.obtenerRecorrido = (id, resp) => {

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
recorridoModel.insertarRecorrido = (data, resp) => {

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
recorridoModel.eliminarRecorrido = (id, resp) => {

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
recorridoModel.actualizarRecorrido = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM vehiculos WHERE idVehiculo = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE vehiculos SET 
                  marca = ${connection.escape(data.marca)} ,
                  modelo = ${connection.escape(data.modelo)},
                  matricula = ${connection.escape(data.matricula)}, 
                  idUsuario = ${connection.escape(data.idUsuario)}, 
                  tipo = ${connection.escape(data.tipo)},
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


module.exports = recorridoModel;
