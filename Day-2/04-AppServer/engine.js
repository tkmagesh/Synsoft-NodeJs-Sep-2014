function getEngine(){
      var middlewares = [];
      return {
         add : function(middleware){
              middlewares.push(middleware);
         },
         run : function(){
                  return function(req,res){
                    function runner(req,res,middlewares){
                          var middleware = middlewares[0],
                              remaining = middlewares.slice(1);
                          if (!middleware) return;
                          return middleware(req,res,function(){
                            runner(req,res,remaining)
                          });
                    }
                    return runner(req,res,middlewares);
                  }
          }
      }
}
module.exports = getEngine();
