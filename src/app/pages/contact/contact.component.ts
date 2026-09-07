import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { siteConfig } from '../../core/config/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  config = siteConfig;

  formName = '';
  formEmail = '';
  formSubject = '';
  formMessage = '';
  copiedEmail = false;

  copyEmailToClipboard() {
    navigator.clipboard.writeText(this.config.email).then(() => {
      this.copiedEmail = true;
      setTimeout(() => {
        this.copiedEmail = false;
      }, 2500);
    });
  }

  submitViaMailto() {
    const subject = encodeURIComponent(
      this.formSubject ? `[Project Inquiry] ${this.formSubject}` : `[Portfolio Inquiry] From ${this.formName || 'Website Visitor'}`
    );
    const bodyText = `Name: ${this.formName}
Email: ${this.formEmail}

Message:
${this.formMessage}`;

    const body = encodeURIComponent(bodyText);
    window.location.href = `mailto:${this.config.email}?subject=${subject}&body=${body}`;
  }
}
