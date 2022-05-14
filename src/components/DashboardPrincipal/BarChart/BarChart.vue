<template>
  <div>
    <div>Selected: {{ selected }}</div>
    <select v-model="selected">
      <option disabled value>Please select one</option>
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.value }}</option>
    </select>
    <div id="bar-chart"></div>
  </div>
</template>
<script>
import * as d3 from 'd3';
import dataJSON from '../../../data/PIBFILTRADOPE.json';

export default {
  data() {
    return {
      dataAux: [],
      margin: { top: 50, bottom: 50, left: 50, right: 50, legendBottom: 25, legendBottomTwo: 5, },
      width: 0,
      height: 0,
      maxValue: 0,
      svg: undefined,
      x: 0,
      y: 0,
      selected: '2010',
      options: [
        { value: '2010', },
        { value: '2011', },
        { value: '2012', },
        { value: '2013', },
        { value: '2014', },
        { value: '2015', },
        { value: '2016', },
        { value: '2017', },
        { value: '2018', },
        { value: '2019', },
      ],
    };
  },

  methods: {
    filterArray() {
      this.dataAux = [];
      let cont = 0;
      this.maxValue = 0;

      dataJSON.sort((a, b) => {
        if (a.ProdutoInternoBrutoPrecosCorrentesMilReais
        < b.ProdutoInternoBrutoPrecosCorrentesMilReais) {
          return 1;
        }
        if (a.ProdutoInternoBrutoPrecosCorrentesMilReais
        > b.ProdutoInternoBrutoPrecosCorrentesMilReais) {
          return -1;
        }
        return 0;
      });
      // eslint-disable-next-line
      // console.log(dataJSON);

      // eslint-disable-next-line
      dataJSON.forEach((el) => {
        if (el.Ano === this.selected && cont < 9) {
          this.dataAux.push(el);
          cont += 1;
          // eslint-disable-next-line
          // console.log(el.NomeDoMunicipio,` index: ${index}`)
        }
      });
      this.maxValue = parseFloat(this.dataAux[0].ProdutoInternoBrutoPrecosCorrentesMilReais);
      // eslint-disable-next-line
      // console.log(this.maxValue.toLocaleString('pt-br', { minimumFractionDigits: 2, }))
      // eslint-disable-next-line
      // console.log(this.dataAux);
    },

    createSvg() {
      this.svg = d3.select('#bar-chart')
        .append('svg')
        .attr('height', this.height - this.margin.top - this.margin.bottom)
        .attr('width', this.width)
        .attr('viewBox', [0, 0, this.width, this.height]);
    },

    createChartBar() {
      this.x = d3.scaleLinear()
        .domain([0, this.maxValue])
        .range([0, this.width]);

      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
        .call(d3.axisBottom(this.x))
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');

      this.y = d3.scaleBand()
        .range([0, this.height - this.margin.top - this.margin.bottom])
        .domain(this.dataAux.map(d => d.NomeDoMunicipio))
        .padding(0.1);

      this.svg.append('g')
        .call(d3.axisLeft(this.y));

      const tooldiv = d3.select('#bar-chart')
        .append('div')
        .style('visibilty', 'hidden')
        .style('position', 'absolute')
        .style('background-color', 'red');

      this.svg.append('g')
        .attr('fill', 'royalBlue')
        .attr('id', 'rect-chart')
        .selectAll('rect')
        .data(this.dataAux)
        .join('rect')
        .attr('x', (d, i) => this.x(i))
        .attr('y', d => this.y(d.NomeDoMunicipio))
        .attr('height', this.y.bandwidth())
        .attr('class', 'rectangle')
        .attr('width', d => this.x(
          parseFloat(d.ProdutoInternoBrutoPrecosCorrentesMilReais)))
        .on('mouseover', (e, d) => {
          tooldiv.style('visibility', 'visible')
            .text(`value: ${parseFloat(d.ProdutoInternoBrutoPrecosCorrentesMilReais)
              .toLocaleString('pt-br', { minimumFractionDigits: 2, })}`);
        })
        .on('mousemove', (e) => {
          tooldiv.style('top', `${e.pageY - 50}px`)
            .style('left', `${e.pageX - 50}px`);
        })
        .on('mouseout', () => tooldiv.style('visibility', 'hidden'));

      this.svg.append('circle')
        .attr('cx', 200)
        .attr('cy', this.height - this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#69b3a2');

      this.svg.append('text')
        .attr('x', 220)
        .attr('y', this.height - this.margin.legendBottom)
        .text('variable A')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 320)
        .attr('cy', this.height - this.margin.legendBottom)
        .attr('r', 6)
        .style('fill', '#404080');

      this.svg.append('text')
        .attr('x', 340)
        .attr('y', this.height - this.margin.legendBottom)
        .text('variable B')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 200)
        .attr('cy', this.height - this.margin.legendBottomTwo)
        .attr('r', 6)
        .style('fill', '#69b3a2');

      this.svg.append('text')
        .attr('x', 220)
        .attr('y', this.height - this.margin.legendBottomTwo)
        .text('variable C')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');

      this.svg.append('circle')
        .attr('cx', 320)
        .attr('cy', this.height - this.margin.legendBottomTwo)
        .attr('r', 6)
        .style('fill', '#404080');

      this.svg.append('text')
        .attr('x', 340)
        .attr('y', this.height - this.margin.legendBottomTwo)
        .text('variable D')
        .style('font-size', '15px')
        .attr('alignment-baseline', 'middle');
    },
  },

  mounted() {
    this.width = 900;
    this.height = 450;
    // eslint-disable-next-line
    this.filterArray();
    this.createSvg();
    this.createChartBar();
  },

  watch: {
    selected() {
      this.svg.selectAll('*').remove();
      this.filterArray();
      this.createChartBar();
    },
  },
};
</script>
<style>
#div_title {
  text-align: center;
}

svg {
  border: 1px solid lightgray;
}

.rectangle:hover {
  opacity: 0.5;
}

.grid path {
    stroke-width: 0;
}

.grid .tick line {
    stroke: #9FAAAE;
    stroke-opacity: 0.2;
}
</style>
