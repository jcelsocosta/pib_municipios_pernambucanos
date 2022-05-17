<template>
  <div id="chart">
    <h1>PIB dos Municípios de Pernambuco</h1>
    <section class="header-inner p-0 jarallax position-relative o-hidden"
      data-overlay>
      <div class="row mt-4 ms-4" data-aos="fade-up">
        <div class="col-md-6 col-lg-6 d-flex">
            <linear />
        </div>
      </div>
      <div class="row mt-4 ms-4" data-aos="fade-up">
        <div class="col-md-6 col-lg-6 d-flex">
             <barChart />
        </div>
      </div>
      <div class="row mt-4 ms-4" data-aos="fade-up">
        <div class="col-md-6 col-lg-6 d-flex">
             <pieChart />
        </div>
      </div>
        <h3>Mapa de Pernambuco</h3>
        <h6>Compare até três Municípios</h6>
        <mapPernambuco />
        <div class="row mt-4 ms-4" data-aos="fade-up">
        <div class="col-md-6 col-lg-6 d-flex">
        </div>
      </div>
    </section>
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

