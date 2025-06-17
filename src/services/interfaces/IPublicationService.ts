export interface IPublicationService {
  getAllPublications(): Promise<Publication[]>;
  getPublicationById(publicationId: number): Promise<Publication | null>;
  createPublication(data: Partial<Publication>): Promise<Publication>;
  updatePublication(publicationId: number, data: Partial<Publication>): Promise<Publication>;
  deletePublication(publicationId: number): Promise<void>;
}

export interface Publication {
  id: number;
  title: string;
  description?: string;
  price?: number;
  previousPrice?: number;
  currencyType: string;
  condition: string;
  year?: number;
  km?: number;
  color?: string;
  neighborhood?: string;
  transmission?: string;
  engine?: string;
  fuelType?: string;
  doors?: string;
  uniqueOwner: boolean;
  slugUrl: string;
  swap: boolean;
  ownerPhone?: string;
  marketDiscount: boolean;
  personId: number;
  cityId: number;
  statusId: number;
  vehicleCategoryId?: number;
  vehicleModelId?: number;
  vehicleMakeId?: number;
  vehicleVersionId?: number;
}
