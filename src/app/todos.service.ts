import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private webRequestService:WebRequestService) { }


  getAllTodos(){
    return this.webRequestService.get()
  }

  async addTodo(todo:Todo) {
    console.info(todo)
    return await this.webRequestService.post(todo).subscribe(data => console.log(data))
  }

  async deleteTodo(todo:Todo) {
    return await this.webRequestService.delete(todo._id).subscribe(data => console.log(data))
  }

  async updateTodo(todo:Todo) {
    return await this.webRequestService.patch(todo).subscribe(data => console.log(data))
  }
}



