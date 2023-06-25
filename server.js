const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();

const { AdminMiddleWare } = require("./Middlewares/adminMiddleware");
const { WebsiteMiddleWare } = require("./Middlewares/websiteMiddleware");
const { adminRoutes } = require("./Routes/adminRoutes");
const { websiteRoutes } = require("./Routes/websiteRoutes");

const app = express();
const adminApp = express();
const websiteApp = express();

adminRoutes(adminApp);
websiteRoutes(websiteApp);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", AdminMiddleWare, adminApp);
app.use("/website", WebsiteMiddleWare, websiteApp);


const port = process.env.PORT || 8000;
app.listen(port, function () {
    console.log(`running on http://localhost:${port}`);
})
