angular.module('starter.services', [])

.factory('Users', function($q, $http) {
    var Api = {};
    Api.reg = function(Usuario2, urlCompleta22) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: urlCompleta22,
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: Usuario2
        }).success(function(data) {
            defer.resolve(data);
        })
        return defer.promise;
    }
    return Api;
})
.factory('Consulta', function($q, $http, $location) {
        var Api = {};
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        Api.consulta = function() {
            var defer = $q.defer();
            var paramId = $location.search().id;
            var paramId1= 1;
            var urlaux = "http://abbie-core.herokuapp.com/api/susers/" + paramId +" ";
            console.log("--------" + urlaux);
            $http({
                method: 'GET',
                url: urlaux,
            }).success(function(data) {
                defer.resolve(data);
            })
            return defer.promise;
        }
        return Api;
    })
