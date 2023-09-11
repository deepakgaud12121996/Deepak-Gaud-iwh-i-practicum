const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
app.use('/public/css', express.static(path.join(__dirname, '/public/css/')));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na1-cc880890-3138-44ec-85e4-c0d111d1d836';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/
app.get('/', (req, res) => {
    var titleHome = "This is home page!";

    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://api.hubapi.com/crm/v3/objects/2-18317771?limit=10&properties=pet_name&properties=pet_type&properties=pet_price&archived=false',
        'headers': {
            'authorization': 'Bearer ' + PRIVATE_APP_ACCESS
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        dataResult = JSON.parse(response.body);
        var pet_name = dataResult.results[0].properties.pet_name;
        res.render('homepage', { title: titleHome, data: dataResult });
    });


})


app.get("/update-cobj", (req, res) => {
    var titleText = "Update Custom Object Form | Integrating With HubSpot I Practicum.";
    res.render('updates', { title: titleText });

});

app.post('/update-cobj', (req, res) => {
    console.log(req.body);
    //const data = JSON.parse(req.body);
    
    const pName = req.body.pet_name;
    const pType = req.body.pet_type;
    const pPrice = req.body.pet_price;
    console.log(pName);
    console.log(pType);
    console.log(pPrice);
     var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://api.hubapi.com/crm/v3/objects/pets',
        'headers': {
            'authorization': 'Bearer ' + PRIVATE_APP_ACCESS,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "properties": {
                "pet_name": pName,
                "pet_type": pType,
                "pet_price": pPrice
            }
        })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log('this is res: ',response.body);
    });

})



// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));