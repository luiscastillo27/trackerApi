const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'tracker'
});

let userModel = {};

userModel.listUsers = (resp) => {

  if (connection) {
    var sql = "SELECT * FROM usuarios ORDER BY idUsuario";
    connection.query(sql,(err, rows) => {
        if (err) {
          throw err
        }
        else {
          resp(null, rows);
        }
      }
    )
  }

};


userModel.getUsers = (id, resp) => {

  if (connection) {
    var sql = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
    connection.query(sql,(err, data) => {
        if (err) {
          throw err
        }
        else {
          resp(null, data);
        }
      }
    )
  }

};


userModel.insertUser = (data, resp) => {
  if (connection) {
    var sql = 'INSERT INTO usuarios SET ?';
    connection.query(sql, data, (err, result) => {
        if (err) {
          throw err;
        } else {
          resp(null, {'insertId': result.insertId})
        }
      }
    )
  }
};



userModel.deleteUser = (id, resp) => {

  if (connection) {
      var exist = `SELECT * FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
      connection.query(exist, (err, ok) => {
          
          if(ok.length > 0){
              var sql = `DELETE  FROM usuarios WHERE idUsuario = ${connection.escape(id)}`;
              connection.query(sql, (err, data) => {
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




userModel.updateUser = (id, data, resp) => {

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
