import { generatePublicationSlug } from "./slugGenerator";

export { generatePublicationSlug };

/**
 * Cleans publication data by converting empty strings to undefined
 * and ensuring proper type conversion for numeric fields
 */
export const cleanPublicationData = (data: any) => {
  const cleaned = { ...data };

  // Convert numeric fields - remove empty strings and convert to numbers
  const numericFields = [
    'vehicleCategoryId', 'vehicleMakeId', 'vehicleModelId', 'vehicleVersionId',
    'cityId', 'statusId', 'km', 'year', 'price', 'personId'
  ];

  numericFields.forEach(field => {
    if (cleaned[field] === "" || cleaned[field] === null || cleaned[field] === undefined) {
      delete cleaned[field];
    } else if (cleaned[field] && !isNaN(Number(cleaned[field]))) {
      cleaned[field] = Number(cleaned[field]);
    }
  });

  // Remove empty strings from string fields
  const stringFields = [
    'title', 'description', 'color', 'neighborhood', 'transmission', 'engine', 
    'fuelType', 'doors', 'ownerPhone', 'vehicleCustomMake', 'vehicleCustomModel', 
    'vehicleCustomVersion', 'slugUrl', 'condition', 'currencyType'
  ];

  stringFields.forEach(field => {
    if (cleaned[field] === "") {
      delete cleaned[field];
    }
  });

  // Convert boolean fields
  const booleanFields = ['uniqueOwner', 'swap', 'marketDiscount'];
  booleanFields.forEach(field => {
    if (cleaned[field] === "") {
      delete cleaned[field];
    } else if (cleaned[field] !== undefined) {
      cleaned[field] = Boolean(cleaned[field]);
    }
  });

  // Remove fields that don't exist in database schema
  delete cleaned.vehicleMake; // Only vehicleMakeId exists
  delete cleaned.vehicleModel; // Only vehicleModelId exists
  delete cleaned.vehicleVersion; // Only vehicleVersionId exists

  return cleaned;
}; 