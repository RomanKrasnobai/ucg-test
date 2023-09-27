import {AfterViewInit, Directive, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Directive({
  selector: '[appValidationErrors]',
  standalone: true,
})
export class ValidationErrorsDirective implements AfterViewInit {
  @Input('fieldName') fieldName = '';
  // @ViewChild('message', {static: false}) message: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    const message = this.renderer.selectRootElement('#message');
    this.renderer.listen(this.el.nativeElement, 'input', () => {

      message.innerHTML = '';
      const value = this.el.nativeElement.value;

      if (!value.length) {
        message.innerHTML = 'The field is required';
        return false;
      }

      // if (value.length <= 3) {
      //   message.innerHTML = 'Minimum characters length is 3';
      //   return false;
      // }

      if (this.fieldName === 'password' && value.length <= 8) {
        message.innerHTML = 'Minimum characters length is 8';
        return false;
      }
      // message.innerHTML = 'good';
      return true;
    });
  }
}
