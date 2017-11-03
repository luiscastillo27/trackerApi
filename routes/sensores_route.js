const UserModel = require('../models/usuarios_model');

module.exports = app => {

  //LISTAR TODOS LOS USUARIOS
  app.get('/usuarios/listar', (request, resp) => {

      UserModel.listarUsuarios((err, data) => {
          
          if(data){
              resp.status(200).json(data);
          } else {
              resp.status(500).json({
                success: false,
                mensage: err
              });
          }

      });

  });

  //OBTENER DATOS DEL USUARIO
  app.get('/usuarios/obtener/:idUsuario', (request, resp) => {

      var id = request.params.idUsuario;
      UserModel.obtenerUsuario(id, (err, data) => {

          if(data){
              resp.status(200).json(data);
          } else {
              resp.status(500).json({
                success: false,
                mensage: err
              });
          }
        
      });

  });

  //AGREGA NUEVO USUARIO
  app.post('/usuarios/agregar', (request, resp) => {

      var data = {
          email: request.body.email,
          password: request.body.password,
          state: request.body.state,
          rango: request.body.rango
      };

      UserModel.insertarUsuario(data, (err, data) => {

          if (data && data.insertId) {
            resp.status(200).json({
              success: true,
              mensage: "Se ha insertado correctamente",
              data: data
            });
            // res.redirect('/users/' + data.insertId);
          } else {
            resp.status(500).json({
              success: false,
              mensage: err
            });
          }

      });

  });

  //ELIMINAR USUARIO
  app.get('/usuarios/eliminar/:idUsuario', (request, resp) => {

      var id = request.params.idUsuario;
      UserModel.eliminarUsuario(id, (err, data) => {

          if(data){
              if(data.mensaje == 'Usuario no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'EL usuario no se encuentra en la db'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json(data);
              }
          } else {
              resp.status(500).json({
                success: false,
                mensage: err
              });
          }

      });

  });

  //ACTUALIZAR USUARIO
  app.put('/usuarios/actualizar/:idUsuario', (request, resp) => {

      var data = {
          email: request.body.email,
          password: request.body.password,
          state: request.body.state,
          rango: request.body.rango
      };

      var id = request.params.idUsuario;
      UserModel.actualizarUsuario(id, data, (err, result) => {

          resp.status(200).json(result);
          if(resp){
              if(resp.mensaje == 'Usuario no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'EL usuario no se encuentra en la db'
                  });
              }
              if(resp.mensaje == 'Se ha actualizado con exito'){
                  resp.status(200).json(result);
              }
          } else {
              resp.status(500).json({
                success: false,
                mensage: err
              });
          }

    });
    
  });



};
