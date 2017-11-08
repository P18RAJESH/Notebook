import { Component, OnInit } from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {Contact} from '../../model/contact';
import {FormsModule} from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {ContactModelComponent} from './contact-model/contact-model.component';
@Component({
  selector: 'app-contacts-page',
  templateUrl: './contacts-page.component.html',
  styleUrls: ['./contacts-page.component.css'],
  providers: [ContactsService],
  entryComponents : [ContactModelComponent]
})
export class ContactsPageComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  closeResult: string;
  delMul = false;
  constructor(private contactService: ContactsService, private modalService: NgbModal) { }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getContacts() {
    this.contactService.getContacts().subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }

  ngOnInit() {
    this.getContacts();
  }
  deleteMultiple() {
    console.log(this.delMul);
  }

  openAddContact() {
    const modalRef = this.modalService.open(ContactModelComponent);
    const Contact1: Contact = new Contact('', 0, 0);
    Contact1._id = this.contacts.length;
    modalRef.componentInstance.Contact = Contact1;
    modalRef.result.then((contact: Contact) => { this.getContacts(); });
  }
  editContact(contact: Contact) {
    const modalRef = this.modalService.open(ContactModelComponent);
    const contact1: Contact = contact;
    contact1._id = this.contacts.length;
    modalRef.componentInstance.contact = contact1;
    modalRef.result.then((contact: Contact) => { this.getContacts(); });
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact._id + '').subscribe((res: any) => {
      this.getContacts();
    });
  }
}