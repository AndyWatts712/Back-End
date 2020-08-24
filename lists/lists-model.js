const db = require("../database/dbConfig.js");

module.exports = {
    find,
    add,
    findById,
    update,
    remove
}

function find(userid) { 
    return db("lists as l")
        .join('listType as t', 'l.type_id', '=', 't.id')
        .join('users as u', 'u.id', '=', 'l.user_id')
        .select("l.id", "l.name", "t.name as type", "u.username")
        .where({'l.user_id': userid})
        .orderBy("l.id");
}

async function add(list) {
    try {
        const [id] = await db("lists")
                        .insert(list, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

function update(id, updated) {
    return db("lists")
        .where({ id })
        .update(updated)
        .then(() => {
            return findById(id)
        })
}

function remove(id) {
    return db("lists")
        .where("id", id)
        .del();
}

function findById(id) {
    return db("lists as l")
        .join('listType as t', 'l.type_id', '=', 't.id')
        .join('users as u', 'u.id', '=', 'l.user_id')
        .select("l.id", "l.name", "t.name as type", "u.username")
        .where({ 'l.id':id })
        .first();
}