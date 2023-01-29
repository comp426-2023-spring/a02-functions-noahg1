#!/usr/bin/env node
// Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
//     -h            Show this help message and exit.
//     -n, -s        Latitude: N positive; S negative.
//     -e, -w        Longitude: E positive; W negative.
//     -z            Time zone: uses tz.guess() from moment-timezone by default.
//     -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
//     -j            Echo pretty JSON from open-meteo API and exit.

import { Moment } from "moment-timezone"

const timezone = moment.tz.guess()

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m');