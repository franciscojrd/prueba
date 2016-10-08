angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers','starter.services'])
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('principal', {
                url: '/principal',
                templateUrl: 'templetes/principal.html',
                controller: 'registroCtrl'
            })
           .state('consulta', {
                url: '/consulta',
                templateUrl: 'templetes/consulta.html',
                controller: 'ConsultaCtrl'
            })

        $urlRouterProvider.otherwise("principal");

    })
        .controller("camaraCtrl", function($scope, $cordovaCamera) {

        $scope.takePhoto = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURL = "data:image/jpeg;base64," + imageData;
            }, function(err) {
            });
        }

        $scope.choosePhoto = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURL = "data:image/jpeg;base64," + imageData;
            }, function(err) {
            });
        }


    });


