const db = require('../data/dbConfig')

function get(id) {
    let query = db('tasks as t')

    if (id) query.where('t.task_id', id).first()

    return query;
}

function getProjectTasks(id) {
    return db('tasks as t')
    .where('t.project_id', id)
}

function insert(task) {
    return db('tasks')
    .insert(task)
    .then(([id]) => this.get(id))
}

function remove(id){
    return db('tasks as t')
    .where('t.task_id', id)
    .del()
}

module.exports = {
    get,
    insert,
    getProjectTasks,
    remove
}