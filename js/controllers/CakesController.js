
app.controller( 'cakesController', function( $scope,$http ) {
    $scope.contents =  null;
    $scope.added = [];
    var Totprice = 0;
    $scope.predicate = 'price';
    $scope.addedToCart = false;
    $scope.checked = false;

    var flag =0;

    $http.get( 'data/Cakes.json' )
        .success( function( data ) {
            $scope.contents = data;
        })

    $scope.order = function(predicate) {
        $scope.reverse = ($scope.predicate === predicate) ? false : true;

    };

    $scope.addToCart = function( name, price, quantity ) {
        var item= {
            name: name,
            price: parseInt(price),
            quantity: parseInt(quantity)
        };

            Totprice = parseInt(Totprice) + parseInt(item.price);
            Totprice = Totprice*quantity;

            for(var i=0;i<$scope.added.length;i++){
                if(item.name == $scope.added[i].name){
                        alert("item already added to the cart");
                        $scope.total = $scope.total - ($scope.added[index].price * $scope.added[index].quantity);
                        $scope.added.splice(index, 1);
                        break;

                }
             }
            $scope.added.push( item );
            //alert(item.quantity + " " +item.name + " added to cart");

            //total charge calculation
            $scope.total = Totprice;


        }


    $scope.recalculateTotal = function(item){
        $scope.total =0;
       for(var i=0;i<$scope.added.length;i++){

           $scope.total = $scope.total + ($scope.added[i].price*$scope.added[i].quantity);

      }

       $scope.delivery = 0;

            if($scope.total>0 && $scope.total<=300){
                $scope.delivery = 50;
            }
            if($scope.total>300 && $scope.total<=400){
                $scope.delivery = 40;
            }
            if($scope.total>400 && $scope.total<=500){
                $scope.delivery = 30;
            }
            if($scope.total>500){
                $scope.delivery = 30;
            }


            //total charge calculation
            $scope.total = $scope.delivery + $scope.total;

    }




    $scope.increaseItemAmount = function(item) {

      item.quantity++;
      item.showAddToCart = true;

      for(var i=0;i<$scope.added.length;i++){
        if(item.name == $scope.added[i].name){
            $scope.added[i].quantity++;
        }
      }
      $scope.recalculateTotal(item);
    }

    $scope.decreaseItemAmount = function(item) {
      item.quantity--;
      item.showAddToCart = true;
      for(var i=0;i<$scope.added.length;i++){
        if(item.name == $scope.added[i].name){
            $scope.added[i].quantity--;

        }
      }
      if (item.quantity <= 0) {
        item.quantity = 0;
        item.addedToCart = false;
        item.showAddToCart = false;
        if(item.quantity===0){
            for(var index=0;index<$scope.added.length;index++){
                if(item.name == $scope.added[index].name){
                $scope.total = $scope.total - ($scope.added[index].price * $scope.added[index].quantity);
                $scope.added.splice(index, 1);

        }
      }

        }
      } else {
        item.showAddToCart = true;
      }
      $scope.recalculateTotal(item);

    }

    $scope.removeFromCart = function(item) {
      item.quantity = 0;
      item.addedToCart = false;
      item.showAddToCart = false;
      flag=0;
      console.log($scope.added);
      for(var index=0;index<$scope.added.length;index++){
        if(item.name == $scope.added[index].name){
            $scope.total = $scope.total - ($scope.added[index].price * $scope.added[index].quantity);
            $scope.added.splice(index, 1);

        }
      }
      //$scope.recalculateTotal(item);
    }

    $scope.check = function(){
      $scope.checked = true;
      return $scope.checked;
    }





});
