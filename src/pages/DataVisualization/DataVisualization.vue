<template>
  <div id="chart">
    <h1>PIB dos Municípios de Pernambuco</h1>
    <linear />
    <barChart />
    <pieChart />
    <mapPernambuco />
  </div>
</template>
<style>

</style>
<script>
import linear from '../../components/DashboardPrincipal/linearChart/LinearChart';
import barChart from '../../components/DashboardPrincipal/BarChart/BarChart';
import pieChart from '../../components/DashboardPrincipal/PieChart/PieChart';
import mapPernambuco from '../../components/DashboardPrincipal/Map/Map';

export default {
  data() {
    return {};
  },

  components: {
    linear,
    barChart,
    pieChart,
    mapPernambuco,
  },
};
</script>

