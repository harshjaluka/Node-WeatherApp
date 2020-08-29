const request = require('request')

const forecast = ( latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=69a9072152c0cde18a85a08e14c31c53&query='+latitude.toString()+','+longitude.toString();
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to Connect to weatherstack', undefined);
        }
        else if(body.error){
            callback('Location Not Found!', undefined);
        }
        else{
            callback(undefined, {
                'temperature': body.current.temperature,
                'weather_descriptions': body.current.weather_descriptions[0]
            })
        }
    });
}

module.exports = forecast

