import { Component } from '@angular/core';

/**
 * Generated class for the MyComonentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'my-comonent',
  templateUrl: 'my-comonent.html'
})
export class MyComonentComponent {

  text: string;

  constructor() {
    console.log('Hello MyComonentComponent Component');
    this.text = 'Hello World';
  }

}
