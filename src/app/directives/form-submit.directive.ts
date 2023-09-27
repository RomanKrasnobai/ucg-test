import {Directive, ElementRef, inject} from '@angular/core';
import {fromEvent, shareReplay, tap} from "rxjs";

@Directive({
  selector: 'form',
  standalone: true,
})
export class FormSubmitDirective {
  private host = inject(ElementRef<HTMLFormElement>);

  submit$ = fromEvent(this.element, 'submit')
    .pipe(tap(() => {
      if (!this.element.classList.contains('submitted')) {
        this.element.classList.add('submitted');
      }
    }), shareReplay(1))

  get element() {
    return this.host.nativeElement;
  }
}
