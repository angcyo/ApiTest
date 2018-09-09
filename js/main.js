$(function () {
    var clipboard = new ClipboardJS('#copy_url', {
        text: function () {
            return window.location.href + $('#api_url').val();
        }
    });
    clipboard.on('success', function (e) {
        alert("复制成功->" + e.text);
    });

    clipboard.on('error', function (e) {
        console.log(e);
    });

    $.cookie.defaults = {
        expires: 365
    };

    $('#api_url').on("input propertychange", function () {
        //console.log($(this).val());
        $.cookie('api_url', $(this).val());
    });
    $('#api_data').bind('input propertychange', function () {
        //console.log($(this).val());
        $.cookie('api_data', $(this).val());
    });

    $('#api_url').val($.cookie('api_url'));
    $('#api_data').val($.cookie('api_data'));
});

function save() {
    var api_url = $('#api_url').val();
    var api_data = $('#api_data').val();

    if (!api_url) {
        alertTip("接口地址不能为空.");
    } else if (!api_data) {
        alertTip("返回数据不能为空.");
    } else {
        var progressBar = showProgressBar();

        $.post('php/' + encodeURI(api_url), {
            data: api_data,
            'act': 'save'
        }, function (data) {
            //alert("Data Loaded: " + data);
            console.log(data)
            alertTip(data)
            setTimeout(function () {
                progressBar.finish();
            }, 300);
        }, 'text');
    }
}

function alertTip(tip) {
    var timeId = setTimeout(function () {
        $('#alert_' + timeId).alert('close')
    }, 1000);

    $('#alert_div').css('top', window.document.body.scrollTop || window.document.documentElement.scrollTop);

    $('#alert_div').append(
        '<div class="alert alert-warning alert-dismissible fade in show" role="alert" id="alert_' + timeId + '"><strong>提示!  </strong>' +
        tip +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></div>'
    );
}

function showProgressBar() {
    var options = {
        id: 'top-progress-bar',
        color: '#f41924',
        height: '4px',
        duration: 0.2
    };
    var progressBar = new ToProgress(options);
    var progress = 1;

    var progressId = setInterval(function () {
        progressBar.setProgress(progress * 10);
        progress += 2 * progress;
        if (progressBar.getProgress() >= 80) {
            //progressBar.finish();
            clearInterval(progressId);
        }
    }, progress * Math.round(4) * 10);

    return progressBar;
}