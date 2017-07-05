var Client = require('node-rest-client').Client;
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var arrsize=0;
//Taking user input for the size of the array and the name of tag to filter the results.
rl.question("Enter the size of the array: ", function(user) {
arrsize= user;
rl.question("Enter the tag you want to check: ",function(us){
var tag=us; 
    
//Querying for updates in real time for every minute. 
var interval=setInterval(function(){    
var client = new Client();
//Querying the API 
client.registerMethod("jsonMethod", "http://localhost:3000/Updates", "GET");
    
client.methods.jsonMethod(function (data, response) {
//Common function to sort by Last Updated and Last executed based on the ouput array size as well as the attribute to sort by-either "updated" or "last executed"
function sorting(files,attrToSortBy,size){
var res=files.sort(function(a,b){
return new Date(a["datetimes"][attrToSortBy])< new Date(b["datetimes"][attrToSortBy]);
});
minsize=((res.length<arrsize)?res.length:arrsize);
var fin=res.slice(0,minsize);
return fin;
}

//Function that returns an array sorted by Last Updated.
function sortByLastUpdate(files,size){
var res=files.sort(function(a,b){
return new Date(a["datetimes"]["updated"])< new Date(b["datetimes"]["updated"]);
});
minsize=((res.length<arrsize)?res.length:arrsize);
var fin=res.slice(0,minsize);
return fin;
}

//Function that returns an array sorted by Last Executed.
function sortByLastExecuted(files,size){
var res=files.sort(function(a,b){
return new Date(a["datetimes"]["last executed"])< new Date(b["datetimes"]["last executed"]);
});
minsize=((res.length<arrsize)?res.length:arrsize);
var fin=res.slice(0,minsize);
return fin;
}


//Sorting the results based on tag and size.    
function sortByTag(files,attrToSortBy,arrsize,tag){
var res=files.filter(function(i){
return (i["tags"].indexOf(tag)>-1);
}).sort(function(a,b){
return new Date(a["datetimes"][attrToSortBy])< new Date(b["datetimes"][attrToSortBy]);
});
minsize=((res.length<arrsize)?res.length:arrsize);
var fin=res.slice(0,minsize);
return fin;
}

//Function calls
var uresult = sortByLastUpdate(data,arrsize);
console.log("Result sorted based on Last Updated"+"\n");
console.log(uresult);

var leresult=sortByLastExecuted(data,arrsize);
console.log("Result sorted based on Last Executed"+"\n");
console.log(leresult);

var tagresult=sortByTag(data,"updated",arrsize,tag);
console.log("Tag match result-Sorted by Last Updated"+"\n");
console.log(tagresult);

var tagresult2=sortByTag(data,"last executed",arrsize,tag);
console.log("Tag match result-Sorted by Last Executed"+"\n");
console.log(tagresult2);


},60000);
clearInterval(interval);
rl.close();
});
});
});
