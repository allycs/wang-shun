var Product_Table = function () {
    var handleUser = function () {
        var userInfo = localStorage.UserInfo;
        console.log(userInfo);
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/products",
            data: { PageIndex: 1, PageSize: 50 },
            success: function (result) {
                console.log(result);
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                var length = result.data.rows.length;
                var items = result.data.rows;
                console.log(items);
                total = result.data.total;
                //TestPage();
                console.log(items[0]);
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                    '<tr>' +
                        '<td>'+items[i].id+'</td>' +
                        '<td>' + items[i].productName +'</td>' +
                        '<td>' + items[i].categoryId +'</td>' +
                        '<td>' + items[i].parValue +'</td>' +
                        '<td>' + items[i].state +'</td>' +
                        '<td>' + items[i].maxPrice +'</td>' +
                        '<td>' + items[i].minPrice +'</td>' +
                        '<td>' + items[i].maxDiscount +'</td>' +
                        '<td>' + items[i].minDiscount +'</td>' +
                        '<td>' +
                        '<button type="button" class="btn btn-warning">上下架</button>' +
                        '</td>' +
                     '</tr>';
                }
                $('#product_table').html(tableHtml);
            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
                return;
            }
        });
    };

    return {
        init: function () {
            handleUser();
        }
    };
}();

