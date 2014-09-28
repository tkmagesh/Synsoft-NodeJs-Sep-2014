create function that checks whether the given number is a prime number or not


isPrime(10)
isPrime(100)
isPrime(200)

isPrime(10)
isPrime(100)



function getPrimeFinder(){
    var cache = {};
    function checkPrime(n){
        if (n <= 3) return true;
        for(var i=2;i<=(n/2);i++)
            if (n % i === 0) return false;
        return true;
    }
    function isPrime(n){
       if (typeof cache[n] !== "undefined"){
            console.log("from cache..");
            return cache[n];
       }
       cache[n] = checkPrime(n);
       console.log("juz processed..");
       return cache[n];
    }
    return isPrime;

}
