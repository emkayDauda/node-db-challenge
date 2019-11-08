const db = require('../data/dbConfig')

function getResources(id) {
    let query = db('resources as r')

    if(id) query.where('r.resource_id', id)

    return query
}

function getProjectResources(project_id) {
    return db('projects_resource as pr')
    .join('resources as r', 'pr.resource_id', 'r.resource_id' )
    .where('project_id', project_id)
    .select('r.resource_id', 'r.resource_name', 'r.description')
}

function addResourceToProject(project_id, resource_id) {
    return db('projects_resource')
    .insert({project_id, resource_id})
    .then((_id) => this.getProjectResources(project_id))
}

function insert(resource) {
    return db('resources')
    .insert(resource)
    .then(([id]) => getResources(id))
}

module.exports = {
    getResources,
    insert,
    getProjectResources,
    addResourceToProject,
}