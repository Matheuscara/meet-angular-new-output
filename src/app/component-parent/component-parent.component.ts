import { Component, output } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-component-parent',
  standalone: true,
  imports: [],
  templateUrl: './component-parent.component.html',
  styleUrl: './component-parent.component.scss',
})
export class ComponentParentComponent {
  // new output with OutputEmitterRef type
  onNameChange = output<string>();

  // I can then emit new values to the output by calling the emit function on OutPutEmitterRef
  updateName() {
    this.onNameChange.emit('teste');
  }

  // ------------------------------------------------------------

  // Subject to control the values and transform to observable
  private nameChangeSubject = new Subject<string>();

  // Change subject to emit values to the output with observable
  onNameChange$ = this.nameChangeSubject.asObservable();

  // new outputFromObservable with OutputRef type
  onNameChangeWithObservable = outputFromObservable(this.onNameChange$);

  // I can then emit new values to the output by calling the next function on the Subject
  updateNameWithObservable() {
    this.nameChangeSubject.next('teste com observable');
    this.nameChangeSubject.subscribe();
  }

  // ------------------------------------------------------------

  
}
