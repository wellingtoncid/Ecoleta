// import depedencies sqlite3
const sqlite3 = require("sqlite3").verbose()

// create object for make operations in db
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// use object db for operations
//db.serialize(() => {

//     // create table with SQL commands

//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)


//     // insert data in the table
//     const query = `
//             INSERT INTO places (
//                 image,
//                 name,
//                 address,
//                 address2,
//                 state,
//                 city,
//                 items
//             ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//         "Papersider",
//         "Guilherme Gembala, Jardim America",
//         "Numero 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papeis e Papelao"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

    // consulting data in the table
    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //         return console.log(err)
    //        }
    //
    //     console.log("Aqui estão os seus registros")
    //     console.log(rows)
    // })

    // delete data in the table
//     db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
//         if (err) {
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso")
//     })

// })

