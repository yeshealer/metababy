import axios from "axios";

// ** Declare Custome Axios
const request = async ({ endpoint, method, params, headers, callback, ...rest }) => {
    const property = {
        method: method,
        url: endpoint,
        data: params,
        headers: headers,
        ...rest
    };
    try {
        const response = await axios(property);
        if (callback) {
            callback(response);
        } else {
            return response;
        }
    } catch (e) {
        return e.toString();
    }
};
export default request;
