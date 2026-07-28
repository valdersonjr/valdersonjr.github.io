import type { APIContext } from 'astro';
import { buildFeed } from '../feed';

export const GET = (context: APIContext) => buildFeed(context);
