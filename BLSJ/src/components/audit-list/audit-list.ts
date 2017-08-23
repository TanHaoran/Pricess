import { Component } from '@angular/core';

/**
 * Generated class for the AuditListComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'audit-list',
  templateUrl: 'audit-list.html'
})
export class AuditListComponent {

  text: string;

  constructor() {
    console.log('Hello AuditListComponent Component');
    this.text = 'Hello World';
  }

}
