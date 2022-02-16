export interface TodoModel {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
}

export const todos: TodoModel[] = [];
