   var apiUrl = appUrl + '/api/polls/';



$('document').ready(function(){

  var str=getTime(window.location.pathname);
    console.log(str);
  if(isNaN(+str))return;
   $.get( apiUrl+str, function( data ) {
     data.poll.answers.forEach(function(val,idx){
       $("#sel").append( '<option value="'+idx+'">'+val+'</option>');
     });
       drawGChart(data.name,data.poll.answers,data.poll.answered);
     
     
   });
  
});

function getTime(url){
  return url.slice(url.lastIndexOf('/')+1);
};

function drawGChart(name,vars,nums){
    // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Choices');
        data.addColumn('number', 'Voters');
        var rows=[];
        for(var i=0;i<vars.length;i++){
          rows.push([vars[i],nums[i]]);
        }
        data.addRows(rows);

        // Set chart options
        var options = {'title':name,
                       'width':400,
                       'height':300,"backgroundColor":"#FFE492"};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
}