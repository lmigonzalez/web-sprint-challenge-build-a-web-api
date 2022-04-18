// Write your "projects" router here!

const express = require('express');

const {validateUserId, validateProject, validateProjectPut, ensureHubIdExists}=require('./projects-middleware')

const Project = require('./projects-model.js')


const router = express.Router();
router.use(express.json())



router.get('/', (req, res, next) =>{
	Project.get()
	.then(projects =>{
		res.status(200).json(projects)
	})
	.catch(()=>{
		console.log('from err')
		next()
	})

	// res.status(201).send(Projects)
})

router.get('/:id', validateUserId,(req, res, next)=>{
	res.json(req.existingProjects)
})


router.post('/', validateProject, (req, res, next) => {
	console.log(req.newProject)
	Project.insert(req.newProject)
	  .then(projects => {
		res.status(201).json(projects);
	  })
	  .catch(error => next({ error }));
  });

  router.put('/:id', validateUserId, validateProjectPut, (req, res, next) => {

	Project.update(req.params.id, req.newProject)
	///not okay!!
	.then((project)=>{
		res.status(400).json(project)
	  
	})
	
	.catch(() =>{
		res.status(400).json({message: 'body need completed'})
		next()
	})
  });

  router.delete('/:id', validateUserId, (req, res, next) => {
	Project.remove(req.existingProjects.id)
	  .then(() => {
		res.status(200).json(req.existingProjects);
	  })
	  .catch(error => next({ error }));
  });


  
  router.get('/:id/actions', ensureHubIdExists, (req, res, next) => {
	//   const actionsInf = {...req.body, project_id: req.params.id}
	Project.getProjectActions(req.params.id)
	  .then((action)=> {
		res.status(201).json(action);
	  })
	  .catch(error => next({ error }));
  });


module.exports = router;