// roman, IoN6
// https://www.geopeitus.ee/aare/8553

function haversineDistance(lat1, lon1, lat2, lon2) {
  // Radius of the Earth in miles
  const R = 3958.8;

  // Convert degrees to radians
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in miles
  return R * c;
}

// Retrieve coordinates from three given codes
function code2LatLon(varA, varB, varC) {
  let latSign, lonSign, lonValue, latValue; if ((varA % 1000 - varA % 100) / 100 == 1) { latSign = 1; lonSign = 1; } else if ((varA % 1000 - varA % 100) / 100 == 2) { latSign = -1; lonSign = 1; } else if ((varA % 1000 - varA % 100) / 100 == 3) { latSign = 1; lonSign = -1; } else if ((varA % 1000 - varA % 100) / 100 == 4) { latSign = -1; lonSign = -1; }
  if (((varC % 100000 - varC % 10000) / 10000 + (varC % 100 - varC % 10) / 10) % 2 === 0) { latValue = Number(((varA % 10000 - varA % 1000) / 1000 * 10 + (varB % 100 - varB % 10) / 10 + (varB % 100000 - varB % 10000) / 10000 * 0.1 + (varC % 1000 - varC % 100) / 100 * 0.01 + (varA % 1000000 - varA % 100000) / 100000 * 0.001 + (varC % 100 - varC % 10) / 10 * 1.0E-4 + varA % 10 * 1.0E-5)); } else { latValue = Number(((varB % 1000000 - varB % 100000) / 100000 * 10 + varA % 10 + (varA % 10000 - varA % 1000) / 1000 * 0.1 + (varC % 1000000 - varC % 100000) / 100000 * 0.01 + (varC % 1000 - varC % 100) / 100 * 0.001 + (varC % 100 - varC % 10) / 10 * 1.0E-4 + (varA % 1000000 - varA % 100000) / 100000 * 1.0E-5)) }
  if (((varC % 100000 - varC % 10000) / 10000 + (varC % 100 - varC % 10) / 10) % 2 === 0) {
    lonValue = Number(((varA % 100000 - varA % 10000) / 10000 * 100 + (varC % 1000000 - varC % 100000) / 100000 * 10 + varC % 10 + (varB % 1000 - varB % 100) / 100 * 0.1 + (varB % 1000000 - varB % 100000) / 100000 * 0.01 + (varA % 100 -
      varA % 10) / 10 * 0.001 + (varC % 100000 - varC % 10000) / 10000 * 1.0E-4 + varB % 10 * 1.0E-5));
  } else { lonValue = Number(((varB % 100 - varB % 10) / 10 * 100 + varC % 10 * 10 + (varA % 100 - varA % 10) / 10 + (varA % 100000 - varA % 10000) / 10000 * 0.1 + (varB % 1000 - varB % 100) / 100 * 0.01 + varB % 10 * 0.001 + (varC % 100000 - varC % 10000) / 10000 * 1.0E-4 + (varB % 100000 - varB % 10000) / 10000 * 1.0E-5)); }
  latValue = latSign * latValue; lonValue = lonSign * lonValue; return { lat: latValue, lon: lonValue }
}

// Retrieve codes for given coordinates
function latLong2Code(varLat, varLong) {
  varLat = Number(varLat); varLong = Number(varLong); var varA4, varB3, varC3, tempvarB3, tempvarC3, codeA = 0, codeB = 0, codeC = 0; if (varLat < 0 && varLong < 0) { varA4 = 4; varLat = varLat * -1; varLong = varLong * -1; } else if (varLat < 0 && 0 < varLong) { varA4 = 2; varLat = varLat * -1; } else if (0 < varLat && varLong < 0) { varA4 = 3; varLong = varLong * -1; } else if (0 <= varLat && 0 <= varLong) { varA4 = 1; }
  varLong = varLong + 1.0E-12
  varLat = varLat + 1.0E-12
  varLat = Number(varLat * 100000 - varLat * 100000 % 1)
  varLong = Number(varLong * 100000 - varLong * 100000 % 1)
  var calc = Number(((varLong % 100 - varLong % 10) / 10 + (varLat % 100 - varLat % 10) / 10) % 2); if (calc == 0) {
    tempvarB3 = Number(11 - ((varLat % 1000 - varLat % 100) / 100 * 8 + (varLong % 100000000 - varLong % 10000000) / 10000000 * 6 + (varLat % 10000000 - varLat % 1000000) / 1000000 * 4 + varA4 * 2 + (varLong % 1000 - varLong % 100) / 100 * 3 + varLat % 10 * 5 + (varLong % 10000 - varLong % 1000) / 1000 * 9 + (varLat % 100000 - varLat % 10000) / 10000 * 7) % 11); if (tempvarB3 == 10) { varB3 = 0; } else if (tempvarB3 == 11) { varB3 = 5; } else { varB3 = tempvarB3; }
    tempvarC3 = Number(11 - ((varLong % 100000 - varLong % 10000) / 10000 * 8 + (varLat % 1000000 - varLat % 100000) / 100000 * 6 + varLong % 10 * 4 + (varLong % 10000000 - varLong % 1000000) / 1000000 * 2 + (varLong % 100 - varLong % 10) / 10 * 3 + (varLat % 10000 - varLat % 1000) / 1000 * 5 + (varLat % 100 - varLat % 10) / 10 * 9 + (varLong % 1000000 - varLong % 100000) / 100000 * 7) % 11); if (tempvarC3 == 10) { varC3 = 0; } else if (tempvarC3 == 11) { varC3 = 5; } else { varC3 = tempvarC3; }
    codeA = (varLat % 1000 - varLat % 100) / 100 + "" + (varLong % 100000000 - varLong % 10000000) / 10000000 + "" + (varLat % 10000000 - varLat % 1000000) / 1000000 + "" + varA4 + "" + (varLong % 1000 - varLong % 100) / 100 + "" + varLat % 10; codeB = (varLong % 10000 - varLong % 1000) / 1000 + "" + (varLat % 100000 - varLat % 10000) / 10000 + "" + varB3 + "" + (varLong % 100000 - varLong % 10000) / 10000 + "" + (varLat % 1000000 - varLat % 100000) / 100000 + "" + varLong % 10; codeC = (varLong % 10000000 - varLong % 1000000) / 1000000 + "" + (varLong % 100 - varLong % 10) / 10 + "" + varC3 + "" + (varLat % 10000 - varLat % 1000) / 1000 + "" + (varLat % 100 - varLat % 10) / 10 + "" + (varLong % 1000000 - varLong % 100000) / 100000; return { a: codeA, b: codeB, c: codeC }
  } else {
    tempvarB3 = Number(11 - (varLat % 10 * 8 + (varLong % 100000 - varLong % 10000) / 10000 * 6 + (varLat % 100000 - varLat % 10000) / 10000 * 4 + varA4 * 2 + (varLong % 1000000 - varLong % 100000) / 100000 * 3 + (varLat % 1000000 - varLat % 100000) / 100000 * 5 + (varLat % 10000000 - varLat % 1000000) / 1000000 * 9 + varLong % 10 * 7) % 11); if (tempvarB3 == 10) { varB3 = 0; } else if (tempvarB3 == 11) { varB3 = 5; } else { varB3 = tempvarB3; }
    tempvarC3 = Number(11 - ((varLong % 10000 - varLong % 1000) / 1000 * 8 + (varLong % 100000000 - varLong % 10000000) / 10000000 * 6 + (varLong % 1000 - varLong % 100) / 100 * 4 + (varLat % 10000 - varLat % 1000) / 1000 * 2 + (varLong % 100 - varLong % 10) / 10 * 3 + (varLat % 1000 - varLat % 100) / 100 * 5 + (varLat % 100 - varLat % 10) / 10 * 9 + (varLong % 10000000 - varLong % 1000000) / 1000000 * 7) % 11); if (tempvarC3 == 10) { varC3 = 0; } else if (tempvarC3 == 11) { varC3 = 5; } else { varC3 = tempvarC3; }
    codeA = varLat % 10 + "" + (varLong % 100000 - varLong % 10000) / 10000 + "" + (varLat % 100000 - varLat % 10000) / 10000 + "" + varA4 + "" + (varLong % 1000000 - varLong % 100000) / 100000 + "" + (varLat % 1000000 - varLat % 100000) / 100000; codeB = (varLat % 10000000 - varLat % 1000000) / 1000000 + "" + varLong % 10 + "" + varB3 + "" + (varLong % 10000 - varLong % 1000) / 1000 + "" + (varLong % 100000000 - varLong % 10000000) / 10000000 + "" + (varLong % 1000 - varLong % 100) / 100; codeC = (varLat % 10000 - varLat % 1000) / 1000 + "" + (varLong % 100 - varLong % 10) / 10 + "" + varC3 + "" + (varLat % 1000 - varLat % 100) / 100 + "" + (varLat % 100 - varLat % 10) / 10 + "" + (varLong % 10000000 - varLong % 1000000) / 1000000; return { a: codeA, b: codeB, c: codeC }
  }
}

const tunk_latitude   = 59.532560 
const tunk_longitude  = 24.895000

//ab51c5
//d51ef1
//g1h15i
//
// d = a * 3
// g = d - c

const zeroPad = (num, places) => String(num).padStart(places, '0')
var solution = new Map();

for (let a = 0; a <= 3; a++) {
  for (let b = 0; b <= 9; b++) {
    for (let c = 0; c <= 9; c++) {
      code1 = zeroPad(a * 100000 + b * 10000 + 5000 + 100 + c * 10 + 5, 6)
      //console.log(zeroPad(code1, 6))
      d = a * 3
      for (let e = 0; e <=9; e++) {
        for (let f = 0; f <= 9; f++) {
          code2 = zeroPad(d * 100000 + 50000 + 1000 + e * 100 + f * 10 + 1)
          g = d -c 
          if (g >= 0) {
            for (let h = 0; h <= 9; h++) {
              for (let i = 0; i <= 9; i ++) {
                code3 = zeroPad(g * 100000 + 10000 + h * 1000 + 100 + 50 + i)
                //console.log(code1, code2, code3)
                let coord = code2LatLon(code1, code2, code3)
                if (coord.lat >= 59 && coord.lat < 60 && coord.lon >= 24 && coord.lon < 25) {
                  //console.log(coord.lat, coord.lon)
                  let distance = haversineDistance(tunk_latitude, tunk_longitude, coord.lat, coord.lon);
                  //console.log(distance)
                  if (distance <= 2) {
                    let key = "" + coord.lat + "," + coord.lon
                    //console.log(typeof solution.get(key))
                    if (typeof solution.get(key) !== "object") {
                      coord["code1"] = code1
                      coord["code2"] = code2
                      coord["code3"] = code3
                      coord["distance from cache ground zero (miles)"] = distance
                      solution.set(key, coord)
                      //console.log(coord, coord.lat + "," + coord.lon)
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

for (let c of solution) {
  console.log(c);
}

// node 8553_solution.js
