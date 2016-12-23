

   var apiUrl = appUrl + '/api/polls/';



$("document").ready(function(){
    
    $.get( apiUrl+"myPolls", function( data ) {
        //console.log(data);
        var str=data.reduce(addButton,'');
        $( "#pollsList" ).html( str);
        console.log(str);

    });
});
    //$('#pollsList').append()
    
    
function addButton(str,val) {
    str+='\n<a href="/polls/'
    str+=val.time;
    str+='" class="poll-entry btn">';
    str+=val.poll.name;
    str+='</a>';
    return str;
};
