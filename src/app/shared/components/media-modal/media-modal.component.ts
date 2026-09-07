import { Component, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioProject } from '../../../core/models/portfolio.model';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-media-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent implements OnChanges, OnDestroy {
  @Input() project: PortfolioProject | null = null;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  ui = inject(UiService);

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event) {
    if (this.isOpen) {
      event.preventDefault();
      this.closeModal();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  closeModal() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  appreciateCurrent() {
    this.ui.showToast('Appreciated this cut! ❤️');
  }
}
