import type { APIContext } from 'astro';
import { buildFeed } from '../feed';

// Preserved from the old Jekyll site (jekyll-feed served /feed.xml).
export const GET = (context: APIContext) => buildFeed(context);
