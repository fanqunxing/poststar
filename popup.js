$(function(){
// 获取background.js
var winBackgroundPage = chrome.extension.getBackgroundPage();  

init();

function init() {
    var url = window.localStorage.getItem('post.url');
    var type = window.localStorage.getItem('post.type');
    var params = window.localStorage.getItem('post.params');
    var result = window.localStorage.getItem('post.result');
    var contentType = window.localStorage.getItem('post.contentType');
    var token = window.localStorage.getItem('post.token');
    url && $("#url").val(url);
    type && $("#type").val(type);
    params && $("#params").val(params);
    contentType && $("#contentType").val(contentType);
    token && $("#token").val(token);
    result && renderJSON(result);
    bindEvt();
}

function bindEvt() {
    $("#url").on('blur', function() {
        var url = $("#url").val();
        window.localStorage.setItem('post.url', url);
    });
    $("#type").on('change', function(){
        var type = $("#type").val();
        window.localStorage.setItem('post.type', type);
    });
    $("#params").on("blur", function(){
        var params = $("#params").val().replace(/\s/g,"").replace(/\'/g, "\"");
        window.localStorage.setItem('post.params', params);
    });
    $("#contentType").on('change', function(){
        var contentType = $("#contentType").val();
        window.localStorage.setItem('post.contentType', contentType);
    });
    $("#token").on('blur', function(){
        var token = $("#token").val();
        window.localStorage.setItem('post.token', token);
    })
    $("#sbmBtn").click(sendAjax);
    $("#copBtn").click(copyResult);
}

function renderJSON(json) {
    var rep = '';
    try{
        rep = JSON.parse(json);
    }catch(e){
        rep = json;
        try {
            json = JSON.stringify(json);
        } catch (e) {

        }
    }
    $("#resultHide").val(json);
    $('#result').jsonViewer(rep, {
        collapsed: false,
        withQuotes: true
    });
};


function sendAjax() {
    var url = $("#url").val();
    var type = $("#type").val();
    var contentType = $("#contentType").val();
    var params = $("#params").val().replace(/\s/g,"").replace(/\'/g, "\"");
    var token = $("#token").val();

    window.localStorage.setItem('post.url', url);
    window.localStorage.setItem('post.type', type);
    window.localStorage.setItem('post.params', params);
    window.localStorage.setItem('post.contentType', contentType);
    window.localStorage.setItem('post.token', token);

    try {
        if (!!params) {
            params = JSON.parse(params);
        }
    } catch(e) {
        params = 'JSON入参错误!';
        renderJSON(params);
        window.localStorage.setItem('post.result', params);
        return;
    }
    winBackgroundPage.ajax($, type, url, params, contentType, token, function(msg){
        window.localStorage.setItem('post.result', JSON.stringify(msg));
        renderJSON(msg);
    });
}


function copyResult(){
    resultHide.select();
    if(document.execCommand('copy')) {
        alert("复制成功");
    }
}


});