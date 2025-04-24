import Api from './Api'

class GroupApi {
    constructor() {
        this.url = '/groups';
    }

    getAllGroups = ({ params }) => {
        return Api.get(this.url, { params });
    }

    createGroups = (body) => {
        return Api.post(this.url, body);
    }

    isGroupExists = ({ name }) => {
        return Api.get(`${this.url}/name/${name}`)
    }
}

const groupApi = new GroupApi();
export default groupApi;