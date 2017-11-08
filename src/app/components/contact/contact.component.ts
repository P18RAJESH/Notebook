import { Component, OnInit, Input } from '@angular/core';
import {Contact} from '../../model/contact';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @Input() contact: Contact;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  /*
  editLink() {
    const modalRef = this.modalService.open(ContactsModalComponent);
    const contact1: Contact = this.contact;
    modalRef.componentInstance.contact = contact1;
  }*/
}