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
    const db = await (await database.find()).length
    if (request.session.isAuth == true) {
        response.status(200).render("home", {
            title: "B4cks0ck - Home",
            db,
            session: request.session
        })
    } else {
        response.status(200).render("login", {
            title: "B4cks0ck - Login",
            session: request.session
        })
    }
})
router.get("/infectados", async(request, response) => {
    if (request.session.isAuth == false || request.session.isAuth == undefined) return await response.redirect("/")
    console.log(request.session.isAuth)
    const db = await database.find()
    response.status(200).render("infectados", {
        title: "B4cks0ck - Infectados",
        db
    })
})
router.post('/login', async(req, res) => {
    if(req.pass !== req.body.password) {
        req.flash('error', "Contraseña incorrecta...");
        return await res.redirect('/');
    }
    if(req.session.isAuth == true) return await res.redirect('/');
    req.session.isAuth = true
    await res.redirect('/')
})
router.get("/logout", async(request, response) => {
    if (request.session.isAuth == false) return await response.redirect("/")
    request.session.isAuth = false 
    await response.redirect("/")
})

module.exports = router
