import Api from './Api'

class GroupApi {
    constructor() {
        this.url = '/groups';
    }

    getAllGroups = ({ params }) => {
        return Api.get(this.url, { params });
    }
}

const groupApi = new GroupApi();
export default groupApi;