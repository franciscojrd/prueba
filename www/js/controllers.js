angular.module('starter.controllers', [])
    .service('ionicPopup', function() { /* ... */ })
    .service('PersonService', function() { /* ... */ })
    .service('cordovaCamera', function(){})

.controller('registroCtrl', function($scope, $http, $q, Users, $ionicLoading, $ionicPopup) {

        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $scope.Usuario = {}
        $scope.Usuario.name = ""
        $scope.Usuario.email = ""
        $scope.Usuario.pais = ""
        $scope.Usuario.departamento = ""
        $scope.Usuario.municipio = ""
        $scope.Usuario.imagen = ""

        var urlr = "http://abbie-core.herokuapp.com/api/susers/new"
        $scope.showConfirmReg = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Registro De Usuario',
                template: 'Desea Registrar',
                okText: 'Si',
                cancelText: 'No'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    $scope.Reg();
                } else {
                    close();
                }
            });
        };


        $scope.Reg = function() {
            $scope.showLoadingProperTimes = function() {
                $ionicLoading.show({
                    templateUrl: "templates/registro.html"
                });
            };
            $scope.showLoadingProperTimes();
            Users.reg($scope.Usuario, urlr).then(function(argument) {

                console.log(argument)
                $ionicLoading.hide({});
                $scope.id = argument.id;
                console.log($scope.id)
                window.location = '#/consulta?id=' + $scope.id;
                $scope.Usuario.name = ""
                $scope.Usuario.email = ""
                $scope.Usuario.pais = ""
                $scope.Usuario.departamento = ""
                $scope.Usuario.municipio = ""
                $scope.Usuario.imagen = ""
            })
        };
    })
    .controller('ConsultaCtrl', function($scope, $http, $q, $location, $ionicLoading, Consulta) {

        Consulta.consulta().then(function(argument, $timeout) {
            console.log(argument)
            $scope.Usuario = {
                name: argument.name,
                email: argument.email,
                nacionalidad: argument.country,
                departamento: argument.state,
                municipio: argument.city,
                avatar: argument.avatar.url
            };

        })
    })
    .controller('AppCtrl', function($scope) {
        $scope.ubicacion = {
            'Antioquia': ['Medellin', 'Barbosa', 'El Peñol', 'Envigado', 'Caldas'],
            'Cundinamarca': ['Bogota', 'Villeta', 'Chocontá', 'Cajica', 'Chia']

        };
    })
    .controller('CtrlUbi', function($scope) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geocoder = new google.maps.Geocoder();
            let location;
            console.log(latitude);
            console.log(longitude);
            location = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({ 'latLng': location }, (results, status) => {
                processLocation(results);
                console.log(results);
                console.log(results[0].formatted_address);

            });
        });

        function processLocation(location) {
            if (location[1]) {
                for (var i = 0; i < location.length; i++) {
                    if (location[i].types[0] === "locality") {
                        let city = location[i].address_components[0].short_name;
                        let state = location[i].address_components[2].short_name;
                        let country = location[i].address_components[3].long_name;

                        console.log(city, state, country);
                        if (city === 'Envigado') {
                            $('#frmRegistro').css('background-color', '#F4FA58');
                            $("#mensaje").text('Estoy en' + ' ' + city + ' ' + state);
                        } else if (city === 'Medellin') {
                            $('#frmRegistro').css('background-color', '#008000');
                            $("#mensaje").text('Estoy en' + ' ' + city + ' ' + state);
                        } else {
                            $('#frmRegistro').css('background-color', '#0000');
                            $("#mensaje").text('Estoy en' + ' ' + city + ' ' + state);
                        }

                    }
                }
            }
        }
    })
