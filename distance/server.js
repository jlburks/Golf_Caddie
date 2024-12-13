const haversine = require('haversine-distance')

const cors = require('cors')

const express = require("express");
const app = express()
const PORT = 3001;


app.use(cors());
app.use(express.json())

app.post('/calculateDistance', function (req, res) {
    
    const a = req.body.position1
    const b = req.body.position2
    const c = haversine(a,b)
    res.json({ distanceMeters: c })
});


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log(`Server listening on PORT ${PORT}`);
});
