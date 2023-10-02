import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {UserService} from "./services/user.service";
import {StorageService} from "./services/storage.service";
import {Constants} from "./interfaces/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent implements OnInit {
  userService = inject(UserService);
  storageService = inject(StorageService);

  ngOnInit(): void {
    if (this.storageService.getItem(Constants.USERS_LIST_KEY)) {
      this.userService.users$.next(this.storageService.getItem(Constants.USERS_LIST_KEY));
    } else {
      this.storageService.setItem(Constants.USERS_LIST_KEY, []);
    }
  }
}
