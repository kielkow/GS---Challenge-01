const express = require('express')

const routes = express.Router()

const projects = []
let requests = 0

//Check if id´s project exists
function checkIdExists(req, res, next){
  projects.forEach(project => {
    if(project.id === req.params.id){
      return next()
    }
  });
  return res.json({message : 'Project not found'})
}

//Get all requests made
routes.use((req, res, next) => {
  next()
  console.log(requests)
})

//Create project
routes.post('/projects', (req, res) => {
  requests++
  projects.push(req.body)
  return res.status(201).json(projects)
})

//Show all projects
routes.get('/projects', (req, res) => {
  requests++
  return res.json(projects)
})

//Edit tittle project
routes.put('/projects/:id', checkIdExists, (req, res) => {
  requests++
  const { title } = req.body
  projects.map((project) => {
    if(project.id === req.params.id){
      project.title = title
      return res.json(projects)
    }
  })
})

//Delete project
routes.delete('/projects/:id', checkIdExists, (req, res) => {
  requests++
  const { id } = req.params
  projects.map((project) => {
    if(project.id === id){
      projects.splice(projects.indexOf(project), 1)
      return res.json(projects)
    }
  })
})

//Edit task´s project
routes.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  requests++
  projects.map((project) => {
    if(project.id === req.params.id){
      project.tasks.push(req.body.title)
      return res.json(projects)
    }
  })

})

//Consult project
routes.get('/projects/:id', checkIdExists, (req, res) => {
  requests++
  const project = projects.filter(project => project.id === req.params.id)
  return res.json(project)
})

module.exports = routes