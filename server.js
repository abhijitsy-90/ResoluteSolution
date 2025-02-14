const express = require("express");
const cors = require("cors");
const app = express();


app.use(cors('*'))

app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

 require("./src/routes/user.routes")(app);
 require("./src/routes/blog.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});









