import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header-wrapper">
      <div class="container">
        <div class="header-inner">
          @if (eyebrow) {
            <span class="section-eyebrow">{{ eyebrow }}</span>
          }
          <h1 class="page-title">{{ title }}</h1>
          @if (subtitle) {
            <p class="page-subtitle">{{ subtitle }}</p>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header-wrapper {
      padding: 80px 0 48px 0;
      position: relative;
      border-bottom: 1px solid var(--border-subtle);
      background: radial-gradient(circle at 50% 0%, rgba(0, 230, 118, 0.06) 0%, transparent 70%);

      @media (max-width: 768px) {
        padding: 56px 0 36px 0;
      }
    }

    .header-inner {
      max-width: 800px;
    }

    .page-title {
      font-size: clamp(34px, 5.5vw, 56px);
      line-height: 1.1;
      margin-bottom: 16px;
      color: var(--text-primary);
    }

    .page-subtitle {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 640px;
    }
  `]
})
export class PageHeaderComponent {
  @Input() eyebrow?: string;
  @Input({ required: true }) title!: string;
  @Input() subtitle?: string;
}
