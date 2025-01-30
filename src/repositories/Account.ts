import { BaseRepository } from "./base";
import { Prisma } from "@prisma/client";

class AccountRepository extends BaseRepository<Prisma.AccountGetPayload<{}>> {
  constructor() {
    super("account");
  }
}

export { AccountRepository };
