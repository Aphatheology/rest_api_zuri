// const flights = require("../models/flight.model");
const fs = require("fs");
const path = require('path');

const readFlightData = async () => {
    const data = fs.readFileSync("./models/flight.model.json")
    return JSON.parse(data);
}

const saveFlightData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync("./models/flight.model.json", stringifyData)
}

const getAllFlights = async (req, res) => {
    const flight = await readFlightData()
    console.log(flight)
    res.send(flight)
}

const getFlightById = async (req, res) => {
    const flights = await readFlightData();
    const flight = flights.find(flight => flight.id === parseInt(req.params.id));

    if(!flight) {
        res.status(400).json({message: `Flight with id ${req.params.id} not found`});
    }   
    
    res.send(flight)
}

const createFlight = async (req, res) => {
    const flights = await readFlightData();
    const flight = {
        id: flights[flights.length - 1].id + 1,
        ...req.body
    };
    flights.push(flight)

    saveFlightData(flights)

    res.status(201).json(flight);
 
}

const updateFlight = async (req, res) => {
    let flights = await readFlightData();
    const flight = flights.find(flight => flight.id === parseInt(req.params.id));

    if(!flight) {
        res.status(400).json({message: `Flight with id ${req.params.id} not found`});
    } 
    
    flights = flights.filter(flight => flight.id != parseInt(req.params.id))
    console.log(flight, req.body)
    Object.assign(flight, req.body);
    flights.push(flight)
    saveFlightData(flights)
    res.send(flight)
}

const deleteFlight = async (req, res) => {
    let flights = await readFlightData();
    const flight = flights.find(flight => flight.id === parseInt(req.params.id));

    if(!flight) {
        res.status(400).json({message: `Flight with id ${req.params.id} not found`});
    } 
    
    flights = flights.filter(flight => flight.id != parseInt(req.params.id))
    saveFlightData(flights)
    res.send({message: `Flight with id ${req.params.id} deleted successfully`})
}

module.exports = {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight
}


