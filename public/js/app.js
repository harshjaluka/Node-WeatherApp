const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = address.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = " ";
    messageThree.textContent = " ";
    messageFour.textContent = " ";
    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) => {
        if(!data){
            messageOne.textContent = 'Please Enter A Location';
        }
        else if(data.error){
            messageOne.textContent = 'Enter A valid location';
        }
        else{
            messageOne.textContent = data.location;
            messageTwo.textContent = 'Temperature = '+ data.temperature;
            messageThree.textContent = 'Weather Description = '+data.weather_description;
            messageFour.textContent = 'Humidity = '+data.humidity +'%';
        }
    });
});

});