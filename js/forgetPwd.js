define(["app"],function(app){
    app.controller("forgetPwd",function($scope,$http,$rootScope,$location,$timeout){
        $scope.username="";
        $scope.password="";
        $scope.confirm = "";
        $scope.answer = "";
        $scope.question = "father";
        $scope.usernamePass = false;
        $scope.passwordPass = false;
        $scope.confirmPass = false;
        $scope.answerPass = false;
        $scope.showMessage = false;
        $scope.message= "";

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
                    if(response.data.result == 0){
                        $scope.usernameStatus = "has-success";
                        $scope.usernamePass = true;
                    }else{
                        $scope.usernameStatus = "has-error";
                        $scope.usernamePass = false;
                        $scope.usernameMessage = "该用户不存在!";
                    }
                },
                function errorCallback(response){

                }
            );
        };

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

        $scope.answerBlur = function(){
            $scope.answerMessage="";
            if($scope.answer){
                $scope.answerStatus = "has-success";
                $scope.answerPass = true;
            }else{
                $scope.answerStatus = "has-error";
                $scope.answerPass = false;
                $scope.answerMessage = "密保答案不能为空!";
            }
        };

        $scope.changePwd = function(){
            $scope.showMessage = false;
            if($scope.usernamePass && $scope.passwordPass && $scope.confirmPass && $scope.answerPass){
                $http({
                    withCredentials: true,
                    method:"get",
                    url:"http://" + $rootScope.url + ":8888/changePwd?userName=" + $scope.username + "&password=" + $scope.password + "&question=" + $scope.question  + "&answer=" + $scope.answer
                }).then(
                    function successCallback(response){
                        if(response.data.result){
                            $scope.showMessage = true;
                            $scope.message = response.data.message;

                            /*$timeout(function(){
                                $location.path("/login");
                            },3000);*/
                        }
                    },
                    function errorCallback(response){
                        console.log(response);
                    }
                );
            }
        }
    })
});