const fs = require("fs");

function logReqRes(filename){
    return (req,res,next)=>{
//  console.log("Hello from middleware 1");

    fs.appendFile(filename,
        `${Date.now()}: ${req.method}: ${req.path}\n`,
        (error, data) => {
            next();
        }
    );
    }
}

module.exports = {
    logReqRes,
};