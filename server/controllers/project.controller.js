const Project = require('../models/project.model');

module.exports.findAllProjectsInBackLog = (req, res) => {
    Project.find({status:"backlog"}).sort({"due_date": 1})
    .then((allProjects) => {
        res.json({ projects: allProjects })
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.findAllProjectsInProgress = (req, res) => {
    Project.find({status: "in_progress"}).sort({"due_date": 1})
    .then((allProjectsInProgress) => {
        res.json({ projects: allProjectsInProgress })
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.findAllProjectsCompleted = (req, res) => {
    Project.find({status: "completed"}).sort({"due_date": 1})
    .then((allProjectsCompleted) => {
        res.json({ projects: allProjectsCompleted })
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.findProject = (req, res) => {
    Project.findOne({ _id: req.params.id })
    .then(oneProject => {
        res.json({ project: oneProject })
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.checkName = (req, res) => {
    Project.find({p_name: req.params.pname})
    .then((validatedName) => {
        res.json({ project: validatedName,
        message: 'Name is already in database' })
    })
    .catch((err) => {
        res.json({ message: 'Something went wrong', error: err })
    });
}

module.exports.createProject = (req,res) => {
    Project.create(req.body)
    .then(Project => res.json(Project))
    .catch(err => res.json(err));
}

module.exports.updateProject = (req, res) => {
    Project.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(updatedProject => res.json(updatedProject))
        .catch(err => res.json(err))
}

module.exports.deleteProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id }) //note: "id" here MUST match id in corresponding route
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}
