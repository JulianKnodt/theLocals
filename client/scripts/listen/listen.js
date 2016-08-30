angular.module('listen', [])
.controller('listenController', function($scope, $http){
  $scope.collectPackets = function(){
    $http({
      url:'/data',
      method:'POST'
    })
    .success(function(){
      $http({
        url:'/data',
        method:'GET'
      })
      .success(function(data){
        data.forEach(function(entry){
          entry.timestamp = new Date(entry.timestamp).toLocaleDateString() + " " + new Date(entry.timestamp).toLocaleTimeString();
        });
        $scope.packets = data;
      });
    });
  }
  $scope.clearPackets = function(){
    console.log('this shouldnt be running');
    $http({
      url:'/data',
      method: 'DELETE'
    });
  }
  $scope.mark = function(obj){
    $http.post('/url', JSON.stringify(obj))
    .then(function(){
      $scope.collectPackets();
    });
  }

  $scope.color = function(verified){
    if(verified === 0){
      return 'yellow';
    } else if(verified === 1){
      return 'green';
    } else if(verified === 3){
      return 'red';
    } else if(verified === 2){
      return 'blue';
    }
    return 'gray';
  }
  $scope.collectPackets();
})
.directive('link', function(){
  var directive = {};
  directive.templateUrl = 'scripts/listen/linkCard.html';
  return directive;
});