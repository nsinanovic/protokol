import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../todos/todo';
import { TodoService } from '../todos/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodoListComponent implements OnInit {
  todo$: Observable<Todo[]>;

  constructor(private todos: TodoService) { }

  ngOnInit() {
    this.todo$ = this.todos.getTodos();
  }
}
