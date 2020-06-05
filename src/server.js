const express = require('express');
const  nunjucks = require('nunjucks')
//executando a função express
const server = express();



server.use(express.static('public'))

//ligar server
server.listen(3000)


/* Rotas */
server.get("/" , (req,res) =>{
    return res.render(__dirname + "/views/index.html")
})

server.get("/create-point" , (req,res) =>{
  return  res.render(__dirname + "/views/create-point.html")

})

server.get("/search" , (req,res) =>{
  return  res.render(__dirname + "/views/search-results.html")

})


//template engine
nunjucks.configure("src/views", { 
    express: server,
    noCache: true 
})