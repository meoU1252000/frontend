const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
const app = express();
let server = require('http').Server(app);
app.use(serveStatic(path.join(__dirname, 'dist')));
app.get(/.*/, function(req,res){
    res.sendFile(path.join(__dirname,'/dist/index.html'));
})

const port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("App is running on port 8000");
});