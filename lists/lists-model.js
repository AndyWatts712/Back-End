const db = require("../database/dbConfig.js");

module.exports = {
    find
}

function find(userid) {
    return db("lists as l")
        .join('listType as t', 'l.type_id', '=', 't.id')
        .join('users as u', 'u.id', '=', 'l.user_id')
        .select("l.id", "l.name", "t.name")
        .where({'l.user_id': userid})
        .orderBy("l.id");
  }