import { Phone } from "@prisma/client";

export interface IPhoneService {
  getAllPhones(userId: string): Promise<Phone[]>;
  createPhone(userId: string, data: { phone: string; type?: string }): Promise<Phone>;
  updatePhone(userId: string, phoneId: number, data: { phone?: string; type?: string; verified?: boolean }): Promise<Phone>;
  deletePhone(userId: string, phoneId: number): Promise<void>;
}

export class MockPhoneService implements IPhoneService {
  private phones: Phone[];

  constructor() {
    this.phones = [
      {
        id: 1,
        phone: "+1234567890",
        type: "wp",
        verified: true,
        verifiedToken: "token1",
        personId: 1,
      },
      {
        id: 2,
        phone: "+0987654321",
        type: "wp",
        verified: false,
        verifiedToken: null,
        personId: 1,
      },
      {
        id: 3,
        phone: "+1122334455",
        type: "wp",
        verified: true,
        verifiedToken: "token2",
        personId: 2,
      },
    ];
  }

  private async simulateDelay<T>(data: T): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), 50));
  }

  async getAllPhones(userId: string): Promise<Phone[]> {
    const userPhones = this.phones.filter((phone) => phone.personId === parseInt(userId));
    return this.simulateDelay(userPhones);
  }

  async createPhone(userId: string, data: { phone: string; type?: string }): Promise<Phone> {
    const newPhone = {
      id: this.phones.length + 1,
      phone: data.phone,
      type: data.type || "wp",
      verified: false,
      verifiedToken: null,
      personId: parseInt(userId),
    };
    this.phones.push(newPhone);
    return this.simulateDelay(newPhone);
  }

  async updatePhone(
    userId: string,
    phoneId: number,
    data: { phone?: string; type?: string; verified?: boolean }
  ): Promise<Phone> {
    const phoneIndex = this.phones.findIndex(
      (p) => p.id === phoneId && p.personId === parseInt(userId)
    );

    if (phoneIndex === -1) {
      throw new Error("Phone not found");
    }

    const updatedPhone = { ...this.phones[phoneIndex], ...data };
    this.phones[phoneIndex] = updatedPhone;
    return this.simulateDelay(updatedPhone);
  }

  async deletePhone(userId: string, phoneId: number): Promise<void> {
    const phoneIndex = this.phones.findIndex(
      (p) => p.id === phoneId && p.personId === parseInt(userId)
    );

    if (phoneIndex === -1) {
      throw new Error("Phone not found");
    }

    this.phones.splice(phoneIndex, 1);
    return Promise.resolve();
  }
} 