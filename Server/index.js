const http = require("http");
const fs = require("fs");
const url = require("url");


const myServer = http.createServer((req, res)=>{
//  console.log("New Req Rec.");
//  console.log(req);
//  res.end("Hello From Server");

const log = `${Date.now()} :  ${req.method} ${req.url} New Req Received\n`;
const myUrl = url.parse(req.url,true);  // if true then its parse the query string as an object
console.log(myUrl);
if(req.url==="/favicon.ico") return res.end();

fs.appendFile("log.txt",log,(error, data)=>{
//    res.end(`Hello From Server : ${Date.now()}`);
    switch (myUrl.pathname) {
        case '/': res.end(`HomePage`);
            
            break;
        
        case '/about': 
        const username = myUrl.query.myname;
        res.end(`Hii, ${username}`);

        break;

        case '/search' :
        const search = myUrl.query.query_search;
        res.end("Here is your search result " + search)
        break;

        case '/signup' :

             if(req.method ==="GET") res.end(`This is a signup form`);

        else if (req.method ==="POST") {
            // DB Query
            res.end("Success")
        }
        
        break;

        default:
            res.end(`Page Not Found`);
            break;
    }
})
});

myServer.listen(8000, ()=>{
    console.log("Server Started")
})