const CoordenadaModel = require('../models/coordenadas_model');

module.exports = app => {

  //LISTAR TODOS LOS VEHICULOS
  app.get('/coordenada/listar', (request, resp) => {

      CoordenadaModel.listarCoordenada((err, data) => {
          
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
  app.get('/coordenada/obtener/:idCoordenada', (request, resp) => {

      var id = request.params.idCoordenada;
      CoordenadaModel.obtenerCoordenada(id, (err, data) => {

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
  app.post('/coordenada/agregar', (request, resp) => {

      var data = {
          latitud: request.body.latitud,
          logitud: request.body.logitud
      };

      CoordenadaModel.insertarCoordenada(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'La coordenada ya existe') {
                resp.status(200).json({
                  success: false,
                  mensage: 'La coordenada ya existe'
                });
              }

              if (data.mensaje == 'La coordenada ha sido registrado con exito') {
                resp.status(200).json({
                  success: false,
                  mensage: 'La coordenada ha sido registrado con exito',
                  data: data.id
                });
              }

          }

      });

  });

  //ELIMINAR VEHICULOS
  app.delete('/coordenada/eliminar/:idCoordenada', (request, resp) => {

      var id = request.params.idCoordenada;
      CoordenadaModel.eliminarCoordenada(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if(data.mensaje == 'La coordenada ya no existe'){
                  resp.status(200).json({
                    success: true,
                    mensage: 'La coordenada no se encuentra en la db'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json(data);
              }   
          }

      });

  });

  //ACTUALIZAR VEHICULOS
  app.put('/coordenada/actualizar/:idCoordenada', (request, resp) => {

      var data = {
         latitud: request.body.latitud,
         logitud: request.body.logitud
      };

      var id = request.params.idCoordenada;
      CoordenadaModel.actualizarCoordenada(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'La coordenada no existe'){
                  resp.status(200).json({
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
