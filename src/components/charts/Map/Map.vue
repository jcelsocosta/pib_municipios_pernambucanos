<template>
<div id='chart-map'></div>
</template>
<script>
import * as d3 from 'd3';
import pernambucoMap from './data/geojson.json';

export default {
  data() {
    return {
      width: 0,
      height: 0,
      projection: undefined,
      svg: undefined,
    };
  },

  methods: {
    createMap() {
      const path = d3.geoPath();

      this.projection = d3
        .geoConicConformal()
        .center([-37.946777, -8.472372])
        .scale(2000)
        .translate([this.width / 2, this.height / 2])
        .rotate([0, 2]);

      path.projection(this.projection);

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
        .select('body')
        .append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      deps
        .selectAll('path')
        .data(pernambucoMap.features)
        .enter()
        .append('path')
        .attr('class', 'department')
        .attr('d', path)
        .on('mouseover', (d) => {
          // eslint-disable-next-line
          const properties = d.target.__data__.properties;
          div
            .transition()
            .duration(200)
            .style('opacity', 0.9);
          div.html(
            `Nome :
              ${properties.name}
              <br/>
              Descrição :
              ${properties.description}`
          );
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
    },
  },

  mounted() {
    this.width = 850;
    this.height = 450;

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
  width: 275px;
  height: 37px;
  padding: 2px;
  font: 12px sans-serif;
  background: grey;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
</style>
