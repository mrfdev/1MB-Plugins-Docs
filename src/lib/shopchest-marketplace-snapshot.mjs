const TOP_LEVEL_FIELDS = Object.freeze([
  'schemaVersion',
  'documentType',
  'metadata',
  'counts',
  'listings',
]);
const METADATA_FIELDS = Object.freeze([
  'capturedAt',
  'displayTimezone',
  'sourceVersion',
  'banner',
  'marketplaceLabel',
]);
const COUNT_FIELDS = Object.freeze([
  'candidates',
  'published',
  'inStock',
  'outOfStock',
  'unchecked',
  'excludedUnavailable',
  'excludedInvalid',
]);
const LISTING_FIELDS = Object.freeze([
  'ownerName',
  'storefrontName',
  'directions',
  'material',
  'itemName',
  'variantSummary',
  'bundleAmount',
  'customerBuyPrice',
  'customerBuyUnitPrice',
  'availabilityAtCapture',
  'locationLabel',
]);
const CSV_FIELDS = Object.freeze([
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
]);
const CSV_METADATA_FIELD_COUNT = 13;
const AVAILABILITIES = Object.freeze(['IN_STOCK', 'OUT_OF_STOCK', 'UNCHECKED']);
const DECIMAL_PATTERN = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
const INTEGER_PATTERN = /^(?:0|[1-9]\d*)$/;
const MATERIAL_PATTERN = /^[A-Z][A-Z0-9_]*$/;

export const MARKETPLACE_SNAPSHOT_CSV_HEADER = CSV_FIELDS.join(',');

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function requireObject(value, label) {
  if (!isPlainObject(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function requireExactFields(value, fields, label) {
  const expected = new Set(fields);
  for (const field of Object.keys(value)) {
    if (!expected.has(field)) {
      throw new Error(`${label} has unexpected field ${field}.`);
    }
  }
  for (const field of fields) {
    if (!Object.hasOwn(value, field)) {
      throw new Error(`${label} is missing field ${field}.`);
    }
  }
}

function requireText(value, label) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value;
}

function requireOptionalText(value, label) {
  if (value === null) return null;
  return requireText(value, label);
}

function requirePositiveDecimal(value, label) {
  const numeric = Number(value);
  if (
    typeof value !== 'string'
    || !DECIMAL_PATTERN.test(value)
    || !Number.isFinite(numeric)
    || numeric <= 0
  ) {
    throw new Error(`${label} must be a positive decimal string.`);
  }
  return value;
}

function requireNonNegativeInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${label} must be a non-negative integer.`);
  }
  return value;
}

function parseNonNegativeInteger(value, label) {
  if (typeof value !== 'string' || !INTEGER_PATTERN.test(value)) {
    throw new Error(`${label} must be a non-negative integer.`);
  }
  const parsed = Number(value);
  return requireNonNegativeInteger(parsed, label);
}

function parsePositiveInteger(value, label) {
  const parsed = parseNonNegativeInteger(value, label);
  if (parsed <= 0) {
    throw new Error(`${label} must be a positive integer.`);
  }
  return parsed;
}

function requireTimezone(value, label) {
  const timezone = requireText(value, label);
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: timezone }).format(new Date(0));
  } catch {
    throw new Error(`${label} must be a supported IANA timezone.`);
  }
  return timezone;
}

function validateMetadata(value, label) {
  const metadata = requireObject(value, label);
  requireExactFields(metadata, METADATA_FIELDS, label);
  const capturedAt = requireText(metadata.capturedAt, `${label}.capturedAt`);
  if (!capturedAt.endsWith('Z') || Number.isNaN(Date.parse(capturedAt))) {
    throw new Error(`${label}.capturedAt must be a UTC timestamp.`);
  }
  requireTimezone(metadata.displayTimezone, `${label}.displayTimezone`);
  requireText(metadata.sourceVersion, `${label}.sourceVersion`);
  requireText(metadata.banner, `${label}.banner`);
  requireText(metadata.marketplaceLabel, `${label}.marketplaceLabel`);
  return metadata;
}

function validateCounts(value, label) {
  const counts = requireObject(value, label);
  requireExactFields(counts, COUNT_FIELDS, label);
  for (const field of COUNT_FIELDS) {
    requireNonNegativeInteger(counts[field], `${label}.${field}`);
  }
  if (counts.published !== counts.inStock + counts.outOfStock + counts.unchecked) {
    throw new Error(`${label}.published must equal inStock + outOfStock + unchecked.`);
  }
  if (counts.candidates !== counts.published + counts.excludedUnavailable + counts.excludedInvalid) {
    throw new Error(`${label}.candidates must equal published + excludedUnavailable + excludedInvalid.`);
  }
  return counts;
}

function validateListing(value, index, parentLabel = 'listings') {
  const label = `${parentLabel}[${index}]`;
  const listing = requireObject(value, label);
  requireExactFields(listing, LISTING_FIELDS, label);
  requireText(listing.ownerName, `${label}.ownerName`);
  requireOptionalText(listing.storefrontName, `${label}.storefrontName`);
  requireOptionalText(listing.directions, `${label}.directions`);
  if (typeof listing.material !== 'string' || !MATERIAL_PATTERN.test(listing.material)) {
    throw new Error(`${label}.material must be a canonical uppercase material key.`);
  }
  requireText(listing.itemName, `${label}.itemName`);
  requireOptionalText(listing.variantSummary, `${label}.variantSummary`);
  if (!Number.isSafeInteger(listing.bundleAmount) || listing.bundleAmount <= 0) {
    throw new Error(`${label}.bundleAmount must be a positive integer.`);
  }
  requirePositiveDecimal(listing.customerBuyPrice, `${label}.customerBuyPrice`);
  requirePositiveDecimal(listing.customerBuyUnitPrice, `${label}.customerBuyUnitPrice`);
  if (!AVAILABILITIES.includes(listing.availabilityAtCapture)) {
    throw new Error(`${label}.availabilityAtCapture is unsupported.`);
  }
  requireOptionalText(listing.locationLabel, `${label}.locationLabel`);
  return listing;
}

function assertCountsMatchListings(counts, listings, label) {
  const availabilityCounts = Object.fromEntries(AVAILABILITIES.map((value) => [value, 0]));
  for (const listing of listings) {
    availabilityCounts[listing.availabilityAtCapture] += 1;
  }
  if (counts.published !== listings.length) {
    throw new Error(`${label}.published must match the number of published listings.`);
  }
  if (
    counts.inStock !== availabilityCounts.IN_STOCK
    || counts.outOfStock !== availabilityCounts.OUT_OF_STOCK
    || counts.unchecked !== availabilityCounts.UNCHECKED
  ) {
    throw new Error(`${label} availability counts must match the published listings.`);
  }
}

export function validateMarketplaceSnapshot(value) {
  const snapshot = requireObject(value, 'Marketplace snapshot');
  requireExactFields(snapshot, TOP_LEVEL_FIELDS, 'Marketplace snapshot');
  if (snapshot.schemaVersion !== 2) {
    throw new Error('Marketplace snapshot schemaVersion must be 2.');
  }
  if (snapshot.documentType !== 'shopchest-marketplace-snapshot') {
    throw new Error('Marketplace snapshot documentType is unsupported.');
  }

  validateMetadata(snapshot.metadata, 'Marketplace snapshot metadata');
  const counts = validateCounts(snapshot.counts, 'Marketplace snapshot counts');
  if (!Array.isArray(snapshot.listings)) {
    throw new Error('Marketplace snapshot listings must be an array.');
  }
  snapshot.listings.forEach((listing, index) => validateListing(listing, index));
  assertCountsMatchListings(counts, snapshot.listings, 'Marketplace snapshot counts');
  return snapshot;
}

function parseCsvRecords(source) {
  const records = [];
  let record = [];
  let field = '';
  let state = 'START';

  function finishField() {
    record.push(field);
    field = '';
    state = 'START';
  }

  function finishRecord() {
    finishField();
    records.push(record);
    record = [];
  }

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    if (state === 'QUOTED') {
      if (character === '"') {
        if (source[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          state = 'AFTER_QUOTE';
        }
      } else {
        field += character;
      }
      continue;
    }

    if (state === 'AFTER_QUOTE') {
      if (character === ',') {
        finishField();
      } else if (character === '\n' || character === '\r') {
        if (character === '\r' && source[index + 1] === '\n') index += 1;
        finishRecord();
      } else {
        throw new Error('Marketplace snapshot CSV has characters after a closing quote.');
      }
      continue;
    }

    if (state === 'START' && character === '"') {
      state = 'QUOTED';
    } else if (character === ',') {
      finishField();
    } else if (character === '\n' || character === '\r') {
      if (character === '\r' && source[index + 1] === '\n') index += 1;
      finishRecord();
    } else if (character === '"') {
      throw new Error('Marketplace snapshot CSV has an unexpected quote.');
    } else {
      state = 'UNQUOTED';
      field += character;
    }
  }

  if (state === 'QUOTED') {
    throw new Error('Marketplace snapshot CSV has an unterminated quoted field.');
  }
  if (record.length > 0 || field.length > 0 || state !== 'START') {
    finishRecord();
  }
  return records;
}

function csvRecordObject(record) {
  return Object.fromEntries(CSV_FIELDS.map((field, index) => [field, record[index]]));
}

function requireCsvSafeText(value, label) {
  const text = requireText(value, label);
  const firstVisible = [...text].find((character) => (
    !/\p{White_Space}/u.test(character) && !/\p{Cf}/u.test(character)
  ));
  if (firstVisible && ['=', '+', '-', '@', '\t', '\r', '\n'].includes(firstVisible)) {
    throw new Error(`${label} has an unsafe spreadsheet formula prefix.`);
  }
  return text;
}

function csvMetadata(record) {
  const metadata = {
    capturedAt: record.captured_at,
    displayTimezone: record.display_timezone,
    sourceVersion: record.source_version,
    banner: record.banner,
    marketplaceLabel: record.marketplace_label,
  };
  validateMetadata(metadata, 'Marketplace snapshot CSV metadata');
  for (const [field, value] of [
    ['source_version', record.source_version],
    ['banner', record.banner],
    ['marketplace_label', record.marketplace_label],
  ]) {
    requireCsvSafeText(value, `Marketplace snapshot CSV ${field}`);
  }
  return metadata;
}

function csvCounts(record) {
  const counts = {
    candidates: parseNonNegativeInteger(record.candidates, 'Marketplace snapshot CSV candidates'),
    published: parseNonNegativeInteger(record.published, 'Marketplace snapshot CSV published'),
    inStock: parseNonNegativeInteger(record.in_stock, 'Marketplace snapshot CSV in_stock'),
    outOfStock: parseNonNegativeInteger(record.out_of_stock, 'Marketplace snapshot CSV out_of_stock'),
    unchecked: parseNonNegativeInteger(record.unchecked, 'Marketplace snapshot CSV unchecked'),
    excludedUnavailable: parseNonNegativeInteger(
      record.excluded_unavailable,
      'Marketplace snapshot CSV excluded_unavailable',
    ),
    excludedInvalid: parseNonNegativeInteger(
      record.excluded_invalid,
      'Marketplace snapshot CSV excluded_invalid',
    ),
  };
  return validateCounts(counts, 'Marketplace snapshot CSV counts');
}

function optionalCsvText(value, label) {
  if (value === '') return null;
  return requireCsvSafeText(value, label);
}

function csvListing(record, index) {
  const label = `Marketplace snapshot CSV listings[${index}]`;
  const listing = {
    ownerName: requireCsvSafeText(record.owner_name, `${label}.ownerName`),
    storefrontName: optionalCsvText(record.storefront_name, `${label}.storefrontName`),
    directions: optionalCsvText(record.directions, `${label}.directions`),
    material: record.material,
    itemName: requireCsvSafeText(record.item_name, `${label}.itemName`),
    variantSummary: optionalCsvText(record.variant_summary, `${label}.variantSummary`),
    bundleAmount: parsePositiveInteger(record.bundle_amount, `${label}.bundleAmount`),
    customerBuyPrice: record.customer_buy_price,
    customerBuyUnitPrice: record.customer_buy_unit_price,
    availabilityAtCapture: record.availability_at_capture,
    locationLabel: optionalCsvText(record.location_label, `${label}.locationLabel`),
  };
  return validateListing(listing, index, 'Marketplace snapshot CSV listings');
}

function parseMarketplaceSnapshotCsvDocument(source) {
  if (typeof source !== 'string') {
    throw new Error('Marketplace snapshot CSV must be text.');
  }
  const records = parseCsvRecords(source);
  if (!records.length || records[0].join(',') !== MARKETPLACE_SNAPSHOT_CSV_HEADER) {
    throw new Error('Marketplace snapshot CSV header does not match the public schema.');
  }
  const dataRecords = records.slice(1);
  if (!dataRecords.length) {
    throw new Error('Marketplace snapshot CSV must include capture metadata.');
  }
  for (const [index, record] of dataRecords.entries()) {
    if (record.length !== CSV_FIELDS.length) {
      throw new Error(`Marketplace snapshot CSV row ${index + 2} must have ${CSV_FIELDS.length} fields.`);
    }
  }

  const first = csvRecordObject(dataRecords[0]);
  if (first.schema_version !== '2') {
    throw new Error('Marketplace snapshot CSV schema_version must be 2.');
  }
  const metadata = csvMetadata(first);
  const counts = csvCounts(first);
  const sharedPrefix = dataRecords[0].slice(0, CSV_METADATA_FIELD_COUNT);
  const listings = [];
  const listingRecords = [];
  let metadataOnlyRows = 0;

  for (const [index, cells] of dataRecords.entries()) {
    if (cells.slice(0, CSV_METADATA_FIELD_COUNT).some((value, field) => value !== sharedPrefix[field])) {
      throw new Error(`Marketplace snapshot CSV row ${index + 2} does not repeat the same capture metadata and counts.`);
    }
    const listingCells = cells.slice(CSV_METADATA_FIELD_COUNT);
    if (listingCells.every((value) => value === '')) {
      metadataOnlyRows += 1;
      continue;
    }
    const record = csvRecordObject(cells);
    listings.push(csvListing(record, listings.length));
    listingRecords.push(cells);
  }

  if (metadataOnlyRows > 0 && (metadataOnlyRows !== 1 || dataRecords.length !== 1 || counts.published !== 0)) {
    throw new Error('Marketplace snapshot CSV metadata-only row is valid only for an empty published snapshot.');
  }
  if (metadataOnlyRows === 0 && listings.length === 0) {
    throw new Error('Marketplace snapshot CSV must include a listing or one metadata-only row.');
  }
  assertCountsMatchListings(counts, listings, 'Marketplace snapshot CSV counts');
  return { metadata, counts, listings, listingRecords, sharedPrefix };
}

export function parseMarketplaceSnapshotCsv(source) {
  const { metadata, counts, listings } = parseMarketplaceSnapshotCsvDocument(source);
  return { metadata, counts, listings };
}

export function validateMarketplaceSnapshotCsv(source) {
  parseMarketplaceSnapshotCsvDocument(source);
  return true;
}

function neutralizeCsvFormula(value) {
  const text = String(value);
  for (const character of text) {
    if (['=', '+', '-', '@', '\t', '\r', '\n'].includes(character)) {
      return `'${text}`;
    }
    if (!/\p{White_Space}/u.test(character) && !/\p{Cf}/u.test(character)) {
      return text;
    }
  }
  return text;
}

function csvText(value) {
  return value === null ? '' : neutralizeCsvFormula(value);
}

function expectedCsvPrefix(snapshot) {
  return [
    csvText(snapshot.metadata.capturedAt),
    csvText(snapshot.metadata.displayTimezone),
    csvText(snapshot.metadata.sourceVersion),
    '2',
    String(snapshot.counts.candidates),
    String(snapshot.counts.published),
    String(snapshot.counts.inStock),
    String(snapshot.counts.outOfStock),
    String(snapshot.counts.unchecked),
    String(snapshot.counts.excludedUnavailable),
    String(snapshot.counts.excludedInvalid),
    csvText(snapshot.metadata.banner),
    csvText(snapshot.metadata.marketplaceLabel),
  ];
}

function expectedCsvListing(listing) {
  return [
    csvText(listing.ownerName),
    csvText(listing.storefrontName),
    csvText(listing.directions),
    csvText(listing.material),
    csvText(listing.itemName),
    csvText(listing.variantSummary),
    String(listing.bundleAmount),
    listing.customerBuyPrice,
    listing.customerBuyUnitPrice,
    csvText(listing.availabilityAtCapture),
    csvText(listing.locationLabel),
  ];
}

export function validateMarketplaceSnapshotPair(jsonValue, csvSource) {
  const snapshot = validateMarketplaceSnapshot(jsonValue);
  const csv = parseMarketplaceSnapshotCsvDocument(csvSource);
  const expectedPrefix = expectedCsvPrefix(snapshot);
  if (csv.sharedPrefix.some((value, index) => value !== expectedPrefix[index])) {
    const labels = [
      'capturedAt', 'displayTimezone', 'sourceVersion', 'schemaVersion', 'candidates',
      'published', 'inStock', 'outOfStock', 'unchecked', 'excludedUnavailable',
      'excludedInvalid', 'banner', 'marketplaceLabel',
    ];
    const index = csv.sharedPrefix.findIndex((value, field) => value !== expectedPrefix[field]);
    throw new Error(`Marketplace snapshot JSON/CSV ${labels[index]} values do not match.`);
  }
  if (csv.listings.length !== snapshot.listings.length) {
    throw new Error('Marketplace snapshot JSON/CSV published listing counts do not match.');
  }
  for (const [index, listing] of snapshot.listings.entries()) {
    const expected = expectedCsvListing(listing);
    const actual = csv.listingRecords[index].slice(CSV_METADATA_FIELD_COUNT);
    if (actual.some((value, field) => value !== expected[field])) {
      throw new Error(`Marketplace snapshot JSON/CSV listings[${index}] values do not match.`);
    }
  }
  return snapshot;
}

function normalizeQuery(value) {
  return String(value ?? '').trim().toLocaleLowerCase('en-US').replaceAll('_', ' ');
}

export function filterMarketplaceListings(listings, options = {}) {
  const itemQuery = normalizeQuery(options.itemQuery);
  const ownerQuery = normalizeQuery(options.ownerQuery);
  const availability = options.availability ?? 'ALL';
  if (availability !== 'ALL' && !AVAILABILITIES.includes(availability)) {
    throw new Error(`Unsupported availability filter: ${availability}`);
  }

  return listings.filter((listing) => {
    if (availability !== 'ALL' && listing.availabilityAtCapture !== availability) return false;
    const itemHaystack = normalizeQuery([
      listing.material,
      listing.itemName,
      listing.variantSummary,
    ].filter(Boolean).join(' '));
    if (itemQuery && !itemHaystack.includes(itemQuery)) return false;
    const ownerHaystack = normalizeQuery([
      listing.ownerName,
      listing.storefrontName,
    ].filter(Boolean).join(' '));
    return !ownerQuery || ownerHaystack.includes(ownerQuery);
  });
}
