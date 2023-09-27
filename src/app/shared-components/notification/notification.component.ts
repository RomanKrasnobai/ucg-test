import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject, takeUntil} from "rxjs";
import {Notification} from "../../interfaces/notification.interface";
import {NotificationService} from "../../services/notification.service";
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {OnDestroyService} from "../../services/on-destroy.service";
import {Constants} from "../../interfaces/constants";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    NgClass
  ]
})
export class NotificationComponent implements OnInit {
  isVisible: boolean = false;

  notificationService = inject(NotificationService);
  onDestroyService = inject(OnDestroyService);
  cd = inject(ChangeDetectorRef);

  notifications$: BehaviorSubject<Notification[]> = this.notificationService.notifications$;

  ngOnInit(): void {
    this.notifications$
      .pipe(takeUntil(this.onDestroyService))
      .subscribe(message => {
        if (message.length) {
          this.isVisible = true;
          setTimeout(() => {
            this.isVisible = false;
            this.notificationService.notifications$.next([]);
            this.cd.detectChanges();
          }, 4000);
        }
        this.cd.detectChanges();
    });
  }

  setNotificationClass(type: string): string {
    return type === Constants.SUCCESS_NOTIFICATION_TYPE ? 'success' : 'failed';
  }
}
