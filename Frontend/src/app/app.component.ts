import { Component, OnInit } from '@angular/core';

import { UserService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor (
    private userService: UserService
  ) {}

  ngOnInit() {
    // document.body.classList.add('bg-img');
    this.userService.populate();
  }
}
