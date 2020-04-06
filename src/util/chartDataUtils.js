import {getLastElementOfArray} from "./arrayUtils";
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
            backgroundColor: [chartColor[0]],
            borderColor: [chartBorderColor[0]], 
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


export {getEpicurveChartData,getTotalDeathChartData,getTotalHospitChartData,getTotalInfectionAgeChartData};