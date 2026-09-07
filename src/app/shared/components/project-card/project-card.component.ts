import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioProject } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: PortfolioProject;
  @Output() viewMedia = new EventEmitter<PortfolioProject>();

  onCardClick() {
    this.viewMedia.emit(this.project);
  }
}
