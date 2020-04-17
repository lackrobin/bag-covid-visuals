<script>
  import { onMount } from "svelte";
  import "../node_modules/materialize-css/dist/css/materialize.min.css";
    import 'nouislider/distribute/nouislider.css';
  import "../node_modules/materialize-css/dist/js/materialize.min.js";
  import Header from "./Header.svelte";
  import Chart from "./Chart.svelte";
  import Preloader from "./Preloader.svelte";
  import {
    getEpicurveChartData,
    getHospitcurveChartData,
    getDeathcurveChartData,
    getTotalDeathChartData,
    getTotalHospitChartData,
    getTotalInfectionAgeChartData,
    getHospitCurveChartData,
    getDeathCurveChartData,
    getInfectionCurveChartData,
    getInfectionPerDayChartData,
    getHospitPerDayChartData,
    getDeathPerDayChartData,
      getHospitBarChartData,
  getDeathBarChartData,
  getCasesBarChartData,
  } from "./util/chartDataUtils";

  const baseURL = "https://bag-covid-api.herokuapp.com/api/";
  // const baseURL = "http://localhost:3000/api/";
  
  let parsedHospitData = loadHospitDataFromAPI();

  async function loadHospitDataFromAPI() {
    let parsed = [];
    const res = await fetch(baseURL + "hospit");
    let data = await res.json();
    if (res.ok) {
      parsed.push(getHospitCurveChartData(data));
      parsed.push(getHospitPerDayChartData(data));
      return parsed;
    } else {
      throw new Error(data);
    }
  }
  let parsedInfectionData = loadInfectedDataFromAPI();

  async function loadInfectedDataFromAPI() {
    let parsed = [];
    const res = await fetch(baseURL + "infection");
    let data = await res.json();
    if (res.ok) {
      parsed.push(getInfectionCurveChartData(data));
      parsed.push(getInfectionPerDayChartData(data));
      return parsed;
    } else {
      throw new Error(data);
    }
  }

  let parsedDeathData = loadDeathDataFromAPI();

  async function loadDeathDataFromAPI() {
    let parsed = [];
    const res = await fetch(baseURL + "death");
    let data = await res.json();
    if (res.ok) {
      parsed.push(getDeathCurveChartData(data));
      parsed.push(getDeathPerDayChartData(data));
      return parsed;
    } else {
      throw new Error(data);
    }
  }

let parsedNewData = loadNewDataFromAPI();
  async function loadNewDataFromAPI() {
    let parsedData = [];
    const res = await fetch(baseURL + "data/latest");
    let data = await res.json();
    if (res.ok) {
      parsedData.push(getEpicurveChartData(data));
      parsedData.push(getCasesBarChartData(data));
      
      parsedData.push(getDeathcurveChartData(data));
      parsedData.push(getDeathBarChartData(data));
      
      parsedData.push(getHospitcurveChartData(data));
      parsedData.push(getHospitBarChartData(data));
      return parsedData;
    } else {
      throw new Error(data);
    }

  
  }

  let parsedOldData = loadOldDataFromAPI();

  async function loadOldDataFromAPI() {
    let parsedData = [];
    const res = await fetch(baseURL + "data/2020-04-15");
    let data = await res.json();
    if (res.ok) {
      parsedData.push(getTotalDeathChartData(data));
      parsedData.push(getTotalHospitChartData(data));
      parsedData.push(getTotalInfectionAgeChartData(data));
      return parsedData;
    } else {
      throw new Error(data);
    }
  }

</script>

<Header />

<div class="row">

  {#await parsedNewData}
    <Preloader />
  {:then items}

    {#each items as data}
      <Chart {data} />
    {/each}
  {:catch error}
    {console.log(error)}
  {/await}

  {#await parsedOldData then items}
    {#each items as data}
      <Chart {data} />
    {/each}
  {/await}

  {#await parsedInfectionData then items}
    {#each items as data}
      <Chart {data} />
    {/each}
  {/await}

  {#await parsedHospitData then items}
    {#each items as data}
      <Chart {data} />
    {/each}

  {/await}
  

  {#await parsedDeathData then items}
    {#each items as data}
      <Chart {data} />
    {/each}

  {/await}
</div>
