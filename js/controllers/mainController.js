app.controller('MainController', ['$scope', function($scope) {
	if(localStorage.getItem('primeravez')==null) {
		console.log('entro por primera vez')
		localStorage.setItem('defecto', '5');
		localStorage.setItem('n','1');
		localStorage.setItem('total', '0');
		localStorage.setItem('primeravez', 'false')
		n = JSON.parse(localStorage.getItem('n'));
		defecto= JSON.parse(localStorage.getItem('defecto'));
		Total= JSON.parse(localStorage.getItem('total'))
	}
 	$( "#defecto" ).val(defecto)


 	for (i=2 ; i<=n ; i++) {
 		$('#contenido').append(JSON.parse(localStorage.getItem('empanada'+i)));
        $('.ui-page').trigger('create');
 	}

 	$('.prefab').click(function() {
 		var gusto = $(this).closest('li').text()
		n=n+1;
	    var content = "<div><label for='empanada" + n + "'>" + gusto + ": </label> <input type='range' class='empanada' name='empanada" + n +"' id='empanada" + n + "' value='"+ defecto + "' min='0' max='50' data-theme='a' /></div>"
        $('#contenido').append(content);
        $('.ui-page').trigger('create');
        localStorage.setItem("n",JSON.stringify(n));
        localStorage.setItem('empanada'+n, JSON.stringify(content));
 	})


	//$( "#empanada1" ).bind( "change", function(event, ui) {
	 //alert($("#empanada1").val());
	//});

	$( "#defecto" ).on( 'slidestop', function( event ) { 
		defecto = $("#defecto").val()
		localStorage.setItem("defecto", JSON.stringify(defecto));
	});


	$("#boton").click(function( ) { 
		Total=0;
	  	$(".empanada").each(function( index ) { 
	    Total = parseInt(Total) + parseInt($(this).val());
		}); 
	console.log(Total);
	var dtotal = Math.floor(Total/12)
	console.log(dtotal+" docena(s) y " + (Total-dtotal*12) + " empanadas.")
	//localStorage.setItem('total', JSON.stringify(Total));
	});
	var n = JSON.parse(localStorage.getItem('n'));
	var defecto= JSON.parse(localStorage.getItem('defecto'));
	var Total=0;
	//var Total= JSON.parse(localStorage.getItem('total'))
	//var n=1;
	function runScript(e) {
	    if (e.keyCode == 13) {
	        var gusto = $('#fname').val();
	        if (gusto.length > 0) {
		        n=n+1;
		        var content = "<div><label for='empanada" + n + "'>" + gusto + ": </label> <input type='range' class='empanada' name='empanada" + n +"' id='empanada" + n + "' value='"+ defecto + "' min='0' max='50' data-theme='a' /></div>"
		        $('#contenido').append(content);
		        $('.ui-page').trigger('create');
		        localStorage.setItem("n",JSON.stringify(n));
		        localStorage.setItem('empanada'+n, JSON.stringify(content));
		   		$('#fname').val('')
		   		return false;
	   		}
	    }
	}
}]);
