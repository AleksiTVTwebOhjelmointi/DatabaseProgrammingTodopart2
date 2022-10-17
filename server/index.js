const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const config = require('./config')

const app = express()
app.use(cors())

const port = 3001

app.get("/",async (req,res) => { //täytyy olla async jos on "await" koodissa
    try {
        const connection = await mysql.createConnection(config.db) //Luodaan yhteys mysql-tietokantaan
        const [result, ] = await connection.execute('select * from task')
        if(!result) result=[] //Jos select ei palauta mitään, niin resultista muutetaan tyhjä taulukko
        res.status(200).json(result[0])
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

app.listen(port)