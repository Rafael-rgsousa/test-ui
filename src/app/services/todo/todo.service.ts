import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../auth/authentication.service';
import { TodoModel } from '../models/TodoModel';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todoListSubject: BehaviorSubject<any>;

  private bashPath = `${environment.apiUrl}/todos`;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthenticationService
  ) {
    this.authService.currentUserSubject.subscribe((user) => {
      if (user && user.authdata) {
        // debugger
        console.log(user);
        this.getAll();
      }
    });

    this.todoListSubject = new BehaviorSubject([]);
  }

  public getAll() {
    return this.httpClient.get(this.bashPath).subscribe((todos: any) => {
      this.todoListSubject.next(todos);
    });
  }

  public create(todo: TodoModel) {
    return this.httpClient
      .post(this.bashPath, todo)
      .subscribe(() => this.getAll());
  }

  public update(todo: TodoModel) {
    return this.httpClient
      .patch(`${this.bashPath}/${todo.id}`, todo)
      .subscribe(() => this.getAll());
  }

  public delete(id: number) {
    return this.httpClient
      .delete(`${this.bashPath}/${id}`)
      .subscribe(() => this.getAll());
  }
}
