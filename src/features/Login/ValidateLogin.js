import userApi from "../../api/UserApi";
import {z} from 'zod';

const Validation = z.object({

    username: z.string()
        .nonempty("Required")
        .refine(async (username) => {
            if(!username || username.trim() === '') return true;
            try {
                const isUserNameExists = await userApi.isUserNameExists(username);
                return isUserNameExists.data;
            } catch (error) {
                return true;
            }
        },{
            message: "Username is not exists"
        }),
    password: z.string()
        .nonempty("Required")
})

export default Validation;