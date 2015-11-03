
(function (angular) {
    
    var notesViewModule = angular.module("notesView", ["ui.bootstrap"]);
    notesViewModule.controller("notesViewController", 
        ["$scope", "$window", "$http",
        function ($scope, $window, $http) {
            $scope.notes = [];
            $scope.newNote = createBlankNote();
            
            var urlParts = $window.location.pathname.split("/");
            var categoryName = urlParts[urlParts.length - 1];
            
            var notesUrl = "/api/notes/" + categoryName;
            $http.get(notesUrl).then(
                function (result) {
                    $scope.notes = result.data;
                }, function (err) {
                    alert(err);
                });
            
            $scope.save = function () {
                $http.post(notesUrl, $scope.newNote).then(
                    function (result) {
                        $scope.notes.push(result.data);
                        $scope.newNote = createBlankNote();
                    }, function (err) {
                        alert(err);
                    });
            };

            function createBlankNote(){
                return {
                    note: "",
                    color: "yellow"
                };
            }
        }
    ]);
})(window.angular);