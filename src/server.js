const express = require('express');
const  nunjucks = require('nunjucks')
//executando a função express
const server = express();
const db = require("./database/db")





server.use(express.static('public'))

//ligar server
server.listen(3000)

//configurando o express para ler o req.body
server.use(express.urlencoded({extended: true}))



/* Rotas */
server.get("/" , (req,res) =>{
    return res.render(__dirname + "/views/index.html")
})

server.get("/create-point" , (req,res) =>{

   
  console.log(req.query)
  return  res.render(__dirname + "/views/create-point.html")

})

server.post("/savepoint", (req, res) => {
  console.log(req.body)

  const query = `
  INSERT INTO places (
     image,
     name,
     address,
     address2,
     state,
    city,
     items
 ) VALUES (?,?,?,?,?,?,?);
`

const values = [
 req.body.image,
 req.body.name,
 req.body.address,
 req.body.adress2,
 req.body.state,
 req.body.city,
 req.body.items
]

  function afterInsertData(err) {
 if(err) {
     return console.log(err)
 }

return res.render("create-point.html", {saved: true} ) 
}


db.run(query, values, afterInsertData)
 

})

server.get("/search" , (req,res) =>{

    const search =  req.query.search;

    if(search == ""){

        return res.render(__dirname + "/views/search-results.html" , {total:0} )


    }

 db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        
       

        let total = rows.length

        return  res.render(__dirname + "/views/search-results.html" , {places: rows , total } )
    })

  

})


//template engine
nunjucks.configure("src/views", { 
    express: server,
    noCache: true 
})