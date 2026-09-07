import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-content-helper',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent],
  templateUrl: './content-helper.component.html',
  styleUrls: ['./content-helper.component.scss']
})
export class ContentHelperComponent {
  title = '';
  description = '';
  category = 'Video Editing';
  type: 'image' | 'video' = 'video';
  year: number = new Date().getFullYear();
  client = '';
  role = 'Lead Editor';
  duration = '0:45';
  tools = 'Premiere Pro, DaVinci Resolve';
  tags = 'Video Editing, Color Grading';
  thumbnail = 'assets/thumbnails/my-project.jpg';
  media = 'assets/videos/my-project.mp4';
  aspectRatio = '16:9';
  featured = false;

  generatedJson = '';
  copied = false;

  generateSlug(str: string): string {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'new-project';
  }

  generateJson() {
    const projectSlug = this.generateSlug(this.title);

    const projectObj: any = {
      id: projectSlug,
      title: this.title || 'Untitled Project',
      description: this.description || 'Project description...',
      category: this.category,
      type: this.type,
      thumbnail: this.thumbnail,
      media: this.media,
      featured: this.featured,
      year: Number(this.year),
      tags: this.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (this.client) projectObj.client = this.client;
    if (this.role) projectObj.role = this.role;
    if (this.type === 'video' && this.duration) projectObj.duration = this.duration;
    if (this.aspectRatio) projectObj.aspectRatio = this.aspectRatio;
    if (this.tools) {
      projectObj.tools = this.tools.split(',').map(t => t.trim()).filter(Boolean);
    }

    this.generatedJson = JSON.stringify(projectObj, null, 2);
  }

  copyJson() {
    if (!this.generatedJson) return;
    navigator.clipboard.writeText(this.generatedJson).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2500);
    });
  }
}
