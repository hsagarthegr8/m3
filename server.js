/*
###This project is made by Himanshu Sagar
All the Data is Saved and Retrieved from the file 'mobile.json' 
*/
const express = require('express')
const parser = require('body-parser')
const fs = require('fs')

const app = express()

let mobiles

app.use(parser.json())

/*
http://localhost:8080/rest/api/get
This url will display all the Mobiles on console and also send the same response 
*/
app.get('/rest/api/get', (req, res) => {

    fs.readFile('mobile.json', (err, data) => {

        if (err) throw err

        mobiles = JSON.parse(data.toString())
        console.log("Data Fetched")
        console.log(mobiles)
        res.send(mobiles)
    })
})


/*
http://localhost:8080/rest/api/search?min=''&max=''

    This url request min and max in the query string from the user.
    If the min and max is provided. It will query based on min and max

    Other wise it will query based on 10000 and 50000

    The result will be displayed on the console and the the same response will also send. 
*/
app.get('/rest/api/search', (req, res) => {

    let min = 10000, max = 50000

    fs.readFile('mobile.json', (err, data) => {
        if (err) throw err

        mobiles = JSON.parse(data.toString())
        console.log("Data Fetched")

        if (req.query.min) {
            min = req.query.min
        }

        if (req.query.max) {
            max = req.query.max
        }

        queryMobiles = mobiles.filter(m => m.mobPrice >= min && m.mobPrice <= max)
        console.log(queryMobiles)
        res.send(queryMobiles)
    })
})

/*
http://localhost:8080/rest/api/add

This url will add the new mobile. It required user to pass the mobile details in the 
request body. Or the default mobile details will be used.

The default mobile details are:
{
    mobId: Id of last element in the json file + 1,
    mobName: 'Asus',
    mobPrice: 12999
}

After adding to the file. It will send the new object as a response and 
also print in on the console.
*/
app.post('/rest/api/add', (req, res) => {

    fs.readFile('mobile.json', (err, data) => {

        if (err) throw err

        mobiles = JSON.parse(data.toString())
        let id = req.body.mobId ? +req.body.mobId : +mobiles[mobiles.length-1].mobId + 1 
        let name = req.body.mobName ? req.body.mobName : "Asus"
        let price = req.body.mobPrice ? req.body.mobPrice : 12999
        
        mobiles.push({mobId:id, mobName:name, mobPrice: price})

        fs.writeFile('mobile.json', JSON.stringify(mobiles), (err) => {

            if (err) throw err

            console.log("Added 1 mobile")
            res.send(mobiles)
        })
    })
})

/*
http://localhost:8080/rest/api/update?id=''

This url will update the mobile based on the id provided in the query param of URL.
If the id is not present in the req.query, It will take default id as 1002.

If the id is present in the url. But it is not present in the file. Then there will be an error. It will print "ID not Found" in the console and also sends the same response.

It also request mobName and mobPrice in the HTTP body.
If req.body.mobName or req.body.mobPrice is not found, then the default value is used 
i.e. the value of mobName and mobPrice of the mobile having matched id.

After all the updating the mobile. It will send the new mobile object as a response.
And Also print it on the console.
*/
app.put('/rest/api/update', (req, res) => {

    fs.readFile('mobile.json', (err, data) => {

        if (err) throw err

        mobiles = JSON.parse(data.toString())
        let id = req.query.id ? req.query.id : 1002
        let name, price
        let match = false

        mobiles = mobiles.map((mobile) => {
            if (mobile.mobId == id) {
                match = true
                name = req.body.mobName ? req.body.mobName : mobile.mobName
                price = req.body.mobPrice ? req.body.mobPrice : mobile.mobPrice
                return ({ mobId: id, mobName: name, mobPrice: price })
            }
            else
                return mobile
        })
        
        if (!match) {
            console.log('Id not found')
            res.send("Id Not Found")
            return
        }

        fs.writeFile('mobile.json', JSON.stringify(mobiles), (err) => {
            if (err) throw err
            console.log("Updated")
            res.send(mobiles)
        })
    })
})

app.listen(8080, () => console.log('Listening on port 8080'))