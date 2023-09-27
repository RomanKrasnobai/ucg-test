import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {TableComponent} from "../../shared-components/table/table.component";
import {User} from "../../interfaces/user.interface";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";
import {BehaviorSubject} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableComponent,
    RouterLink,
    AsyncPipe
  ],
  standalone: true
})
export class UserViewComponent implements OnInit {
  data$: BehaviorSubject<User[]>;

  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    this.data$ = this.userService.users$;
  }

  selectedUser(user: User): void {
    this.userService.selectedUser$.next(user);
    this.router.navigate(['/user-list']);
  }
}
