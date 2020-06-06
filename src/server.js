const express = require("express")
const server = express()

// access db
const db = require("./database/db")

// folder public setup
server.use(express.static("public"))

// hability req.body in the application
server.use(express.urlencoded({extended: true}))

// using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

// setup route application
// home
// req: requisition
// res: response
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    // req.query: Query Strings url  
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: body of form
    //console.log(req.body)

    // insert data in db
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
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send ("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true})
    }

    db.run(query, values, afterInsertData)


}) 



server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // empty 
        return res.render("search-results.html", { total: 0 })
    }

    // bring data from db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
           }

    const total = rows.length
    

        // show page with data from db
        return res.render("search-results.html", { places: rows, total})
    })

})


// start server
server.listen(3000)

