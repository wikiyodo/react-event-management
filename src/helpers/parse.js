export default class ParseRoute{

    static local(route, params){

        for(let index in params) {
            route = route.replace(':' + index, params[index]);
        }
        return route;
    }
}