(function () {
    'use strict';
    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$location'];
    function HomeController($rootScope, $location) 
    {
        var vm = this;
        vm.addNewProduct = addNewProduct;
        vm.updateProduct = updateProduct;
        vm.completeStock = completeStock;

        vm.allProducts = allProducts;
        vm.allInvoices = allInvoices;
        vm.settings = settings;
        vm.username = $rootScope.globals.currentUser.stock;
        //$rootScope.globals.currentUser.username = "test";
        console.log($rootScope.globals.currentUser.stock);
        if(vm.username == "admin")
        {
            $rootScope.divEnabled = false;
        }
        else
        {
            $rootScope.divEnabled = true;
        }
        function addNewProduct() 
        {
            $location.path('/addNewProduct');
        };
        function updateProduct() 
        {
            $location.path('/updateProduct');
        };
        
        //console.log(vm.username);
        function completeStock() 
        {
            $location.path('/completeStock');
        };
        
        function allProducts() 
        {
            $location.path('/allProducts');
        };
        function allInvoices() 
        {
            $location.path('/allInvoices');
        };
        function settings() 
        {
            $location.path('/settings');
        };
        
    }
})();