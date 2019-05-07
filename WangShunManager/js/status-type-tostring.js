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


function MemberTypeToString(type) {
    switch (type) {
        case 0:
            return "删除";
            break;
        case 10:
            return "待审";
            break;
        case 20:
            return "正常";
            break;
        case 30:
            return "锁定";
            break;
        default:
            return "？";
    }
};
function RoleTypeToString(type) {
    switch (type) {
        case 0:
            return "系统管理员";
            break;
        case 1:
            return "系统客服";
            break;
        case 10:
            return "监察管理员";
            break;
        case 11:
            return "监察员";
            break;
        case 20:
            return "公司管理员";
            break;
        case 21:
            return "公司用户";
            break;
        default:
            return "？";
    }
};
function ClassicTypeToString(type) {
    switch (type) {
        case 0:
            return "仓库";
            break;
        case 10:
            return "保温箱";
            break;
        case 20:
            return "冷藏箱";
            break;
        case 30:
            return "冷藏柜";
            break;
        case 40:
            return "阴凉柜";
            break;
        case 50:
            return "冷藏车";
            break;
        default:
            return "？";
    }
};
function DeviceStatusToString(type) {
    switch (type) {
        case 0:
            return "在线";
            break;
        case 10:
            return "离线";
            break;
        default:
            return "？";
    }
};
function InfoStatusToString(type) {
    switch (type) {
        case 0:
            return "正常";
            break;
        case 10:
            return "报警";
            break;
        default:
            return "？";
    }
};
function AlarmInfoStatusToString(type) {
    switch (type) {
        case 0:
            return "未处理";
            break;
        case 10:
            return "已处理";
            break;
        default:
            return "？";
    }
};
function CompanyTypeToString(type) {
    switch (type) {
        case 0:
            return "删除";
            break;
        case 10:
            return "在营";
            break;
        case 20:
            return "注销";
            break;
        default:
            return "？";
    }
};