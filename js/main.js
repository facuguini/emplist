var n=1;
var defecto=5;
var total=1;

function runScript(e) {
    if (e.keyCode == 13) {
        var gusto = $('#fname').val();
        if (gusto.length > 0) {
	        n=n+1;
	        $('#contenido').append("<div><label for='empanada" + n + "'>" + gusto + ": </label> <input type='range' class='empanada' name='empanada" + n +"' id='empanada" + n + "' value='"+ defecto + "' min='0' max='50' data-theme='a' /></div>");
	        $('.ui-page').trigger('create');
	   		return false;
   		}
    }
}


$( document ).ready(function() {
 

//$( "#empanada1" ).bind( "change", function(event, ui) {
 //alert($("#empanada1").val());
//});

$( "#defecto" ).on( 'slidestop', function( event ) { 
	defecto = $("#defecto").val()
	console.log(defecto); 
});

});