(function () {
    'use strict';

    angular
        .module('app')
        .controller('addNewProduct', addNewProduct);

    addNewProduct.$inject = ['$rootScope','$http', '$scope','$filter'];
    function addNewProduct($rootScope, $http, $scope,$filter) 
    {
        $scope.options = [{itemName:""}];
        $scope.options.splice(0,1);
        //console.log(date);
        $http.get('/allCategory').success(function(response)
        {
            //console.log(response.Items);
            $scope.d = response.Items;
            
            var values = response.Items;
            //console.log(values.length);
            var i;
            for(i=0;i<values.length;i++)
            {
                $scope.options.push({itemName:values[i].itemName.S});
            }
            var date = $filter('date')(new Date(), 'dd/MM/yyyy');
            $scope.comp.InvoiceDate = date;
            $scope.comp.InvoiceStaff = $rootScope.globals.currentUser.username;
             
        });
        $scope.addProduct = function()
        {
            //console.log($scope.comp);
            $scope.comp.pCompany = $scope.add.pCompany;
            $http.post('/addCompBill',$scope.comp).success(function(response)
            {   
                //console.log($scope.add);
                $scope.add.pCat = $scope.add.pCat.itemName;
                $http.post('/addProducts',$scope.add).success(function(response)
                {   
                    alert("product added");
                    $scope.add.pID = "";
                    $scope.add.pName = "";
                    $scope.add.pCat = "";
                    $scope.add.pDesc = "";
                    $scope.add.pCost = "";
                    $scope.add.pTax = "";
                    $scope.add.pStock = "";
                });   
            });
        }
        $scope.clearAll = function()
        {
            $scope.add.pCompany = "";
            $scope.add.pID = "";
            $scope.add.pName = "";
            $scope.add.pCat = "";
            $scope.add.pDesc = "";
            $scope.add.pCost = "";
            $scope.add.pTax = "";
            $scope.add.pStock = "";
            $scope.comp.InvoiceNo= "";
            $scope.comp.InvoiceAmountPaid= "";
        }  
    }
})();