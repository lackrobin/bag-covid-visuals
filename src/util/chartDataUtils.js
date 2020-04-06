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
    return chartData;
}


export {getEpicurveChartData};