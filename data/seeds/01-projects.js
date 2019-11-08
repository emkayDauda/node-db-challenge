
exports.seed = function(knex) {
  return knex('projects').insert([
    { project_name: 'Biology', description: 'Study of life', completed: false },
    { project_name: 'Chemistry', completed: true },
    { project_name: 'Physics', completed: false }
  ]);
};
