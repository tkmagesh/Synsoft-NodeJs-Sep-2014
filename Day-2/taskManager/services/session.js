var sessionData = {};
return {
    get : function(id){
        return sessionData[id];
    },
    create : function(id){
        sessionData[id]={};
        return sessionData[id];
    },
    clear : function(id){
        sessionData[id] = null;
    }
}