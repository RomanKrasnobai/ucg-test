import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input} from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ControlErrorComponent {
  _text: string | null;
  hide = true;

  private cd = inject(ChangeDetectorRef);

  @Input() set text(value: string | null) {
    if (value !== this._text) {
      this._text = value;
      this.hide = !value;
      this.cd.detectChanges();
    }
  };
}
