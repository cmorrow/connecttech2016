var barChartDiv = (function(){
  /* global d3 */
  // set the dimensions and margins of the graph
  var container = d3.select('#barChartDiv'),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960,
      height = 500,
      max,
      transDuration = 1000,
      enter, update, exit,
      firstRender;

  // set the scales
  var xScale = d3.scaleLinear().rangeRound([0, 100]);

  var colorScale = d3.scaleQuantize().range(["red", "yellow", "lime"]);


  function render(data) {

    var trans = d3.transition()
    .duration(transDuration)
    .ease(d3.easeQuadOut);

    // set scales
    xScale
    .domain([0, d3.max(data, function(d){
      return d.sales;
    })])
    .range([0,100]);

    colorScale.domain(xScale.domain());


    var bars = container.selectAll('div')
    .data(data)
    
    .enter().append("div")
    // .sort(sortDesc)
    .style('width', '0%')
    .attr('class', 'bar')
    .style('background-color', getBgColor)
    .style('width', function(d) {
      return xScale(d.sales) + '%';
    });

    bars.append('span')
      .attr('class', 'value')
      .text(function(d){
        return d.sales;
      });
    
  }

  function getBgColor(d){
    return colorScale(d.sales);
  }

  function getData(count, range){
    var arr = [];
    d3.range(count).map(function(val){
      
      var obj = {
        index: val,
        sales: Math.random() * (range[1]-1) | range[0]
      };
      arr.push(obj);
    });

    max = d3.max(arr);

    render(arr);
  }

  function sortDesc(a, b) {
    return a.sales < b.sales;
  }

  getData(10, [50, 300]);


})();


