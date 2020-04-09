import {getLastElementOfArray} from "./arrayUtils";
import { parse } from "svelte/compiler";
let chartColor = ['rgba(255, 99, 132, 0.2)', "rgba(241, 196, 15,0.2)", "rgba(41, 128, 185,0.2)", "rgba(243, 156, 18,0.2)", "rgba(46, 204, 113,0.2)", "rgba(231, 76, 60,0.2)", "rgba(142, 68, 173,0.2)", "rgba(44, 62, 80,0.2)", "rgba(189, 195, 199,0.2)", "rgba(211, 84, 0,0.2)", "rgba(52, 152, 219,0.2)"];
    
let chartBorderColor = ['rgba(255,99,132,1)', "rgba(241, 196, 15,1.0)", "rgba(41, 128, 185,1.0)", "rgba(243, 156, 18,1.0)", "rgba(46, 204, 113,1.0)", "rgba(231, 76, 60,1.0)", "rgba(142, 68, 173,1.0)", "rgba(44, 62, 80,1.0)", "rgba(189, 195, 199,1.0)", "rgba(211, 84, 0,1.0)", "rgba(52, 152, 219,1.0)"];

function getEpicurveChartData(data){
  data = data["data"]["COVID19 Epikurve"];
let chartData = [];
data.forEach(element => {
  let chartElement = {};
  chartElement["t"] = new Date(element.date);
  chartElement["y"] = parseInt(element.cases,10);
  if(chartData.length>0){
    chartElement["y"] =  chartElement["y"]+ getLastElementOfArray(chartData).y;
  }
  chartData.push(chartElement);
  });
  return {
      cardTitle: "Cases in Switzerland",
      type: "line",
      data: {
          datasets: [{
          label: 'Cases',
          data: chartData,
          backgroundColor: chartColor[0],
          borderColor: chartBorderColor[0], 
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time'
          }]
        }
      }
    };
}

function getHospitCurveChartData(data){
let datasets = [];
for (const age in data[0]) {
  if (data[0].hasOwnProperty(age) && age!=="date") {
    datasets.push(mapElementByAge(data, age));
  }
}
datasets = getDatasetsFromDatasets(datasets);

  return {
      cardTitle: "Hospitalization per age group",
      type: "line",
      data: {
          datasets: datasets
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
          }]
        }
      }
    };
}

function getDeathCurveChartData(data){
  let datasets = [];
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age!=="date") {
      datasets.push(mapElementByAge(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);
  
    return {
        cardTitle: "Deaths per age group",
        type: "line",
        data: {
            datasets: datasets
        },
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day'
              },
            }]
          }
        }
      };
  }

  function getInfectionCurveChartData(data){
    let datasets = [];
    for (const age in data[0]) {
      if (data[0].hasOwnProperty(age) && age!=="date") {
        datasets.push(mapElementByAge(data, age));
      }
    }
    datasets = getDatasetsFromDatasets(datasets);
    
      return {
          cardTitle: "Infections per age group",
          type: "line",
          data: {
              datasets: datasets
          },
          options: {
            scales: {
              xAxes: [{
                type: 'time',
                time: {
                  unit: 'day'
                },
              }]
            }
          }
        };
    }

    function getInfectionPerDayChartData(data){
      let datasets = [];
      for (const age in data[0]) {
        if (data[0].hasOwnProperty(age) && age!=="date") {
          datasets.push(mapElementByAgeDelta(data, age));
        }
      }
      datasets = getDatasetsFromDatasets(datasets);
      
        return {
            cardTitle: "Daily infections per age group",
            type: "bar",
            data: {
                datasets: datasets
            },
            options: {
              scales: {
                xAxes: [{
                  stacked: true,
                  type: 'time',
                  time: {
                    unit: 'day'
                  },
                }],
                yAxes: [{
                  stacked: true
              }]
              }
            }
          };
      }

      function getDeathPerDayChartData(data){
        let datasets = [];
        for (const age in data[0]) {
          if (data[0].hasOwnProperty(age) && age!=="date") {
            datasets.push(mapElementByAgeDelta(data, age));
          }
        }
        datasets = getDatasetsFromDatasets(datasets);
        
          return {
              cardTitle: "Daily deaths per age group",
              type: "bar",
              data: {
                  datasets: datasets
              },
              options: {
                scales: {
                  xAxes: [{
                    stacked: true,
                    type: 'time',
                    time: {
                      unit: 'day'
                    },
                  }],
                  yAxes: [{
                    stacked: true
                }]
                }
              }
            };
        }
        function getHospitPerDayChartData(data){
          let datasets = [];
          for (const age in data[0]) {
            if (data[0].hasOwnProperty(age) && age!=="date") {
              datasets.push(mapElementByAgeDelta(data, age));
            }
          }
          datasets = getDatasetsFromDatasets(datasets);
          
            return {
                cardTitle: "Daily hospitalization per age group",
                type: "bar",
                data: {
                    datasets: datasets
                },
                options: {
                  scales: {
                    xAxes: [{
                      stacked: true,
                      type: 'time',
                      time: {
                        unit: 'day'
                      },
                    }],
                    yAxes: [{
                      stacked: true
                  }]
                  }
                }
              };
          }
function getDatasetsFromDatasets(datasets) {
  let indexAddition = 0;

  let fillupAge = [];
  if (datasets[0][0].age !=="0 - 9"){
    let dataset = {
      label: "0 - 9",
      data:  [{ x: new Date(datasets[0][0].t), y: 0 }],
      backgroundColor: chartColor[indexAddition],
      borderColor: chartBorderColor[indexAddition],
      borderWidth: 1
    };
    fillupAge.push(dataset);
    indexAddition++;
  }
  if (datasets[1][0].age !=="10 - 19"){
    let dataset = {
      label: "10 - 19",
      data:  [{ x: new Date(datasets[0][0].t), y: 0 }],
      backgroundColor: chartColor[indexAddition],
      borderColor: chartBorderColor[indexAddition],
      borderWidth: 1
    };
    fillupAge.push(dataset);
    indexAddition++;
  }
  if (datasets[2][0].age !=="20 - 29"){
    let dataset = {
      label: "20 - 29",
      data:  [{ x: new Date(datasets[0][0].t), y: 0 }],
      backgroundColor: chartColor[indexAddition],
      borderColor: chartBorderColor[indexAddition],
      borderWidth: 1
    };
    fillupAge.push(dataset);
    indexAddition++;
  }
  


  const parsedDatasets = datasets.map((chartData, index) => {
    let dataset = {
      label: chartData[0].age,
      data: chartData.map(d => { return { x: new Date(d.t), y: d.y }; }),
      backgroundColor: chartColor[index + indexAddition],
      borderColor: chartBorderColor[index + indexAddition],
      borderWidth: 1
    };
    return dataset;
  });
  console.log(fillupAge);
  return fillupAge.concat(parsedDatasets);
}

function mapElementByAge(data, age) {
  return data.map((dateGroup) => {
    let chartElement = {};
    chartElement["t"] = dateGroup.date;
    chartElement["y"] = parseInt(dateGroup[age]);
    chartElement["age"] = age;
    return chartElement;
  });
}

function mapElementByAgeDelta(data, age) {
  let ref = data;
  return data.map((dateGroup,i) => {
    let chartElement = {};
    chartElement["t"] = dateGroup.date;

    if (i>0){
      chartElement["y"] = parseInt(dateGroup[age]-data[i-1][age]);
    }
    else{
      chartElement["y"] = 0;
    }
    chartElement["age"] = age;
    return chartElement;
  });
}

function getTotalDeathChartData(data){
    data = data["data"]["COVID19 Altersverteilung TodF"];
    let chartData = [];
    let chartLabels = [];

    if (data[0].age!=="0 - 9"){
        chartData.push("0");
        chartLabels.push("0 - 9");
    }

    if (data[1].age!=="10 - 19"){
        chartData.push("0");
        chartLabels.push("10 - 19");
    }

    if (data[2].age!=="20 - 29"){
        chartData.push("0");
        chartLabels.push("20 - 29");
    }

	data.forEach(element => {
        chartData.push(element.TotalDeaths);
        chartLabels.push(element.age);
    });
    return {
        cardTitle: "Age distribution of deaths",
        type: "pie",
        data: {
            datasets: [{
            data: chartData,
            backgroundColor: chartColor,
            borderColor: chartBorderColor
        }],
          labels: chartLabels,
        }
      };
}
function getTotalHospitChartData(data){
    data = data["data"]["COVID19 Altersverteilung Hospit"];
    let chartData = [];
    let chartLabels = [];

	data.forEach(element => {
        chartData.push(element.TotalHospitalized);
        chartLabels.push(element.age);
    });
    return {
        cardTitle: "Age distribution of hospitalizations",
        type: "pie",
        data: {
            datasets: [{
            data: chartData,
            backgroundColor: chartColor,
            borderColor: chartBorderColor
        }],
          labels: chartLabels,
        }
      };
}

function getTotalInfectionAgeChartData(data){
    data = data["data"]["COVID19 Altersverteilung"];
    let chartData = [];
    let chartLabels = [];

	data.forEach(element => {
        chartData.push(element.totalInfectionCount);
        chartLabels.push(element.age);
    });
    return {
        cardTitle: "Age distribution of Infections",
        type: "pie",
        data: {
            datasets: [{
            data: chartData,
            backgroundColor: chartColor,
            borderColor: chartBorderColor
        }],
          labels: chartLabels,
        }
      };
}


export {
  getEpicurveChartData,
  getTotalDeathChartData,
  getTotalHospitChartData,
  getTotalInfectionAgeChartData,
  getHospitCurveChartData,
  getDeathCurveChartData,
  getInfectionCurveChartData,
  getInfectionPerDayChartData,
  getHospitPerDayChartData,
  getDeathPerDayChartData};