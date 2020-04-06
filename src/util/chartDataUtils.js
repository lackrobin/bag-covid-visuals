import {getLastElementOfArray} from "./arrayUtils";
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
        type: "line",
        data: {
            datasets: [{
            label: 'Cases',
            data: chartData,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)'
            ],
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


export {getEpicurveChartData};