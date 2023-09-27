import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {User} from "../../interfaces/user.interface";
import {NgClass, NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    NgIf,
  ]
})
export class TableComponent {
  tableHeaders: string[] = ['USERNAME', 'FIRSTNAME', 'LASTNAME', 'EMAIL', 'TYPE'];

  @Input() data: User[] | null;
  @Output() emitUser: EventEmitter<User> = new EventEmitter<User>();

  selectedUser(user: User): void {
    this.emitUser.emit(user);
  }
}
