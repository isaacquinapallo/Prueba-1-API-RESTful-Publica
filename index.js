import fetch from 'node-fetch';

const TEMPLATE_ID = '16d095d6-0df0-415c-a797-f0b3a1d2c70c';
const API_KEY = 'c2a616ec-f768-4f9b-a087-4697a9a1934e';

fetch('https://api.templated.io/v1/render', {
  method: 'POST',
  body: JSON.stringify({
    template: TEMPLATE_ID,
    layers: {
      "text-1": {
        text: "This is my text to be rendered",
        color: "#FFFFFF",
        background: "#0000FF"
      },
      "image-1": {
        image_url: "https://pathtomyphoto.com/123.jpg"
      }
    }
  }),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
})
.then(response => response.json())
.then(data => {
  console.log('Render info:', data);
  const renderId = data.id;

  const checkRenderStatus = () => {
    fetch(`https://api.templated.io/v1/render/${renderId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('Render status:', data);

      if (data.status === 'PENDING') {
        console.log('Render is still in progress...');
        setTimeout(checkRenderStatus, 5000);
      } else if (data.status === 'COMPLETED') {
        console.log('Render completed:', data);

        // Imprimir la URL de la imagen generada
        console.log('Image URL:', data.url);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  checkRenderStatus();
})
.catch(error => {
  console.error('Error:', error);
});
