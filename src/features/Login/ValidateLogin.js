import userApi from "../../api/UserApi";
import * as Yup from 'yup';

const Validation = Yup.object().shape({
    
    username: Yup.string()
        .required('Required')
        .test('check-username-exists', 'Username is not exists', async (value) =>{

            if(!value || value.trim() === '') return true;

            try {
                const isUserNameExists = await userApi.isUserNameExists(value)

                return isUserNameExists.data;
            } catch (error) {
                console.log("Can not reach username data");
                return true
            }
        }),
    password: Yup.string()
        .required('required')
        
})

export default Validation;