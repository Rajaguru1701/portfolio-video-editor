import { Component, OnInit, OnDestroy, AfterViewInit, inject, signal } from '@angular/core';
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
export class PortfolioComponent implements OnInit, AfterViewInit, OnDestroy {
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

  private scrollObserver: IntersectionObserver | null = null;

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(projects => {
      this.allProjects = projects;
      this.videoProjects = projects.filter(p => p.type === 'video');
      this.graphicProjects = projects.filter(p => p.category === 'Graphic Design');
      this.uiProjects = projects.filter(p => p.category === 'Photography & UI' || p.category === 'Photography');

      setTimeout(() => this.setupIntersectionObserver(), 300);
    });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
      this.scrollObserver = null;
    }
    this.ui.pauseAllVideos();
  }

  setupIntersectionObserver() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return;

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= 0.65);
        if (visibleEntries.length > 0) {
          const targetVideo = visibleEntries[0].target.querySelector('video') as HTMLVideoElement | null;
          if (targetVideo && targetVideo.paused && !this.isModalOpen) {
            this.ui.playOnly(targetVideo);
          }
        } else {
          entries.forEach(entry => {
            if (entry.intersectionRatio < 0.3) {
              const video = entry.target.querySelector('video') as HTMLVideoElement | null;
              if (video && !video.paused) {
                video.pause();
              }
            }
          });
        }
      },
      {
        threshold: [0.3, 0.65, 0.9]
      }
    );

    const cards = document.querySelectorAll('.video-card-item');
    cards.forEach(card => this.scrollObserver?.observe(card));
  }

  onVideoMouseEnter(videoEl: HTMLVideoElement) {
    if (this.isModalOpen) return;
    this.ui.playOnly(videoEl);
  }

  onVideoMouseLeave(videoEl: HTMLVideoElement) {
    if (this.isModalOpen) return;
    videoEl.pause();
  }

  onVideoPlayed(videoEl: HTMLVideoElement) {
    this.ui.pauseAllVideos(videoEl);
  }

  setTab(tab: 'videos' | 'graphics' | 'ui' | 'all') {
    this.ui.triggerJumpCut(() => {
      this.activeTab.set(tab);
      setTimeout(() => this.setupIntersectionObserver(), 300);
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
    this.ui.pauseAllVideos();
    this.activeModalProject = project;
    this.isModalOpen = true;
  }

  closeMediaModal() {
    this.isModalOpen = false;
    this.activeModalProject = null;
    this.ui.pauseAllVideos();
  }
}
