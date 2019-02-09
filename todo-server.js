const express = require('express')
const path= require('path')
const app = express();
let tasks=[];
app.use(express.urlencoded({
    extended: true
  }))
  app.use(express.json())
  app.get('/tasks',(req,res)=>{
      res.send(tasks)
  })
  app.post('/tasks',(req,res)=>{
     if (typeof req.body.done === 'string') {
        req.body.done = (req.body.done == 'true')
      }
      console.log(req.body)
      tasks.push(
          req.body
      )
      res.status(200).send({
          success:true,
          id:tasks.length-1
      })
  })

  app.get('/tasks/:id',(req,res)=>{
      let taskid= parseInt(req.params.id)
      res.send(tasks[taskid])
  })
  
  app.patch('/tasks/:id',(req,res)=>{
    let taskId = parseInt(req.params.id)
    if (typeof req.body.done === 'string') {
      req.body.done = (req.body.done == 'true')
    }
    if(!tasks[taskId]){
        res.status(404).send({
            message: "NOT FOUND"
        })
        return ;
    }
    if(req.body.name)
     tasks[taskId].name=req.body.name;
    tasks[taskId].done=req.body.done;
    res.status(202).send({
        success: true
      })

  })

  app.put('/tasks/:id',(req,res)=>{
    let taskid= parseInt(req.params.id)
    if (typeof req.body.done === 'string') {
        req.body.done = (req.body.done == 'true')
      }
    tasks[taskid]=req.body;
    res.status(201).send({
    success : true
    })

  })
  app.use('/', express.static(
    path.join(__dirname, 'public')
  ))
  app.listen(4567, () => {
    console.log("Started on http://localhost:4567")
  })