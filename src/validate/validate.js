import userApi from "../api/UserApi";
import * as Yup from 'yup';

const Validation = Yup.object().shape({

    firstName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
    username: Yup.string()
        .required('Required')
        .test('check-username-exists', 'Username already exists', async (value) => {

            if (!value || value.trim() === '') return true;

            try {
                const isUserNameExists = await userApi.isUserNameExists(value);

                return !isUserNameExists.data;
            } catch (error) {
                console.log("Can not reach username data");
                return true
            }
        }),
    email: Yup.string()
        .required('Required')
        .email('Invalid email')
        .test('check-email-exists', 'Email already exists', async (value) => {
            if (!value || value.trim() === '') return true;

            try {
                const isEmailExists = await userApi.isEmailExists(value);

                return !isEmailExists.data;
            } catch (error) {
                console.log("Can not reach email data");
                return true;
            }
        }),
    password: Yup.string()
        .required('Required')
        .min(6),
    confirmPass: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password')], 'Password does not match')
})

export default Validation;