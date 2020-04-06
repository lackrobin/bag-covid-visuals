<script>
import {onMount} from "svelte";
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import Header from './Header.svelte';
import Chart from './Chart.svelte';
import Preloader from './Preloader.svelte';
import {getEpicurveChartData} from "./util/chartDataUtils";

const baseURL = 'https://bag-covid-api.herokuapp.com/api/';
let canvasID = "myChart";
let parsedData = loadDataFromAPI();


async function loadDataFromAPI(){
	let parsedData = [];
	const res = await fetch(baseURL+"data/latest");
	let data = await res.json();
	parsedData.push(getEpicurveChartData(data));

	if (res.ok) {
		return parsedData;
	} else {
		throw new Error(data);
	}
}

</script>
<Header/>
{#await parsedData}
<Preloader/>
{:then items}
<div class="row">
{#each items as data}
		<Chart {data}/>
{/each}
</div>
{:catch error}
	{console.log(error)}
{/await}


