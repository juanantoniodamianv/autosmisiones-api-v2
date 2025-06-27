import { prisma } from "../repositories/base";

/**
 * Generates a URL-friendly slug from a string
 * @param text - The text to convert to slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normalize unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generates a unique slug for a publication based on vehicle make, model, and year
 * @param makeName - Vehicle make name
 * @param modelName - Vehicle model name
 * @param year - Vehicle year
 * @returns A unique slug
 */
export async function generateUniqueSlug(
  makeName: string,
  modelName: string,
  year: number
): Promise<string> {
  // Generate base slug
  const baseSlug = generateSlug(`${makeName}-${modelName}-${year}`);
  
  // Check if slug already exists
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    const existingPublication = await prisma.publication.findUnique({
      where: { slugUrl: slug }
    });
    
    if (!existingPublication) {
      break; // Slug is unique
    }
    
    // Generate new slug with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

/**
 * Generates a unique slug for a publication with fallback to title
 * @param makeName - Vehicle make name (optional)
 * @param modelName - Vehicle model name (optional)
 * @param year - Vehicle year (optional)
 * @param title - Publication title (fallback)
 * @returns A unique slug
 */
export async function generatePublicationSlug(
  makeName?: string,
  modelName?: string,
  year?: number,
  title?: string
): Promise<string> {
  // If we have all vehicle data, use it to generate slug
  if (makeName && modelName && year) {
    return await generateUniqueSlug(makeName, modelName, year);
  }
  
  // Fallback to title-based slug
  if (title) {
    const baseSlug = generateSlug(title);
    let slug = baseSlug;
    let counter = 1;
    
    while (true) {
      const existingPublication = await prisma.publication.findUnique({
        where: { slugUrl: slug }
      });
      
      if (!existingPublication) {
        break;
      }
      
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    return slug;
  }
  
  // Final fallback with timestamp
  const timestamp = Date.now();
  return `publication-${timestamp}`;
} 