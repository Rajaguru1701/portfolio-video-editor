import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="not-found-section">
      <div class="container text-center">
        <div class="code-badge">// ERROR 404 // MISSING FRAME</div>
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Frame Not Found</h2>
        <p class="error-desc">
          The sequence you are looking for has been cut, moved, or never rendered in the master reel.
        </p>

        <div class="error-actions">
          <a routerLink="/" class="btn btn-primary">
            <span>Return to Studio Home</span>
          </a>
          <a routerLink="/portfolio" class="btn btn-secondary">
            <span>Browse Full Portfolio</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .not-found-section {
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 80px 0;
      position: relative;
    }

    .code-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--accent);
      letter-spacing: 0.15em;
      margin-bottom: 20px;
    }

    .error-code {
      font-size: clamp(80px, 16vw, 180px);
      font-weight: 900;
      color: rgba(255, 255, 255, 0.05);
      line-height: 0.9;
      letter-spacing: -0.06em;
      user-select: none;
      position: relative;
    }

    .error-title {
      font-size: clamp(24px, 4vw, 38px);
      color: var(--text-primary);
      margin-top: -20px;
      margin-bottom: 16px;
      position: relative;
      z-index: 2;
    }

    .error-desc {
      font-size: 16px;
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto 36px auto;
      line-height: 1.6;
    }

    .error-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }
  `]
})
export class NotFoundComponent {}
