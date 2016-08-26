(function () {
    'use strict';

    angular
        .module('app')
        .controller('completeStock', completeStock);

    completeStock.$inject = ['$rootScope','$http', '$scope'];
    function completeStock($rootScope, $http, $scope) 
    {
        
        refresh();
        $scope.status= true;
        //console.log($rootScope.globals.currentUser.username);
        $scope.searchProduct = function(name)
        {
            $scope.status= true;

            $http.put('/search',$scope.search).success(function(response){
            refresh();
            $scope.update="";
            });
        };
        function refresh()
        {
            $http.get('/allproducts').success(function(response)
            {
                $rootScope.globals.currentUser.stock = response.Items;
                //console.log("got data rquested");
                $scope.details = response.Items;
                $scope.options = [{pName:""}];
                //console.log(response.Items);
                var values = response.Items;
                var i;
                //console.log(values);
                for(i=0;i<values.length;i++)
                {
                    $scope.options.push({pName:values[i].pName.S});
                    stock.push(values[i]);
                }
                $scope.add="";    
                console.log($rootScope.globals.currentUser.stock);
            });
      
        }   
    }
})();