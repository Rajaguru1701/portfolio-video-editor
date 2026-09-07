import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PortfolioService } from '../../core/services/portfolio.service';
import { PortfolioProject } from '../../core/models/portfolio.model';
import { siteConfig } from '../../core/config/site.config';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { MediaModalComponent } from '../../shared/components/media-modal/media-modal.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';
import { UiService } from '../../core/services/ui.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProjectCardComponent,
    MediaModalComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    CtaSectionComponent
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private portfolioService = inject(PortfolioService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  ui = inject(UiService);

  config = siteConfig;
  project: PortfolioProject | null = null;
  relatedProjects: PortfolioProject[] = [];
  isLoading = true;
  projectNotFound = false;

  // Media Modal state
  activeModalProject: PortfolioProject | null = null;
  isModalOpen = false;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProject(id);
      } else {
        this.projectNotFound = true;
        this.isLoading = false;
      }
    });
  }

  private loadProject(id: string) {
    this.isLoading = true;
    this.projectNotFound = false;

    this.portfolioService.getProjectById(id).subscribe({
      next: (project) => {
        if (project) {
          this.project = project;
          this.projectNotFound = false;

          // Update SEO Title & Meta Description dynamically
          this.titleService.setTitle(`${project.title} // ${this.config.name}`);
          this.metaService.updateTag({ name: 'description', content: project.description });
          this.metaService.updateTag({ property: 'og:title', content: project.title });
          this.metaService.updateTag({ property: 'og:description', content: project.description });
          this.metaService.updateTag({ property: 'og:image', content: project.thumbnail });

          // Load related projects in same category
          this.portfolioService.getRelatedProjects(project.id, project.category, 3).subscribe(related => {
            this.relatedProjects = related;
          });
        } else {
          this.project = null;
          this.projectNotFound = true;
          this.titleService.setTitle(`Project Not Found // ${this.config.name}`);
        }
        this.isLoading = false;
      },
      error: () => {
        this.projectNotFound = true;
        this.isLoading = false;
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
