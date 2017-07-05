
# Steps to create a REST API using a JSON server:

Follow the steps to simulate a Back End REST service to deliver some data in JSON format to front end application.

### A) For Mac:

`brew install node`
`node -v `
`npm -v `
 will show the version of node and npm present and then follow the next steps.

### For Linux:

`sudo apt-get install nodejs`
follow this link for setting up node and npm-https://tecadmin.net/upgrade-nodejs-via-npm/

### B) install node-rest-client:

`npm install node-rest-client`

### C)install JSON Server:

`npm install -g json-server`

### Create JSON File:

Now lets create a new json file called db.json. This file contains the data that should be exposed to the REST API.
Running the JSON Server:
`json-server --watch db.json`
This ensures that the server is started in watch mode and it watches for file changes and updates the exposed API accordingly.
Now if we open the URL http://localhost:3000/Updates , it will show the resulting json.

### Testing the client side UI script:

`$node client.js`

# Explanation:

Running the above Script will open a HTTP connection to the REST API and fetch the results of the queries and display them on the console.
As soon as the client.js is run it askes for user input "Enter the size of the Array".The user should input a number as the
size of the array to be returned.
Next it will prompt the user asking, "Enter the tag you want to filter based on". The user can enter the tag , based on which 
they want their results to be filtered. Ex: other

Since the REST API updates every minute, A GET method is called every minute to query for updates in realtime by using the setInterval method.

Once the User enters the array size and the tag, the client script will request data from the API and call the sorting function.
I have created a function that will sort both by Last Update and Last Executed but the attribute should be passed to the 
function as an argument.
The sorting function has the following signature:
`sorting(files, attrToSortBy, size){}`
* files: the data from the API call
* attrToSortBy: the attribute to sort based on- either "updated" or "last updated". If we pass updated , it will return an array of length `size` (3rd input funtion parameter) sorted by Last Updated. And if we pass `last updated` as the second parameter while calling the function sorting, it will resturn an array of length `size` (3rd input function parameter) sorted by Last Excuted.
* size: The array size to be returned.

I have also included 2 seperate functions -
* `sortByLastUpdate`: Which returns the array of a given size sorted by Last Updated.
* `sortByLastExecuted`: which returns the array of a given size sorted by Last Executed. 

These two functions are an alternate to the first function.i.e If you do not want to pass the attribute to sort the array as a function parameter.

I have included a function `sortingByTag` which returns an array of all the results that have the specified tags included in them.
The sorting by Tag function has the following signature:
 `sortByTag(files,attrToSortBy,arrsize, tag){}`
* files-the data from the API call
* attrToSortBy-the attribute to sort the results by-"updated"/"last executed"
* arrsize-The array size to be returned.
* tag- The tag name that the results should be filtered upon. This checks if the spefied tag name is present in the list of the tags for each data item.

# ASSUMPTIONS:
* I have assumed that the API(/bidconfig) REST call updates every minute, and hence I have setInterval for every minute to query for updates.
* I have included the clearInterval(interval) in the last line of the code to just print out of a single run , but if that line is commented out, the script should query for updates every minute continously until stopped.
* I have assumed that the tag search will just test for 1 single tag match at a time rather than a set of tags.
* I have added 4 entries similar to the json given in the question for testing the functionality of the script.
