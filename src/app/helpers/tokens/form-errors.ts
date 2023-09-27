import {InjectionToken} from "@angular/core";

export const defaultErrors = {
  required: (error: string) => `This field is required`,
  minlength: ({ requiredLength, actualLength }: { requiredLength: string, actualLength: string }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
