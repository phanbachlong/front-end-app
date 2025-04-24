import * as yup from 'yup'
import groupApi from '../../api/Group';

const Validation = yup.object().shape({
    name: yup.string()
        .required('Required')
        .test('check-group-exists', 'Group name is exists', async (value) => {
            if (!value || value.trim() === '') return true;

            try {
                const isGroupExists = groupApi.isGroupExists(value);
                return !isGroupExists.data;
            } catch (error) {
                return true;
            }
        })
})

export default Validation;