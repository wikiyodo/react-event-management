import { ROUTE_LOGIN, ROUTE_REGISTER } from "../dist/api";
import { POST } from ".";

export const REQUEST_LOGIN = (formData, callback) =>  {
    return POST(ROUTE_LOGIN, formData).end(callback);
};

export const REQUEST_REGISTER = (formData, callback) =>  {
    return POST(ROUTE_REGISTER, formData).end(callback);
};