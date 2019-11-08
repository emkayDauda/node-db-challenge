const db = require('../data/dbConfig')

function getResources(id) {
    let query = db('resources as r')

    if(id) query.where('r.resource_id', id)

    return query
}

function insert(resource) {
    return db('resources')
    .insert(resource)
    .then(([id]) => getResources(id))
}

module.exports = {
    getResources,
    insert,
}