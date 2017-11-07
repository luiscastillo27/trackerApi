const MantenimientoModel = require('../models/mantenimiento_model');

module.exports = app => {

  //LISTAR TODOS LOS VEHICULOS
  app.get('/mantenimiento/listar', (request, resp) => {

      MantenimientoModel.listarMantenimiento((err, data) => {
          
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
  app.get('/mantenimiento/obtener/:idMantenimiento', (request, resp) => {

      var id = request.params.idMantenimiento;
      MantenimientoModel.obtenerMantenimiento(id, (err, data) => {

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
  app.post('/mantenimiento/agregar', (request, resp) => {

      var data = {
          idVehiculo: request.body.idVehiculo,
          idCosa: request.body.idCosa,
          tipo: request.body.tipo,
          fechaI: request.body.fechaI,
          fechaT: request.body.fechaT
      };

      MantenimientoModel.insertarMantenimiento(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'El mantenimiento ya existe') {
                resp.status(500).json({
                  success: false,
                  mensage: 'El mantenimiento ya existe'
                });
              }

              if (data.mensaje == 'El mantenimiento ha sido registrado con exito') {
                resp.status(500).json({
                  success: false,
                  mensage: 'El mantenimiento ha sido registrado con exito',
                  data: data.id
                });
              }

          }

      });

  });

  //ELIMINAR VEHICULOS
  app.delete('/mantenimiento/eliminar/:idMantenimiento', (request, resp) => {

      var id = request.params.idMantenimiento;
      MantenimientoModel.eliminarMantenimiento(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if(data.mensaje == 'El mantenimiento ya no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'EL mantenimiento no se encuentra en la db'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json(data);
              }   
          }

      });

  });

  //ACTUALIZAR VEHICULOS
  app.put('/mantenimiento/actualizar/:idMantenimiento', (request, resp) => {

      var data = {
          idVehiculo: request.body.idVehiculo,
          idCosa: request.body.idCosa,
          tipo: request.body.tipo,
          fechaI: request.body.fechaI,
          fechaT: request.body.fechaT
      };

      var id = request.params.idMantenimiento;
      MantenimientoModel.actualizarMantenimiento(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'El mantenimiento no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'EL mantenimiento no se encuentra en la db'
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
