var fs = require("fs").promises;

module.exports = function(app) {
  app.get("/api/notes", async function(req, res) {
    try {
      let savedNotes = await fs.readFile("db/db.json", "utf8");
      let arrNotes = savedNotes.length > 0 ? JSON.parse(savedNotes) : [];
      res.json(arrNotes);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  app.post("/api/notes", async function(req, res) {
    try {
      const newNote = req.body || {};
      let savedNotes = await fs.readFile("db/db.json", "utf8");
      let arrNotes = savedNotes.length > 0 ? JSON.parse(savedNotes) : [];
      let notesId = [];
      arrNotes.forEach(objNotes => {
        if (!notesId.includes(objNotes.id) && objNotes.hasOwnProperty("id")) {
          notesId.push(objNotes.id);
        }
      });
      newNote.id = notesId.length > 0 ? Math.max(...notesId) + 1 : 1;
      arrNotes.push(newNote);
      fs.writeFile("db/db.json", JSON.stringify(arrNotes), "utf8");
      res.json(arrNotes);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  app.delete("/api/notes/:id", async function(req, res) {
    try {
      let noteId = req.params.id;
      let savedNotes = await fs.readFile("db/db.json", "utf8");
      let arrNotes = savedNotes.length > 0 ? JSON.parse(savedNotes) : [];
      let newArrNotes = arrNotes.filter(objNotes => objNotes.id != noteId);
      fs.writeFile("db/db.json", JSON.stringify(newArrNotes), "utf8");
      res.json(newArrNotes);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });
};
