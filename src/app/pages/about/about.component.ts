import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { siteConfig } from '../../core/config/site.config';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { CtaSectionComponent } from '../../shared/components/cta-section/cta-section.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, PageHeaderComponent, CtaSectionComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  config = siteConfig;

  skills = [
    { name: 'Adobe Premiere Pro (Rhythmic Pacing & Assembly)', level: '96%' },
    { name: 'DaVinci Resolve Studio (Color Grading & Finishing)', level: '92%' },
    { name: 'After Effects (Motion Graphics & Title Cards)', level: '88%' },
    { name: 'Adobe Photoshop & Retouching', level: '95%' },
    { name: 'Adobe Illustrator & Brand Typography', level: '90%' },
    { name: 'Sound Design & Audio Mastering', level: '85%' }
  ];

  milestones = [
    {
      year: '2024 — Present',
      role: 'Independent Creative Director & Senior Video Editor',
      description: 'Directing commercial post-production, branding identity systems, and high-retention video campaigns for global brands and independent creators.'
    },
    {
      year: '2022 — 2024',
      role: 'Lead Post-Production Editor // Studio Collective',
      description: 'Supervised video editing teams, color graded multi-camera broadcast commercials, and developed standardized post-production pipelines.'
    },
    {
      year: '2020 — 2022',
      role: 'Graphic Designer & Visual Content Creator',
      description: 'Crafted digital brand guidelines, social-first video cuts, product mockups, and festival typography key art.'
    }
  ];

  processSteps = [
    {
      step: '01',
      title: 'Vision & Scripting',
      description: 'Understanding core brand narrative, target retention metrics, music direction, and pacing requirements.'
    },
    {
      step: '02',
      title: 'Assembly & Beat Match',
      description: 'Rough cuts focused purely on flow, match cuts, visual momentum, and sound synchronization.'
    },
    {
      step: '03',
      title: 'Color & Sound Finishing',
      description: 'Cinematic DaVinci Resolve color grading, custom LUT application, foley, and dynamic audio mastering.'
    },
    {
      step: '04',
      title: 'Master Delivery',
      description: 'Final multi-aspect exports (16:9, 9:16, 1:1, 4:5) optimized for social, streaming, or commercial broadcast.'
    }
  ];
}
