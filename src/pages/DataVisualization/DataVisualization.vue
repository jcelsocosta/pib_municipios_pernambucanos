<template>
  <div id="chart">
    <h1>PIB dos Municípios de Pernambuco</h1>
    <linear />
    <barChart />
  </div>
</template>
<style>

</style>
<script>
import linear from '../../components/DashboardPrincipal/linearChart/LinearChart';
import barChart from '../../components/DashboardPrincipal/BarChart/BarChart';

export default {
  data() {
    return {};
  },

  components: {
    linear,
    barChart,
  },
};
</script>

