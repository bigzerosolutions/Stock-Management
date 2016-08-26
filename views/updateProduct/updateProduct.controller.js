(function () {
    'use strict';

    angular
        .module('app')
        .controller('updateProduct', updateProduct);

    updateProduct.$inject = ['$rootScope','$http', '$scope'];
    function updateProduct($rootScope, $http, $scope) 
    {
        $scope.options = [{pName:""}];
        $scope.options.splice(0,1);
        refresh();
        
        $scope.populateData = function(name)
        {
            var i;
            for(i=0;i<$scope.details.length;i++)
            {
                if (name.pName == $scope.details[i].pName.S) 
                {   
                    //console.log($scope.details[i]);
                    $scope.update.pID = $scope.details[i].pID.S;
                    $scope.update.pCompany = $scope.details[i].pCompany.S;
                    $scope.update.pDesc = $scope.details[i].pDesc.S;
                    $scope.update.pCat = $scope.details[i].pCategory.S;
                    $scope.update.pCost = parseInt($scope.details[i].pCost.S);
                    $scope.update.pTax = parseInt($scope.details[i].pTax.S);
                    $scope.update.pStock = parseInt($scope.details[i].pStock.S);
                    //console.log($scope.update);
                }
            }
        }


        $scope.updateProduct = function(name)
        {
            $scope.update.pName = $scope.update.pName.pName;
            console.log($scope.update);
            $http.post('/addProducts',$scope.update).success(function(response)
            {
                refresh();
            });
        };

        $scope.removeProduct = function(name)
        {
            //console.log(name.pName);
            $http.delete('/remove/' + name.pName).success(function(response)
            {
                refresh();
            });
        };

        function refresh()
        {
            $http.get('/allproducts').success(function(response)
            {
                $scope.details = response.Items;
                
                //console.log(response.Items);
                var values = response.Items;
                var i;
                //console.log(values.length);
                for(i=0;i<values.length;i++)
                {
                    $scope.options.push({pName:values[i].pName.S});
                }
                $scope.update.pName = "";
                $scope.update.pID = "";
                $scope.update.pCompany = "";
                $scope.update.pDesc = "";
                $scope.update.pCat = "";
                $scope.update.pCost = "";
                $scope.update.pTax = "";
                $scope.update.pStock = "";    
            });

      
        }   
    }
})();