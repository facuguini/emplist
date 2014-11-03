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
	}
	$scope.cantdefecto = JSON.parse(localStorage.getItem('defecto'));
	$scope.val = $scope.cantdefecto;
	if (localStorage.getItem('docenas')==="true") {
		$scope.nochecked = false;
		$scope.sichecked = true;
	} else if (localStorage.getItem('docenas')==="false") {
		$scope.nochecked = true;
		$scope.sichecked = false;
	}
	$scope.empShow = true;
	$scope.undoshow = false;

 	$scope.addpre = function(_gusto) {
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
        	value: $scope.cantdefecto,
        	undo: false
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
		var nval = emp.value;
		if(nval>=1){
			nval = emp.value-1
		}
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
	var undoed = false;
    $scope.swipe = function(index) {
    	console.log(index)
    	undoed = false;
    	var emp = $scope.empanadas[index];
    	emp.undo = true;
    	setTimeout(function() { if(!undoed) {del(index)} }, 10000)
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    }

    $scope.undo = function(index){
    	$scope.empanadas[index].undo = false;
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    	undoed = true;
    }

    function del(index) {
    	$scope.empanadas.splice(index, 1)
    	localStorage.setItem('empanadas', JSON.stringify($scope.empanadas));
    }

}]);
