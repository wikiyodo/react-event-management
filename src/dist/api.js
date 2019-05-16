/*global API_PREFIX*/

let addPrefix = (route) =>  {
    return API_PREFIX+'/'+route;
};


export const ROUTE_REGISTER = addPrefix('user/register');
export const ROUTE_LOGIN = addPrefix('user/login');


export const EVENT_CREATE = addPrefix('event/create');
export const EVENT_LISTING = addPrefix('event/get');
export const EVENT_DETAILS = addPrefix('event/get/:id');