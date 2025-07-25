const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();
app.use(cors());
const PORT = 5000;
const URL = 'mongodb+srv://pofigkakoimail:pofigkakoimail@cluster0.cxrisks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(express.json({ extended: true  }));
app.use('/api/auth/', require('./routes/auth.route'))
app.use('/api/todo/', require('./routes/todo.route'))

async function start() {
    try {
        await mongoose.connect(URL);
        console.log('Connected to MongoDB');
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
    } catch (error) {console.log(error);}
}
start();

