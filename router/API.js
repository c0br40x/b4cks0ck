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

    if (!query.info1 || !query.info2 || !query.info3) {
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
        }).save().then(() => {
            response.json({
                success: true,
                message: "Datos enviados exitosamente:",
                query
            })
        })
    }
})  
router.get("/get", async(request, response) => {
    const query = request.query
    if (!query.id) {
        response.json(await database.find())
    } else {
        const db = await database.findOne({
            id: query.id
        })
        if (!db) return response.send(400).json({
            success: false,
            message: "Que raro, esa ID es innexistente"
        })
        response.json(db)
    }
})

module.exports = router