(function (homeController) {
    var data = require("../data");
    var auth = require("../auth");
    
    homeController.init = function (app) {
        app.get("/", function (request, response) {
            
            data.getNoteCategories(function (err, results) {
                response.render("index", 
                    {
                    title : "The Board",
                    error: err,
                    categories: results,
                    createCategoryError: request.flash("createCategoryError"),
                    user: request.user  //password middleware adds the user object in each request
                });
            });
        });
        
        app.get("/notes/:categoryName",
            auth.ensureAuthenticated,
            function (req, res) {
                var categoryName = req.body.categoryName;
                res.render("notes", {
                    title: categoryName, 
                    user: req.user
            });
        });
        
        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;
            
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    console.log(err);
                    req.flash("createCategoryError", err); //connect-flash package
                    res.redirect("/");
                } else {
                    res.redirect("/notes/" + categoryName);
                }
            });

        });
    }
})(module.exports);