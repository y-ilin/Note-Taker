// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

// Require data of existing notes from db.json
const data = require("./db/db.json");

// Set up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// app.get("/notes", function(req, res) {
//     res.sendFile(path.join(__dirname, "public", "notes.html"));
// });
// app.get("*", function(_, res) {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// API Routes
// =============================================================

// Get all notes
app.get("/api/notes", function(req, res) {
    return res.json(data);
});

// Create new note
app.post("/api/notes", function(req, res) {
    const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
    }

    // Add new note to "data" array and re-write the db.json file
    data.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(data), function(error) {
        if (error) {
            return console.log(error)
        }
        console.log("Successfully written to database");
        res.send("Was successful!");
    })
});

// Delete note
app.delete("/api/notes/:id", function(req, res) {
    // Find the note with the id that matches the post request
    let deleteIndex = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === req.params.id) {
            deleteIndex = i;
        }
    }
    
    // Delete the note from the data array and re-write the db
    data.splice(deleteIndex, 1);
    fs.writeFile("./db/db.json", JSON.stringify(data), function(error) {
        if (error) {
            return console.log(error);
        }
        console.log("Successfully written to database");
        res.send("Was successful!");
    })
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
