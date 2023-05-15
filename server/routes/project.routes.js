const ProjectController = require('../controllers/project.controller');  //Import the code from Code Block 1
module.exports = (app) => {
    app.get('/api/allprojectsinbacklog', ProjectController.findAllProjectsInBackLog),
    app.get('/api/allprojectsinprogress', ProjectController.findAllProjectsInProgress)
    app.get('/api/allprojectscompleted', ProjectController.findAllProjectsCompleted)
    app.get('/api/checkname/:pname', ProjectController.checkName)
    app.patch('/api/editproject/:id', ProjectController.updateProject)
    app.post('/api/addproject', ProjectController.createProject),
    app.delete('/api/delete/:id', ProjectController.deleteProject)

}