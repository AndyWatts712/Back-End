exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");

<<<<<<< HEAD
exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
        table.increments('id')

        table.string('username', 56).notNullable()
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
        //Timestamps indicate when resource was created and updated
        table.timestamps()
=======
      table.string("username", 56).notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      //Timestamps indicate when resource was created and updated
      table.timestamps();
>>>>>>> ef354f1921e0d590756e5d979ef9a13d9328c2bc
    })
    .createTable("listType", (table) => {
      table.increments("id");

      table.string("name").notNullable().unique();
    })
    .createTable("lists", (table) => {
      table.increments("id");

      table.string("name").notNullable();
      //FK to identify listType
      table
        .integer("type_id")
        .notNullable()
        .unsigned()
        .references("listType.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      //FK to identify User
      table
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("users.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("items", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.boolean("completed").notNullable().defaultTo(false);
      table.date("complete_by");
      //FK to identify which list item belongs to
      table
        .integer("list_id")
        .notNullable()
        .unsigned()
        .references("lists.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      //Timestamps indicate when resource was created and updated
      table.timestamps();
    })
    .createTable("deleted_items", (table) => {
      table.increments("id");
      table.string("name").notNullable();
      table.date("expires_on").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("items")
    .dropTableIfExists("lists")
    .dropTableIfExists("listType")
    .dropTableIfExists("users");
};
