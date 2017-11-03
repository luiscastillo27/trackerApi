const SensoresModel = require('../models/sensores_model');

module.exports = app => {

  //LISTAR TODOS LOS SENSORES
  app.get('/sensores/listar', (request, resp) => {

      SensoresModel.listarSensores((err, data) => {
          
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

  //OBTENER DATOS DEL SENSORES
  app.get('/sensores/obtener/:idSensor', (request, resp) => {

      var id = request.params.idSensor;
      SensoresModel.obtenerSensores(id, (err, data) => {

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

  //AGREGA NUEVO SENSORES
  app.post('/sensores/agregar', (request, resp) => {

      var data = {
          stock: request.body.stock,
          nombre: request.body.nombre
      };

      SensoresModel.insertarSensores(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'El sensor ya existe') {
                resp.status(500).json({
                  success: false,
                  mensage: 'El sensor ya existe'
                });
              }

              if (data.mensaje == 'El sensor ha sido registrado con exito') {
                resp.status(500).json({
                  success: false,
                  mensage: 'El sensor ha sido registrado con exito',
                  data: data.id
                });
              }

          }

      });

  });

  //ELIMINAR SENSORES
  app.delete('/sensores/eliminar/:idSensor', (request, resp) => {

      var id = request.params.idSensor;
      SensoresModel.eliminarSensores(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {
              if(data.mensaje == 'El sensor ya no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'EL sensor no se encuentra en la db'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json(data);
              }   
          }

      });

  });

  //ACTUALIZAR SENSORES
  app.put('/sensores/actualizar/:idSensor', (request, resp) => {

      var data = {
          stock: request.body.stock,
          nombre: request.body.nombre
      };

      var id = request.params.idSensor;
      SensoresModel.actualizarSensores(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'El sensor no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'EL sensor no se encuentra en la db'
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
