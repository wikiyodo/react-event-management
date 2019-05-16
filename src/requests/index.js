import request from "superagent";

export const GET = (route, params)   =>  {
    return request.get(route).query(params);
};

export const POST = (route, params)   =>  {
    return request.post(route).send(params);
};

export const getBody = (response)    =>  {
    return response.body;
};