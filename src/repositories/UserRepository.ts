import { Event } from "../entities/Event";
import { Location } from "../entities/Location";
import { User } from "../entities/User";

interface UserRepository {
   add(user: User): Promise<User>;
   verifyIfUserExists(email: string): Promise<User | undefined>;
}

export { UserRepository };