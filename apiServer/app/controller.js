const Model = require("./model.js");
const fetch = require('node-fetch');
const fs = require('fs');

// Retrieve all Tutorials from the database (with condition).
exports.findAll = async (req, res) => {
    
    // get markdown from github   
    // const contents = await fetch('https://raw.githubusercontent.com/bcgov/digital.gov.bc.ca/markdown-flow/react-frontend/content/about.md')
    //     .then(res => res.text()).then(data => {
    //         return data;
    //         // console.log(data);
    //     }).catch(err => console.log('fetch error', err));
    

    // let contents = await getContents();

    // res.send({'contents':contents});

    // const title = req.query.title;
  
    Model.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving data."
        });
      else res.send(data);
    });
  };

  async function updateItem(element){
    console.log('updateItem: ', element)
    const contents = await fetch(element.content_address)
    .then(res => res.text()).then(contentResponse => {
        // return data;
        // console.log(data);
        Model.updateContentById(element.id,contentResponse, (err,updateRes)=>{
            // res.send({"error":err,"updateResponse":updateRes})
        })
    }).catch(err => console.log('fetch error', err));
  }

  exports.update = async (req, res) => {
    
    // // get markdown from github   
    // const contents = await fetch('https://raw.githubusercontent.com/bcgov/digital.gov.bc.ca/markdown-flow/react-frontend/content/about.md')
    //     .then(res => res.text()).then(data => {
    //         return data;
    //         // console.log(data);
    //     }).catch(err => console.log('fetch error', err));
    

    // // let contents = await getContents();

    // res.send({'contents':contents});

    // const title = req.query.title;
    console.log('current directory: ',  process.cwd())

    // POPULATE TABLE
    fs.readFile('app/content-config.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const contentConfig = JSON.parse(data).content;
      
      
        
          contentConfig.forEach(element => {
              Model.findByName(element.name,async (err,data)=>{
                  console.log('byName result', err,data)
                  if (data==null){
                      Model.create(element, (err,data)=>{
                          console.log('insert result: ', err, data)
                          updateItem(data)
                      })
                  }else{
                      // already have this item - skip
                      updateItem(data)
                  }
                  

              })
              
          }); 
      
          // const d = Model.getAll((err, data) => {
          //     if (err){
          //         console.log(err)
          //         return
          //         // res.status(500).send({
          //         //     message:
          //         //     err.message || "Some error occurred while retrieving data."
          //         // });
          //     }else{ 
          //         console.log('existing: ')
          //         console.log(data);
          //         console.log("contentConfig: ")
          //         console.log(contentConfig)
                 
          //         return data
          //         //res.send(data);
          //     }
          // });
      });
      
    console.log('insert done, doing update..')
    // UPDATE ENTRIES
    Model.getAll((err, data) => {
      if (err){
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving data."
            });
        }else{
            console.log('data to update: ',data)
            // res.send(data);
            data.forEach(async element => {
                    
            })
            res.send({"status":"done"});
        }
    });


  };

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   // Create a Tutorial
//   const tutorial = new Tutorial({
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published || false
//   });

//   // Save Tutorial in the database
//   Tutorial.create(tutorial, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     else res.send(data);
//   });
// };


// // Find a single Tutorial by Id
exports.findOneByName = (req, res) => {
  Model.findByName(req.params.name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving content with name " + req.params.name
        });
      }
    } else res.send(data);
  });
};

// // find all published Tutorials
// exports.findAllPublished = (req, res) => {
//   Tutorial.getAllPublished((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     else res.send(data);
//   });
// };

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//   }

//   console.log(req.body);

//   Tutorial.updateById(
//     req.params.id,
//     new Tutorial(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found Tutorial with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error updating Tutorial with id " + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   Tutorial.remove(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Tutorial with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Tutorial with id " + req.params.id
//         });
//       }
//     } else res.send({ message: `Tutorial was deleted successfully!` });
//   });
// };

// // Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    console.log('controller.deleteAll')
  Model.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all contents."
      });
    else res.send({ message: `All contents were deleted successfully!` });
  });
};