import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ignoreElements } from 'rxjs';
import { actions } from 'src/app/providers/todo.actions';
import { TodoModel } from 'src/app/providers/todo.states';
import { todosSelector } from 'src/app/providers/todos.reducers';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
})
export class TodoInputComponent implements OnInit {
  todoInput?: string;
  todos?: TodoModel[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  addTodo() {
    if (this.todoInput) {
      const todo = {
        title: this.todoInput,
        completed: false,
        description: '',
      } as TodoModel;

      this.todoService.create(todo);

      this.todoInput = '';
    }
  }
}
