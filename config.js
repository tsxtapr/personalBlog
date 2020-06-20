var fs = require("fs");

var globalConf = {};
var conf = fs.readFileSync("./server.conf");
var configArr = conf.toString().split("\n");
for(var i = 0; i < configArr.length; i ++){
    if(configArr[i].split("=")[0] && configArr[i].split("=")[1]){
        globalConf[configArr[i].split("=")[0].trim()] = configArr[i].split("=")[1].trim();
    }
}

module.exports = globalConf;




