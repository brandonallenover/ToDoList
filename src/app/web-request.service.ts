import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TodosComponent } from './todos/todos.component'
import { Todo } from './models/Todo'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL: string = ''
  result = {}

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:8080/api'
  }
  get() : Observable<Todo[]>{
    //const req = this.http.get(this.ROOT_URL)
    //console.log(req.subscribe())
    //return this.http.get(this.ROOT_URL)
    //this.http.get<any>(this.ROOT_URL).subscribe(data => {
    //  this.result = data
    //})
    //return this.result
    return this.http.get<Todo[]>(this.ROOT_URL)

  }
  post(payload:Object){
    return this.http.post(this.ROOT_URL,payload)
  }
  patch(payload:Object){
    return this.http.put(this.ROOT_URL, payload)
  }
  delete(payload:Object){
    return this.http.delete(this.ROOT_URL + '/' + payload)
  }
}


