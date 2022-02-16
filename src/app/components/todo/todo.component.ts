import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from 'src/app/services/models/UserModel';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  loading = false;
  users!: any;

  constructor() {}

  ngOnInit(): void {}
}
