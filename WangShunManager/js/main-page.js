(function ($) {
    $.getUrlParam
        = function (name) {
            var reg
                = new RegExp("(^|&)" +
                    name + "=([^&]*)(&|$)");
            var r
                = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
})(jQuery);
var Main_Page = function () {
    var handleMain = function () {
        $('.alert-danger-main').hide();
        $('.alert-success-main').hide();
        if (localStorage.UserInfo == undefined)
            window.location.href = '/login';
        var userInfo = JSON.parse(localStorage.UserInfo);
        console.log(userInfo);
        $('#main_user_id').val(userInfo.id);
        $('#main_user_login_id').val(userInfo.loginId);
        $('#mian_user_real_name').val(userInfo.realName);
        $('#main_account_anager').val(userInfo.accountManager);
        $('#main_user_contact_qq').val(userInfo.contactQq);
        $('#main_user_email').val(userInfo.email);
        $('#main_company_name').val(userInfo.companyName);
        $('#main_company_address').val(userInfo.companyAddress);
        var anchorPoint = $.getUrlParam('anchor_point');
        if (anchorPoint != null)
            $("html, body").animate({ scrollTop: $("#" + anchorPoint).offset().top }, 1000);
        var userCount = 0;
        var productCount = 0;
        var memberWithdrawCount = 0;
        var preCardCount = 0;
        var outStockCount = 0;
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: "/users",
            data: { PageIndex: 1, PageSize: 1 },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-main strong').html(result.message + "!");
                    $('.alert-danger-main').show();
                    return;
                }
                total = result.data.total;
                userCount = total;
                $('#user_count').html(total);
            },
            error: function (data) {
                $('.alert-danger-main').html("网络异常请联系管理员!");
                $('.alert-danger-main').show();
                return;
            }
        });
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: "/products",
            data: { PageIndex: 1, PageSize: 1 },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-main strong').html(result.message + "!");
                    $('.alert-danger-main').show();
                    return;
                }
                total = result.data.total;
                productCount = total;
                $('#product_count').html(total);

            },
            error: function (data) {
                $('.alert-danger-main').html("网络异常请联系管理员!");
                $('.alert-danger-main').show();
                return;
            }
        });
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: "/member-withdraw-count",
            data: {},
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                memberWithdrawCount = total;
                $('#member_withdraw_count').html(total);
            },
            error: function (data) {
                $('.alert-danger-main').html("网络异常请联系管理员!");
                $('.alert-danger-main').show();
                return;
            }
        });
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: "/pre-card",
            data: { PageIndex: 1, PageSize: 1 },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                preCardCount = total;
                $('#pre_card_count').html(total);
            },
            error: function (data) {
                $('.alert-danger-main').html("网络异常请联系管理员!");
                $('.alert-danger-main').show();
                return;
            }
        });
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: "/out-stock-count",
            data: {},
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-main strong').html(result.message + "!");
                    $('.alert-danger-main').show();
                    return;
                }
                total = result.data.total;
                outStockCount = total;
                $('#out_stock_count').html(total);
            },
            error: function (data) {
                $('.alert-danger-main').html("网络异常请联系管理员!");
                $('.alert-danger-main').show();
                return;
            }
        });
        var chart = AmCharts.makeChart("chartdiv", {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": [{
                "country": "卡密数",
                "visits": preCardCount,
                "color": "#FF0F00"
            }, {
                "country": "卡密出库总数",
                "visits": outStockCount,
                "color": "#FF6600"
            }, {
                "country": "用户提现总数",
                "visits": memberWithdrawCount,
                "color": "#FF9E01"
            }, {
                "country": "产品数",
                "visits": productCount,
                "color": "#FCD202"
            }, {
                "country": "用户数",
                "visits": userCount,
                "color": "#F8FF01"
            }],
            "valueAxes": [{
                "position": "left",
                "axisAlpha": 0,
                "gridAlpha": 0
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "colorField": "color",
                "fillAlphas": 0.85,
                "lineAlpha": 0.1,
                "type": "column",
                "topRadius": 1,
                "valueField": "visits"
            }],
            "depth3D": 40,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "axisAlpha": 0,
                "gridAlpha": 0

            },
            "export": {
                "enabled": true
            }

        }, 0);
        setTimeout(function () {
            $("a[title='JavaScript charts']").remove();
        }, 700);
    };
    var upPassword = function () {
        $('.alert-danger-main').hide();
        $('.alert-success-main').hide();
        var newPassword = $('#main_new_password').val()
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/users/password/" + newPassword ,
            data: {},
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-main strong').html(result.message + "!");
                    $('.alert-danger-main').show();
                    return;
                }
                $('.alert-danger-main').hide();
                $('.alert-success-main').hide();
                $('alert-success-main strong').html(result.message );
                $('alert-success-main').show();
            },
            error: function (data) {
                $('.alert-danger-main').html("网络异常请联系管理员!");
                $('.alert-danger-main').show();
                return;
            }
        });
    };
    return {
        init: function () {
            handleMain();
        },
        upPassword: function () {
            upPassword();
        }
    };

}();