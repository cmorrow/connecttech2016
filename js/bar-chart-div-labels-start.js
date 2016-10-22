
var barChartDiv = (function(){
  /*global d3 */

  var max;

  function render() {

    var container = d3.select("#barChartDiv");

    // get the data
    d3.csv("/data/sales.csv", function(error, data) {
      if (error) throw error;

      // format the data
      data.forEach(function(d) {
        d.sales = +d.sales;
      });

      max = d3.max(data, function(d) { return d.sales; });

      // append the rectangles for the bar chart
      container.selectAll("div")
          .data(data)
        .enter().append("div")
          .attr("class", "bar")
          .style("width", function(d) { return getPercentage(d.sales); });

    });
  }

  function getPercentage(d){
    return ((d/max) * 100) + '%'; // magic?
  }
  

  render();

})();
