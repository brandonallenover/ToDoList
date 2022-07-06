import { ObjectId } from "mongoose"

export class Todo {
  content:String = ''
  completed:Boolean = false
  timeStamp: Date = new Date()
  _id: String = ''
}
