import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay, startWith } from 'rxjs/operators';
import { PortfolioProject, CategoryFilterItem } from '../models/portfolio.model';
import { DEFAULT_PORTFOLIO_PROJECTS } from '../data/portfolio.data';
import { resolveAssetUrl } from '../utils/asset.util';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);

  // Normalizes projects to ensure all thumbnail and media URLs resolve cleanly with base href
  private normalizeProjects(projects: PortfolioProject[]): PortfolioProject[] {
    return projects.map(p => ({
      ...p,
      thumbnail: resolveAssetUrl(p.thumbnail),
      media: resolveAssetUrl(p.media)
    }));
  }

  // Pre-seed with default static data to guarantee 0ms instant loading with zero spinner hang
  private defaultNormalized = this.normalizeProjects(DEFAULT_PORTFOLIO_PROJECTS);

  // Load from local static assets/data/portfolio.json with fallback to default static data
  private projects$: Observable<PortfolioProject[]> = this.http.get<PortfolioProject[]>(resolveAssetUrl('assets/data/portfolio.json')).pipe(
    map(data => (Array.isArray(data) && data.length > 0) ? this.normalizeProjects(data) : this.defaultNormalized),
    catchError(() => of(this.defaultNormalized)),
    startWith(this.defaultNormalized),
    shareReplay(1)
  );

  /**
   * Returns all projects
   */
  getProjects(): Observable<PortfolioProject[]> {
    return this.projects$;
  }

  /**
   * Returns projects flagged as featured
   */
  getFeaturedProjects(): Observable<PortfolioProject[]> {
    return this.projects$.pipe(
      map(projects => projects.filter(p => p.featured))
    );
  }

  /**
   * Returns projects filtered by category ('All' returns everything)
   */
  getProjectsByCategory(category: string): Observable<PortfolioProject[]> {
    if (!category || category.toLowerCase() === 'all') {
      return this.projects$;
    }
    return this.projects$.pipe(
      map(projects => projects.filter(p => p.category.toLowerCase() === category.toLowerCase()))
    );
  }

  /**
   * Finds single project by its unique slug ID
   */
  getProjectById(id: string): Observable<PortfolioProject | undefined> {
    return this.projects$.pipe(
      map(projects => projects.find(p => p.id === id))
    );
  }

  /**
   * Returns unique categories with their respective project counts
   */
  getCategories(): Observable<CategoryFilterItem[]> {
    return this.projects$.pipe(
      map(projects => {
        const counts: { [cat: string]: number } = {};
        for (const p of projects) {
          counts[p.category] = (counts[p.category] || 0) + 1;
        }

        const items: CategoryFilterItem[] = [
          { name: 'All', count: projects.length }
        ];

        Object.keys(counts).sort().forEach(cat => {
          items.push({ name: cat, count: counts[cat] });
        });

        return items;
      })
    );
  }

  /**
   * Returns related projects matching category (excluding current project)
   */
  getRelatedProjects(currentId: string, category: string, limit: number = 3): Observable<PortfolioProject[]> {
    return this.projects$.pipe(
      map(projects => 
        projects
          .filter(p => p.id !== currentId && p.category.toLowerCase() === category.toLowerCase())
          .slice(0, limit)
      )
    );
  }

  /**
   * Returns all unique tags
   */
  getAllTags(): Observable<string[]> {
    return this.projects$.pipe(
      map(projects => {
        const tags = new Set<string>();
        projects.forEach(p => p.tags?.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
      })
    );
  }
}
