import fs from "fs";
import { parse } from "csv-parse";
import ObjectsToCsv from "objects-to-csv";

var stats = [];
var innerstats = [];
var obj = {};
var csv;
const readFromCSV = function () {
  fs.createReadStream("./data.csv")
    .pipe(
      parse({
        delimiter: ",",
        from_line: 2,
        // columns: "",
        skip_empty_lines: true,
      })
    )
    .on("data", function (col) {
      addOrUpdate(col[0]);
    })
    .on("end", function () {
      abbre_make(stats);
    })
    .on("end", function () {
      console.log(innerstats);
      csv = `${innerstats}`;
      //const csv = new ObjectsToCsv(convertToArrayOfObjects(innerstats));
      //await csv.toDisk("./output1.csv");
      fs.writeFile("./output1.csv", csv, function (err) {
        if (err) {
          console.log(
            "Some error occured - file either not saved or corrupted file saved."
          );
        } else {
          console.log("It's saved!");
        }
      });
    });
};

// readFromCSV();
function addOrUpdate(item) {
  var found = false;
  for (var i = 0; i < stats.length; i++) {
    if (stats[i][0] === item[0]) {
      found = true;
      break;
    }
  }
  if (false == found) {
    stats.push(item);
  }
}
function abbre_make(item) {
  obj = {};
  for (var i = 0; i < item.length; i++) {
    var split_names = item[i].trim().split(" ");
    if (split_names.length > 1)
      obj[innerstats[i]] = innerstats.push(
        split_names[0].slice(0, 3) + split_names[1].charAt(0)
      );
    else obj[innerstats[i]] = innerstats.push(split_names[0].slice(0, 4));
  }
}
// function convertToArrayOfObjects(data) {
//   var keys = data,
//     i = 0,
//     output = [];
//   var obj = {};
//   for (i = 0; i < data.length; i++) {
//     obj[i] = data[i];
//   }
//   output.push(obj);
//   return output;
// }

readFromCSV();
