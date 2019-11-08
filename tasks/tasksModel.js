const db = require('../data/dbConfig')

function get(id) {
    let query = db('tasks as t')

    if (id) query.where('t.task_id', id).first()

    return query;
}

function insert(task) {
    db('tasks')
    .insert(task)
    .then(([id]) => this.get(id))
}

module.exports = {
    get,
    insert,
}