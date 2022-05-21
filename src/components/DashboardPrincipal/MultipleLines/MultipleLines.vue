<template>
  <div>
    <select v-model="selected">
      <option disabled value>Selecione um ano</option>
      <option v-for="option in options" :value="option.value" :key="option.value">
        {{ option.value }}</option>
    </select>
    <div id="multipleLines-chart"></div>
    <button type="button" class="btn btn-primary" @click="compareTo()">Comparar</button>
  </div>
</template>
<script>
import * as d3 from 'd3';
import dataFrom from '../../../data/pibpeformated.json';

export default {
  props: {
    nameArray: {
      type: Array,
    },
  },
  data() {
    return {
      data1Aux: [],
      data2Aux: [],
      data3Aux: [],
      data0Aux: [],
      maxValue: 0,
      arrayNameAux: [],
      margin: { top: 20, bottom: 30, left: 50, right: 20, },
      svg: undefined,
      width: 0,
      height: 0,
      toggleButton: false,
      target: 'ProdutoInternoBrutoPrecosCorrentesMilReais',
      x: 0,
      y: 0,
      selected: 'PIB total',
      options: [
        { value: 'PIB total', opt: 0, },
        { value: 'Valores Brutos da Agropecuária', opt: 1, },
        { value: 'Valores Brutos da Indústria', pot: 2, },
        { value: 'Valores Brutos dos Serviços', opt: 3, },
      ],
      data: [
        { date: '1-May-12', close: 68.13, open: 34.12, },
        { date: '30-Apr-12', close: 63.98, open: 45.56, },
        { date: '27-Apr-12', close: 67.00, open: 67.89, },
        { date: '26-Apr-12', close: 89.70, open: 78.54, },
        { date: '25-Apr-12', close: 99.00, open: 89.23, },
        { date: '24-Apr-12', close: 130.28, open: 99.23, },
        { date: '23-Apr-12', close: 166.70, open: 101.34, },
        { date: '20-Apr-12', close: 234.98, open: 122.34, },
        { date: '19-Apr-12', close: 345.44, open: 134.56, },
        { date: '18-Apr-12', close: 443.34, open: 160.45, },
        { date: '17-Apr-12', close: 543.70, open: 180.34, },
        { date: '16-Apr-12', close: 580.13, open: 210.23, },
        { date: '13-Apr-12', close: 605.23, open: 223.45, },
        { date: '12-Apr-12', close: 622.77, open: 201.56, },
        { date: '11-Apr-12', close: 626.20, open: 212.67, },
      ],
      menu: [
        'ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais',
        'ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais',
        'ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais',
        'ProdutoInternoBrutoPrecosCorrentesMilReais',
      ],
    };
  },

  methods: {
    compareTo() {
      this.filterArray();

      this.createChartMultiplesLines(this.target);

      this.toggleButton = true;
    },

    filterArray() {
      this.dataAux = [];
      this.maxValue = 0;

      dataFrom.sort((a, b) => (a.Ano - b.Ano));

      dataFrom.forEach((el) => {
        if (el.NomeDoMunicipio === this.nameArray[0]) {
          this.data0Aux.push(el);
          this.data1Aux.push(el);
        }
      });

      dataFrom.forEach((el) => {
        if (el.NomeDoMunicipio === this.nameArray[1]) {
          this.data0Aux.push(el);
          this.data2Aux.push(el);
        }
      });

      dataFrom.forEach((el) => {
        if (el.NomeDoMunicipio === this.nameArray[2]) {
          this.data0Aux.push(el);
          this.data3Aux.push(el);
        }
      });
    },

    createSvg() {
      this.svg = d3.select('#multipleLines-chart')
        .append('svg')
        .attr('height', this.height + this.margin.left + this.margin.right)
        .attr('width', this.width + this.margin.top + this.margin.bottom + 50)
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        .attr('viewBox', [110, -10, this.width - 200, this.height + 200]);
    },

    createChartMultiplesLines(param) {
      const parseTime = d3.timeParse('%Y');
      this.x = 0;
      this.y = 0;

      this.x = d3.scaleTime().range([0, this.width]);

      this.y = d3.scaleLinear().range([this.height, 0]);

      if (param === 'ProdutoInternoBrutoPrecosCorrentesMilReais') {
        const valueLine = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000));

        const valueLine2 = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000));

        const valueLine3 = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000));

        this.data1Aux.forEach((d) => {
          d.date = parseTime(d.Ano);
          d.ProdutoInternoBrutoPrecosCorrentesMilReais
            = +d.ProdutoInternoBrutoPrecosCorrentesMilReais;
        });

        this.x.domain(d3.extent(this.data0Aux, d => d.Ano));

        this.y.domain([0, d3.max(this.data0Aux, d => Math
          .max(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000))]);

        this.svg.append('path')
          .data([this.data1Aux])
          .attr('class', 'line')
          .style('stroke', '#c33a38')
          .attr('d', valueLine);

        this.svg.append('path')
          .data([this.data2Aux])
          .attr('class', 'line')
          .style('stroke', '#44cd42')
          .attr('d', valueLine2);

        this.svg.append('path')
          .data([this.data3Aux])
          .attr('class', 'line')
          .style('stroke', '#4289cd')
          .attr('d', valueLine3);

        this.svg.selectAll('circle')
          .append('g')
          .data(this.data0Aux)
          .enter()
          .append('circle')
          .attr('r', 5)
          .attr('id', 'circlePoints')
          .attr('cx', d => this.x(d.Ano))
          .attr('cy', d => this.y(d.ProdutoInternoBrutoPrecosCorrentesMilReais * 1000));

        this.svg.append('g')
          .attr('transform', `translate(0, ${this.height})`)
          .call(d3.axisBottom(this.x));

        this.svg.append('g')
          .call(d3.axisLeft(this.y));
      }

      if (param === 'ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais') {
        const valueLine = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais * 1000));

        const valueLine2 = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais * 1000));

        const valueLine3 = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais * 1000));

        this.data1Aux.forEach((d) => {
          d.date = parseTime(d.Ano);
          d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais
            = +d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais;
        });

        this.x.domain(d3.extent(this.data0Aux, d => d.Ano));

        this.y.domain([0, d3.max(this.data0Aux, d => Math
          .max(d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais * 1000))]);

        this.svg.append('path')
          .data([this.data1Aux])
          .attr('class', 'line')
          .style('stroke', '#c33a38')
          .attr('d', valueLine);

        this.svg.append('path')
          .data([this.data2Aux])
          .attr('class', 'line')
          .style('stroke', '#44cd42')
          .attr('d', valueLine2);

        this.svg.append('path')
          .data([this.data3Aux])
          .attr('class', 'line')
          .style('stroke', '#4289cd')
          .attr('d', valueLine3);

        this.svg.selectAll('circle')
          .append('g')
          .data(this.data0Aux)
          .enter()
          .append('circle')
          .attr('id', 'circlePoints')
          .attr('r', 5)
          .attr('cx', d => this.x(d.Ano))
          .attr('cy', d => this.y(d.ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais * 1000));

        this.svg.append('g')
          .attr('transform', `translate(0, ${this.height})`)
          .call(d3.axisBottom(this.x));

        this.svg.append('g')
          .call(d3.axisLeft(this.y));
      }

      if (param === 'ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais') {
        const valueLine = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais * 1000));

        const valueLine2 = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais * 1000));

        const valueLine3 = d3.line()
          .x(d => this.x(d.Ano))
          .y(d => this.y(d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais * 1000));

        this.data1Aux.forEach((d) => {
          d.date = parseTime(d.Ano);
          d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais
            = +d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais;
        });

        this.x.domain(d3.extent(this.data0Aux, d => d.Ano));

        this.y.domain([0, d3.max(this.data0Aux, d => Math
          .max(d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais * 1000))]);

        this.svg.append('path')
          .data([this.data1Aux])
          .attr('class', 'line')
          .style('stroke', '#c33a38')
          .attr('d', valueLine);

        this.svg.append('path')
          .data([this.data2Aux])
          .attr('class', 'line')
          .style('stroke', '#44cd42')
          .attr('d', valueLine2);

        this.svg.append('path')
          .data([this.data3Aux])
          .attr('class', 'line')
          .style('stroke', '#4289cd')
          .attr('d', valueLine3);

        this.svg.selectAll('circle')
          .append('g')
          .data(this.data0Aux)
          .enter()
          .append('circle')
          .attr('id', 'circlePoints')
          .attr('r', 5)
          .attr('cx', d => this.x(d.Ano))
          .attr('cy', d => this.y(d.ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais * 1000));

        this.svg.append('g')
          .attr('transform', `translate(0, ${this.height})`)
          .call(d3.axisBottom(this.x));

        this.svg.append('g')
          .call(d3.axisLeft(this.y));
      }

      if (param === 'ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais') {
        const valueLine = d3.line()
          .x(d => this.x(d.Ano))
          // eslint-disable-next-line
          .y(d => this.y(d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais * 1000));

        const valueLine2 = d3.line()
          .x(d => this.x(d.Ano))
          // eslint-disable-next-line
          .y(d => this.y(d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais * 1000));

        const valueLine3 = d3.line()
          .x(d => this.x(d.Ano))
          // eslint-disable-next-line
          .y(d => this.y(d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais * 1000));

        this.data1Aux.forEach((d) => {
          d.date = parseTime(d.Ano);
          // eslint-disable-next-line
          d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais
            // eslint-disable-next-line
            = +d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais;
        });

        this.x.domain(d3.extent(this.data0Aux, d => d.Ano));

        this.y.domain([0, d3.max(this.data0Aux, d => Math
        // eslint-disable-next-line
          .max(d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais * 1000))]);

        this.svg.append('path')
          .data([this.data1Aux])
          .attr('class', 'line')
          .style('stroke', '#c33a38')
          .attr('d', valueLine);

        this.svg.append('path')
          .data([this.data2Aux])
          .attr('class', 'line')
          .style('stroke', '#44cd42')
          .attr('d', valueLine2);

        this.svg.append('path')
          .data([this.data3Aux])
          .attr('class', 'line')
          .style('stroke', '#4289cd')
          .attr('d', valueLine3);

        this.svg.selectAll('circle')
          .append('g')
          .data(this.data0Aux)
          .enter()
          .append('circle')
          .attr('id', 'circlePoints')
          .attr('r', 5)
          .attr('cx', d => this.x(d.Ano))
          // eslint-disable-next-line
          .attr('cy', d => this.y(d.ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais * 1000));

        this.svg.append('g')
          .attr('transform', `translate(0, ${this.height})`)
          .call(d3.axisBottom(this.x));

        this.svg.append('g')
          .call(d3.axisLeft(this.y));
      }
    },

    changeLegend() {
      if (this.nameArray[0]) {
        this.svg.append('circle')
          .attr('cx', 300)
          .attr('cy', this.height + 100)
          .attr('r', 6)
          .attr('class', 'legend')
          .style('fill', '#c33a38');

        this.svg.append('text')
          .attr('x', 315)
          .attr('y', this.height + 100)
          .text('')
          .text(`${this.nameArray[0]}`)
          .attr('class', 'legend')
          .style('font-size', '15px')
          .attr('alignment-baseline', 'middle');
      }
      if (this.nameArray[1]) {
        this.svg.append('circle')
          .attr('cx', 300)
          .attr('cy', this.height + 120)
          .attr('r', 6)
          .attr('class', 'legend')
          .style('fill', '#44cd42');

        this.svg.append('text')
          .attr('x', 315)
          .attr('y', this.height + 120)
          .text('')
          .text(`${this.nameArray[1]}`)
          .style('font-size', '15px')
          .append('div-legend')
          .attr('alignment-baseline', 'middle');
      }
      if (this.nameArray[2]) {
        this.svg.append('circle')
          .attr('cx', 300)
          .attr('cy', this.height + 140)
          .attr('r', 6)
          .attr('class', 'legend')
          .style('fill', '#4289cd');

        this.svg.append('text')
          .attr('x', 315)
          .attr('y', this.height + 140)
          .text('')
          .text(`${this.nameArray[2]}`)
          .style('font-size', '15px')
          .attr('class', 'legend')
          .attr('alignment-baseline', 'middle');
      }
    },
  },

  mounted() {
    this.width = 500 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.createSvg();
  },

  watch: {
    nameArray() {
      this.svg.selectAll('*').remove();
      this.changeLegend();
      this.toggleButton = false;
    },

    selected() {
      this.svg.selectAll('path').remove();
      this.svg.selectAll('#circlePoints').remove();
      if (this.selected === 'Valores Brutos da Agropecuária') {
        this.target = 'ValorAdicionadoBrutoDaAgropecuariaPrecosCorrentesMilReais';
      }

      if (this.selected === 'Valores Brutos da Indústria') {
        this.target = 'ValorAdicionadoBrutoDaIndustriaPrecosCorrentesMilReais';
      }

      if (this.selected === 'Valores Brutos dos Serviços') {
        this.target = 'ValorAdicionadoBrutoDosServicosPrecosCorrentesExcetoAdministracaoDefesaEducacaoSaudePublicasESeguridadeSocialMilReais';
      }

      if (this.selected === 'PIB total') {
        this.target = 'ProdutoInternoBrutoPrecosCorrentesMilReais';
      }
    },
  },
};
</script>
<style>
.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 2px;
}
</style>
