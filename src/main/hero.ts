/**
 * Fetch + cache the Settings hero payload.
 *
 * Same shape as the skills catalog: served from cache when fresh, refreshed in
 * the background otherwise, and NEVER fatal — a failed fetch falls back to the
 * cached copy, then to the defaults compiled into the app. The card must render
 * instantly and offline, because it sits at the top of a dialog people open to
 * change a folder.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { getText } from './fetchText';
import { parseHeroPayload, DEFAULT_HERO, type HeroPayload } from '../shared/heroPayload';

const HERO_URL = '';
/** Plan copy and sponsors change on a human timescale. */
const TTL_MS = 6 * 60 * 60 * 1000;

export async function loadHero(
  cachePath: string,
  opts: { force?: boolean } = {}
): Promise<{ hero: HeroPayload; fetchedAt: number; stale: boolean }> {
  let cached: { hero: HeroPayload; fetchedAt: number } | null = null;
  try {
    if (existsSync(cachePath)) cached = JSON.parse(readFileSync(cachePath, 'utf8'));
  } catch { cached = null; }

  return { hero: cached?.hero ?? DEFAULT_HERO, fetchedAt: cached?.fetchedAt ?? 0, stale: false };
}
