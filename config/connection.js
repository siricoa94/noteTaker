var mysql = require("mysql");

var connection;

if (process.env.JAWSDB_URL) {
   connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Adriana98!",
    database: "notetaker_db"
  });
}

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

connection.config.typeCast = function(field, next) {
  if (field.type == "TINY" && field.length == 1) {
    return field.string() == "1"; // 1 = true, 0 = false
  }
  return next();
};
var note = {
  all: function(cb) {
    orm.all("notes", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("notes", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("notes", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("notes", condition, function(res) {
      cb(res);
    });
  }
};

module.exports = connection;