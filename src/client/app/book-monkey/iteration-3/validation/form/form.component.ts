import {Component, Input} from 'angular2/core';
import {ControlGroup, ControlArray, FormBuilder, Validators} from 'angular2/common';
import {DateValidator} from '../validators/date.validator'
import {IsbnValidator} from '../validators/isbn.validator'
import {Book} from '../../domain/book'

@Component({
  selector: 'it3-book-form',
  templateUrl: 'app/book-monkey/iteration-3/validation/form/form.component.html'
})
export class FormComponent {

  myForm: ControlGroup;
  authorsControlArray: ControlArray;
  thumbnailsControlArray: ControlArray;

  constructor(private fb: FormBuilder) {

    this.myForm = fb.group({
      title:      ['', Validators.required],
      published:  ['', DateValidator.germanDate],
      subtitle:   [''],
      description:[''],
      authors:    fb.array([
                    fb.control('', Validators.required)
                  ]),
      thumbnails: fb.array([
                    fb.group({
                      url:   ['', Validators.required],
                      title: ['']
                    })
                  ]),
      isbn:       ['', Validators.compose([
                    Validators.required,
                    IsbnValidator.isbn
                    /* TODO Async check if isbn exists */
                  ])]
    });

    // this allows us to manipulate the form at runtime
    this.authorsControlArray = <ControlArray>this.myForm.controls['authors'];
    this.thumbnailsControlArray = <ControlArray>this.myForm.controls['thumbnails'];
  }

  addAuthorControl(){
    this.authorsControlArray.push(this.fb.control(''));
  }

  addThumbnailControl(){
    this.thumbnailsControlArray.push(this.fb.group({ url: [''], title: ['']} ));
  }

  submitForm(formData){
    console.log('submitting values:', formData.value);
  }
}