import { Component } from '@angular/core';
import { environment } from '../../../environments/environment'; 
import {FormsModule} from '@angular/forms'
import emailjs,{EmailJSResponseStatus} from 'emailjs-com'
import { ToastService } from '../../toast.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-contact',
  imports: [CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  isSubmitting = false;

  constructor(private toast: ToastService) {}

  sendEmail(form: any){
    if(form.invalid) return
    if(this.isSubmitting) return

    this.isSubmitting = true;

    emailjs.send(environment.emailServiceID,environment.emailTemplateID,form.value,environment.emailPublicID)
    .then((result: EmailJSResponseStatus) => {
      console.log('Emaiil sent successfullly!',result.status, result.text);
      this.toast.showSuccess("Form submitted successfully!","Success")
      form.resetForm();
      this.isSubmitting = false;
    },(error) => {
      console.error('Failed to send email.',error);
      this.toast.showError("Failed to send message","Error")
    })
  }
}
