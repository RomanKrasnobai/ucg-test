import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Notification} from "../interfaces/notification.interface";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications$: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

  emitNotification(type: string, message: string) {
    this.notifications$.next(
      [...this.notifications$.getValue(),
        {
          type,
        message
    }]);
  }
}
