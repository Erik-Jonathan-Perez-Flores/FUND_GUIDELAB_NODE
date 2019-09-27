'use strict'

const Lista = require('../modelos/Lista')


function getPractica (req, res) {
    Lista.find({}, (err, lista) => {
    if (err) {
      return res.status(500).send({
        message: `Error performing request: ${err}`
      })
    }
    if (!lista) {
      return res.status(404).send({
        message: `There aren't guides.`
      })
    }
    Lista.populate(lista, {path: "practica , archivo"},function(err, lista){
        res.status(200).send(lista);
    });
     
  })
}


function savePractica (req, res) {

    console.log(req.body)
      let practica = new Lista()
      practica.titulo =  req.body.titulo;
      practica.practica =  req.body.practica;
      practica.archivo =  req.body.archivo;
      practica.save((err, practicaStored)=>{
        console.log(req.practicaStored)
          if(err) res.status(500).send({message:`Error al guardar en la BD ${err}`})
  
          res.status(200).send({practica: practicaStored})
          
      })
  };
  
  function updatePractica (req, res) {
    let pId = req.params.pId
    let update = req.body//rescata los campos del cuerpo
  
    Practica.findByIdAndUpdate(pId, update, (err, pUpdated)=>{//la funcion actualiza mediante el id
        if(err) res.status(500).send({message: `Error al actualizar el producto:${err}`})
  
        res.status(200).send({practica: pUpdated})
      })
  
  }
  
  function deletePractica (req, res) {
    let pId = req.params.pId
  
    Lista.findById(pId, (err, practica)=>{
      if(err) res.status(500).send({message: `Error al borrar el producto:${err}`})
  
      practica.remove(err => {
        if(err) res.status(500).send({message: `Error al borrar el producto:${err}`})
        res.status(200).send({message: "El producto ha sido eliminado"})
      })
    })
  } 
  
  
  module.exports = {
    getPractica,
    savePractica,
    updatePractica,
    deletePractica
  }