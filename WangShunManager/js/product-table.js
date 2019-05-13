var Table = function () {
    var getData = function (pageIndex, pageSize, productName, categoryId, parValue, state) {
        $.ajax({
            type: "GET",
            dataType: "json",
            url: "/products",
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
                console.log(items);
                total = result.data.total;
                var tableHtml = '';
                for (i = 0; i < length; i++) {
                    tableHtml +=
                        '<tr>' +
                        '<td>' + items[i].id + '</td>' +
                        '<td>' + items[i].productName + '</td>' +
                        '<td>' + ProductCategoryToString(items[i].categoryId) + '</td>' +
                        '<td>' + items[i].parValue + '</td>' +
                        '<td>' + items[i].maxPrice + '</td>' +
                        '<td>' + items[i].minPrice + '</td>' +
                        //'<td>' + items[i].maxDiscount + '</td>' +
                        //'<td>' + items[i].minDiscount + '</td>' +
                        '<td id="product_state_' + items[i].id + '">' + ProductStateToString(items[i].state) + '</td>' +
                        '<td style="text-align:center;">' +
                        '<button id="product_state_btn_' + items[i].id + '" type="button" class="btn btn-warning" onclick="Table.setState(' + items[i].id + ',' + items[i].state + ')">' + ProductStateToString(Math.abs(items[i].state - 1)) + '</button>' +
                        '</td>' +
                        '</tr>';
                }
                $('#product_table').html(tableHtml);
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
    var setState = function (id, state) {
        state = Math.abs(state - 1);
        $.ajax({
            type: "PUT",
            dataType: "json",
            url: "/products/" + id + "/" + state,
            data: {},
            success: function (result) {
                if (result.state != 0) {
                    if (result.message == '请重新登录') { window.location.href = '/login'; }
                    $('.alert-main strong').html(result.message + "!");
                    $('.alert-main').show();
                    return;
                }
                $('#product_state_' + id).html(ProductStateToString(state));
                $("#product_state_btn_" + id).attr("onclick", "Table.setState(" + id + "," + state + ");");
                $("#product_state_btn_" + id).html(ProductStateToString(Math.abs(state - 1)));
            },
            error: function (data) {
                $('.alert-main').html("网络异常请联系管理员!");
                $('.alert-main').show();
                return;
            }
        });
    };
    var search = function () {
        productName = $('#search_product_name').val();
        categoryId = $('#search_categoryId option:selected').val();
        parValue = $('#search_par_value option:selected').val();

        state = $('#search_state option:selected').val();
        //console.log("name:" + searchProductName + ";category:" + searchCategory + ";parValue:" + searchParValue + ";state:" + searchState);
        getData(pageIndex, pageSize, "" + productName + "", categoryId, parValue, state);
    };
    return {
        init: function () {
            handle();
        },
        getData: function () {
            //getData(pageIndex, pageSize, productName, categoryId, parValue, state);
            search();
        },
        setState: function (id, state) {
            setState(id, state);
        },
        search: function () {
            search();
        }
    };
}();

