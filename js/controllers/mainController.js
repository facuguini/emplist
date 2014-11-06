app.controller('mainController', ['$scope', '$timeout', function($scope, $timeout) {
	/*PARTE INICIO*/
	if(localStorage.getItem('primeravez')==null) {
		console.log('entro por primera vez')
		localStorage.setItem('defecto', 5);
		localStorage.setItem('primeravez', 'false')
		localStorage.setItem('docenas', 'false')
		localStorage.setItem('empanadas', '[]')
		localStorage.setItem('id', 0);
	}
	$scope.prefabs = [{name: 'carne'},
        {name: 'jamon y queso'},
        {name: 'pollo'},
        {name: ' queso y cebolla'},
        {name: 'humita'},
        {name: 'calabresa'}];
    $scope.empanadas = JSON.parse(localStorage.getItem('empanadas'));
	$scope.cantdefecto = JSON.parse(localStorage.getItem('defecto'));
	var _id = localStorage.getItem('id')
	$scope.val = $scope.cantdefecto;
	if (localStorage.getItem('docenas')==="true") {
		$scope.docenas = true;
	} else if (localStorage.getItem('docenas')==="false") {
		$scope.docenas = false;
	}

	/* PARTE AGREGAR*/
 	$scope.addpre = function(_gusto) {
 		var gusto = _gusto;
        var empanada = {
        	id: _id,
        	name: gusto,
        	value: $scope.cantdefecto,
        	undo: false
        }
        _id++;
        $scope.empanadas.push(empanada);
        localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
        localStorage.setItem('id', _id);
 	}

 	$scope.addcustom = function() {
		if($scope.customtext){
	        var empanada = {
	        	id: _id,
	        	name: $scope.customtext,
	        	value: $scope.cantdefecto,
	        	undo: false
	        }
	        _id++;
	        $scope.empanadas.push(empanada);
	        localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
	        localStorage.setItem('id', _id);
	        $scope.customtext = "";
        }
	}

	/*PARTE MANEJO DE EMPANADAS*/
	$scope.add = function(index) {
		var emp = $scope.empanadas[index];
		var nval = emp.value+1
		emp.value = nval;
		$scope.empanadas[index] = emp;
		localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
	}

	$scope.res = function(index) {
		var emp = $scope.empanadas[index];
		var nval = emp.value;
		if(nval>=1){
			nval = emp.value-1
		}
		emp.value = nval;
		$scope.empanadas[index] = emp;
		localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
	}

	$scope.total = {
		valor: function() {
	      	var Total=0;
			for (var i = 0 ; i< $scope.empanadas.length ; i++ ) { 
		    	Total = parseInt(Total) + parseInt($scope.empanadas[i].value);
			} 
			if (Total==0) {
				$scope.totalshow = false;
			} else {
				$scope.totalshow = true;
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

    /*PARTE SETTINGS*/
	$scope.defectochange = function() { 
		var defecto = $scope.cantdefecto
		localStorage.setItem("defecto", defecto);
	};
	$scope.docOn = function() {
		$scope.docenas = true;
		localStorage.setItem('docenas', 'true')
	}
	$scope.docOff = function() {
		$scope.docenas = false;
		localStorage.setItem('docenas', 'false')
	}

	/* PARTE ELIMINAR */ 
	var delempanada = []
	var valdelempanada = []
    $scope.swipe = function(index) {
    	var emp = $scope.empanadas[index];
    	emp.undo = true;
    	valdelempanada[index] = emp.value;
    	emp.value = 0;
    	delempanada[index] = $timeout(function() {del(emp.id)}, 5000)
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    }

    $scope.undo = function(index){
    	$timeout.cancel(delempanada[index]);
    	$scope.empanadas[index].value = valdelempanada[index];
    	$scope.empanadas[index].undo = false;
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    }

    function del(_id) {
    	for (i in $scope.empanadas) {
    		if ($scope.empanadas[i].id===_id) {
    			$scope.empanadas.splice(i,1);
    		}
    	}
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    }
    $scope.clearAll = function() {
    	_id = 0;
    	$scope.empanadas = [];
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    	localStorage.setItem('id', _id);
    }

}]);
