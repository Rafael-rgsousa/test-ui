import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from 'src/app/providers/todo.actions';
import { TodoModel } from 'src/app/providers/todo.states';
import { TodoService } from 'src/app/services/todo/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo?: TodoModel;
  public editTodo: boolean = false;
  todoInput?: string;
  completeTodo: boolean = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoInput = this.todo!.title;
    this.completeTodo = this.todo!.completed;
  }

  updateToggle() {
    this.editTodo = !this.editTodo;
  }

  updateTodo() {
    this.editTodo = !this.editTodo;

    if (this.todo && this.todoInput) {
      this.todo.title = this.todoInput;

      this.todoService.update({
        ...this.todo,
      });
    }
  }

  deleteTodo() {
    this.todoService.delete(this.todo!.id);
  }

  completeToggle() {
    this.completeTodo = !this.completeTodo;

    if (this.todo && this.todoInput) {
      this.todo.completed = this.completeTodo;

      this.todoService.update({
        ...this.todo,
      });

      this.editTodo = false;
    }
  }
}
