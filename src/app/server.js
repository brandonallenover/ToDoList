const express = require('express')
const mongo = require('mongoose')
const Todo = require('./models/Todo')
const cors = require('cors')

const db = mongo.connect('mongodb+srv://todos:root@messagingapp.vnbtf.mongodb.net/?retryWrites=true&w=majority', (err, response) => {
  if(err) console.log(err)
  else console.log('connected to db')
})
console.log(db)

const app = express()

app.use(express.static('public'))
app.use(express.json())

app.use(cors({
  origin : 'http://localhost:4200'
}))




//get all entries
app.get('/api', async (req,res) => {
  res.send(await Todo.find())
})

//post
app.post('/api', async (req,res) => {
  var model = new Todo({
    content: req.body.content,
    completed: req.body.completed,
    timeStamp: new Date(req.body.timeStamp)
  })
  await model.save()
  res.send({data:'item has been addelo'})
})

//update
app.put('/api', async (req,res) => {
  var model = new Todo(req.body)
  await Todo.findByIdAndDelete(model._id)
  //await Todo.deleteOne({content: model.content})
  await model.save()
  res.send({data:'item has been updated'})
})

//delete
app.delete('/api/:content', async (req,res) => {
  //await Todo.deleteOne({content: req.params.content})
  await Todo.findByIdAndDelete(req.params.content)
  res.send({data:'item has been deleted'})
})

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on ${port}`))
