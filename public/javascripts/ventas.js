//const { propfind } = require("../../app");


angular.module('super_venta',[])
    .controller('ventas',function($scope){
        $scope.carrito=[];
        listadetalle=[];
        $scope.ejemplo="este dato desde codigo"
        $scope.total=0;
        var Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          
           
        
        
          hotkeys('f2,f4,f5', function (event, handler){
            switch (handler.key) {
              case 'f2': //$scope.producto.focus();
                        //angular.element($document[0].querySelector('#prod')).trigger('focus');
                        document.getElementById('prod').focus();
                        //
                break;
              case 'f3': alert('you pressed f3');
                break;
              case 'f4': $scope.agregar();
                        $scope.$apply();
                break;
              case 'f5': alert('you pressed f5');
                break;
              default: alert(event);
            }
          });
        function sumarProductos(){
            $scope.total=0;
            for(i=0;i<$scope.carrito.length;i++){
                $scope.total+=$scope.carrito[i].cant*$scope.carrito[i].precio;
            }
        }
        $scope.iniciar=function(msg){
          
          if(msg){
            console.log("msg",msg);
            Toast.fire({
              icon: 'success',
              title: msg
            })
            //toastr.success(
            //  msg)
          }
        }
        $scope.agregar=function(){
           

            if($scope.cant<=$scope.producto.cant){
                console.log("carrito",$scope.carrito);
                console.log("lista",$scope.producto);
                let pro=$scope.carrito.find(elemt=>elemt.producto.codigobarra==$scope.producto.codigobarra);
                console.log("buscado",pro);
                if(pro!==undefined ){
                    console.log("si encontro")
                    pro.cant+=$scope.cant;
                    //let pro_envio=listadetalle.find(elemt=>elemt.producto==$scope.producto._id);
                    //pro_envio.cant+$scope.cant;
                }else{
                  console.log("NOOOO encontro")
                    $scope.carrito.push({
                        producto:$scope.producto,
                        precio:$scope.producto.precio,
                        cant:$scope.cant
                    });
                    /*listadetalle.push({
                      producto:$scope.producto._id,
                      precio:$scope.producto.precio,
                      cant:$scope.cant
                  });*/
                }
                /**************************/
                listadetalle=[];
                for(i=0;i<$scope.carrito.length;i++){
                  listadetalle.push({
                    producto:$scope.carrito[i].producto._id,
                    precio:$scope.carrito[i].producto.precio,
                    cant:$scope.carrito[i].cant
                  });
                }
                
                
                console.log(listadetalle);
                $scope.detalle_lista=JSON.stringify(listadetalle);
                /***************************/
                console.log(pro);
                let actualizarProducto=$scope.listaproducto.find(elemt=>elemt.codigobarra==$scope.producto.codigobarra);
                actualizarProducto.cant-=$scope.cant;
                $scope.producto.cant=actualizarProducto.cant;
                sumarProductos();
                $scope.cant=1;
                //$scope.producto.focus();
            }else
            Toast.fire({
                icon: 'warning',
                title: 'La cantidad sobre pasa el existente'
              })
        }
        var productoBorrar;
        $scope.confirmar=function(item){
            productoBorrar=item;
            Toast.fire({
                icon: 'warning',
                title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr.'
              })
        }
        $scope.confirmadoBorrar=function(){
            let actualizarProducto=$scope.listaproducto.find(elemt=>elemt.codigo==productoBorrar.producto.codigo);
            actualizarProducto.cant+=productoBorrar.cant;
            $scope.producto.cant=actualizarProducto.cant;
            $scope.carrito.splice($scope.carrito.indexOf(productoBorrar),1);

            sumarProductos();
        }
        
    })