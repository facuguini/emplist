angular.module('empanadas.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope) {
  if (localStorage.getItem("primeravez")==null) {
    localStorage.setItem("primeravez", false)
    localStorage.setItem("defecto", 5);
    localStorage.setItem("docenas", true);
    localStorage.setItem("empanadas", JSON.stringify([{ nombre: 'Carne', cantidad: 5 },{ nombre: 'JyQ', cantidad: 5 },{ nombre: 'Cebolla', cantidad: 5 },{ nombre: 'Pollo', cantidad: 5 }]));
    localStorage.setItem("prefabs", JSON.stringify([{nombre: 'Carne'},{nombre: 'Humita'},{nombre: 'JyQ'},{nombre: 'Pollo'}]));
    localStorage.setItem("maxrange", "12")
  }
  $rootScope.prefabs = JSON.parse(localStorage.getItem("prefabs"));
  $scope.config = {checked: null, defecto: 0, max:0}
  $scope.config.checked = localStorage.getItem("docenas");
  $scope.config.defecto = localStorage.getItem("defecto");
  $scope.config.max = localStorage.getItem("maxrange");
  $scope.checked = JSON.parse($scope.config.checked);
  $rootScope.max = $scope.config.max;
  
  $scope.docenaschg = function (value) {
    localStorage.setItem("docenas", value);
    $scope.checked = value;
  }
  $scope.defectochg = function (value) {
    localStorage.setItem("defecto", value);
  }
  $scope.maxchg = function (value) {
    localStorage.setItem("maxrange", value)
    $rootScope.max = $scope.config.max;
  }

})

.controller('MainCtrl', function($scope, $rootScope, $ionicPopover) {
  $scope.max = $rootScope.max;
  $scope.showDelete = false;
  $scope.predefinidos = $rootScope.prefabs;
  $scope.empanadas = JSON.parse(localStorage.getItem("empanadas"));
  $scope.empanada = {nombre:""}
  $scope.totalshow = true;
  $scope.total = {
    valor: function() {
          var Total=0;
      for (var i = 0 ; i< $scope.empanadas.length ; i++ ) { 
          Total = parseInt(Total) + parseInt($scope.empanadas[i].cantidad);
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

  $scope.sDelete = function() {
    $scope.showDelete = !$scope.showDelete;
  }
  $scope.agregar = function (empanada) {
    var emp = {nombre: empanada, cantidad: localStorage.getItem("defecto")}
    $scope.empanadas.push(emp);
    localStorage.setItem("empanadas", JSON.stringify($scope.empanadas))
    $scope.empanada.nombre = "";
  }

  $scope.agregarpre = function (empanada) {
    var emp = {nombre: empanada}
    $scope.predefinidos.push(emp);
    localStorage.setItem("prefabs", JSON.stringify($scope.predefinidos))
  }

  $scope.delete = function (id, who) {
    if (who === 'empanadas'){
      $scope.empanadas.splice(id,1);
      localStorage.setItem("empanadas", JSON.stringify($scope.empanadas))
      if($scope.empanadas.length==0){
        $scope.showDelete = false;
      }
    } else if (who === 'prefabs') {
      $scope.predefinidos.splice(id, 1);
      localStorage.setItem("prefabs", JSON.stringify($scope.predefinidos))
      if($scope.predefinidos.length==0){
        $scope.showDelete = false;
      }
    }


  }

  $scope.cantidad = function () {
    $scope.max = $rootScope.max;
    localStorage.setItem("empanadas", JSON.stringify($scope.empanadas));
  }

  $scope.sumar = function(empanada) {
    $scope.max = $rootScope.max;
    if (empanada.cantidad < $scope.max) {
      empanada.cantidad++; 
    }
    $scope.cantidad()
  }

  $scope.restar = function(empanada) {
    if (empanada.cantidad > 0) {
      empanada.cantidad--; 
    }
    $scope.cantidad()
  }

  /* POPOVICH */
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.editar = function($event, cantidad, id) {
    $scope.popover.show($event)
    $scope.popover.value = parseInt(cantidad)
    $scope.id = id
  }

  $scope.guardarCant = function(cantidad, id) {
    $scope.empanadas[id].cantidad = cantidad;
    localStorage.setItem("empanadas", JSON.stringify($scope.empanadas));
    $scope.popover.hide()
  }

})


