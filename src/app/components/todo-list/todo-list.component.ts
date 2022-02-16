import { Component, OnInit } from '@angular/core';

import { TodoModel } from 'src/app/providers/todo.states';
import { todosSelector } from 'src/app/providers/todos.reducers';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todoListSubject.subscribe((todos) => {
      this.todos = todos;
    });
  }
}
