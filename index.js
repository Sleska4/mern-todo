const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routs/auth.rout'));
app.use('/api/todo', require('./routs/todos.routs'));

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Sleska4:Aleksey1209@cluster0.lijvi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true,
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch(err) {console.log(err)}
}
start()