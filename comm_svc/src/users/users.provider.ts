import { Mongoose } from "mongoose";
import { UserSchema } from "src/schema/user.schema";

export const usersProvider = [
    {
        provide: 'USER_MODEL',
        useFactory: (connection: Mongoose) => connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
]