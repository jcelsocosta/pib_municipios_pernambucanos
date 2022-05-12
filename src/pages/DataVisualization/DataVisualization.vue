<template>
  <div id="chart">
    <h1>PIB dos Municípios de Pernambuco</h1>
    <stackedBar />
  </div>
</template>
<style>

</style>
<script>
import stackedBar from '../../components/charts/StackedBar/StackedBar';

export default {
  data() {
    return {};
  },

  components: {
    stackedBar,
  },
};
</script>

