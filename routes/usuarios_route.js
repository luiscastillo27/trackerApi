const UserModel = require('../models/usuarios_model');
const bcrypt = require('bcrypt-nodejs');
const md_auth = require('../token/authorization');
const userValid = require('../validation/usuarios_validation');

module.exports = app => {
  //md_auth.autenticacion, 

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

        
      var valid = userValid.idValid(request);

      if(valid != "Correcto"){
          
          resp.status(500).json({
              success: false,
              mensage: valid
          });

      } else {

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

      }

  });

  //AGREGA NUEVO USUARIO
  app.post('/usuarios/agregar', (request, resp) => {
  
      var valid = userValid.agregarValid(request);

      if(valid != "Correcto"){
          
          resp.status(500).json({
              success: false,
              mensage: valid
          });

      } else {
          
          bcrypt.hash(request.body.password, null, null, function(error, hash){
      
              if (error) {
                  throw error;
              } else {

                  var data = {
                      email: request.body.email,
                      password: hash,
                      state: request.body.state,
                      rango: request.body.rango
                  };

                  UserModel.insertarUsuario(data, (err, data) => {

                      if(err){
                          throw err;
                      } else {

                          if(data.mensaje == "El usuario ha sido registrado con exito"){
                              resp.status(200).json(data);
                          }

                          if(data.mensaje == "Usuario ya existe"){
                              resp.status(500).json(data);
                          } 

                      }

                  });
              }
              
          });

      }


  });

  //ELIMINAR USUARIO
  app.delete('/usuarios/eliminar/:idUsuario', (request, resp) => {

      var valid = userValid.idValid(request);

      if(valid != "Correcto"){
          
          resp.status(500).json({
              success: false,
              mensage: valid
          });

      } else {

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
                      resp.status(200).json({
                        success: true,
                        mensage: 'Se ha eliminado con exito'
                      });
                  }
              } else {
                  resp.status(500).json({
                    success: false,
                    mensage: err
                  });
              }

          });

      }

  });

  //ACTUALIZAR USUARIO
  app.put('/usuarios/actualizar/:idUsuario', (request, resp) => {

      var valid = userValid.agregarValid(request);
      var validid = userValid.idValid(request);

      if(validid != "Correcto" & valid != "Correcto"){
          
          resp.status(500).json({
              success: false,
              mensage: valid
          });

      } else {

          bcrypt.hash(request.body.password, null, null, function(error, hash){

              var data = {
                  email: request.body.email,
                  password: hash,
                  state: request.body.state,
                  rango: request.body.rango
              };

              var id = request.params.idUsuario;

              UserModel.actualizarUsuario(id, data, (err, result) => {
                  
                  if(err){
                      resp.status(500).json({
                        success: false,
                        mensage: err
                      });
                  } 
                  else {
                      if(result.mensaje == 'Usuario no existe'){
                          resp.status(500).json({
                            success: true,
                            mensage: 'EL usuario no se encuentra en la db'
                          });
                      }
                      if(result.mensaje == 'Se ha actualizado con exito'){
                          resp.status(200).json({
                            success: true,
                            mensage: 'Se ha actualizado con exito'
                          });
                      }
                  }

              });

          });
      }
    
  });


  //AUTENTICAR USUARIO
  app.post('/usuarios/autenticar', (request, resp) => {

      var valid = userValid.loginValid(request);

      if(valid != "Correcto"){
          
          resp.status(500).json({
              success: false,
              mensage: valid
          });

      } else {

          var data = {
              email: request.body.email,
              password: request.body.password
          }

          UserModel.autenticarUsuario(data, (err, result) => {
              
              if(result.mensaje == 'Haz ingresado correctamente'){
                  resp.status(200).json({
                      success: true,
                      mensage: 'Haz ingresado correctamente',
                      token: result.token
                  });
              }

              if(result.mensaje == 'Credenciales no validas'){
                  resp.status(500).json({
                      success: false,
                      mensage: 'Credenciales no validas'
                  });
              }

          });

      }

  });
    





};
