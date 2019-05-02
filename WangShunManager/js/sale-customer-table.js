var Sale_Customer_Table = function () {
    var handleSaleCustomer = function () {
        var userInfo = localStorage.UserInfo;
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/sales-customer",
            data: { PageIndex: 1, PageSize: 30 },
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
                        '<td>' + items[i].productId +'</td>' +
                        '<td>' + items[i].maxPrice +'</td>' +
                        '<td>' + items[i].minPrice +'</td>' +
                        '<td>' + items[i].remark + '</td>' +
                        '<td>' + items[i].isDel + '</td>' +
                        '<td>' + items[i].createTime + '</td>' +
                        '<td>' + items[i].product.id +'</td>' +
                        '<td>' + items[i].product.productName +'</td>' +
                        '<td>' + items[i].product.categoryId + '</td>' +
                        '<td>' + items[i].product.parValue + '</td>' +
                        '<td>' + items[i].product.state +'</td>' +
                        '<td>' +
                            '<button type="button" class="btn btn-info">新增</button>' +
                            '<button type="button" class="btn btn-warning">修改</button>' +
                            '<button type="button" class="btn btn-danger">删除</button>' +
                        '</td>' +
                     '</tr>';
                }
                $('#sale_customer_table').html(tableHtml);
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
            handleSaleCustomer();
        }
    };
}();

