app.controller('mainController', ['$scope', function($scope) {
	$scope.prefabs = [{name: 'carne'},
        {name: 'jamon y queso'},
        {name: 'pollo'},
        {name: ' queso y cebolla'},
        {name: 'humita'},
        {name: 'calabresa'}];
    $scope.empanadas = JSON.parse(localStorage.getItem('empanadas'));

	if(localStorage.getItem('primeravez')==null) {
		console.log('entro por primera vez')
		localStorage.setItem('defecto', JSON.stringify(5));
		localStorage.setItem('primeravez', 'false')
		$scope.cantdefecto = JSON.parse(localStorage.getItem('defecto'));
	}
 	$scope.addpre = function(_gusto) {
 		var gusto = _gusto;
        var num;
        if($scope.empanadas!=null){
        	num=$scope.empanadas.length;
        } else {
        	num=1;
			$scope.empanadas = [];
        }
        var empanada = {
        	name: gusto,
        	id: 'empanada'+num,
        	value: $scope.cantdefecto
        }
        $scope.empanadas.push(empanada);
        localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
 	}

	$( "#defecto" ).on( 'slidestop', function( event ) { 
		defecto = $("#defecto").val()
		localStorage.setItem("defecto", JSON.stringify(defecto));
	});


	$scope.calcular = function() { 
		var Total=0;
	  	$(".empanada").each(function( index ) { 
	    	Total = parseInt(Total) + parseInt($(this).val());
		}); 
		console.log(Total);
		var dtotal = Math.floor(Total/12)
		console.log(dtotal+" docena(s) y " + (Total-dtotal*12) + " empanadas.")
	};
	var n = JSON.parse(localStorage.getItem('n'));
	var defecto= JSON.parse(localStorage.getItem('defecto'));
	

	$scope.addcustom = function() {
		if($scope.customtext){
	        var num;
	        if($scope.empanadas!=null){
	        	num=$scope.empanadas.length;
	        } else {
	        	num=1;
	        	$scope.empanadas = [];
	        }
	        var empanada = {
	        	name: $scope.customtext,
	        	id: 'empanada'+num,
	        	value: $scope.cantdefecto
	        }
	        $scope.empanadas.push(empanada);
	        localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
        }
	}
}]);
