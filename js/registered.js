define(["app"],function(app){
    app.controller("registered",function($scope){
        $scope.username="";
        $scope.password="";
        $scope.confirm = "";

        $scope.usernameBlur = function(){
            $scope.showUsernameMessage = false;
            $scope.usernameMessage="";
            if(registeredForm.usernameInput.value){
                $scope.usernameStatus = "has-success";
                $scope.showUsernameMessage = false;
            }else{
                $scope.usernameStatus = "has-error";
                $scope.showUsernameMessage = true;
                $scope.usernameMessage = "用户名不能为空!";
            }
        };

        $scope.passwordBlur = function(){
            $scope.showPasswordMessage = false;
            $scope.passwordMessage="";
            if(registeredForm.passwordInput.value){
                $scope.passwordStatus = "has-success";
                $scope.showPasswordMessage = false;
            }else{
                $scope.passwordStatus = "has-error";
                $scope.showPasswordMessage = true;
                $scope.passwordMessage = "密码不能为空!";
            }
        };

        $scope.confirmBlur = function(){
            $scope.showConfirmMessage = false;
            $scope.confirmMessage="";
            if(registeredForm.confirmInput.value){
                $scope.confirmStatus = "has-success";
                $scope.showConfirmMessage = false;
            }else{
                $scope.confirmStatus = "has-error";
                $scope.showConfirmMessage = true;
                $scope.confirmMessage = "请再次输入您的密码!";
            }
        }
    })
});