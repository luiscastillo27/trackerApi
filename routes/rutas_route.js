const RutasModel = require('../models/rutas_model');

module.exports = app => {

  //LISTAR TODOS LAS RUTAS
  app.get('/rutas/listar', (request, resp) => {

      RutasModel.listarRutas((err, data) => {
          //console.log(err);
		  //console.log(data);
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

  //OBTENER DATOS DE PIEZAS
  app.get('/rutas/obtener/:idRuta', (request, resp) => {

      var id = request.params.idRuta;
      RutasModel.obtenerRuta(id, (err, data) => {

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

  //AGREGA NUEVA RUTA
  app.post('/rutas/agregar', (request, resp) => {

      var data = {
          idDireccion: request.body.idDireccion,
          idUsuario: request.body.idUsuario,
		  fechaI: request.body.fechaI
      };

      RutasModel.insertarRuta(data, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if (data.mensaje == 'La ruta ya existe') {
                resp.status(500).json({
                  success: false,
                  mensage: 'La ruta ya existe'
                });
              }

              if (data.mensaje == 'La ruta ha sido registrada con exito') {
                resp.status(500).json({
                  success: false,
                  mensage: 'La ruta ha sido registrada con exito',
                  data: data.id
                });
              }

          }

      });

  });

  //ELIMINAR VEHICULOS
  app.delete('/piezas/eliminar/:idPieza', (request, resp) => {

      var id = request.params.idPieza;
      RutasModel.eliminarPieza(id, (err, data) => {

          if(err){
              resp.status(500).json({
                success: false,
                mensage: err
              });
          } else {

              if(data.mensaje == 'La pieza ya no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'La pieza no se encuentra en la base de datos'
                  });
              }
              if(data.mensaje == 'Se ha eliminado con exito'){
                  resp.status(200).json(data);
              }   
          }

      });

  });

  //ACTUALIZAR VEHICULOS
  app.put('/piezas/actualizar/:idPieza', (request, resp) => {

      var data = {
         stock: request.body.stock,
         nombre: request.body.nombre
      };

      var id = request.params.idPieza;
      RutasModel.actualizarPiezas(id, data, (err, result) => {

          if(err){
              resp.status(500).json({
                  success: false,
                  mensage: err
              });
          } else {

              if(result.mensaje == 'La pieza no existe'){
                  resp.status(500).json({
                    success: true,
                    mensage: 'La pieza no se encuentra en la base de datos'
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
