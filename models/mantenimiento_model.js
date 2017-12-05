const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let mantenimientoModel = {};

//LISTAR TODOS MANTENIMIENTO
mantenimientoModel.listarTodosMantenimientos = (resp) => {

    if (connection) {
        var sql = `SELECT mantenimientos.idMantenimiento, vehiculos.modelo, vehiculos.matricula, mantenimientos.tipo, 
                  mantenimientos.fechaI, mantenimientos.fechaT, coordenadas.latitud, coordenadas.logitud
                  FROM mantenimientos
                  JOIN vehiculos ON mantenimientos.idVehiculo = vehiculos.idVehiculo
                  JOIN coordenadas ON mantenimientos.idCoordenada = coordenadas.idCoordenada`;

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

//LISTAR TODOS MANTENIMIENTO
mantenimientoModel.listarMantenimientos = (id, resp) => {

    if (connection) {
        var sql = `
            SELECT mantenimientos.idMantenimiento, vehiculos.marca, vehiculos.modelo, vehiculos.matricula, vehiculos.tipo, vehiculos.anio,
            mantenimientos.tipo, mantenimientos.fechaI, mantenimientos.fechaT
            FROM vehiculos
            JOIN  mantenimientos
            ON mantenimientos.idVehiculo = vehiculos.idVehiculo
            WHERE vehiculos.idUsuario = ${connection.escape(id)}
        `;
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
mantenimientoModel.obtenerMantenimientos = (id, resp) => {

    if (connection) {
        var sql = `
            SELECT mantenimientos.idMantenimiento, vehiculos.marca, vehiculos.modelo, vehiculos.matricula, vehiculos.tipo, vehiculos.anio,
            mantenimientos.tipo, mantenimientos.fechaI, mantenimientos.fechaT, coordenadas.latitud, coordenadas.logitud
            FROM vehiculos
            JOIN  mantenimientos ON mantenimientos.idVehiculo = vehiculos.idVehiculo
            JOIN  coordenadas ON coordenadas.idCoordenada = mantenimientos.idCoordenada
            WHERE mantenimientos.idMantenimiento = ${connection.escape(id)}
        `;
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
mantenimientoModel.insertarMantenimientos = (data, resp) => {

    if (connection) {
      
                var sql = 'INSERT INTO mantenimientos SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "El mantenimientos ha sido registrado con exito",
                        "id": result.insertId
                      });
                    }
                });

            } 

};

//ELIMINAR SENSORES
mantenimientoModel.eliminarMantenimientos = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM mantenimientos WHERE idMantenimiento = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM mantenimientos WHERE idMantenimiento = ${connection.escape(id)}`;
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
                  'mensaje': 'El mantenimientos ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
mantenimientoModel.actualizarMantenimientos = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM mantenimientos WHERE idMantenimiento = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE mantenimientos SET 
                  idVehiculo = ${connection.escape(data.idVehiculo)}, 
                  idCoordenada = ${connection.escape(data.idCoordenada)},
                  tipo = ${connection.escape(data.tipo)} ,
                  fechaI = ${connection.escape(data.fechaI)} ,
                  fechaT = ${connection.escape(data.fechaT)}
                  WHERE idMantenimiento = ${connection.escape(id)}
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
                  'mensaje': 'El mantenimientos no existe'
                })
            }
            
        });
    }

};


module.exports = mantenimientoModel;
