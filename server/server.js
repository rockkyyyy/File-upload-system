const express = require('express');
const routes = require('./routes/routes.js');
const path = require('path');
const upload = require('express-fileupload');
const app = express();
app.use(upload());


app.use(routes);
app.use(express.static(path.join(__dirname, '../client/index.html')));


app.listen(80,()=>{
    console.log("server is running in http://localhost and the form on http://localhost/api/users");
    
});


