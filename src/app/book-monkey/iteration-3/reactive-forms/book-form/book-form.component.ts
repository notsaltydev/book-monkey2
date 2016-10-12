import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Book } from '../shared/book';
import { BookFormErrorMessages } from './book-form-error-messages';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-form',
  templateUrl: 'book-form.component.html'
})
export class BookFormComponent implements OnInit {
  book: Book = Book.empty();
  errors = {};
  isUpdatingBook: boolean = false;
  myForm: FormGroup;
  authors: FormArray;
  thumbnails: FormArray;

  constructor(
    private fb: FormBuilder,
    private bs: BookStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let isbn = this.route.snapshot.params['isbn'];
    if (isbn) {
      this.isUpdatingBook = true;
      this.book = this.bs.getSingle(isbn);
    }
    this.initBook();
  }

  initBook() {
    this.myForm = this.fb.group({
      title: [this.book.title, Validators.required],
      subtitle: [this.book.subtitle],
      isbn: [this.book.isbn, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      description: [this.book.description],
      authors: this.buildAuthorsArray(this.book.authors),
      thumbnails: this.buildThumbnialsArray(this.book.thumbnails),
      published: [
        this.book.published,
        Validators.pattern('([1-9]|0[1-9]|(1|2)[0-9]|3[0-1])\.([1-9]|0[1-9]|1[0-2])\.[0-9]{4}')
      ]
    });
    this.myForm.valueChanges.subscribe(() => this.updateErrorMessages());
  }

  buildAuthorsArray(authors): FormArray {
    this.authors = this.fb.array(authors, Validators.required);
    return this.authors;
  }

  buildThumbnialsArray(thumbnails): FormArray {
    this.thumbnails = this.fb.array(
      thumbnails.map(
        t => this.fb.group({
          url: this.fb.control(t.url),
          title: this.fb.control(t.title)
        })
      )
    );
    return this.thumbnails;
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(null));
  }

  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({ url: null, title: null }));
  }

  submitForm() {
    if (this.isUpdatingBook) {
      this.bs.update(this.myForm.value);
      this.router.navigate(['../../books', this.myForm.value.isbn], { relativeTo: this.route });
    } else {
      this.bs.create(this.myForm.value);
      this.myForm.reset();
    }
  }

  updateErrorMessages() {
    this.errors = {};
    for (let message of BookFormErrorMessages) {
      let control = this.myForm.get(message.forControl);
      if (control &&
          control.dirty &&
          control.invalid &&
          control.errors[message.forValidator] &&
          !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
