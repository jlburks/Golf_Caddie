const haversine = require('haversine-distance')

require('dotenv').config(); // Make sure .env is loaded

const cors = require('cors')

const express = require("express");
const app = express()
const PORT = 3001;


app.use(cors());
app.use(express.json())


app.get('/getKey', function (req,res){
    const apiKey = process.env.API_KEY;
    res.json({ key: apiKey })
})

app.post('/calculateDistance', function (req, res) {
    
    const a = req.body.position1
    const b = req.body.position2
    const c = haversine(a,b)
    res.json({ distanceMeters: c })
});


app.listen(PORT, "0.0.0.0", function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${PORT}`);
});
