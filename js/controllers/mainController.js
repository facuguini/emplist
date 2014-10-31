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
		localStorage.setItem('defecto', 5);
		localStorage.setItem('primeravez', 'false')
		localStorage.setItem('docenas', 'false')
		$scope.cantdefecto = JSON.parse(localStorage.getItem('defecto'));
	}
	$scope.cantdefecto = JSON.parse(localStorage.getItem('defecto'));
	$scope.val = $scope.cantdefecto;

 	$scope.addpre = function(_gusto) {
 		console.log($scope.cantdefecto)
 		var gusto = _gusto;
        var num;
        if($scope.empanadas!=null){
        	num=$scope.empanadas.length;
        } else {
        	num=0;
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

	$scope.defectochange = function() { 
		var defecto = $scope.cantdefecto
		localStorage.setItem("defecto", defecto);
	};
/*
	$scope.empanadachange = function() {
		console.log(this.empanada.id) 
		console.log(this.empanada.name)
		console.log(this.empanada.index)
	}*/

	$scope.add = function(index) {
		var emp = $scope.empanadas[index];
		var nval = emp.value+1
		emp.value = nval;
		$scope.empanadas[index] = emp;
		localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
	}

	$scope.res = function(index) {
		var emp = $scope.empanadas[index];
		var nval = emp.value-1
		emp.value = nval;
		$scope.empanadas[index] = emp;
		localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
	}

	$scope.calcular = function() { 
		var Total=0;
		for (var i = 0 ; i< $scope.empanadas.length ; i++ ) { 
	    	Total = parseInt(Total) + parseInt($scope.empanadas[i].value);
		}
		console.log(Total);
		var dtotal = Math.floor(Total/12)
		console.log(dtotal+" docena(s) y " + (Total-dtotal*12) + " empanadas.")
	};

	$scope.total = {
		valor: function() {
	      	var Total=0;
			for (var i = 0 ; i< $scope.empanadas.length ; i++ ) { 
		    	Total = parseInt(Total) + parseInt($scope.empanadas[i].value);
			}      	
	        if (localStorage.getItem('docenas')==="true") {
				var dtotal = Math.floor(Total/12)
				var data = dtotal+" docena(s) y " + (Total-dtotal*12)
				return data;
	        } else {
	        	return Total;
	    	}
		}
    };
	
	$scope.addcustom = function() {
		if($scope.customtext){
	        var num;
	        if($scope.empanadas!=null){
	        	num=$scope.empanadas.length;
	        } else {
	        	num=0;
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

	$scope.docOn = function() {
		localStorage.setItem('docenas', 'true')
	}
	$scope.docOff = function() {
		localStorage.setItem('docenas', 'false')
	}
}]);
