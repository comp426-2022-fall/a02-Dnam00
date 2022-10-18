#!/usr/bin/env node

import minimist from "minimist";
import moment from "moment-timezone";
import fetch from "node-fetch";

const args = minimist(process.argv.slice(2));

//console.log(args)
// help args
if (args.h) {
	
console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE

    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.
`)	
process.exit(0)
}



// getting timezone and data
//if (!args.t) {
//	const timezone = moment.tz.guess();
//}
let timezone = moment.tz.guess();
if (args.z) {
	timezone = args.z 
} else {
timezone = moment.tz.guess();
}
 
// need to get the data


	//const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.90&longitude=-79.05&daily=weathercode,precipitation_hours&timezone=America%2FNew_York');
 	
  	//const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude' + latitude + '=&longitude=' + longitude + 'daily=weathercode,precipitation_hours&timezone=' + timezone + ')


// creating latitude and longitude constant

//let latitude = 70
let latitude = 35.80

if (args.n) {
	latitude = args.n
}
if (args.s) {
	latitude = args.s * -1
}
let longitude = -79.00

if (args.w) {
	longitude = args.w * -1
}
if (args.e) {
	longitude = args.e
}


  	let weatherdata = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&daily=precipitation_hours&timezone=" + timezone;


	const response = await fetch(weatherdata);
	const data = await response.json();
	//console.log(data);			

if (args.j) {
	// construct a fetch() API call that will return the JSON data
	// make a request
  	//const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude' + latitude + '=&longitude=' + longitude + 'daily=weathercode,precipitation_hours&timezone=' + timezone + ');
	//const response2 = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.90&longitude=-79.05&daily=weathercode,precipitation_hours&timezone=America%2FNew_York');
 	

//	const data = await response.json();

	//let dataString = JSON.stringify(data)
	//fs.writeFileSync("./weather_forecast.json", dataString)
	console.log(data);
	process.exit(0);
}


// number of days away. 
const days = args.d 

if (days == 0) {
  console.log("today's precipitation hour is " + data.daily.precipitation_hours[0] + ".")
	if (data.daily.precipitation_hours[0] != 0) {
		console.log("You might need your galoshes") 
	} else {
		console.log("You will not need your galoshes")
	}	
} else if (days > 1) {
  console.log("in " + days + " days, the precipitation hour is " + data.daily.precipitation_hours[days - 1] + ".")
	if (data.daily.precipitation_hours[days-1] != 0) {
		console.log("You might need your galoshes") 
	} else {
		console.log("You will not need your galoshes")
	}
} else {
  console.log("tomorrow precipitation hour is " + data.daily.precipitation_hours[1] + ".")
	if (data.daily.precipitation_hours[1] != 0) {
		console.log("You might need your galoshes")
	} else {
		console.log("You will not need your galoshes")
	}
}

//if (days == 0) {
//	console.log("today.")
//} else if (days > 1) {
//	console.log("in " + days + " days.")
//} else {
//	console.log("tomorrow.")
//}

