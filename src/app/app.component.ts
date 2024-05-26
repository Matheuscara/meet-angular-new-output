import { Component, EventEmitter, Output, output} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentParentComponent } from './component-parent/component-parent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ComponentParentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  onName = 'init';

  handleNameChange(name: string) {
    this.onName = name;
  }

  handleNameChangeWithObservable(name: string) {
    console.log('Received from onNameChangeWithObservable:', name);
  }
}
