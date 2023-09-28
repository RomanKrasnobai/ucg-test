import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, EventEmitter, inject,
  OnInit, Output,
} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserForm} from "../../../interfaces/user-form.interface";
import {AsyncPipe, NgForOf} from "@angular/common";
import {User} from "../../../interfaces/user.interface";
import {UserService} from "../../../services/user.service";
import {filter, takeUntil} from "rxjs";
import {OnDestroyService} from "../../../services/on-destroy.service";
import {RouterLink} from "@angular/router";
import {ControlErrorComponent} from "../../../shared-components/control-error/control-error.component";
import {ControlErrorsDirective} from "../../../directives/control-errors.directive";
import {ControlErrorContainerDirective} from "../../../directives/control-error-container.directive";
import {FormSubmitDirective} from "../../../directives/form-submit.directive";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    AsyncPipe,
    RouterLink,
    ControlErrorComponent,
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
  ]
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  selectOption = ['driver', 'administrator'];

  userService = inject(UserService);
  private onDestroyService = inject(OnDestroyService);
  private cd = inject(ChangeDetectorRef);

  @Output() saveUserForm: EventEmitter<User> = new EventEmitter<User>();
  @Output() removedUser: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit() {
   this.initForm();
    this.form.get('type')?.patchValue(this.selectOption[0]);

    this.userService.selectedUser$
      .pipe(
        filter((user: User | null): user is User => !!user),
        takeUntil(this.onDestroyService)
      )
      .subscribe((user: User) => {
        this.form.setValue(user);
        this.cd.detectChanges();
      })
  }

  saveForm(): void {
    if (this.form.valid) {
      this.saveUserForm.emit(this.form.getRawValue());
      this.form.reset();
      this.form.get('type')?.patchValue(this.selectOption[0]);
    }
  }

  removeUser() {
    this.removedUser.emit(this.form.getRawValue());
    this.form.reset();
    this.userService.selectedUser$.next(null);
    this.form.get('type')?.patchValue(this.selectOption[0]);
  }

  clearForm(): void {
    this.userService.selectedUser$.next(null);
  }

  changedOption(option: any): void {
    this.form.get('type')?.patchValue(option.target.value);
  }

  private initForm(): void {
    this.form = new FormGroup<UserForm>({
      username: new FormControl<string>('',
        { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }
      ),
      firstName: new FormControl<string>('',
        { nonNullable: true, validators: [Validators.required] }
      ),
      lastName: new FormControl<string>('',
        { nonNullable: true, validators: [Validators.required] }
      ),
      email: new FormControl<string>('',
        { nonNullable: true, validators: [Validators.email, Validators.required] }
      ),
      type: new FormControl<string>('',
        { nonNullable: true, validators: [Validators.required] }
      ),
      password: new FormControl<string>('',
        { nonNullable: true, validators: [
            Validators.minLength(8),
            Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
            Validators.required
          ] }
      ),
      repeatPassword: new FormControl<string>('',
        { nonNullable: true, validators: [Validators.required] }
      )}
    );
  }
}
