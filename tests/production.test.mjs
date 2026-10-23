import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {phaseStatuses, projectConfig} from '../src/projectConfig.js';

const output = resolve('dist');
const html = readFileSync(resolve(output, 'index.html'), 'utf8');

test('production identity and social metadata are present', () => {
  assert.match(html, /<title>WALLY — Robinhood Chain risk intelligence<\/title>/);
  for (const name of ['description', 'theme-color', 'og:title', 'og:description', 'og:type', 'twitter:card']) {
    assert.ok(html.includes(`="${name}"`), `Missing metadata: ${name}`);
  }
  assert.match(html, /rel="canonical" href="https:\/\/wallyrobinhood\.vercel\.app\/"/);
  assert.doesNotMatch(html, /vite\.svg|Vite \+ React|noindex|localhost|127\.0\.0\.1/);
});

test('all HTML asset references resolve within build output', () => {
  const refs = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)].map(match => match[1]);
  assert.ok(refs.length >= 5);
  for (const ref of refs) assert.ok(existsSync(resolve(output, ref.slice(1))), `Missing built asset: ${ref}`);
  const icon = readFileSync(resolve(output, 'apple-touch-icon.png'));
  assert.equal(icon.readUInt32BE(16), 180);
  assert.equal(icon.readUInt32BE(20), 180);
});

test('built JS module imports and lazy chunks resolve', () => {
  const assets = resolve(output, 'assets');
  for (const file of readdirSync(assets).filter(name => name.endsWith('.js'))) {
    const code = readFileSync(resolve(assets, file), 'utf8');
    for (const [, imported] of code.matchAll(/(?:from|import)\s*["']\.\/([^"']+)["']/g)) {
      assert.ok(existsSync(resolve(assets, imported)), `${file} imports missing ${imported}`);
    }
    assert.doesNotMatch(code, /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?/);
  }
  assert.ok(readdirSync(assets).some(file => file.startsWith('Core-')));
  assert.ok(readdirSync(assets).some(file => file.startsWith('three-')));
  assert.equal(existsSync(resolve(output, 'tests')), false, 'Development harness must not deploy');
  assert.equal(existsSync(resolve(output, '.env')), false);
});

test('published roadmap status and pending official details stay accurate', () => {
  assert.deepEqual(phaseStatuses, ['LIVE', 'COMING SOON', 'FUTURE ROADMAP', 'FUTURE ROADMAP', 'FUTURE ROADMAP']);
  assert.equal(projectConfig.tokenContractAddress, '');
  assert.equal(projectConfig.telegramBotUrl, '');
  const source = readFileSync(resolve('src/main.jsx'), 'utf8');
  for (const heading of ['Minimum Viable Product', 'Enhanced Analytics', 'Advanced Security Features', 'User Experience Differentiators', 'Growth and Differentiation']) assert.ok(source.includes(heading));
  assert.ok(source.includes('ILLUSTRATIVE UI · SAMPLE DATA'));
});
