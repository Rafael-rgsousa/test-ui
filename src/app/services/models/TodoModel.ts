export class TodoModel {
  id!: number;

  title!: string;

  description?: string;

  completed?: boolean;

  constructor(params?: Partial<TodoModel>) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
