import { Component, OnInit, OnDestroy, AfterViewInit, inject, signal } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
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

  private scrollObserver: IntersectionObserver | null = null;

  ngOnInit() {
    this.portfolioService.getProjects().subscribe(projects => {
      this.allProjects = projects;
      this.videoProjects = projects.filter(p => p.type === 'video');
      this.logoProjects = projects.filter(p => p.category === 'Logo Design');
      this.otherWorksProjects = projects.filter(p => p.category === 'Other Works');
      this.graphicProjects = projects.filter(p => p.category === 'Graphic Design' || p.category === 'Logo Design' || p.category === 'Other Works');
      this.uiProjects = projects.filter(p => p.category === 'Photography & UI' || p.category === 'Photography');

      // Schedule observer setup after render
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
    
    // Disconnect any existing observer
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }

    // On touch/mobile devices or when scrolling, play only the video card centered in viewport
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch) return; // on desktop, hover handles playback smoothly

    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting && entry.intersectionRatio >= 0.65);
        if (visibleEntries.length > 0) {
          // Play the most visible one, pause others
          const targetVideo = visibleEntries[0].target.querySelector('video') as HTMLVideoElement | null;
          if (targetVideo && targetVideo.paused && !this.isModalOpen) {
            this.ui.playOnly(targetVideo);
          }
        } else {
          // If none are > 65% visible, pause exiting ones
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

    const cards = document.querySelectorAll('.video-reel-card');
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
