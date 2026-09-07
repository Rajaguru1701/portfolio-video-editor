import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="empty-state-wrapper glass-panel">
      <div class="empty-icon-box">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </div>

      <h3 class="empty-title">{{ title }}</h3>
      <p class="empty-desc">{{ description }}</p>

      @if (actionLabel) {
        @if (actionRoute) {
          <a [routerLink]="actionRoute" class="btn btn-primary">
            {{ actionLabel }}
          </a>
        } @else {
          <button type="button" class="btn btn-primary" (click)="actionClicked.emit()">
            {{ actionLabel }}
          </button>
        }
      }
    </div>
  `,
  styles: [`
    .empty-state-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 64px 32px;
      max-width: 540px;
      margin: 40px auto;
    }

    .empty-icon-box {
      width: 68px;
      height: 68px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent);
      margin-bottom: 20px;
    }

    .empty-title {
      font-size: 22px;
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .empty-desc {
      font-size: 14px;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 24px;
    }
  `]
})
export class EmptyStateComponent {
  @Input() title = 'No projects found';
  @Input() description = 'No projects match your current filter selection. Try selecting another category.';
  @Input() actionLabel?: string;
  @Input() actionRoute?: string;
  @Output() actionClicked = new EventEmitter<void>();
}
