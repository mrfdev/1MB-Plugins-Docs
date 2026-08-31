import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  filterMarketplaceListings,
  parseMarketplaceSnapshotCsv,
  validateMarketplaceSnapshot,
  validateMarketplaceSnapshotCsv,
  validateMarketplaceSnapshotPair,
} from '../src/lib/shopchest-marketplace-snapshot.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function snapshot(overrides = {}) {
  return {
    schemaVersion: 2,
    documentType: 'shopchest-marketplace-snapshot',
    metadata: {
      capturedAt: '2026-08-31T12:34:56Z',
      displayTimezone: 'Europe/Amsterdam',
      sourceVersion: '783',
      banner: 'In August 2026, this is what we found at /warp shops.',
      marketplaceLabel: '/warp shops',
    },
    counts: {
      candidates: 3,
      published: 1,
      inStock: 1,
      outOfStock: 0,
      unchecked: 0,
      excludedUnavailable: 1,
      excludedInvalid: 1,
    },
    listings: [{
      ownerName: 'JahLion',
      storefrontName: "JahLion's Gear",
      directions: 'Look for the lion head',
      material: 'STONE_BRICKS',
      itemName: 'Stone Bricks',
      variantSummary: null,
      bundleAmount: 64,
      customerBuyPrice: '100.00',
      customerBuyUnitPrice: '1.5625',
      availabilityAtCapture: 'IN_STOCK',
      locationLabel: 'Marketplace stall',
    }],
    ...overrides,
  };
}

test('ShopChest marketplace snapshots require the exact public schema and source version', () => {
  assert.equal(validateMarketplaceSnapshot(snapshot()).listings.length, 1);
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({ metadata: { ...snapshot().metadata, sourceVersion: '' } })),
    /sourceVersion/,
  );
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({ ownerUuid: 'not-public' })),
    /unexpected field ownerUuid/,
  );
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({
      listings: [{ ...snapshot().listings[0], exactCoordinates: 'general,10,64,10' }],
    })),
    /unexpected field exactCoordinates/,
  );
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({
      listings: [{ ...snapshot().listings[0], availabilityAtCapture: 'UNAVAILABLE' }],
    })),
    /availabilityAtCapture/,
  );
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({
      counts: { ...snapshot().counts, published: 2 },
    })),
    /published/i,
  );
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({
      counts: { ...snapshot().counts, excludedInvalid: -1 },
    })),
    /excludedInvalid/,
  );
  assert.throws(
    () => validateMarketplaceSnapshot(snapshot({
      counts: { ...snapshot().counts, ownerCount: 1 },
    })),
    /unexpected field ownerCount/,
  );
});

test('snapshot filtering keeps item, owner, and availability controls independent', () => {
  const listings = [
    ...snapshot().listings,
    {
      ...snapshot().listings[0],
      ownerName: 'Builder',
      storefrontName: 'Builder Blocks',
      material: 'OAK_LOG',
      itemName: 'Oak Log',
      availabilityAtCapture: 'OUT_OF_STOCK',
    },
  ];

  assert.deepEqual(
    filterMarketplaceListings(listings, { itemQuery: 'stone brick', ownerQuery: 'jah', availability: 'IN_STOCK' }),
    [listings[0]],
  );
  assert.deepEqual(
    filterMarketplaceListings(listings, { itemQuery: '', ownerQuery: 'builder', availability: 'OUT_OF_STOCK' }),
    [listings[1]],
  );
});

test('snapshot CSV rejects schema drift before publication', () => {
  const header = [
    'captured_at',
    'display_timezone',
    'source_version',
    'schema_version',
    'candidates',
    'published',
    'in_stock',
    'out_of_stock',
    'unchecked',
    'excluded_unavailable',
    'excluded_invalid',
    'banner',
    'marketplace_label',
    'owner_name',
    'storefront_name',
    'directions',
    'material',
    'item_name',
    'variant_summary',
    'bundle_amount',
    'customer_buy_price',
    'customer_buy_unit_price',
    'availability_at_capture',
    'location_label',
  ].join(',');
  const row = [
    '"2026-08-31T12:34:56Z"',
    '"Europe/Amsterdam"',
    '"783"',
    '2',
    '3',
    '1',
    '1',
    '0',
    '0',
    '1',
    '1',
    '"In August 2026, this is what we found at /warp shops."',
    '"/warp shops"',
    '"JahLion"',
    '"JahLion\'s Gear"',
    '"Look for the lion head"',
    '"STONE_BRICKS"',
    '"Stone Bricks"',
    '""',
    '64',
    '100.00',
    '1.5625',
    '"IN_STOCK"',
    '"Marketplace stall"',
  ].join(',');
  assert.equal(validateMarketplaceSnapshotCsv(`${header}\r\n${row}\r\n`), true);
  assert.throws(() => validateMarketplaceSnapshotCsv(`${header},owner_uuid\n`), /header/);
  assert.throws(
    () => validateMarketplaceSnapshotCsv(`${header}\r\n${row.replace(',2,3,1,1,0,0,1,1,', ',1,3,1,1,0,0,1,1,')}\r\n`),
    /schema_version/,
  );
});

test('empty CSV export keeps metadata and aggregate counts without inventing a listing', () => {
  const source = [
    'captured_at,display_timezone,source_version,schema_version,candidates,published,in_stock,out_of_stock,unchecked,excluded_unavailable,excluded_invalid,banner,marketplace_label,owner_name,storefront_name,directions,material,item_name,variant_summary,bundle_amount,customer_buy_price,customer_buy_unit_price,availability_at_capture,location_label',
    '"2026-08-31T12:34:56Z","Europe/Amsterdam","783",2,2,0,0,0,0,1,1,"Nothing publishable yet.","/warp shops","","","","","","","","","","",""',
    '',
  ].join('\r\n');

  const parsed = parseMarketplaceSnapshotCsv(source);
  assert.equal(parsed.listings.length, 0);
  assert.deepEqual(parsed.counts, {
    candidates: 2,
    published: 0,
    inStock: 0,
    outOfStock: 0,
    unchecked: 0,
    excludedUnavailable: 1,
    excludedInvalid: 1,
  });
  assert.throws(
    () => parseMarketplaceSnapshotCsv(source.replace(',2,2,0,', ',2,2,1,')),
    /published/i,
  );
});

test('JSON and CSV snapshot pair must describe the same reviewed capture', () => {
  const csv = [
    'captured_at,display_timezone,source_version,schema_version,candidates,published,in_stock,out_of_stock,unchecked,excluded_unavailable,excluded_invalid,banner,marketplace_label,owner_name,storefront_name,directions,material,item_name,variant_summary,bundle_amount,customer_buy_price,customer_buy_unit_price,availability_at_capture,location_label',
    '"2026-08-31T12:34:56Z","Europe/Amsterdam","783",2,3,1,1,0,0,1,1,"In August 2026, this is what we found at /warp shops.","/warp shops","JahLion","JahLion\'s Gear","Look for the lion head","STONE_BRICKS","Stone Bricks","",64,100.00,1.5625,"IN_STOCK","Marketplace stall"',
    '',
  ].join('\r\n');

  assert.equal(validateMarketplaceSnapshotPair(snapshot(), csv).listings.length, 1);
  assert.throws(
    () => validateMarketplaceSnapshotPair(snapshot(), csv.replace('"783",2', '"784",2')),
    /sourceVersion/i,
  );
  assert.throws(
    () => validateMarketplaceSnapshotPair(snapshot(), csv.replace('"STONE_BRICKS"', '"OAK_LOG"')),
    /listings\[0\]/,
  );
});

test('browser component renders imported values as text and uses same-origin assets', async () => {
  const component = await readFile(
    path.join(repoRoot, 'src', 'components', 'ShopChestMarketplaceSnapshot.astro'),
    'utf8',
  );
  assert.match(component, /textContent =/);
  assert.doesNotMatch(component, /innerHTML|insertAdjacentHTML|document\.write/);
  assert.match(component, /fetch\(url, \{ credentials: 'same-origin' \}\)/);
  assert.match(component, /sourceVersion/);
  assert.match(component, /snapshot\.counts/);
  assert.match(component, /data-capture-summary/);
  assert.match(component, /prices and stock may have changed/i);
  assert.match(component, /data-item-search/);
  assert.match(component, /data-owner-search/);
  assert.match(component, /data-availability/);
  assert.match(component, /data-previous/);
  assert.match(component, /data-next/);

  const generator = await readFile(path.join(repoRoot, 'scripts', 'generate-site-content.mjs'), 'utf8');
  assert.match(generator, /marketplaceSnapshotJsonFile/);
  assert.match(generator, /marketplace-snapshot\.json/);
  assert.match(generator, /ShopChestMarketplaceSnapshot/);
  assert.doesNotMatch(generator, /rm\(path\.join\(repoRoot, 'public', 'catalogues'\)/);
});
