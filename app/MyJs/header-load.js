 //  var apiUrl = appUrl + '/api/';



$("header").ready(function(){

  $.get(window.location.origin+"/api/getUser",function(val){
     // console.log(val);
      //console.log();
     $("header").load("/public/header.html",function(){
         
     
    if(val.LoggedIn){
        $("#logbut").css("display","none");
            
        $("#profbut").css("display","inline");
       // $("#logbut").css("display","");
    }
    else{
        
    }
     })
  });
});

