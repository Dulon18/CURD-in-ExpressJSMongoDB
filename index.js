require('dotenv').config({ path: 'config.env' });

const app = require("./app");
const port = process.env.RUNNING_PORT;
//console.log(port);
app.listen(port,function () {
    console.log("success");
})