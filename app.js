import fetch from 'node-fetch.js';
import express from 'express.js';

const app = express();

app.use(express.static('public'));
app.get("/test/:param", (req, res, next) => {
    const param = req.params['param'];
    let url = `https://learn.microsoft.com/api/search/autocomplete?locale=en-us&query=${param}`;
    console.log("user asked for: ", req.params['param']);
    fetch(url)
        .then(response => response.text())
        .then(data => {
            console.log('Your data:', data)
            res.send(data)
        })
        .catch(error => console.error('Error:', error));
  })


app.listen(3000, () => console.log("listening on port 3000"));