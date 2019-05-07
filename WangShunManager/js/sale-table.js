var Table = function () {
    var getData = function (pageIndex, pageSize, productName, categoryId, parValue, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/sales",
            data: { PageIndex: pageIndex, PageSize: pageSize, ProductName: productName, CategoryId: categoryId, ParValue: parValue, State: state },
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert strong').html(result.message + "!");
                    $('.alert').show();
                    return;
                }
                var length = result.data.rows.length;
                var items = result.data.rows;
                total = result.data.total;
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                        '<tr>' +
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].productId + '</td>' +
                        '<td>' + items[i].maxPrice + '</td>' +
                        '<td>' + items[i].minPrice + '</td>' +
                        '<td>' + items[i].remark + '</td>' +
                        '<td>' + items[i].product.id + '</td>' +
                        '<td>' + items[i].product.productName + '</td>' +
                        '<td>' + ProductCategoryToString(items[i].product.categoryId) + '</td>' +
                        '<td>' + items[i].product.parValue + '</td>' +
                        '<td>' + InfoStateToString(items[i].product.state) + '</td>' +
                        '<td style="text-align:center">' +
                        '<button type="button" class="btn btn-warning">修改</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#sale_table').html(tableHtml);
                $('#total').html("第" + pageIndex + "页-共" + total + "条");
                CheckPage();
            },
            error: function (data) {
                $('.alert').html("网络异常请联系管理员!");
                $('.alert').show();
                return;
            }
        });
    };
    var handle = function () {
        getData(pageIndex, pageSize);
    };
    var search = function () {
        var searchProductName = $('#search_product_name').val();
        var searchCategory = $('#search_categoryId option:selected').val();
        var searchParValue = $('#search_par_value').val();
        var searchState = $('#search_state option:selected').val();
        getData(pageIndex, pageSize, "" + searchProductName + "", searchCategory, searchParValue, searchState);
    };
    return {
        init: function () {
            handle();
        },
        getData: function () {
            search();
            //getData(pageIndex, pageSize, productName, categoryId, parValue, state);
        },
        search: function () {
            search();
        }
    };
}();

