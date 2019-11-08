const db = require('../data/dbConfig')

function getProjects(id) {
    let query = db('projects as p')

    if (id) {
        query.where('p.project_id', id).first()
    }

    return query;
}

function add(project) {
    return db('projects')
    .insert(project)
    .then(([id]) => id ? this.getProjects(id) : null)
}

module.exports = {
    getProjects,
    add,
}