const fs = require(`fs`)
const path = require('path')


console.log('ble')
fs.readFile("contacts.json", function (err, data) {
  if (err) {
    console.log("error", err.message);
  } else {
    console.log(data.toString());
  }
});           