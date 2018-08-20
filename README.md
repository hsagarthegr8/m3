##Mobile-Rest

write "npm start" to start the server.

It is a web based as well as console based application.

Whenever it recieves any request from the web. First it check if there are sufficent
parameters are present in the request. If there are, it will use those parameters or else
It will use hardCoded parameters

###ROUTING-INFO

##GET All
    http://localhost:8080/rest/api/get

    This url will display all the Mobiles on console and also send the same response


## GET Search in a Range
    http://localhost:8080/rest/api/search?min=''&max=''

    This url request min and max in the query string from the user.
    If the min and max is provided. It will query based on min and max

    Other wise it will query based on 10000 and 50000

    The result will be displayed on the console and the the same response will also send.


## PUT Update a mobile based on ID
    http://localhost:8080/rest/api/update?id=''

    This url will update the mobile based on the id provided in the query param of URL.
    If the id is not present in the req.query, It will take default id as 1002.

    If the id is present in the url. But it is not present in the file. Then there will be an error. It will print "ID not Found" in the console and also sends the same response.

    It also request mobName and mobPrice in the HTTP body.
    If req.body.mobName or req.body.mobPrice is not found, then the default value is used 
    i.e. the value of mobName and mobPrice of the mobile having matched id.

    After all the updating the mobile. It will send the new mobile object as a response.
    And Also print it on the console.

## POST Add a new mobile
    http://localhost:8080/rest/api/add

    This url will add the new mobile. It required user to pass the mobile details in the request body. Or the default mobile details will be used.

    The default mobile details are:
    {
        mobId: Id of last element in the json file + 1,
        mobName: 'Asus',
        mobPrice: 12999
    }
    
    After adding to the file. It will send the new object as a response and also print in on the console.


All the Data is Saved and Retrieved from the file 'mobile.json'


###This project is made by Himanshu Sagar