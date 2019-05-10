function IsDelToString(type) {
    switch (type) {
        case false:
            return "正常";
        case true:
            return "删除";
        default:
            return "？";
    }
};
function InfoStateToString(type) {
    switch (type) {
        case 0:
            return "禁用";
        case 1:
            return "启用";
        default:
            return "？";
    }
};
function ProductStateToString(type) {
    switch (type) {
        case 0:
            return "下架";
        case 1:
            return "上架";
        default:
            return "？";
    }
};
function ProductCategoryToString(type) {
    switch (type) {
        case 0:
            return "移动";
        case 1:
            return "联动";
        case 2:
            return "电信";
        default:
            return "？";
    }
};
function ProductCategoryStringToValue(type) {
    switch (type) {
        case "移动":
            return 0;
        case "联动":
            return 1;
        case "电信":
            return 2;
        default:
            return -1;
    }
};
function CardStateToString(type) {
    switch (type) {
        case 0:
            return "未使用";
        case 1:
            return "已使用";
        case 2:
            return "使用中";
        case 3:
            return "未知";
        case 4:
            return "密码错误";
        case 5:
            return "未激活";
        default:
            return "？";
    }
};
function SettleStateToString(type) {
    switch (type) {
        case 0:
            return "未结算";
        case 1:
            return "已结算";
        default:
            return "？";
    }
};
