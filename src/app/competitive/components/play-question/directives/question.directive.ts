import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[app-question]'
})
export class QuestionDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
