<script>
import {onMount} from "svelte";
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Chart from './Chart.svelte';

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
{#await data}
	loading...
{:then data}
<Chart {data}/>
{:catch error}
	{console.log(error)}
{/await}


