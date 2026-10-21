import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    cardContribution: z.string().optional(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    category: z.enum(['game', 'graphics', 'ai']),
    projectGroup: z.enum(['work', 'games', 'research', 'ai']),
    workTypes: z.array(z.enum(['learning', 'experiment', 'personal', 'team', 'professional', 'live-service', 'research'])).default([]),
    status: z.enum(['released', 'in-progress', 'prototype']),
    period: z.string().optional(),
    role: z.string().optional(),
    team: z.string().optional(),
    teamSize: z.string().optional(),
    platform: z.array(z.string()).default([]),
    genres: z.array(z.string()).default([]),
    thumbnail: z.string().optional(),
    trailerUrl: z.string().url().optional(),
    videos: z.array(z.object({
      title: z.string(),
      youtubeId: z.string(),
      url: z.string().url(),
      description: z.string().optional(),
    })).default([]),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    technologies: z.array(z.object({
      name: z.string(),
      purpose: z.string(),
    })),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      highlight: z.string().optional(),
    })),
    challenges: z.array(z.object({
      problem: z.string(),
      solution: z.string(),
      result: z.string().optional(),
    })).default([]),
    notionUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    playableUrl: z.string().url().optional(),
    externalLinks: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).default([]),
    isExample: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const feed = defineCollection({
  loader: glob({
    base: './src/content/feed',
    // Exclude development fixtures before Astro imports their image assets.
    pattern: import.meta.env.DEV ? '**/*.md' : ['**/*.md', '!_examples/**'],
    generateId: ({ entry }) => entry.replace(/^_examples\//, '').replace(/\.md$/, ''),
  }),
  schema: ({ image }) => z.object({
    title: z.string().trim().min(1),
    date: z.coerce.date(),
    notionUrl: z.string().url(),
    tags: z.array(z.string().trim().min(1)).default([]),
    image: image().optional(),
    imageAlt: z.string().trim().min(1).optional(),
    draft: z.boolean().default(false),
  }).superRefine((data, context) => {
    if (data.image && !data.imageAlt) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['imageAlt'], message: '사진의 대체 텍스트가 필요합니다.' });
    }
  }),
});

export const collections = { projects, feed };
