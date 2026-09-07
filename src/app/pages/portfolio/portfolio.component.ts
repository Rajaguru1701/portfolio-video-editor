import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PortfolioProject } from '../../core/models/portfolio.model';
import { UiService } from '../../core/services/ui.service';
import { MediaModalComponent } from '../../shared/components/media-modal/media-modal.component';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, MediaModalComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  private portfolioService = inject(PortfolioService);
  ui = inject(UiService);

  allProjects: PortfolioProject[] = [];
  videoProjects: PortfolioProject[] = [];
  graphicProjects: PortfolioProject[] = [];
  uiProjects: PortfolioProject[] = [];

  activeTab = signal<'videos' | 'graphics' | 'ui' | 'all'>('videos');
  searchQuery = '';

  // Media Modal
  activeModalProject: PortfolioProject | null = null;
  isModalOpen = false;

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(projects => {
      this.allProjects = projects;
      this.videoProjects = projects.filter(p => p.type === 'video');
      this.graphicProjects = projects.filter(p => p.category === 'Graphic Design');
      this.uiProjects = projects.filter(p => p.category === 'Photography & UI' || p.category === 'Photography');
    });
  }

  setTab(tab: 'videos' | 'graphics' | 'ui' | 'all') {
    this.ui.triggerJumpCut(() => {
      this.activeTab.set(tab);
    });
  }

  getFilteredVideos(): PortfolioProject[] {
    if (!this.searchQuery.trim()) return this.videoProjects;
    const q = this.searchQuery.toLowerCase();
    return this.videoProjects.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
  }

  getFilteredGraphics(): PortfolioProject[] {
    if (!this.searchQuery.trim()) return this.graphicProjects;
    const q = this.searchQuery.toLowerCase();
    return this.graphicProjects.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
  }

  getFilteredUi(): PortfolioProject[] {
    if (!this.searchQuery.trim()) return this.uiProjects;
    const q = this.searchQuery.toLowerCase();
    return this.uiProjects.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
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
