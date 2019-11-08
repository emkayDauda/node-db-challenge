exports.up = function(knex) {
  return knex.schema
    .createTable("projects", table => {
      table.increments("project_id");

      table.string("project_name", 128).notNullable();
      table.string("description", 128);

      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("resources", table => {
      table.increments("resource_id");

      table
        .string("resource_name", 128)
        .notNullable()
        .unique();
      table.string("description", 128);
    })
    .createTable("tasks", table => {
      table.increments("task_id");

      table
        .integer("project_id")
        .notNullable()
        .unsigned()
        .references("project_id")
        .inTable("projects");

      table.string("description", 128).notNullable();
      table.string("notes");

      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("projects_resource", table => {
      table.increments("pr_id");

      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("project_id")
        .inTable("projects");

      table
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resource_id")
        .inTable("resources");
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("projects_resource")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
