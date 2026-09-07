import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-state-wrapper">
      <div class="spinner-pulse">
        <div class="ring"></div>
        <div class="dot"></div>
      </div>
      <p class="loading-text">{{ message }}</p>

      <div class="skeleton-grid">
        @for (item of [1, 2, 3, 4, 5, 6]; track item) {
          <div class="skeleton-card">
            <div class="skeleton-media shimmer"></div>
            <div class="skeleton-content">
              <div class="skeleton-line sm shimmer"></div>
              <div class="skeleton-line lg shimmer"></div>
              <div class="skeleton-line md shimmer"></div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .loading-state-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 0;
      width: 100%;
    }

    .spinner-pulse {
      position: relative;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;

      .ring {
        position: absolute;
        inset: 0;
        border: 2px solid rgba(0, 230, 118, 0.2);
        border-top-color: var(--accent);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      .dot {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 8px;
        background: var(--accent);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--accent);
      }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading-text {
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 40px;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      width: 100%;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 640px) {
        grid-template-columns: 1fr;
      }
    }

    .skeleton-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    .skeleton-media {
      width: 100%;
      aspect-ratio: 16 / 10;
      background: rgba(255, 255, 255, 0.04);
    }

    .skeleton-content {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .skeleton-line {
      height: 12px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 4px;

      &.sm { width: 35%; }
      &.md { width: 65%; }
      &.lg { width: 85%; height: 18px; }
    }

    .shimmer {
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0,
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        animation: shimmer 1.5s infinite;
      }
    }

    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `]
})
export class LoadingStateComponent {
  @Input() message = 'Loading creative projects...';
}
