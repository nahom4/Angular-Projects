import { Component } from '@angular/core';
import { HerosComponent } from './heros/heros.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tour-of-heroes';
}
