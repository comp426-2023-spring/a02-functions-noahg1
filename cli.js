#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2))

if('-h' in args){
    console.log(`
        Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
            -h            Show this help message and exit.
            -n, -s        Latitude: N positive; S negative.
            -e, -w        Longitude: E positive; W negative.
            -z            Time zone: uses tz.guess() from moment-timezone by default.
            -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
            -j            Echo pretty JSON from open-meteo API and exit.`);
    process.exit(0);
}

let long;
let lat;

if("-n" in args) {
    latitude = args["n"];
}else if("-s" in args) {
    latitude = -args["s"];
}

if("-e" in args) {
    longitude = args["e"];
}else if("-w" in args) {
    longitude = -args["w"];
}

// Statements below to validate that lat and long are valid
if(latitude == undefined || Math.abs(latitude) > 90) {
    process.exit(1);
}
if(longitude == undefined || Math.abs(longitude) > 180) {
    process.exit(1);
}

//Set the timexone
let timezone = moment.tz.guess();
if('-t' in args){
    timezone  =  args['-t'];
}

//Send API request 
let req_url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&current_weather=true&timezone=" + timezone;
const response = await fetch(req_url);
let data = response.json();