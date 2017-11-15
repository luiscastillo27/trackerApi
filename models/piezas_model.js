const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let PiezasModel = {};

//LISTAR TODOS LOS SENSORES
PiezasModel.listarCoordenada = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM piezas ORDER BY idPieza";
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

//OBTENER PIEZA
PiezasModel.obtenerPieza = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM piezas WHERE idPieza = ${connection.escape(id)}`;
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
PiezasModel.insertarPieza = (data, resp) => {

    if (connection) {
        
                var sql = 'INSERT INTO piezas SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "La pieza ha sido registrada con exito",
                        "id": result.insertId
                      });
                    }
                });

               }

};

//ELIMINAR SENSORES
PiezasModel.eliminarPieza = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM piezas WHERE idPieza = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM piezas WHERE idPieza = ${connection.escape(id)}`;
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
                  'mensaje': 'La pieza ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
PiezasModel.actualizarPiezas = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM piezas WHERE idPieza = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE piezas SET 
                  stock = ${connection.escape(data.stock)} ,
                  nombre = ${connection.escape(data.nombre)} 
                  WHERE idPieza = ${connection.escape(id)}
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
                  'mensaje': 'La pieza no existe'
                })
            }
            
        });
    }

};


module.exports = PiezasModel;
