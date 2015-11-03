(function (notesController) {
    
    var data = require("../data");
    var auth = require("../auth");
    
    notesController.init = function (app) {
        
        app.get("/api/notes/:categoryName", auth.ensureApiAuthenticated,
            function (req, res) {
            var categoryName = req.params.categoryName;
            
            data.getNotes(categoryName, function (err, notes) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(notes.notes);
                }
            });
        });
        
        app.post("/api/notes/:categoryName", auth.ensureApiAuthenticated,
            function (req, res) {
            var categoryName = req.params.categoryName;
            var noteToInsert = {
                note: req.body.note,
                color: req.body.color,
                author: "Jomit"
            };
            
            data.addNote(categoryName, noteToInsert, function (err) {
                if (err) {
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(201, noteToInsert);
                }
            });
        });
    };
	
})(module.exports);