/**
 * @version: 1.0
 * @license: MIT
 * @description: B4ckS0ckt - Server
*/

const express = require("express")
const session = require("express-session")
const { join } = require("path")
const flash = require("flash")
const { json, urlencoded } = require("body-parser")
const { Password, MongoURI } = require("./settings.json") 
const { connect } = require("mongoose")

/**
 * @description: Hacemos una funcion para todo el servidor: 
*/

function Index(puerto) {
    connect(MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("[DATABASE] :: MongoDB, conectado.")
    }).catch((err) => {
        console.log(`[ERROR] :: MongoDB, ${err}`)
    })
    const APP = express()
    APP.set("port", process.env.PORT || puerto)
    APP.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: false
    }))
    APP.set("views", join(__dirname, "views"))
    APP.set("view engine", "ejs")
    APP.use(express.static("public"))
    APP.use(json())
    APP.use(urlencoded({
        extended: false
    }))
    APP.use(flash())
    APP.use((request, response, next) => {
        request.pass = Password
        next()
    })
    APP.use("/", require("./router/index")) /** */
    APP.use("/api", require("./router/API")) 
    APP.get("*", async(request, response) => {
        response.status(404).render("404", {
            title: "B4cks0ck - 404"
        })
    })
    APP.listen(APP.get("port"), () => {
        console.log(`[SERVER] Servidor, listo. Puerto: ${APP.get("port")}`)
    })
} 

/**
 * @description: Iniciamos el servidor con parametro del puerto:
*/

Index(80) /** HTTP: 80, HTTPS: 443 */


