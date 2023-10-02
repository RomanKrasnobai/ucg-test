import {inject, Injectable} from '@angular/core';
import {StorageService} from "./storage.service";
import {User} from "../interfaces/user.interface";
import {Constants} from "../interfaces/constants";
import {BehaviorSubject} from "rxjs";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageService = inject(StorageService);
  private notificationService = inject(NotificationService);

  users$: BehaviorSubject<User[]> =
    new BehaviorSubject<User[]>([]);

  selectedUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  saveUser(user: User, selectedUser: User | null): void {
    if (!selectedUser) {
      const searchedUser = this.users$.getValue().find((userItem: User) =>
          userItem.username.toLowerCase() === user.username.toLowerCase());

      if (searchedUser?.username.toLowerCase() === user.username.toLowerCase()) {
        this.notificationService.emitNotification(
            Constants.FAILED_NOTIFICATION_TYPE,
            'The user is already exists!'
        );
        return;
      }

      if (user.password === user.repeatPassword) {
        const updatedUsers: User[] = [...this.users$.getValue(), user];
        this.users$.next(updatedUsers);

        this.storageService.setItem(Constants.USERS_LIST_KEY, this.users$.getValue());

        this.notificationService.emitNotification(
          Constants.SUCCESS_NOTIFICATION_TYPE,
          `New user ${user.username} was created!`
        );
        return;
      } else {
        this.notificationService.emitNotification(
          Constants.FAILED_NOTIFICATION_TYPE,
          'Password doesn\'t match!'
        );
      }
    } else {
      const updatedUsers: User[] = this.users$.getValue().map((userItem: User) => {
        if (userItem.username === selectedUser.username) {
          return Object.assign(userItem, user);
        }
        return userItem;
      });
      this.users$.next(updatedUsers);
      this.storageService.setItem(Constants.USERS_LIST_KEY, this.users$.getValue());

      this.notificationService.emitNotification(
        Constants.SUCCESS_NOTIFICATION_TYPE,
        `User ${user.username} info was updated!`
      );
    }
  }

  removeUser(user: User): void {
    const updatedUsers: User[] = this.users$.getValue()
      .filter((userItem: User) => userItem.username !== user.username);

    this.users$.next(updatedUsers);
    this.storageService.setItem(Constants.USERS_LIST_KEY, this.users$.getValue());

    this.notificationService.emitNotification(
      Constants.SUCCESS_NOTIFICATION_TYPE,
      `User ${user.username} was deleted!`
    );
  }
}
