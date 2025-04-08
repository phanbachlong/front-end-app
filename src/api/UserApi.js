import Api from './Api'

class UserApi {
    constructor() {
        this.url = "/users"
    }

    isUserNameExists = (userName) => {
        return Api.get(`${this.url}/userName/${userName}`)
    }

    isEmailExists = (email) => {
        return Api.get(`${this.url}/email/${email}`)
    }

    createUser = (body) => {
        return Api.post(this.url, body)
    }

}

const userApi = new UserApi();
export default userApi;