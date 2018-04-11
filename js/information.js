define(["app"],function(app){
    app.controller("information",function($scope,$http,$rootScope,$location,$timeout){
        $scope.username="";
        $scope.password="";
        $scope.confirm = "";
        $scope.answer = "";
        $scope.question = "";
        $scope.usernamePass = false;
        $scope.passwordPass = false;
        $scope.confirmPass = false;
        $scope.answerPass = false;
        $scope.showMessage = false;
        $scope.message= "";

        $scope.informationInit = function(){
            var username = getCookie('UserName');

            if(username){
                $scope.username = username;
                $scope.usernamePass = true;

                $http({
                    withCredentials: true,
                    method:"get",
                    url:"http://" + $rootScope.url + ":8888/userInformation?userName=" + $scope.username
                }).then(
                    function successCallback(response){
                        if(response.data.result && response.data.data.length == 1){
                            var data = response.data.data[0];

                            $scope.password = $scope.confirm = data.PassWord;
                            $scope.question = data.Question;
                            $scope.answer = data.Answer;
                            $scope.passwordPass = true;
                            $scope.confirmPass = true;
                            $scope.answerPass = true;
                        } else {
                            return false;
                        }
                    },
                    function errorCallback(response){

                    }
                );
            } else {
                $location.path("/login");
            }
        }

        $scope.usernameClick = function(){
            $scope.usernameStatus = "has-error";
            $scope.usernamePass = false;
            $scope.usernameMessage = "用户名不允许修改!";

            $timeout(function(){
                $scope.usernameStatus = "";
                $scope.usernamePass = true;
                $scope.usernameMessage = "";
            },3000);
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
                if(informationForm.confirmInput.value == informationForm.passwordInput.value){
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

        $scope.information = function(){
            //console.log($scope.username + " " + $scope.password + " " + $scope.confirm + " " + $scope.question + " " + $scope.answer);
            $scope.showMessage = false;
            $scope.message = "";

            if($scope.username && $scope.password && $scope.confirm && $scope.question && $scope.answer){
                $http({
                    withCredentials: true,
                    method:"get",
                    url:"http://" + $rootScope.url + ":8888/updateUserInformation?userName=" + $scope.username + "&password=" + $scope.password + "&question=" + $scope.question  + "&answer=" + $scope.answer
                }).then(
                    function successCallback(response){
                        if(response.data.result){
                            $scope.showMessage = true;
                            $scope.message = response.data.message;
                        } else {
                            return false;
                        }
                    },
                    function errorCallback(response){

                    }
                );
            } else {
                $scope.showMessage = true;
                $scope.message = "请填入完整的信息！";
            }
        };
    })
});