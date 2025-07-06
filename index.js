const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const URL = 'mongodb+srv://pofigkakoimail:pofigkakoimail@cluster0.cxrisks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function start() {
    try {
        await mongoose.connect(URL);
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {console.log(error);}
}
start();

