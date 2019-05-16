import { ROUTE_LOGIN, ROUTE_REGISTER, EVENT_CREATE, EVENT_LISTING } from "../dist/api";
import { POST, GET } from ".";
import Authentication from "../helpers/auth";


export const REQUEST_EVENT_CREATE = (formData, callback) =>  {
    return POST(EVENT_CREATE, formData).set('Authorization', 'Bearer '+(new Authentication()).getApiKey()).end(callback);
};

export const REQUEST_EVENT_GET = (formData, callback) =>  {
    return GET(EVENT_LISTING, formData).set('Authorization', 'Bearer '+(new Authentication()).getApiKey()).end(callback);
};
