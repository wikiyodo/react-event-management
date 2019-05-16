export default class Authentication{
    setApiKey = (apiKey, user)=>{
        console.log(apiKey, user);
        localStorage.setItem('apiKey', apiKey);
        localStorage.setItem('user', user);
    };

    getApiKey = ()=>{
       return localStorage.getItem('apiKey');
    };

    getUser = ()=>{
       return localStorage.getItem('user');
    };

    isUserLoggedIn = ()=>{
        console.log(this.getApiKey());
        return this.getApiKey() != null;
    };

    removeApiKey = ()=>{
        console.log("removin");
        localStorage.removeItem('apiKey');
        localStorage.removeItem('user');
    };

}