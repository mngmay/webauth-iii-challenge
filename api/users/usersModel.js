const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  findBy
};

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findBy(filter) {
  return db("users").where(filter);
}

// async because we are both inserting to the table, and calling a query to return user object.
async function add(user) {
  // destructure id from user object to use in findById query
  const [id] = await db("users").insert(user);

  return findById(id);
}
