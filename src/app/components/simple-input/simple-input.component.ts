import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.scss']
})
export class SimpleInputComponent {
  @Input() label!: string;
  @Input() name!: string;
  @Input() type!: string;
  @Input() validationRoot!: string;
  @Input() formGroup!: FormGroup;

  isValid() {
    return this.formGroup.get(this.name)?.valid;
  }
}
