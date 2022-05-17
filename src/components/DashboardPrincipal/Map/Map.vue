<template>
<div>
  <div class="row mt-4 ms-4" data-aos="fade-up">
    <div class="col-md-6 mt-3 col-lg-6 d-flex">
      <div id="chart-map"></div>
    </div>
    <div class="col-md-6 col-lg-6 d-flex">
     <multipleLines :nameArray="arrayNames"/>
    </div>
  </div>
</div>
</template>
<script>
import * as d3 from 'd3';
import pernambucoMap from './data/geojson.json';
import multipleLines from '../MultipleLines/MultipleLines';

export default {
  data() {
    return {
      width: 0,
      height: 0,
      centered: undefined,
      projection: undefined,
      path: undefined,
      svg: undefined,
      zoom: undefined,
      g: undefined,
      color: undefined,
      arrayNames: [],
    };
  },

  components: {
    multipleLines,
  },

  methods: {
    createMap() {
      this.colorScale = d3.scaleThreshold()
        .range(['green']);

      this.path = d3.geoPath();

      this.projection = d3
        .geoConicConformal()
        .center([-37.946777, -6.472372])
        .scale(2500)
        .translate([this.width / 2, this.height / 2])
        .rotate([0, 2]);

      this.path.projection(this.projection);

      this.svg = d3
        .select('#chart-map')
        .append('svg')
        .attr('id', 'svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .attr('viewBox', `0 0 ${this.width} ${this.height}`)
        .attr('preserveAspectRadio', 'xMinYMid');

      const deps = this.svg.append('g');

      const div = d3
        .select('#chart-map')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      deps
        .selectAll('path')
        .data(pernambucoMap.features)
        .enter()
        .append('path')
        .attr('cursor', 'pointer')
        .attr('class', 'department')
        .attr('d', this.path)
        .on('click', this.clicked)
        .on('mouseover', (d) => {
          // eslint-disable-next-line
          const properties = d.target.__data__.properties;
          div
            .transition()
            .duration(200)
            .style('opacity', 0.9);
          div.html(
            `${properties.name}`
          );
        })
        .on('mousemove', (e) => {
          div.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => {
          div
            .transition()
            .duration(500)
            .style('opacity', 0);
          div
            .html('')
            .style('left', '0px')
            .style('top', '0px');
        });

      this.g = this.svg.append('g');

      const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (e) => {
          this.svg.selectAll('path')
            .attr('transform', e.transform);
        });
      this.svg.call(zoom);
    },

    clicked(e, d) {
      if (!this.arrayNames) {
        this.arrayNames.push(d.properties.name);
      } else if (this.arrayNames) {
        const flag = this.arrayNames.find(el => el === d.properties.name);
        if (flag) {
          const index = this.arrayNames.indexOf(el => el === d.properties.name);

          this.arrayNames.splice(index, 1);
        } else if (!flag && this.arrayNames.length < 3) {
          this.arrayNames.push(d.properties.name);
        }
      }
    },
  },

  mounted() {
    this.width = 630;
    this.height = 350;

    this.createMap();
  },
};
</script>
<style>
#svg {
  display: block;
  margin: auto;
  border: solid 1px lightgray;
}

div.tooltip {
  position: absolute;
  text-align: center;
  z-index: 1000;
  color: black;
  width: 200px;
  height: 25px;
  padding: 2px;
  font: 12px sans-serif;
  background: #fafafa;
  border: 1px solid #3498db;
  border-radius: 8px;
  pointer-events: none;
}
</style>
