import fs from "fs";

function ReadDataFile(strVar) {
  if (strVar === "input") {
    var data = fs
      .readFileSync("data.csv")
      .toString() // convert Buffer to string
      .split("\n") // split string to lines
      .map((e) => e.trim()) // remove white spaces for each line
      .map((e) => e.split(",").map((e) => e.trim())); // split each line to array

    console.log("Line 12");
    console.log(data);
    return data;
  } else if (strVar === "output1") {
    var data = fs
      .readFileSync("output1.csv")
      .toString() // convert Buffer to string
      .split("\n") // split string to lines
      .map((e) => e.trim()) // remove white spaces for each line
      .map((e) => e.split(",").map((e) => e.trim())); // split each line to array

    console.log("Line 25");
    console.log(data);
    return data;
  } else if (strVar === "output2") {
    var data = fs
      .readFileSync("output2.csv")
      .toString() // convert Buffer to string
      .split("\n") // split string to lines
      .map((e) => e.trim()) // remove white spaces for each line
      .map((e) => e.split(",").map((e) => e.trim())); // split each line to array

    console.log("Line 34");
    console.log(data);
    return data;
  }
}

function GetDistinct(arrData, strVar) {
  if (strVar === "Make") {
    var arr = [];
    arr.push(arrData[1][0]);
    for (var i = 2; i < arrData.length - 1; i++) {
      if (arr.indexOf(arrData[i][0]) === -1) arr.push(arrData[i][0]);
    }
    console.log("Line 48");
    console.log(arr);
    return arr;
  } else if (strVar === "Model") {
    var i, j;
    var arr = [],
      i,
      j;
    console.log("line 41");
    console.log(arrData); // output1 file
    var arrDataGiven = ReadDataFile("input");
    console.log(arrDataGiven[2][1]);
    for (i = 0; i < arrData.length; i++) {
      arr.push([]);
      for (j = 1; j < arrDataGiven.length; j++) {
        if (arrData[i][0] === arrDataGiven[j][0])
          if (arr[i].indexOf(arrDataGiven[j][1]) === -1) {
            arr[i].push(arrDataGiven[j][1]);
          }
      }
    }
    console.log("line 53");
    console.log(arr);
    return arr;
  } else if (strVar === "Varient") {
    var i, j, k;
    var arr = [],
      i,
      j,
      k;
    console.log("line 41");
    console.log(arrData); // output2 file
    var arrDataGiven = ReadDataFile("input");
    var arrDataModel = ReadDataFile("output1");
    let arrofMakes = GetDistinct(arrDataGiven, "Make");
    let arrofModels = GetDistinct(arrDataModel, "Model");
    for (i = 0; i < arrofMakes.length; i++) {
      arr.push([]);
      for (j = 0; j < arrofModels[i].length; j++) {
        arr[i].push([]);
        for (k = 1; k < arrDataGiven.length; k++) {
          if (
            arrofMakes[i] == arrDataGiven[k][0] &&
            arrofModels[i][j] == arrDataGiven[k][1]
          ) {
            if (arr[i][j].indexOf(arrDataGiven[k][2]) === -1) {
              arr[i][j].push(arrDataGiven[k][2]);
            }
          }
        }
      }
    }
    console.log("line 101");
    console.log(arr);
    return arr;
  }
}

function GenerateAbbreviation(arrDatas, strVar) {
  if (strVar === "Make") {
    let abbreData = [];
    arrDatas.forEach((arrData) => {
      if (abbreData.indexOf(arrData.slice(0, 4)) === -1) {
        abbreData.push(arrData.slice(0, 4));
      }
    });

    for (let i = 0; i < arrDatas.length; i++) {
      abbreData[i] = arrDatas[i].concat(", " + abbreData[i]); // this line is meant for conversion process of csv
    }

    abbreData = abbreData.join("\n").toString();
    fs.writeFileSync("output1.csv", abbreData);
    console.log(abbreData);
    return abbreData;
  } else if (strVar === "Model") {
    console.log("line 86");
    console.log(arrDatas[0].length);
    var i, j;
    var abbreData = [],
      i,
      j;
    for (i = 0; i < arrDatas.length; i++) {
      abbreData.push([]);
      for (j = 0; j < arrDatas[i].length; j++) {
        if (abbreData[i].indexOf(arrDatas[i][j].slice(0, 4)) === -1) {
          const result = arrDatas[i][j].trim().split(/\s+/);
          if (result.length == 2)
            abbreData[i].push(result[0].slice(0, 3) + result[1].slice(0, 1));
          else if (result.length == 3)
            abbreData[i].push(
              result[0].slice(0, 2) +
                result[1].slice(0, 1) +
                result[2].slice(0, 1)
            );
          else abbreData[i].push(arrDatas[i][j].slice(0, 4));
        }
      }
    }
    console.log(abbreData);
    var i, j;
    var finalArr = [];
    var count = 0;
    var arrDataModel = ReadDataFile("output1");
    for (i = 0; i < arrDatas.length; i++) {
      for (j = 0; j < abbreData[i].length; j++) {
        finalArr.push([]);
        finalArr[count] = finalArr[count].concat(
          arrDataModel[i][0] +
            ", " +
            arrDatas[i][j] +
            ", " +
            arrDataModel[i][1] +
            ", " +
            abbreData[i][j]
        ); // this line is meant for conversion process of csv
        finalArr[count] = finalArr[count].join("\n").toString();
        count++;
      }
    }
    finalArr = finalArr.join("\n").toString();

    fs.writeFileSync("output2.csv", finalArr);
    console.log(finalArr);
    return abbreData;
  } else if (strVar === "Varient") {
    var i, j, k;
    var abbreData = [],
      i,
      j,
      k;
    for (i = 0; i < arrDatas.length; i++) {
      abbreData.push([]);
      for (j = 0; j < arrDatas[i].length; j++) {
        abbreData[i].push([]);
        for (k = 0; k < arrDatas[i][j].length; k++) {
          const result = arrDatas[i][j][k].trim().split(/\s+/);
          if (result.length == 2)
            abbreData[i][j].push(
              result[0].slice(0, 1).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
                result[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
            );
          else if (result.length == 3)
            abbreData[i][j].push(
              result[0].slice(0, 1).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
                result[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
                result[2].slice(0, 1).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
            );
          else if (result.length == 4)
            abbreData[i][j].push(
              result[0].slice(0, 1).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
                result[1].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
                result[2]
                  .slice(0, 1)
                  .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "") +
                result[3].slice(0, 1).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
            );
          else
            abbreData[i][j].push(
              arrDatas[i][j][k]
                .slice(0, 4)
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
            );
        }
      }
    }
    console.log("line 205");
    console.log(abbreData);
    var i, j, k;
    var finalArr = [],
      i,
      j,
      k;
    var count = 0;
    var ModelCounter = 0;
    var arrDataMake = ReadDataFile("output1");
    var arrDataModel = ReadDataFile("output2");
    console.log("line 227");
    console.log(arrDataMake);
    var arrDataMake = ReadDataFile("output1");
    var arrOfModels = GetDistinct(arrDataMake, "Model");
    console.log("line 231");
    console.log(arrOfModels);
    console.log("line 233");
    console.log(arrDataModel);
    for (i = 0; i < arrDataMake.length; i++) {
      for (j = 0; j < arrOfModels[i].length; j++) {
        for (k = 0; k < abbreData[i][j].length; k++) {
          finalArr.push([]);
          finalArr[count] = finalArr[count].concat(
            arrDataMake[i][0] +
              ", " +
              arrOfModels[i][j] +
              ", " +
              arrDatas[i][j][k] +
              ", " +
              arrDataMake[i][1] +
              ", " +
              arrDataModel[ModelCounter][3] +
              ", " +
              abbreData[i][j][k]
          );
          finalArr[count] = finalArr[count].join("\n").toString();
          count++;
        }
        ModelCounter++;
      }
    }
    finalArr = finalArr.join("\n").toString();

    fs.writeFileSync("output3.csv", finalArr);
    console.log(finalArr);
    return abbreData;
  }
}

var arrDataMake = ReadDataFile("input");
var arrOfMakes = GetDistinct(arrDataMake, "Make");
var abbre_MakeData = GenerateAbbreviation(arrOfMakes, "Make");
var arrDataModel = ReadDataFile("output1");
var arrOfModels = GetDistinct(arrDataModel, "Model");
var abbre_ModelData = GenerateAbbreviation(arrOfModels, "Model");
var arrDataVarient = ReadDataFile("output2");
var arrOfVarients = GetDistinct(arrDataVarient, "Varient");
var abbre_VarientData = GenerateAbbreviation(arrOfVarients, "Varient");
