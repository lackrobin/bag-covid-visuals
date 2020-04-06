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
let data = loadDataFromAPI();
async function loadDataFromAPI(){
	let data = [];
	const res = await fetch(baseURL+"data/latest");
	data = await res.json();
	data = getEpicurveChartData(data);
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
<div class="row">
	<Chart {data}/>
	<Chart {data}/>
</div>
{:catch error}
	{console.log(error)}
{/await}


