import fs from "fs";

function ReadDataFile() {
  var data = fs
    .readFileSync("data.csv")
    .toString() // convert Buffer to string
    .split("\n") // split string to lines
    .map((e) => e.trim()) // remove white spaces for each line
    .map((e) => e.split(",").map((e) => e.trim())); // split each line to array

  console.log("Line 12");
  console.log(data);
  return data;
}

function GetDistinct(arrData, strVar) {
  var arr = [];
  if (strVar === "Make") {
    arr.push(arrData[1][0]);
    for (var i = 2; i < arrData.length - 1; i++) {
      if (arr.indexOf(arrData[i][0]) === -1) arr.push(arrData[i][0]);
      // else continue;
    }
    console.log("Line 48");
    console.log(arr);
    return arr;
  } else if (strVar === "Model") {
    for (let index = 0; index < arr.length - 1; index++) {
      arr.push(arrData[1][index]);
    }
    for (var i = 2; i < arrData.length - 1; i++) {
      if (arr.indexOf(arrData[i][1]) === -1) arr.push(arrData[i][1]);
      // else continue;
    }

    console.log("Line 60");
    console.log(arr);
    return arr;
  } else if (strVar === "Varient") {
    for (let index = 0; index < arr.length; index++) {
      arr.push(arrData[1][index]);
    }
    for (var i = 2; i < arrData.length - 1; i++) {
      if (arr.indexOf(arrData[i][2]) === -1) arr.push(arrData[i][2]);
      // else continue;
    }

    console.log("line 72");
    console.log(arr);
    return arr;
  }
}

function GenerateAbbreviation(arrDatas, strVar) {
  let abbreData = [];
  if (strVar === "Make") {
    arrDatas.forEach((arrData) => {
      if (abbreData.indexOf(arrData.slice(0, 4)) === -1) {
        abbreData.push(arrData.slice(0, 4));
      }
    });

    for (let i = 0; i < arrDatas.length; i++) {
      abbreData[i] = arrDatas[i].concat(" , " + abbreData[i]);
    }
    abbreData = abbreData.join("\n").toString();
    fs.writeFileSync("output1.csv", abbreData);
    return abbreData;
  } else if (strVar === "Model") {
    arrDatas.forEach((arrData) => {
      abbreData.push(arrData.slice(0, 4));
    });

    for (let i = 0; i < arrDatas.length; i++) {
      abbreData[i] = arrDatas[i].concat(" , " + abbreData[i]);
    }
    abbreData = abbreData.join("\n").toString();
    fs.appendFileSync("output2.csv", abbreData);

    return abbreData;
  } else if (strVar === "Varient") {
    arrDatas.forEach((arrData) => {
      const result = arrData.trim().split(/\s+/);
      if (result.length == 2)
        abbreData.push(result[0].slice(0, 3) + result[1].slice(0, 1));
      else if (result.length == 3)
        abbreData.push(
          result[0].slice(0, 2) + result[1].slice(0, 1) + result[2].slice(0, 1)
        );
      else abbreData.push(arrData.slice(0, 4));
    });
    for (let i = 0; i < arrDatas.length; i++) {
      abbreData[i] = arrDatas[i].concat(" , " + abbreData[i]);
    }
    abbreData = abbreData.join("\n").toString();
    fs.writeFileSync("output3.csv", abbreData);

    return abbreData;
  }
}

var arrDataMake = ReadDataFile();
var arrOfMakes = GetDistinct(arrDataMake, "Make");
var abbre_Make = GenerateAbbreviation(arrOfMakes, "Make");
var arrDataModel = ReadDataFile();
var arrOfModel = GetDistinct(arrDataModel, "Model");
var abbre_Model = GenerateAbbreviation(arrOfModel, "Model");
var arrDataVarient = ReadDataFile();
var arrOfVarient = GetDistinct(arrDataVarient, "Varient");
var abbre_Varient = GenerateAbbreviation(arrOfVarient, "Varient");

console.log("Line 129");
console.log(abbre_Make);
console.log("Line 131");
console.log(abbre_Model);
console.log("Line 133");
console.log(abbre_Varient);

for (let i = 0; i < arrDatas.length; i++) {
  abbreData[i] = arrDatas[i].concat(" , " + abbreData[i]);
}
abbreData = abbreData.join("\n").toString();
fs.writeFileSync("output1.csv", abbreData);

// var arrDataModel = ReadDataFile();
// var arrOfModels = GetDistinctMakes(arrDataModel);
// var abbre_Model = GenerateAbbreviation(arrOfModels, "Models");
// console.log(abbre_Model);

// import fs from "fs";
// import { parse } from "csv-parse";

// var fileData1 = [],
//   fileData2 = [],
//   q = 0;

// var stats = [];
// var innerstats = [];
// var split_names;
// var csvData;
// var CSVRows = [];
// var combined_str = [];
// const readFromCSV = function () {
//   fs.createReadStream("./data.csv")
//     .pipe(
//       parse({
//         delimiter: ",",
//         from_line: 2,
//         skip_empty_lines: true,
//       })
//     )
//     .on("data", function (col) {
//       stats.push(col);
//     })
//     .on("end", function () {
//       abbreviate(stats);
//     })
//     .on("end", function () {
//       abbre_combine();
//     });
// };

// const writeIntoCSV = function () {
//   fs.createReadStream("./output1.csv")
//     .on("data", function (data) {
//       fileData1.push(data);
//     })
//     .on("end", function () {
//       fs.createReadStream("./output3.csv").on("data", function (data) {
//         if (q != 0) {
//           fileData2.push(data);
//         }
//         q++;
//       });
//     });
// };

// function abbre_combine() {
//   var z = 0;
//   var count = 0;
//   var headers = ["Abbre_Combine"];
//   while (z < innerstats.length) {
//     combined_str += innerstats[z];
//     count++;
//     if (count == 3) {
//       count = 0;
//       CSVRows.push(combined_str);
//       combined_str = "";
//     }
//     z++;
//   }

//   var csvData = [];
//   var headers = ["Abbre_Combine"];

//   csvData.push(headers.join("\n"));
//   headers = Object.keys(csvData[0]);

//   // Loop to get value of each objects key

//   const values = headers.map((header) => {
//     const val = CSVRows[header];
//     return `"${val}\n"`;
//   });

//   // To add, sepearater between each value
//   csvData.push(CSVRows.join("\n"));
//   var finalCSV = csvData.join("\n");

//   console.log(finalCSV);
//   fs.writeFile("./output.csv", finalCSV, function (err) {
//     if (err) {
//       console.log(
//         "Some error occured - file either not saved or corrupted file saved."
//       );
//     } else {
//       console.log("It's saved!");
//     }
//   });
// }

// // This function is used to make abbrevation
// function abbreviate(item) {
//   for (var i = 0; i < item.length; i++) {
//     for (var j = 0; j < item[0].length; j++) {
//       split_names = item[i][j].trim().split(" "); //Maruti Suzuki

//       if (split_names.length > 1) {
//         var str1 =
//           split_names[0].slice(0, 3).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
//           split_names[1].charAt(0);
//         if (str1.charAt(str1.length - 1) === "(") {
//           str1 = str1.slice(0, str1.length - 1);
//           innerstats.push(str1);
//         } else {
//           innerstats.push(str1);
//         }
//       } else {
//         var str2 = split_names[0]
//           .slice(0, 4)
//           .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
//         if (str2.charAt(str2.length - 1) === "(") {
//           str2 = str2.slice(0, str2.length - 1);
//           innerstats.push(str2);
//         } else {
//           innerstats.push(str2);
//         }
//       }
//     }
//   }

//   var matrix = [],
//     i,
//     k;

//   //  This function is converting list to matrix form to make accessing and manipulating the data easy
//   function listToMatrix(innerstats, elementsPerSubArray) {
//     for (i = 0, k = -1; i < innerstats.length; i++) {
//       if (i % elementsPerSubArray === 0) {
//         k++;
//         matrix[k] = [];
//       }
//       matrix[k].push(innerstats[i]);
//     }
//   }

//   listToMatrix(innerstats, 3);
//   const objectToCsv = function (data) {
//     const csvRows = [];

//     var headers = ["Abbre_Make", "Abbre_Model", "Abbre_Variant"];

//     /* Using push() method we push fetched
//        data into csvRows[] array */
//     csvRows.push(headers.join(","));
//     headers = Object.keys(data[0]);
//     console.log(data[0][0]);
//     // Loop to get value of each objects key
//     for (const row of data) {
//       const values = headers.map((header) => {
//         const val = row[header];
//         return `"${val}"`;
//       });

//       // To add, sepearater between each value
//       csvRows.push(values.join(","));
//     }

//     /* To add new line for each objects values
//        and this return statement array csvRows
//        to this function.*/
//     return csvRows.join("\n");
//   };
//   csvData = objectToCsv(matrix);
// }

// readFromCSV();
