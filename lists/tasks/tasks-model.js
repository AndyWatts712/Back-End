const db = require("../../database/dbConfig.js");

module.exports = {
  find,
  add,
  findById,
  update,
  remove,
};

function find(listid) {
  return db("items as i")
    .join("lists as l", "l.id", "=", "i.list_id")
    .select("i.*", "l.name as listName")
    .where({ "i.list_id": listid })
    .orderBy("i.id");
}

async function add(item) {
  try {
    const [id] = await db("items").insert(item, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function update(id, updated) {
  return db("items")
    .where({ id })
    .update(updated)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("items").where("id", id).del();
}

function findById(id) {
  return db("items as i")
    .join("lists as l", "l.id", "=", "i.list_id")
    .select("i.*", "l.name as listName")
    .where({ "i.id": id })
    .first();
}
