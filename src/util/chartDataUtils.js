import { getLastElementOfArray } from "./arrayUtils";

let chartColor = ['rgba(255, 99, 132, 0.2)', "rgba(241, 196, 15,0.2)", "rgba(41, 128, 185,0.2)", "rgba(243, 156, 18,0.2)", "rgba(46, 204, 113,0.2)", "rgba(231, 76, 60,0.2)", "rgba(142, 68, 173,0.2)", "rgba(44, 62, 80,0.2)", "rgba(189, 195, 199,0.2)", "rgba(211, 84, 0,0.2)", "rgba(52, 152, 219,0.2)"];

let chartBorderColor = ['rgba(255,99,132,1)', "rgba(241, 196, 15,1.0)", "rgba(41, 128, 185,1.0)", "rgba(243, 156, 18,1.0)", "rgba(46, 204, 113,1.0)", "rgba(231, 76, 60,1.0)", "rgba(142, 68, 173,1.0)", "rgba(44, 62, 80,1.0)", "rgba(189, 195, 199,1.0)", "rgba(211, 84, 0,1.0)", "rgba(52, 152, 219,1.0)"];

function getEpicurveChartData(data) {
  console.log(data);
  data = data["data"]["COVID19 Zahlen"];
  let chartData = [];
  data.forEach(element => {
    let chartElement = {};
    chartElement["t"] = new Date(element.date);
    chartElement["y"] = parseInt(element["dailyCases"], 10);
    if (chartData.length > 0) {
      chartElement["y"] = chartElement["y"] + getLastElementOfArray(chartData).y;
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
      tooltips: {
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            let data = chart.data.datasets[tooltipItem.datasetIndex];
            return {
              borderColor: data.borderColor,
              backgroundColor: data.borderColor
            };
          }
        }
      },
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

function getHospitCurveChartData(data) {
  let datasets = [];
  let chartTitle = "Hospitalization per age group";
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age !== "date") {
      datasets.push(mapElementByAge(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);

  return getMultiLineChartData(datasets, chartTitle);
}

function getDeathCurveChartData(data) {
  let datasets = [];
  let chartTitle = "Deaths per age group";
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age !== "date") {
      datasets.push(mapElementByAge(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);
  return getMultiLineChartData(datasets, chartTitle);
}

function getInfectionCurveChartData(data) {
  let datasets = [];
  let chartTitle = "Infections per age group";
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age !== "date") {
      datasets.push(mapElementByAge(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);

  return getMultiLineChartData(datasets, chartTitle);
}

function getMultiLineChartData(datasets, chartTitle) {
  return {
    cardTitle: chartTitle,
    type: "line",
    data: {
      datasets: datasets
    },
    options: {
      tooltips: {
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            let data = chart.data.datasets[tooltipItem.datasetIndex];
            return {
              borderColor: data.borderColor,
              backgroundColor: data.borderColor
            };
          }
        }
      },
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

function getInfectionPerDayChartData(data) {
  let datasets = [];
  let chartTitle = "Daily infections per age group";
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age !== "date") {
      datasets.push(mapElementByAgeDelta(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);

  return getBarChartData(datasets, chartTitle);
}

function getDeathPerDayChartData(data) {
  let datasets = [];
  let chartTitle = "Daily deaths per age group";
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age !== "date") {
      datasets.push(mapElementByAgeDelta(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);

  return getBarChartData(datasets, chartTitle);
}
function getHospitPerDayChartData(data) {
  let datasets = [];
  let chartTitle = "Daily hospitalization per age group";
  for (const age in data[0]) {
    if (data[0].hasOwnProperty(age) && age !== "date") {
      datasets.push(mapElementByAgeDelta(data, age));
    }
  }
  datasets = getDatasetsFromDatasets(datasets);

  return getBarChartData(datasets, chartTitle);
}
function getBarChartData(datasets, chartTitle) {
  return {
    cardTitle: chartTitle,
    type: "bar",
    data: {
      datasets: datasets
    },
    options: {
      tooltips: {
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            let data = chart.data.datasets[tooltipItem.datasetIndex];
            return {
              borderColor: data.borderColor,
              backgroundColor: data.borderColor
            };
          }
        }
      },
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

  const parsedDatasets = datasets.map((chartData, index) => {
    let dataset = {
      label: chartData[chartData.length-1].age,
      data: chartData.map(d => { return { x: new Date(d.t), y: d.y }; }),
      backgroundColor: chartColor[index],
      borderColor: chartBorderColor[index],
      borderWidth: 1
    };
    return dataset;
  });
  return parsedDatasets;
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
  return data.map((dateGroup, i) => {
    let chartElement = {};
    chartElement["t"] = dateGroup.date;

    if (i > 0) {
      chartElement["y"] = parseInt(dateGroup[age] - data[i - 1][age]);
    }
    else {
      chartElement["y"] = 0;
    }
    chartElement["age"] = age;
    return chartElement;
  });
}

// Pie Charts
function getTotalDeathChartData(data) {
  data = data["data"]["COVID19 Altersverteilung TodF"];
  let chartData = [];
  let chartLabels = [];
  let chartTitle = "Age distribution of deaths";

  data.forEach(element => {
    chartData.push(element.TotalDeaths);
    chartLabels.push(element.age);
  });
  return getPieChartData(chartData, chartLabels, chartTitle);
}


function getTotalHospitChartData(data) {
  data = data["data"]["COVID19 Altersverteilung Hospit"];
  let chartData = [];
  let chartLabels = [];
  let chartTitle = "Age distribution of hospitalizations";

  data.forEach(element => {
    chartData.push(element.TotalHospitalized);
    chartLabels.push(element.age);
  });
  return getPieChartData(chartData, chartLabels, chartTitle);
}

function getTotalInfectionAgeChartData(data) {
  data = data["data"]["COVID19 Altersverteilung"];
  let chartData = [];
  let chartLabels = [];
  let chartTitle = "Age distribution of Infections";
  data.forEach(element => {
    chartData.push(element.totalInfectionCount);
    chartLabels.push(element.age);
  });
  return getPieChartData(chartData, chartLabels, chartTitle);
}

function getPieChartData(chartData, chartLabels, chartTitle) {
  return {
    cardTitle: `${chartTitle} (Total: ${chartData.reduce(function (a, b) {
      return parseInt(a) + parseInt(b) ;
    }, 0)}), 15.04.2020 (BAG Stopped Providing this data)`,
    type: "pie",
    data: {
      datasets: [{
        data: chartData,
        backgroundColor: chartColor,
        borderColor: chartBorderColor
      }],
      labels: chartLabels
    },
    options: {
      tooltips: {
        callbacks: {
          labelColor: function (tooltipItem, chart) {
            console.log(chart);
            console.log(tooltipItem);
            // let data = chart.data.datasets[0];
            
            // return {
            //   borderColor: data.borderColor[tooltipItem.index],
            //   backgroundColor: data.borderColor[tooltipItem.index]
            // };
          }
          // ,
          // label: function (tooltipItem, data) {
          //   var label = data.labels[tooltipItem.index] || '';
          //   var value = data.datasets[0].data[tooltipItem.index];
          //   let sum = 0;
          //   let dataArr = data.datasets[0].data;
          //   dataArr.map(data => {
          //     sum += parseInt(data);
          //   });
          //   let percentage = (value * 100 / sum).toFixed(2) + "%";
          //   label += ' : ';
          //   label += value;
          //   label += ' = ';
          //   label += percentage;
          //   return label;
          // }
        }
      }
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
  getDeathPerDayChartData
};