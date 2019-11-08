
exports.seed = function(knex) {
  return knex('resources').insert([
    { resource_name: 'Human'},
    { resource_name: 'Intern'},
    { resource_name: 'Money', description: 'Never gets too much'}
  ]);
};
