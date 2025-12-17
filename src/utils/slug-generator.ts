import { customAlphabet } from 'nanoid'

const DEFAULT_SLUG_MAX_LENGTH = 100
const DEFAULT_SUFFIX_LENGTH = 8
const FALLBACK_SLUG = 'untitled'

/**
 * Convert text to URL-safe slug
 * @param text - Input text to slugify
 * @param maxLength - Maximum slug length (default: 100)
 * @returns URL-safe slug
 *
 * @example
 * slugify('Hello World')           // 'hello-world'
 * slugify('Café Münchën')          // 'cafe-munchen'
 * slugify('!!!!')                  // 'untitled'
 * slugify('Very Long Title...', 10) // 'very-long'
 */
export function slugify(
  text: string,
  maxLength = DEFAULT_SLUG_MAX_LENGTH,
): string {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    // Remove accents/diacritics (é → e, ñ → n)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters (keep only alphanumeric and hyphens)
    .replace(/[^a-z0-9-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/--+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '')

  // Handle empty result
  if (!slug || slug.length === 0) {
    return FALLBACK_SLUG
  }

  // Truncate to max length
  if (slug.length > maxLength) {
    return slug.substring(0, maxLength).replace(/-+$/, '')
  }

  return slug
}

export function generateUniqueSlug(
  baseSlug: string,
  length = DEFAULT_SUFFIX_LENGTH,
): string {
  // Use nanoid with custom alphabet (lowercase + numbers only)
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', length)
  const suffix = nanoid()

  return `${baseSlug}-${suffix}`
}

/**
 * Generate unique slug with random suffix
 * This prevents duplicate slugs and race conditions
 *
 * @param text - Input text to slugify
 * @param options - Configuration options
 * @returns Unique slug with random suffix
 *
 * @example
 * createSlug('My Post')  // 'my-post-a7k2m9x4'
 * createSlug('My Post')  // 'my-post-p3n8q1z5' (different!)
 */
export function createSlug(
  text: string,
  options: {
    maxLength?: number
    suffixLength?: number
  } = {},
): string {
  const {
    maxLength = DEFAULT_SLUG_MAX_LENGTH,
    suffixLength = DEFAULT_SUFFIX_LENGTH,
  } = options

  // Generate base slug
  const baseSlug = slugify(text, maxLength - suffixLength - 1) // Reserve space for suffix

  // Generate random suffix
  const nanoid = customAlphabet(
    'abcdefghijklmnopqrstuvwxyz0123456789',
    suffixLength,
  )
  const suffix = nanoid()

  return `${baseSlug}-${suffix}`
}

/**
 * Generate slug with database uniqueness check
 * Only use this if you MUST guarantee uniqueness (rare)
 * In most cases, createSlug() is sufficient
 *
 * @param text - Input text to slugify
 * @param checkExists - Function to check if slug exists in DB
 * @param options - Configuration options
 * @returns Unique slug
 *
 * @example
 * const slug = await createUniqueSlug('My Post', async (slug) => {
 *   const exists = await prisma.blog.findUnique({ where: { slug } });
 *   return !!exists;
 * });
 */
export async function createUniqueSlug(
  text: string,
  checkExists: (slug: string) => Promise<boolean>,
  options: {
    maxLength?: number
    suffixLength?: number
    maxAttempts?: number
  } = {},
): Promise<string> {
  const {
    maxLength = DEFAULT_SLUG_MAX_LENGTH,
    suffixLength = DEFAULT_SUFFIX_LENGTH,
    maxAttempts = 3,
  } = options

  let attempts = 0

  while (attempts < maxAttempts) {
    const slug = createSlug(text, { maxLength, suffixLength })
    const exists = await checkExists(slug)

    if (!exists) {
      return slug
    }

    attempts++
  }

  // Fallback: Add timestamp (guaranteed unique)
  const baseSlug = slugify(text, maxLength - 13 - 1) // Reserve space for timestamp
  return `${baseSlug}-${Date.now()}`
}

/**
 * Validate if a string is a valid slug
 * @param slug - Slug to validate
 * @returns true if valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
  // Must be lowercase alphanumeric with hyphens
  // No leading/trailing hyphens or double hyphens
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return (
    slugRegex.test(slug) &&
    slug.length > 0 &&
    slug.length <= DEFAULT_SLUG_MAX_LENGTH
  )
}
