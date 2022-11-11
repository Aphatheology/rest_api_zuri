const express = require("express");
const {json} = require("express");
const flightRouter = require('./routes/flight.route')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(json());

app.use("/flight", flightRouter);
app.get('/', (req, res) => {
    res.send({message: "Welcome to Aphatheology Flight API"})
})
app.use('*', (req, res) => {
    res.send({message: "Route Not found"})
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
