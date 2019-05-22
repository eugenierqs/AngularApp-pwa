import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styles: []
})
export class FormRegisterComponent implements OnInit {
  
  public formData: FormGroup;
  @Output() formSubmit = new EventEmitter();

  constructor(
    private FormBuilder: FormBuilder
  ) { }

  private resetForm = ()  => {
    this.formData = this.FormBuilder.group({
      
      first_name: [ 'EG', Validators.required ],
      last_name: [ 'Rqs', Validators.required ],
      email: [ 'eg@gmail.com', Validators.required ],
      password: [ '12345', Validators.required ],
      password_repeate: [ '12345', Validators.required ],
      street: [ '27 bis rue du progres', Validators.required ],
      city: [ 'Montreuil', Validators.required ],
      country: [ 'France', Validators.required ],
      birthdate: [ '25/03/1997', Validators.required ],
      position: [ 'NULL', Validators.required ],
      type: [ 'admin', Validators.required ],
      zip_code: [ '93000', Validators.required ],
      cgu: [ true, Validators.required ],
    })
  }

  public submitForm = () => {
    this.formSubmit.emit(this.formData.value)
  }

  ngOnInit() {
    this.resetForm();
  }

}
