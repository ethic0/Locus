import { Component, OnInit } from '@angular/core';

// This lets me use jquery
declare var $: any;

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  showModal():void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    //do something here
    this.hideModal();
  }
  hideModal():void {
    document.getElementById('close-modal').click();
  }
}