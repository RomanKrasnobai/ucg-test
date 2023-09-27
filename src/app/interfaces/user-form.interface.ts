import {FormControl} from "@angular/forms";

export interface UserForm {
  username: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  type: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
