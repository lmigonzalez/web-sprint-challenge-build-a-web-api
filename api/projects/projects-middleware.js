// add middlewares here related to projects

const Project = require("./projects-model");


function validateProject(req, res, next){
	// in httpie, send numbers with key:=value
	
	if (!req.body.name ||!req.body.description) {
		res.status(400).json([]);
		return;
	}

	else{
		req.newProject = req.body;
		next();
	}

	
	
}


function validateProjectPut(req, res, next){
	// in httpie, send numbers with key:=value
	
	if (req.body.name || req.body.description || req.body.completed) {
		req.newProject = req.body;
		next()
	}
	
	else{
		res.status(400).json({message: 'something went wrong'})
	}

	
	
}



function validateUserId(req, res, next) {

  Project.get(req.params.id)
    .then((projects) => {
      if (!projects) {
        res.status(404).json({
          message: "project not found",
        });
      } else {
        req.existingProjects = projects;
        next();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "problem finding project",
      });
    });
}


function ensureHubIdExists(req, res, next) {
	Project.getProjectActions(req.params.id)
		.then(projects => {
			if (projects) {
				req.existingProjects = projects;
				next();
			} else {
				res.status(404).json({ message: 'Hub not found' });
			}
		})
		.catch(error => {
			// log error to server
			console.log(error);
			res.status(500).json({
				message: 'Error retrieving the hub',
			});
		});
}




module.exports = {
  validateUserId,
  validateProject,
  validateProjectPut,
  ensureHubIdExists,

};
