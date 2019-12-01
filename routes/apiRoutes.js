var fs = require("fs").promises;

module.exports = function(app) {
  app.get("/api/notes", async function(req, res) {
    try {
      let savedNotes = await fs.readFile("db/db.json", "utf8");
      let objNotes = JSON.parse(savedNotes);
      res.json(objNotes);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  });

  app.post("/api/notes", function(req, res) {
    console.log(req.body);
    const newNote = req.body || {};
  });

  app.delete("/api/notes/:id", function(req, res) {});
};
