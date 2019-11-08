
exports.seed = function(knex) {
  return knex('tasks').insert([
    { project_id: 1, description: 'Prepare mentally', completed: true},
    { project_id: 1, description: 'Perform', notes: 'Put in the work', completed: false},
    { project_id: 1, description: 'Review', completed: false}
  ]);
};
