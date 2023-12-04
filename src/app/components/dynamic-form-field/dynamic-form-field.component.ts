import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent {
  @Input()
  question!: Question;

  @Input()
  form!: FormGroup;

  getFormGroup(key: string) {
    return <FormGroup>this.form.get(key);
  }

  getErrorMessage() {
    const formControl: AbstractControl = <FormControl>(
      this.form.get(this.question.key)
    );

    if (formControl && formControl.errors) {
      const errorKeys = Object.keys(formControl.errors);
      let errorMessage: string | undefined = '';
      errorKeys.forEach((error) => {
        if (error === 'required') {
          errorMessage = this.question.errorMessage?.['required'];
        } else if (error === 'email') {
          errorMessage = this.question.errorMessage?.['email'];
        } else if (error === 'minLength') {
          errorMessage = this.question.errorMessage?.['minLength'];
        }
      });
      if (errorMessage === undefined) {
        errorMessage = 'Invalid input data!';
      }
      return errorMessage;
    }
    return '';
  }
}
