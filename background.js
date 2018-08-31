// 这里要把jquery对象传进去使用
function ajax($, type, url, params, contentType, token, fn){
    $.ajax({
        type: type,
        url: url,
        contentType: contentType,
        data: JSON.stringify(params),
        data: params || {},
        beforeSend: function(request) {
            if (token) {
                request.setRequestHeader("token", token);
            }
        },
        success: function(msg) {
            fn && fn(msg);
        },
        error: function(error) {
            fn && fn(error);
        }
    })
}