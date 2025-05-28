import { IPersonService } from "../controllers/PersonController";
import { PersonRepository } from "../repositories/Person";

export class PersonService implements IPersonService {
  person = new PersonRepository();

  async findAll(query?: any): Promise<any[]> {
    return await this.person.findAll(query);
  }

  async findById(id: number): Promise<any | null> {
    return await this.person.findById(id);
  }

  async findOne(query?: any): Promise<any | null> {
    return await this.person.findOne(query);
  }

  async create(data: any): Promise<any> {
    return await this.person.create(data);
  }

  async update(id: number, data: any): Promise<any | null> {
    return await this.person.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.person.delete(id);
  }

  async findUnique(query: { where: { clerkId: string } }): Promise<any | null> {
    return await this.person.findUnique(query);
  }
}
