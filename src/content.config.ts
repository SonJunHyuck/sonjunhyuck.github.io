import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const devlog = defineCollection({
  loader: glob({ base: './src/content/devlog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    notionUrl: z.string().url().optional(),
    notionLabel: z.string().default('Notion에서 상세 개발노트 읽기'),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    status: z.enum(['released', 'in-progress', 'prototype']),
    role: z.string(),
    team: z.string(),
    platform: z.array(z.string()),
    genres: z.array(z.string()),
    thumbnail: z.string().optional(),
    trailerUrl: z.string().url().optional(),
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
    })),
    challenges: z.array(z.object({
      problem: z.string(),
      solution: z.string(),
      result: z.string().optional(),
    })).default([]),
    notionUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
  }),
});

export const collections = { devlog, projects };
