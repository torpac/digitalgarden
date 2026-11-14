import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const mediaFields = {
  title: z.string(),
  description: z.string().optional(),
  year: z.number().optional(),
  rank: z.number().int().positive().optional(),
  rating: z.number().min(0).max(10).optional(),
  cover: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  example: z.boolean().default(false),
  draft: z.boolean().default(false),
};
const mediaCollection = (folder: string, extra: Record<string, any> = {}) => defineCollection({
  loader: glob({ pattern: '**/*.md', base: `./src/content/${folder}` }),
  schema: z.object({ ...mediaFields, ...extra }),
});
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    stage: z.enum(['seedling', 'growing', 'evergreen']).default('seedling'),
    featured: z.boolean().default(false),
    example: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});
const films = mediaCollection('films', { watched: z.coerce.date().optional() });
const games = mediaCollection('games', { platform: z.string().optional(), hours: z.number().nonnegative().optional() });
const series = mediaCollection('series');
const books = mediaCollection('books', { author: z.string().optional(), finished: z.coerce.date().optional() });
const playlists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/playlists' }),
  schema: z.object({
    title: z.string(), description: z.string().optional(),
    spotifyUrl: z.string().optional(), mood: z.string().optional(),
    order: z.number().int().nonnegative().default(99),
    example: z.boolean().default(false), draft: z.boolean().default(false),
  }),
});
const pins = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pins' }),
  schema: z.object({
    title: z.string(), description: z.string().optional(), link: z.string().optional(),
    image: z.string().optional(), order: z.number().int().nonnegative().default(99),
    example: z.boolean().default(false), draft: z.boolean().default(false),
  }),
});
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    description: z.string().optional(),
    sourceUrl: z.string().optional(),
    date: z.coerce.date().optional(),
    order: z.number().int().nonnegative().default(99),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().default(false),
  }),
});
export const collections = { posts, films, games, series, books, playlists, pins, gallery };
