const express = require('express');

// const { ensureProjectExists } = require('./projects/projects-middleware')
const server = express();
server.use(express.json())


// const userRouter = require('./actions/actions-router')

const actionRouter = require('./actions/actions-router.js')
const projectRouter = require('./projects/projects-router.js')


server.use('/api/projects', projectRouter);

server.use('/api/actions', actionRouter);

server.use('*', (req, res) => {
	// catch all 404 errors middleware
	res.status(404).json({ message: `not found! *` });
  });

module.exports = server;

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!