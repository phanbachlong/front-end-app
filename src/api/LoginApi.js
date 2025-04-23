import Api from './Api'

class LoginApi {
    constructor(){
        this.url = "/login"
    }

    login = async (body) => {
        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }

        return Api.post(this.url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

const loginApi = new LoginApi();
export default loginApi;