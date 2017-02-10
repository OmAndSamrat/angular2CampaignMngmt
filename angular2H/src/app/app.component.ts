import { Component } from '@angular/core';
import { LoginComponent } from './login.component';
import {HomeComponent} from './home/home.component';
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = `Hello World`;
}
