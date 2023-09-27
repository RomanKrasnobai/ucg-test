import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {TableComponent} from "../../shared-components/table/table.component";
import {User} from "../../interfaces/user.interface";
import {UserFormComponent} from "./user-form/user-form.component";
import {UserService} from "../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {NotificationComponent} from "../../shared-components/notification/notification.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    TableComponent,
    UserFormComponent,
    AsyncPipe,
    NotificationComponent,
  ]
})
export class UserListComponent implements OnInit {
  users$: BehaviorSubject<User[]>;

  private userService = inject(UserService);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.users$ = this.userService.users$;
  }

  onSavedUserForm(user: User): void {
    this.userService.saveUser(user, this.userService.selectedUser$.getValue());
  }

  removeUser(user: User): void {
    this.userService.removeUser(user);
    this.cd.detectChanges();
  }

  selectedUser(user: User): void {
    this.userService.selectedUser$.next(user);
    // this.cd.detectChanges();
  }
}
