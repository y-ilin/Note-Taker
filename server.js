// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

////// Require data

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

app.get("/api/notes", function(req, res) {
    return res.json(db.json);
});

// app.post("/api/notes", function(req, res) {
//     console.log(req.body);
//     db.json.push(req.body);
//     console.log(db.json);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
