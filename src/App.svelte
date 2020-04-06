<script>
import {onMount} from "svelte";
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Header from './Header.svelte';
import Chart from './Chart.svelte';
import Preloader from './Preloader.svelte';
import {getLastElementOfArray} from "./util/arrayUtils";

const baseURL = 'https://bag-covid-api.herokuapp.com/api/';
let data = loadDataFromAPI();
async function loadDataFromAPI(){
	let data = [];
	const res = await fetch(baseURL+"data/latest");
	data = await res.json();
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
	data = chartData;
	if (res.ok) {
		return data;
	} else {
		throw new Error(data);
	}
}

</script>
<Header/>
{#await data}
<Preloader/>
{:then data}
<Chart {data}/>
{:catch error}
	{console.log(error)}
{/await}


