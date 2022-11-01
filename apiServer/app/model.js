const sql = require("./db.js");

// constructor
const Model = function(model) {
  this.name = model.name;
  this.content_address = model.content_address;
  this.content = model.content;
};

Model.create = (newRecord, result) => {
  sql.query("INSERT INTO content SET ?", newRecord, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created content: ", { id: res.insertId, ...newRecord });
    result(null, { id: res.insertId, ...newRecord });
  });
};

Model.findByName = (name, result) => {
  sql.query(`SELECT * FROM content WHERE name = '${name}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
    //   console.log("found contentItem: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found content with the name
    result(null, null);
  });
};


// Tutorial.findById = (id, result) => {
//   sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

Model.getAll = ( result) => {
  let query = "SELECT * FROM content";


  sql.query(query, (err, res) => {
    if (err) {
    //   console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("tutorials: ", res);
    result(null, res);
  });
};

// Tutorial.getAllPublished = result => {
//   sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

Model.updateContentById = (id, content, result) => {
  sql.query(
    "UPDATE content SET content = ? WHERE id = ?",
    [content, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found content with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated content: ", { id: id });
      result(null, { id: id});
    }
  );
};



// Tutorial.remove = (id, result) => {
//   sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };

Model.removeAll = result => {
  sql.query("DELETE FROM content", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} content`);
    result(null, res);
  });
};

module.exports = Model;