const DireccionModel = require('../models/direcciones_model');

module.exports = app => {

  //LISTAR TODOS LOS VEHICULOS
  app.get('/direcciones/listar', (request, resp) => {

      DireccionModel.listarDireccion((err, data) => {
          
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

  //OBTENER DATOS DEL VEHICULOS
  app.get('/direcciones/obtener/:idDireccion', (request, resp) => {

      var id = request.params.idDireccion;
      DireccionModel.obtenerDireccion(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {
              resp.status(200).json(data);
          }
        
      });

  });

  //AGREGA NUEVO VEHICULOS
  app.post('/direcciones/agregar', (request, resp) => {

      var data = {
          idUsuario: request.body.idUsuario,
          pais: request.body.pais,
          cuidad: request.body.cuidad,
          cp: request.body.cp,
          calle: request.body.calle,
          colonia: request.body.colonia,
          numero: request.body.numero
      };

      DireccionModel.insertarDireccion(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'La direcciones ya existe') {
                resp.status(500).json({
                  success: false,
                  mensage: 'La direcciones ya existe'
                });
              }

              if (data.mensaje == 'La direcciones ha sido registrado con exito') {
                resp.status(500).json({
                  success: false,
                  mensage: 'La direcciones ha sido registrado con exito',
                  data: data.id
                });
              }

          }

      });

  });

  //ELIMINAR VEHICULOS
  app.delete('/direcciones/eliminar/:idDireccion', (request, resp) => {

      var id = request.params.idDireccion;
      DireccionModel.eliminarDireccion(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if(data.mensaje == 'La direcciones ya no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'La direcciones no se encuentra en la db'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json(data);
              }   
          }

      });

  });

  //ACTUALIZAR VEHICULOS
  app.put('/direcciones/actualizar/:idDireccion', (request, resp) => {

      var data = {
          idUsuario: request.body.idUsuario,
          pais: request.body.pais,
          cuidad: request.body.cuidad,
          cp: request.body.cp,
          calle: request.body.calle,
          colonia: request.body.colonia,
          numero: request.body.numero
      };

      var id = request.params.idDireccion;
      DireccionModel.actualizarDireccion(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'La coordenada no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'La coordenada no se encuentra en la db'
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



};
