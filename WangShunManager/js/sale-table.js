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
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
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
                        '<td id="sale_max_price_' + items[i].id + '">' + items[i].maxPrice + '</td>' +
                        '<td id="sale_min_price_' + items[i].id + '">' + items[i].minPrice + '</td>' +
                        '<td id="sale_remark_' + items[i].id + '">' + items[i].remark + '</td>' +
                        '<td>' + items[i].product.id + '</td>' +
                        '<td>' + items[i].product.productName + '</td>' +
                        '<td>' + ProductCategoryToString(items[i].product.categoryId) + '</td>' +
                        '<td>' + items[i].product.parValue + '</td>' +
                        '<td>' + InfoStateToString(items[i].product.state) + '</td>' +
                        '<td style="text-align:center">' +
                        '<button id="sale_service_btn_' + items[i].id + '" type="button" class="btn btn-warning"data-toggle="modal" data-target="#myModal" onclick="Table.service('
                        + items[i].id + ',\''
                        + items[i].product.id + '\',\''
                        + items[i].product.productName + '\','
                        + items[i].product.categoryId + ','
                        + items[i].product.parValue + ','
                        + items[i].maxPrice + ',\''
                        + items[i].minPrice + '\',\''
                        + items[i].remark +
                        '\');">修改</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#sale_table').html(tableHtml);
                $('#total').html("第" + pageIndex + "页-共" + total + "条");
                CheckPage();
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
    };
    var service = function (id, productId, productName, productCategoryId, productParValue, maxPrice, minPrice, remark) {
        $('.alert-danger-modal').hide();
        $('.alert-success-modal').hide();
        $('#sale_id').val(id);
        $('#sale_product_id').val(productId);
        $('#sale_product_name').val(productName);
        $('#sale_product_category_id').val(ProductCategoryToString(productCategoryId));
        $('#sale_product_par_value').val(productParValue);
        $('#sale_max_price').val(maxPrice);
        $('#sale_min_price').val(minPrice);
        $('#sale_remark').val(remark);

    };
    var update = function () {
        $('.alert-danger-modal').hide();
        $('.alert-success-modal').hide();
        var saleId = $('#sale_id').val();
        var saleMaxPrice = $('#sale_max_price').val();
        var saleMinPrice = $('#sale_min_price').val();
        var saleRemark = $('#sale_remark').val();

        var productId = $('#sale_product_id').val();
        var productName = $('#sale_product_name').val();
        var productCategoryId = ProductCategoryStringToValue($('#sale_product_category_id').val());
        var parductParValue = $('#sale_product_par_value').val();
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/sales",
            data: { Id: saleId, maxPrice: saleMaxPrice, minPrice: saleMinPrice, Remark: saleRemark },
            success: function (result) {
                console.log(result);
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-danger-modal strong').html(result.message + "!");
                    $('.alert-danger-modal').show();
                    return;
                }
                $('.alert-success-modal strong').html(result.message);
                $('.alert-success-modal').show();
                $('#sale_max_price_' + saleId).html(saleMaxPrice);
                $('#sale_min_price_' + saleId).html(saleMinPrice);
                $('#sale_remark_' + saleId).html(saleRemark);
                $("#sale_service_btn_" + upUserId).attr("onclick", "Table.service("
                    + saleId + ",'"
                    + productId + "','"
                    + productName + "',"
                    + productCategoryId + ","
                    + parductParValue + ","
                    + saleMaxPrice + ",'"
                    + saleMinPrice + "','"
                    + saleRemark +
                    "');");

            },
            error: function (data) {
                $('.alert-danger-modal').html("网络异常请联系管理员!");
                $('.alert-danger-modal').show();
                return;
            }
        });
    };
    var handle = function () {
        getData(pageIndex, pageSize);
    };
    var search = function () {
        productName = $('#search_product_name').val();
        categoryId = $('#search_categoryId option:selected').val();
        parValue = $('#search_par_value').val();
        state = $('#search_state option:selected').val();
        getData(pageIndex, pageSize, "" + productName + "", categoryId, parValue, state);
    };
    return {
        init: function () {
            handle();
        },
        getData: function () {
            search();
            //getData(pageIndex, pageSize, productName, categoryId, parValue, state);
        },
        service: function (id, productId, productName, productCategoryId, productParValue, maxPrice, minPrice, remark) {
            service(id, productId, productName, productCategoryId, productParValue, maxPrice, minPrice, remark);
        },
        update: function () {
            update();
        },
        search: function () {
            search();
        }
    };
}();

