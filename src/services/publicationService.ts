import { IPublicationService, PublicationWithRelations } from "../controllers/PublicationController";
import { PublicationRepository } from "../repositories/Publication";

export class PublicationService implements IPublicationService {
  publication = new PublicationRepository();

  async findAll(query?: any): Promise<PublicationWithRelations[]> {
    return await this.publication.findAll(query);
  }

  async findById(id: number): Promise<PublicationWithRelations | null> {
    return await this.publication.findById(id);
  }

  async findOne(query?: any): Promise<PublicationWithRelations | null> {
    return await this.publication.findOne(query);
  }

  async create(data: any): Promise<PublicationWithRelations> {
    return await this.publication.create(data);
  }

  async update(id: number, data: any): Promise<PublicationWithRelations | null> {
    return await this.publication.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.publication.delete(id);
  }
}
