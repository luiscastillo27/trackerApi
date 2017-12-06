const MantenimientoModel = require('../models/mantenimiento_model');

module.exports = app => {

  //LISTAR TODOS LOS VEHICULOS
  app.get('/mantenimiento/listarTodos', (request, resp) => {

      MantenimientoModel.listarTodosMantenimientos( (err, data) => {
          
          if(data){
              resp.status(200).json({
                  success: false,
                  mensage: 'Listando los mantenimientos del vehiculo',
                  data: data
              });
          } else {
              resp.status(500).json({
                success: false,
                mensage: err
              });
          }

      });

  });


  //LISTAR  VEHICULOS POR USUARIO
  app.get('/mantenimiento/listar/:idUsuario', (request, resp) => {

      var id = request.params.idUsuario;
      MantenimientoModel.listarMantenimientos(id, (err, data) => {
          
          if(data){
              resp.status(200).json({
                  success: false,
                  mensage: 'Listando los mantenimientos del vehiculo',
                  data: data
              });
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
      MantenimientoModel.obtenerMantenimientos(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {
              resp.status(200).json({
                  success: false,
                  mensage: 'Peticion hecha correctamente',
                  data: data
              });
          }
        
      });

  });


  app.get('/mantenimiento/obtenerTodos/:idMantenimiento', (request, resp) => {

      var id = request.params.idMantenimiento;
      MantenimientoModel.obtenerTodos(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {
              resp.status(200).json({
                  success: false,
                  mensage: 'Peticion hecha correctamente',
                  data: data
              });
          }
        
      });

  });

  //AGREGA NUEVO VEHICULOS
  app.post('/mantenimiento/agregar', (request, resp) => {

      var data = {
          idVehiculo: request.body.idVehiculo,
          idCoordenada: request.body.idCoordenada,
          tipo: request.body.tipo, 
          fechaI: request.body.fechaI,
          fechaT: request.body.fechaT
      };

      MantenimientoModel.insertarMantenimientos(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'El mantenimiento ya existe') {
                resp.status(200).json({
                  success: false,
                  mensage: 'El mantenimiento ya existe'
                });
              }

              if (data.mensaje == 'El mantenimientos ha sido registrado con exito') {
                resp.status(200).json({
                  success: false,
                  mensage: 'El mantenimiento ha sido registrado con exito',
                });
              }

          }

      });

  });

  //ELIMINAR VEHICULOS
  app.delete('/mantenimiento/eliminar/:idMantenimiento', (request, resp) => {

      var id = request.params.idMantenimiento;
      MantenimientoModel.eliminarMantenimientos(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if(data.mensaje == 'El mantenimiento ya no existe'){
                  resp.status(200).json({
                    success: true,
                    mensage: 'El mantenimiento ya no existe'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json({
                    success: true,
                    mensage: 'Se ha eliminado con exito'
                  });
              }   
          }

      });

  });

  //ACTUALIZAR VEHICULOS
  app.put('/mantenimiento/actualizar/:idMantenimiento', (request, resp) => {

      var data = {
          idVehiculo: request.body.idVehiculo,
          idCoordenada: request.body.idCoordenada,
          tipo: request.body.tipo,
          fechaI: request.body.fechaI,
          fechaT: request.body.fechaT
      };

      var id = request.params.idMantenimiento;
      MantenimientoModel.actualizarMantenimientos(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'El mantenimiento no existe'){
                  resp.status(200).json({
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
