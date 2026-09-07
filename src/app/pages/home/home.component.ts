import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PortfolioProject } from '../../core/models/portfolio.model';
import { siteConfig } from '../../core/config/site.config';
import { UiService } from '../../core/services/ui.service';
import { MediaModalComponent } from '../../shared/components/media-modal/media-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MediaModalComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  ui = inject(UiService);

  config = siteConfig;
  allProjects: PortfolioProject[] = [];
  videoProjects: PortfolioProject[] = [];
  logoProjects: PortfolioProject[] = [];
  otherWorksProjects: PortfolioProject[] = [];
  graphicProjects: PortfolioProject[] = [];
  uiProjects: PortfolioProject[] = [];

  activeSection = signal<'all' | 'logo' | 'other' | 'video' | 'ui'>('all');

  // Media Modal
  activeModalProject: PortfolioProject | null = null;
  isModalOpen = false;

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(projects => {
      this.allProjects = projects;
      this.videoProjects = projects.filter(p => p.type === 'video');
      this.logoProjects = projects.filter(p => p.category === 'Logo Design');
      this.otherWorksProjects = projects.filter(p => p.category === 'Other Works');
      this.graphicProjects = projects.filter(p => p.category === 'Graphic Design' || p.category === 'Logo Design' || p.category === 'Other Works');
      this.uiProjects = projects.filter(p => p.category === 'Photography & UI' || p.category === 'Photography');
    });
  }

  jumpToSection(sectionId: 'all' | 'logo' | 'other' | 'video' | 'ui') {
    this.ui.triggerJumpCut(() => {
      this.activeSection.set(sectionId);
      const el = document.getElementById(sectionId === 'all' ? 'showcase-anchor' : 'section-' + sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  openMediaModal(project: PortfolioProject) {
    this.activeModalProject = project;
    this.isModalOpen = true;
  }

  closeMediaModal() {
    this.isModalOpen = false;
    this.activeModalProject = null;
  }
}
