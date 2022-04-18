// add middlewares here related to actions

const Actions = require("./actions-model");


function validateAction(req, res, next){
	// in httpie, send numbers with key:=value
	
	if (!req.body.notes ||!req.body.description || !req.body.notes) {
		res.status(400).json([]);
		return;
	}

	else{
		req.newAction = req.body;
		next();
	}

	
	
}

function validateActionDelete(req, res, next) {

	Actions.get(req.params.id)
	  .then((action) => {
		if (!action) {
		  res.status(404).json({
			message: "project not found",
		  });
		} else {
		  req.existingAction = action;
		  next();
		}
	  })
	  .catch((err) => {
		res.status(500).json({
		  message: "problem finding project",
		});
	  });
  }


function validateProjectPut(req, res, next){
	// in httpie, send numbers with key:=value
	
	if (req.body.name || req.body.description || req.body.completed) {
		req.newAction = req.body;
		next()
	}
	
	else{
		res.status(400).json({message: 'something went wrong'})
	}

	
	
}



function validateUserId(req, res, next) {

  Actions.get(req.params.id)
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
	Actions.getProjectActions(req.params.id)
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
  validateAction,
  validateProjectPut,
  ensureHubIdExists,
  validateActionDelete

};
