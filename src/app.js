const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const request= require('request');
const geocoding = require('./utils/geocoding');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;


const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const publicDir = path.join(__dirname, '../public');

//set hbs engine and we can also 'set' file path 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//set static directory location for server
app.use(express.static(publicDir));
// app.use(express.static(path.join(publicDir, 'about.html')));
// app.use(express.static(path.join(publicDir,'help.html')))


app.get('', (rep,res) => {
    res.render('index', {
        title: "Weather App in Creation",
        creator: "Harsh"
    });
});

app.get('/about', (rep, res) => {
    res.render('about', {
        title: "Welcome to the About Page!",
        name: "Harsh"
    });
});

app.get('/weather', (rep, res) => {
    if(!rep.query.address){
        return res.send(
            'An Address is required');
    }
    geocoding(rep.query.address, (geoError, {latitude, longitude, location} = {}) => {
        if(geoError){
            return res.send(geoError);
        }

    
        forecast(latitude, longitude, (forecastError, {temperature, weather_descriptions, humidity} = {}) => {
            if(forecastError){
                return res.send(forecastError);
            }

            return res.send({
                location,
                temperature,
                weather_descriptions,
                address: rep.query.address,
                humidity
            });
        });
    });
});

app.get('/help', (rep, res) => {
    res.render('help', {
        title: "Help!",
        email:"abcd@gmail.com"
    });
});

app.get('/help/*', (rep, res) => {
    res.render('404', {
        title: "Help!",
        body: "Help Page Not Found"
    })
});
app.get('*', (rep, res) => {
    res.render('404', {
        title: "404!",
        body: "Page Not Found"
    });
});
app.listen(port, () => {
    console.log('server started successfully on port! '+port);
});