import {InjectionToken} from "@angular/core";

export const defaultErrors = {
  required: (error: string) => `This field is required`,
  email: (error: string) => `Email is not valid`,
  password: ({requiredLength, actualLength}: { requiredLength: string, actualLength: string }) =>
      `Expect ${requiredLength} but got ${actualLength}`,
  pattern: (error: string) => `Email should has 1 letter and 1 number`,
  minlength: ({ requiredLength, actualLength }: { requiredLength: string, actualLength: string }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
