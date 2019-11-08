const db = require('../data/dbConfig')
const tasksDb = require('../tasks/tasksModel')
const resourcesDb = require('../resources/resourcesModel')

function getProjects(id) {
    let query = db('projects as p')

    if (id) {
        query.where('p.project_id', id).first()
        const tasks = tasksDb.getProjectTasks(id)

        const promises = [query, tasks, resourcesDb.getProjectResources(id)]

        return Promise.all(promises)
        .then(function(results){
            let [project, tasks, resources] = results;

            return {
                ...project, 
                tasks,
                resources,
            }
        })
    }

    return query;
}

function add(project) {
    return db('projects')
    .insert(project)
    .then(([id]) => id ? this.getProjects(id) : null)
}

function remove(id){
    return db('projects as p')
    .where('p.project_id', id)
    .del()
}

module.exports = {
    getProjects,
    add,
    remove,
}