<script>
  import { afterUpdate, onMount } from "svelte";
  import Chart from "chart.js";
  import * as noUiSlider from 'nouislider';
  import 'nouislider/distribute/nouislider.css';
  import wNumb from "wnumb";
  import { deepCopyObject } from "./util/objectUtils";

  Chart.defaults.global.defaultFontColor = "#c2c2c2";

  export let data;

  let canvasID = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);

  let ctx;
  let myChart;

  let chartData = deepCopyObject(data);

  let hasSlider = false;

  function createChart() {
    ctx = document.getElementById(canvasID);
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, chartData);
  }

  function createSlider() {
    if (data.data.datasets.length - 1 > 0) {
      hasSlider = true;
      var slider = document.getElementById(canvasID + "-slider");
      noUiSlider.default.create(slider, {
        start: [1, data.data.datasets[4].data.length],
        connect: true,
        step: 1,
        orientation: "horizontal", // 'horizontal' or 'vertical'
        range: {
          min: 1,
          max: data.data.datasets[4].data.length
        },
        format: wNumb({
          decimals: 0
        })
      });
      slider.noUiSlider.on(`set.${canvasID}`, function() {
        let sliderValues = slider.noUiSlider.get();

        chartData = deepCopyObject(data);

        let datasets = chartData.data.datasets;
        for (let i = 0; i < datasets.length; i++) {
          const dataset = datasets[i];
          dataset.data = dataset.data.slice(sliderValues[0], sliderValues[1]);
        }
        createChart();

      });
    } else {
      if (data.type === "line") {
        hasSlider = true;
        var slider = document.getElementById(canvasID + "-slider");
        noUiSlider.default.create(slider, {
          start: [0, data.data.datasets[0].data.length - 1],
          connect: true,
          step: 1,
          orientation: "horizontal", // 'horizontal' or 'vertical'
          range: {
            min: 0,
            max: data.data.datasets[0].data.length - 1
          },
          format: wNumb({
            decimals: 0
          })
        });
        slider.noUiSlider.on(`set.${canvasID}`, function() {
          let sliderValues = slider.noUiSlider.get();

          chartData = deepCopyObject(data);

          let datasets = chartData.data.datasets;
          for (let i = 0; i < datasets.length; i++) {
            const dataset = datasets[i];
            dataset.data = dataset.data.slice(sliderValues[0], sliderValues[1]);
          }
          createChart();
        });
      }
    }
  }

  onMount(createSlider);
  afterUpdate(createChart);
</script>

<div class="col s12 m6">
  <div class="card grey darken-4">
    <div class="card-content white-text">
      <span class="card-title">
        {data.cardTitle}
        <div class="date-slider">
          <div id="{canvasID}-slider" />
        </div>
      </span>
      <!-- DODO works, but might need fixing - shows the ratio it was loaded in -->
      <canvas
        id={canvasID}
        width={window.screen.width <= 480 ? '1' : '3'}
        height="1" />
    </div>
  </div>
</div>
