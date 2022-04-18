// Write your "actions" router here!
const express = require('express');

//for middleware
const {validateUserId, validateAction, validateProjectPut, validateActionDelete} = require('./actions-middlware')

const Action = require('./actions-model.js')

const router = express.Router();
router.use(express.json())


router.get('/', (req, res, next) =>{
	Action.get()
	.then(actions =>{
		res.status(200).json(actions)
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

router.post('/', validateAction, (req, res, next) => {
	
	Action.insert(req.newAction)
	  .then(actions => {
		res.status(201).json(actions);
	  })
	  .catch(error => next({ error }));
  });

  router.put('/:id', validateUserId, validateProjectPut, (req, res, next) => {

	Action.update(req.params.id, req.newAction)
	///not okay!!
	.then((actions)=>{
		res.status(400).json(actions)
	  
	})
	
	.catch(() =>{
		res.status(400).json({message: 'body need completed'})
		next()
	})
  });


  router.delete('/:id', validateActionDelete, (req, res, next) => {
	Action.remove(req.existingAction.id)
	  .then(() => {
		res.status(200).json(req.existingAction);
	  })
	  .catch(error => next({ error }));
  });



module.exports = router;