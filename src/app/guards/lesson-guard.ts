import { CanDeactivateFn } from '@angular/router';

export const lessonGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
