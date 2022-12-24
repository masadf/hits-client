import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-simple-button',
  templateUrl: './simple-button.component.html',
  styleUrls: ['./simple-button.component.scss']
})
export class SimpleButtonComponent {
  @Input() text!: string;
  @Input() type = "button";
}
