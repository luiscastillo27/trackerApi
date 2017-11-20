const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let mantenimientoModel = {};

//LISTAR TODOS LOS SENSORES
mantenimientoModel.listarMantenimiento = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM mantenimientos ORDER BY idMantenimiento";
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
mantenimientoModel.obtenerMantenimiento = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM mantenimientos WHERE idMantenimiento = ${connection.escape(id)}`;
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
mantenimientoModel.insertarMantenimiento = (data, resp) => {

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
mantenimientoModel.eliminarMantenimiento = (id, resp) => {

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
mantenimientoModel.actualizarMantenimiento = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM mantenimientos WHERE idMantenimiento = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE mantenimientos SET 
                  idVehiculo = ${connection.escape(data.idVehiculo)} ,
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
