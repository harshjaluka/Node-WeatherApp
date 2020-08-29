const weatherForm = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = address.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = " ";
    fetch('http://api.weatherstack.com/current?access_key=69a9072152c0cde18a85a08e14c31c53&query='+location).then((response) =>{
    response.json().then((data) => {
        if(!data){
            messageOne.textContent = 'Please Enter A Location';
        }
        else if(data.error){
            messageOne.textContent = 'Enter A valid location';
        }
        else{
            messageOne.textContent = data.location.name;
            messageTwo.textContent = 'Temperature = '+ data.current.temperature;
        }
    });
});

});