const VehiculosModel = require('../models/vehiculos_model');

module.exports = app => {

  //LISTAR TODOS LOS VEHICULOS
  app.get('/vehiculos/listar', (request, resp) => {

      VehiculosModel.listarVechiculos((err, data) => {
          
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
  app.get('/vehiculos/obtener/:idVehiculo', (request, resp) => {

      var id = request.params.idVehiculo;
      VehiculosModel.obtenerVechiculos(id, (err, data) => {

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
  app.post('/vehiculos/agregar', (request, resp) => {

      var data = {
          marca: request.body.marca,
          modelo: request.body.modelo,
          idUsuario: request.body.idUsuario,
          matricula: request.body.matricula,
          tipo: request.body.tipo,
          anio: request.body.anio
      };

      VehiculosModel.insertarVechiculos(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'El vehiculo ya existe') {
                resp.status(200).json({
                  success: false,
                  mensage: 'El vehiculo ya existe'
                });
              }

              if (data.mensaje == 'El vehiculo ha sido registrado con exito') {
                resp.status(200).json({
                  success: false,
                  mensage: 'El vehiculo ha sido registrado con exito',
                  data: data.id
                });
              }

          }

      });

  });

  //ELIMINAR VEHICULOS
  app.delete('/vehiculos/eliminar/:idVehiculo', (request, resp) => {

      var id = request.params.idVehiculo;
      VehiculosModel.eliminarVechiculos(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if(data.mensaje == 'El vehiculo ya no existe'){
                  resp.status(200).json({
                    success: true,
                    mensage: 'EL vehiculo no se encuentra en la db'
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
  app.put('/vehiculos/actualizar/:idVehiculo', (request, resp) => {

      var data = {
          marca: request.body.marca,
          modelo: request.body.modelo,
          idUsuario: request.body.idUsuario,
          matricula: request.body.matricula,
          tipo: request.body.tipo,
          anio: request.body.anio
      };

      var id = request.params.idVehiculo;
      VehiculosModel.actualizarVechiculos(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'El vehiculo no existe'){
                  resp.status(200).json({
                    success: true,
                    mensage: 'EL vehiculo no se encuentra en la db'
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
