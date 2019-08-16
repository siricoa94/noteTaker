const express = require("express");
const path = require("path");

let app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var connection = require("./config/connection");

// var route = require("./routes/routes");


app.use(express.static("public"));

app.get("/api/notes",function(req,res){
    res.send()
    res.end()
});
app.get("/api/allnotes",function(req,res){
    connection.query("SELECT * FROM notes", function(err, data){
        if (err) throw err;
        res.json(data);
    });
});
app.post("/api/savenotes",function(req,res){
    let noteBodyRequest = req.body.body;
    let noteTitleRequest = req.body.title;
    connection.query(`INSERT INTO notes (title, body) VALUES ("${noteTitleRequest}", "${noteBodyRequest}")`, function(err, data){
        if (err) throw err;
        res.json(data);

    });
});
app.get("/api/deletenotes/:id",function(req,res){
    let idinfo = req.params.id
    connection.query("DELETE FROM notes WHERE id =" + idinfo, function(err, data){
        if (err) throw err;
        res.json(data)
    });
});


app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/assets/html/index.html"));
});
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/assets/html/notes.html"));
});
// ("#savenotes").on("click", function(){
//     event.preventDefault();
//     ("#noteTitle").val().trim(),
//     ("#noteText").val().trim()
// });
















// ("#add-btn").on("click", function(event) {
//     event.preventDefault();
//     var note = {
//       NoteTitle: app.get("#noteText").val().trim(),
//       noteText: app.get("#noteTitle").val().trim(),
//     };

//     app.post("/api/new", newCharacter)
//       .done(function(data) {
//         console.log("add.html", data);
//         alert("Adding character...");
//       });
//   });


// Start server toe
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

