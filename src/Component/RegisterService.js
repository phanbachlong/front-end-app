import userApi from "../api/UserApi";

const RegisterService = {
    createUser: async (values) => {
        const userData = {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.username,
            email: values.email,
            password: values.password
        }

        return await userApi.createUser(userData);
    }
}

export default RegisterService;