import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { actions } from './todo.actions';
import { TodoModel, todos } from './todo.states';

export const todoReducer = createReducer(
  todos,
  on(actions.addTodoAction, (state, payload) => {
    return [...state, payload];
  }),
  on(actions.updateTodoAction, (state, payload) => {
    let tempTodoIndex = state.findIndex((t) => t.id === payload.id);

    const tempStates = [...state];

    if (tempTodoIndex !== -1) {
      tempStates[tempTodoIndex] = payload;
    }

    return [...tempStates];
  }),
  on(actions.deleteTodoAction, (state, payload) => {
    const todos = state.filter((t) => t.id !== payload.id);

    return [...todos];
  })
);

export const todosSelector = createSelector(
  createFeatureSelector('todos'),
  (state: TodoModel[]) => state
);
