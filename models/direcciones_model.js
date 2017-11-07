const mysql = require('mysql');
const dateFormat = require('dateformat');
const conexion = require('../conexion/conexion');;
const connection = mysql.createConnection(conexion);
connection.connect();

let direccionesModel = {};

//LISTAR TODOS LOS SENSORES
direccionesModel.listarDireccion = (resp) => {

    if (connection) {
        var sql = "SELECT * FROM dirrecciones ORDER BY idDireccion";
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
direccionesModel.obtenerDireccion = (id, resp) => {

    if (connection) {
        var sql = `SELECT * FROM dirrecciones WHERE idDireccion = ${connection.escape(id)}`;
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
direccionesModel.insertarDireccion = (data, resp) => {

    if (connection) {
           var sql = 'INSERT INTO dirrecciones SET ?';
                connection.query(sql, data, (err, result) => {
                    if (err) {
                      throw err;
                    } else {
                      resp(null, {
                        "mensaje": "La coordenada ha sido registrado con exito",
                        "id": result.insertId
                      });
                    }
                });

            } 
        
};

//ELIMINAR SENSORES
direccionesModel.eliminarDireccion = (id, resp) => {

    if (connection) {
        var exist = `SELECT * FROM dirrecciones WHERE idDireccion = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){
                var sql = `DELETE  FROM dirrecciones WHERE idDireccion = ${connection.escape(id)}`;
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
                  'mensaje': 'La direccion ya no existe'
                })
            }
            
        });
    }

};

//ACTUALIZAR SENSORES
direccionesModel.actualizarDireccion = (id, data, resp) => {

    if (connection) {
        var exist = `SELECT * FROM dirrecciones WHERE idDireccion = ${connection.escape(id)}`;
        connection.query(exist, (err, ok) => {
            
            if(ok.length > 0){

                var sql = `
                  UPDATE dirrecciones SET 
                  idUsuario = ${connection.escape(data.idUsuario)} ,
                  pais = ${connection.escape(data.pais)} ,
                  cuidad = ${connection.escape(data.cuidad)} ,
                  cp = ${connection.escape(data.cp)} ,
                  calle = ${connection.escape(data.calle)},
                  colonia = ${connection.escape(data.colonia)} ,
                  numero = ${connection.escape(data.numero)}
                  WHERE idDireccion = ${connection.escape(id)}
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


module.exports = direccionesModel;
