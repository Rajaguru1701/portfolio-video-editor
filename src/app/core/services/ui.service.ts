import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  isShutterActive = signal(false);
  toastMessage = signal<string | null>(null);
  isAppreciated = signal(false);
  likesCount = signal(142);
  activePlayingVideo = signal<HTMLVideoElement | null>(null);

  pauseAllVideos(except?: HTMLVideoElement) {
    if (typeof document === 'undefined') return;
    const videos = document.querySelectorAll('video');
    videos.forEach(v => {
      if (v !== except && !v.paused) {
        try {
          v.pause();
        } catch (_) {}
      }
    });
    if (!except) {
      this.activePlayingVideo.set(null);
    }
  }

  playOnly(videoEl: HTMLVideoElement) {
    this.pauseAllVideos(videoEl);
    this.activePlayingVideo.set(videoEl);
    try {
      videoEl.play().catch(() => {});
    } catch (_) {}
  }

  triggerJumpCut(callback?: () => void) {
    this.isShutterActive.set(true);
    setTimeout(() => {
      if (callback) callback();
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        this.isShutterActive.set(false);
      }, 140);
    }, 180);
  }

  showToast(message: string, duration = 2400) {
    this.toastMessage.set(message);
    setTimeout(() => {
      if (this.toastMessage() === message) {
        this.toastMessage.set(null);
      }
    }, duration);
  }

  toggleAppreciate() {
    const next = !this.isAppreciated();
    this.isAppreciated.set(next);
    if (next) {
      this.likesCount.update(c => c + 1);
      this.showToast('Project Appreciated! ❤️');
    } else {
      this.likesCount.update(c => c - 1);
    }
  }

  sharePortfolio(url = window.location.href) {
    if (navigator.share) {
      navigator.share({
        title: 'PORTFOLIO // NALLAMUTHU M - Graphic Designer & Video Editor',
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      this.showToast('Portfolio link copied to clipboard! 📋');
    }
  }
}
