

   var apiUrl = appUrl + '/api/polls/';



$("document").ready(function(){
    
    $.get( apiUrl+"myPolls", function( data ) {
        //console.log(data);
        var str=data.reduce(addButton,'');
        $( "#pollsList" ).html( str);
        console.log(str);

    });
});

$("#pollsList").on("click","a.poll-entry",function(){
    var time=$(this).attr('id');
    console.log(apiUrl+time);

    $.ajax({
    url: apiUrl+time,
    type: 'DELETE',
    success: function(result) {
        
    }
});
 location.reload();
    return false;
});
 
    
function addButton(str,val) {
    str+='\n<a '
    str+=' id="';
    str+=val.time;
    str+='" class="poll-entry btn">';
    str+=val.poll.name;
    str+='</a>';
    return str;
};
