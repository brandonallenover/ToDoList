const  mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema ({
  content: {
    type:String,
    default:'empty content'
  },
  completed: {
    type:Boolean,
    default: false
  },
  timeStamp: {
    type: Date,
    default: new Date()
}
})

module.exports = mongoose.model('Todo',TodoSchema)
