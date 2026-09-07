import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { siteConfig } from '../../../core/config/site.config';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  config = siteConfig;
  ui = inject(UiService);
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  quickContact() {
    window.location.href = `mailto:${this.config.email}?subject=Project Inquiry - Graphic Design & Video Editing`;
  }

  saveProject() {
    this.ui.showToast('Project added to moodboard! 📌');
  }

  share() {
    this.ui.sharePortfolio();
  }
}
