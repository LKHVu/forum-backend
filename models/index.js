import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'
import {database} from '../config'

const basename = path.basename(__filename)

const models = {}

if (database.db_host != ''){
    let files = fs
        .readdirSync(__dirname)
        .filter(file => {
            return (file.indexOf('.') !== 0 && (file !== basename) && (file.slice(-3) === '.js'))
        })
            .forEach(file => {
                const filename = file.split('.')[0]
                const model_name = filename.charAt(0).toUpperCase() + filename.slice(1)
                models[model_name] = require('./'+file)
            })

        mongoose.Promise = global.Promise

        mongoose.connect(database.url,{
            useNewUrlParser: true, 
            useCreateIndex: true 
            }
        ).catch(err => {
            console.log("Cannot connect to mongo server")
        })

        let db = mongoose.connection
        module.exports = db
        db.once('open', ()=> {
            console.log('Connected to mongo server')
        })
        db.on('error', err => {
            console.log('error: ' + err)
        })
} else {
    console.log("Credential failed")
}

module.exports = models
