
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())

//if you server report this error:Error: listen EADDRINUSE: address already in use :::4000(Open powersheel with admin permission and put this line on comand prompt -- taskkill /F /IM node.exe -- )

const id = uuidv4()

const projects = [
"ola mundo"
]



app.get('/projects',(request,response)=>{
    
    return response.json(projects)
})

//query params

app.post('/projects',(request,response)=>{
    
    const {name,owner} = request.body
    const project = {
        id: uuidv4(),
        name,
        owner
    }
    projects.push(project)
    return response.status(201).json(project)

})

app.put('/projects/:id/',(request,response)=>{
    
    const {id} = request.params
    const {name,owner} = request.body
    
   const projectIndex = projects.findIndex( e => e.id  ===  id)

   if(projectIndex < 0){
    return response.status(404).json({error:'Project not Found'})
   }

   if(!name || !owner){
    return response.status(400).json({error:'name and owner is required'})
   }

   const project = {
    id,
    name,
    owner
}

projects[projectIndex] = project


    return response.json(project)
})

app.delete('/projects/:id',(request,response)=>{
    
    const {id} = request.params

    const projectIndex = projects.findIndex( e => e.id  ===  id)

    if(projectIndex < 0){
     return response.status(404).json({error:'Project not Found'})
    }

    projects.splice(projectIndex,1)
    
    return response.status(204).send()
})




app.listen(4000,()=>{

        console.log('server is Works on port 4000')
})