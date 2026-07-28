import type { APIContext } from 'astro';
import { buildFeed } from '../feed';

// Preserved from the old Jekyll site (a custom /atom.xml existed).
export const GET = (context: APIContext) => buildFeed(context);
