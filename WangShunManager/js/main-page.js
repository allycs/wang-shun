var Main_Page = function () {
    var handleMain = function () {
        $("input[type ='submit']").keypress(function (e) {
            if (e.which == 13) {
                doLogin();
            }
        });
        $("input[type ='submit']").click(function () {
            doLogin();
        });
        function doLogin() {
            var name = $("input[name='name']").val();
            var password = $("input[name='password']").val();
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/login",
                data: {Name: name,Password: password },
                success: function (result) {
                    console.log(result);
                    if (result.state != 0) {
                        $('.alert strong').html(result.message+"!");
                        $('.alert').show();
                        return;
                    }
                    localStorage.clear();
                    localStorage.setItem('UserInfo', (JSON.stringify(result.data)));
                    self.location = "/main-page";
                },
                error: function (data) {
                    $('.alert').html("网络异常请联系管理员!");
                    $('.alert').show();
                    return;
                }
            });
            return false;
        }
    };

    return {
        init: function () {
            handleMain();
        }
    };

}();