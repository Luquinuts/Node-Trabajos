const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(`<!doctype html><html><head></head><body><h1>      
            Mi primer pagina con Express</h1></body></html>`)
})

const server = app.listen(8888, () => {
  console.log('Servidor web iniciado')
})