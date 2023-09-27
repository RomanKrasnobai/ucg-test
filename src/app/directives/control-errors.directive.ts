import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive, Host,
  Inject,
  Input, OnInit,
  Optional,
  ViewContainerRef
} from '@angular/core';
import {EMPTY, merge, Observable, takeUntil} from "rxjs";
import {ControlErrorComponent} from "../shared-components/control-error/control-error.component";
import {ControlErrorContainerDirective} from "./control-error-container.directive";
import {NgControl} from "@angular/forms";
import {FORM_ERRORS} from "../helpers/tokens/form-errors";
import {FormSubmitDirective} from "./form-submit.directive";
import {OnDestroyService} from "../services/on-destroy.service";

@Directive({
  selector: '[formControl], [formControlName]',
  standalone: true,
})
export class ControlErrorsDirective implements OnInit {
  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<any>;

  @Input() customErrors: any = {};

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors: any,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl,
    private onDestroy$: OnDestroyService,
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(
      // @ts-ignore
      this.submit$,
      this.control?.valueChanges
    ).pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((v) => {
        const controlErrors = this.control?.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey];
          const text = this.customErrors[firstKey] || getError(controlErrors[firstKey]);
          this.setError(text);
        } else if (this.ref) {
          this.setError(null);
        }
    })
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string | null) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }
}
