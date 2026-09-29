import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
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

export const collections = { projects };
