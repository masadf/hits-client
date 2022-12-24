import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-router-button',
  templateUrl: './router-button.component.html',
  styleUrls: ['./router-button.component.scss']
})
export class RouterButtonComponent {
  @Input() text!: string;
  @Input() url!: string;
}
