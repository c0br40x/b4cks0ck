/**
 * @version: 1.0
 * @license: MIT
 * @description: B4ckS0ckt - Database
*/

const { Schema, model } = require("mongoose")

/**
 * @description: Schema para la base de datos:
*/

const SchemaModel = Schema({
    id: Number,
    OneContent: String,
    TwoContent: String,
    ThreeContent: String,
})

/**
 * @description: Exportamos la configuracion
*/

module.exports = model("Schema", SchemaModel)