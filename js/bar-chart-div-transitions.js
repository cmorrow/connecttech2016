var barChartDiv = (function(){
  /* global d3 */
  
  var container = d3.select('#barChartDiv'),
      max,
      transDuration = 1000,
      enter, update, exit,
      firstRender;

  // set the scales
  var xScale = d3.scaleLinear().rangeRound([0, 100]);

  var colorScale = d3.scaleQuantile()
  .range(["red", "yellow", "lime"]);



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

    // append the rectangles for the bar chart
    var bar = container.selectAll('div');

    update = bar.data(data, function(d){
      return d.index;
    });

    update.select('span')
    .text(function(d){
      return d.sales;
    });

    enter = update.enter().append('div');

    enter
    .style('width', '0%')
    .attr('class', 'bar')
    .merge(update)
    .transition(trans)
    .style('background-color', getBgColor)
    .styleTween('width', function(d) {
      return d3.interpolateString(this.style.width, xScale(d.sales) + '%');
    });
    

    enter.append('span')
    .attr('class', 'value')
    .text(function(d){
      return d.sales;
    });

    setTimeout(function(){
      getData(10, [50, 300]);
    }, transDuration * 1.5);
    
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

  getData(10, [50, 300]);


})();

