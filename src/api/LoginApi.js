import Api from './Api'

class LoginApi {
    constructor(){
        this.url = "/login"
    }

    login = (body) => {
        return Api.post(this.url,body);
    }
}

const loginApi = new LoginApi();
export default loginApi;