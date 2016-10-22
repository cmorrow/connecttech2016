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

  // set initial scales
  var xScale = d3.scaleLinear().range([0, 100]);


  function render(data) {

    // set scales
    xScale
    .domain([0, d3.max(data, function(d){
      return d.sales;
    })])
    .range([0,100]);


    var bars = container.selectAll('div')
    .data(data)
    .enter().append("div")
    .attr('class', 'bar')
    .style('width', function(d) {
      return xScale(d.sales) + '%';
    });

    bars.append('span')
      .attr('class', 'value')
      .text(function(d){
        return d.sales;
      });
    
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


