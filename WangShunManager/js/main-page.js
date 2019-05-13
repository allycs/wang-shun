var Main_Page = function () {
    var handleMain = function () {
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
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                userCount = total;
                $('#user_count').html(total);
            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
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
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                total = result.data.total;
                productCount = total;
                $('#product_count').html(total);

            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
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
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
                return;
            }
        });
        $.ajax({
            type: "GET",
            dataType: "json",
            async: false,
            url: "/pre-card",
            data: { PageIndex: 1, PageSize: 1},
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
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
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
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }
                total = result.data.total;
                outStockCount = total;
                $('#out_stock_count').html(total);
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
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

    return {
        init: function () {
            handleMain();
        }
    };

}();