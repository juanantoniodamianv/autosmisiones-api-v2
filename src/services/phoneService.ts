import { IPhoneService } from "./mock/mockPhoneService";
import { PhoneRepository } from "../repositories/Phone";
import { PersonRepository } from "../repositories/Person";

export class PhoneService implements IPhoneService {
  phone = new PhoneRepository();
  person = new PersonRepository();

  async getAllPhones(userId: string) {
    const user = await this.person.findOne({
      clerkId: userId
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await this.phone.findAll({
      personId: user.id
    });
  }

  async createPhone(userId: string, data: { phone: string; type?: string }) {
    const user = await this.person.findOne({
      clerkId: userId
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await this.phone.create({
      phone: data.phone,
      type: data.type || "wp",
      verified: false,
      verifiedToken: null,
      person: {
        connect: {
          id: user.id
        }
      }
    });
  }

  async updatePhone(userId: string, phoneId: number, data: { phone?: string; type?: string; verified?: boolean }) {
    const user = await this.person.findOne({
      clerkId: userId
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingPhone = await this.phone.findOne({
      id: phoneId,
      personId: user.id
    });

    if (!existingPhone) {
      throw new Error("Phone not found");
    }

    return await this.phone.update(phoneId, data);
  }

  async deletePhone(userId: string, phoneId: number): Promise<void> {
    const user = await this.person.findOne({
      clerkId: userId
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingPhone = await this.phone.findOne({
      id: phoneId, 
      personId: user.id
    });

    if (!existingPhone) {
      throw new Error("Phone not found");
    }

    await this.phone.delete(phoneId);
  }
}