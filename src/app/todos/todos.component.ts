import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { TodosService } from '../todos.service';
import { Todo } from './../models/Todo'
import { ObjectId } from "mongoose"
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[] = []

  inputTodo: string = ''

  result: Todo[] = []

  constructor(private todosService:TodosService) { }

  async ngOnInit() {
    await this.update()
  }

  async update () {
    await this.todosService.getAllTodos()
    .subscribe(data => this.todos = data)
    setTimeout(() => {
      this.todos.sort((a:Todo,b:Todo) => {
        return a.timeStamp > b.timeStamp ? 1 : b.timeStamp > a.timeStamp ? -1 : 0
      })
    },50)
  }

  async toggleDone (target : number) {
    this.todos[target].completed = !this.todos[target].completed
    await this.todosService.updateTodo(this.todos[target])
  }

  async deleteTodo (target : number) {
    const targetTodo:Todo = this.todos[target]
    this.todos = this.todos.filter((v,i) => i != target)
    await this.todosService.deleteTodo(targetTodo)
  }

  async addTodo () {
    if (this.inputTodo != ''){
      this.todos = this.prepend(this.todos, {
        content: this.inputTodo,
        completed:false,
        timeStamp: new Date(),
        _id : ''
      })
      await this.todosService.addTodo({
        content: this.inputTodo,
        completed: false,
        timeStamp: new Date(),
        _id : ''
      })
      this.inputTodo = ''
    }
  }
  //helper function
  prepend (arr : Todo[], el : Todo): Todo[] {
    let newArr = arr.slice()
    newArr.unshift(el)
    return newArr
  }
}
