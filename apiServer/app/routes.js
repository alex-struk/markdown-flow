module.exports = app => {
    const controller = require("./controller.js");
  
    var router = require("express").Router();
  
    // // Create a new Tutorial
    // router.post("/", tutorials.create);
  
    // Retrieve all Tutorials
    router.get("/", controller.findAll);
  
    router.get("/update", controller.update);

    // // Delete all Tutorials
    router.get("/delete", controller.deleteAll);
    
    router.get("/:name", controller.findOneByName);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);
  
    
  
    app.use('/api/content', router);
  };