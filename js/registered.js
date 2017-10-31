define(["app"],function(app){
    app.controller("registered",function($scope,$http,$rootScope){
        $scope.username="";
        $scope.password="";
        $scope.confirm = "";
        $scope.usernamePass = false;
        $scope.passwordPass = false;
        $scope.confirmPass = false;

        $scope.usernameBlur = function(){
            $scope.usernameMessage="";
            if($scope.username){
                checkUserName();//检查姓名是否存在
            }else{
                $scope.usernameStatus = "has-error";
                $scope.usernamePass = false;
                $scope.usernameMessage = "用户名不能为空!";
            }
        };

        function checkUserName(){
            $http({
                withCredentials: true,
                method:"get",
                url:"http://" + $rootScope.url + ":8888/checkUsername?userName=" + $scope.username
            }).then(
                function successCallback(response){
                    if(response.data.result){
                        $scope.usernameStatus = "has-success";
                        $scope.usernamePass = true;
                    }else{
                        $scope.usernameStatus = "has-error";
                        $scope.usernamePass = false;
                        $scope.usernameMessage = response.data.message;
                    }
                },
                function errorCallback(response){

                }
            );
        }

        $scope.passwordBlur = function(){
            $scope.passwordMessage="";
            if($scope.password){
                $scope.passwordStatus = "has-success";
                $scope.passwordPass = true;
            }else{
                $scope.passwordStatus = "has-error";
                $scope.passwordPass = false;
                $scope.passwordMessage = "密码不能为空!";
            }
        };

        $scope.confirmBlur = function(){
            $scope.confirmMessage="";
            if($scope.confirm){
                if(registeredForm.confirmInput.value == registeredForm.passwordInput.value){
                    $scope.confirmStatus = "has-success";
                    $scope.confirmPass = true;
                }else{
                    $scope.confirmStatus = "has-error";
                    $scope.confirmPass = false;
                    $scope.confirmMessage = "请输入相同的密码!";
                }
            }else{
                $scope.confirmStatus = "has-error";
                $scope.confirmPass = false;
                $scope.confirmMessage = "请再次输入您的密码!";
            }
        };

        $scope.registered = function(){
            if($scope.usernamePass && $scope.passwordPass && $scope.confirmPass){
                $http({
                    withCredentials: true,
                    method:"get",
                    url:"http://" + $rootScope.url + ":8888/registered?userName=" + $scope.username + "&password=" + $scope.password
                }).then(
                    function successCallback(response){
                        console.log(response);
                    },
                    function errorCallback(response){

                    }
                );
            }
        }
    })
});