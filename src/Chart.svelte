
<div class="row">
<canvas id="myChart" width="3" height="1"></canvas>
</div>

<script>
import {afterUpdate} from "svelte";
import Chart from 'chart.js';

export let data;

let ctx;
let myChart;

function createChart(){
console.log(data);
let labels = [];
ctx = document.getElementById('myChart');
if (myChart) myChart.destroy();
myChart = new Chart(ctx, {
  type: 'line',
  data: {
      datasets: [{
      label: 'Daily Cases',
      data: data,
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
});
}

afterUpdate(createChart);

</script>

