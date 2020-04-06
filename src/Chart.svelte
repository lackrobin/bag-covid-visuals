    <div class="col s12 m6">
      <div class="card grey darken-4">
        <div class="card-content white-text">
          <span class="card-title">Cases in Switzerland</span>
            <canvas id="{canvasID}" width="3" height="1"></canvas>
        </div>
      </div>
    </div>
<script>

import {afterUpdate} from "svelte";
import Chart from 'chart.js';
Chart.defaults.global.defaultFontColor = '#c2c2c2';

export let data;

let canvasID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

let ctx;
let myChart;

function createChart(){
console.log(data);
let labels = [];
ctx = document.getElementById(canvasID);
if (myChart) myChart.destroy();
myChart = new Chart(ctx, data);
}

afterUpdate(createChart);

</script>

