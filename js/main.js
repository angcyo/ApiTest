$(function () {
    const clipboard = new ClipboardJS('#copy_url', {
        text: function () {
            return getApiUrl($('#api_url').val());
        }
    });
    clipboard.on('success', function (e) {
        alertTip("复制成功->" + e.text);
    });

    clipboard.on('error', function (e) {
        console.log(e);
        alertTip(e);
    });

    $('#open_url').on('click', function () {
        window.open(getApiUrl($('#api_url').val()));
    });

    $.cookie.defaults = {
        expires: 365
    };

    $('#api_url').on("input propertychange", function () {
        // alertTip($(this).val());
        //console.log($(this).val());
        $.cookie('api_url', trim($(this).val()));

        $('#api_tip').text(getApiUrl($(this).val()));
    });
    $('#api_data').bind('input propertychange', function () {
        //console.log($(this).val());
        cookieData(this)
    });
    $('#api_data').bind('input propertychange', function () {
        //console.log($(this).val());
        cookieData(this)
    });
    $('#api_data').focusout(function () {
        cookieData(this, true)
    });

    $('#api_url').val($.cookie('api_url'));
    $('#api_data').val($.cookie('api_data'));
    $('#api_tip').text(getApiUrl($.cookie('api_url')));

    $("body").overlayScrollbars({});
    //$('#api_data_wrap').overlayScrollbars({});
    // $('#api_data').overlayScrollbars({});

    // autoTextarea($('#api_data')[0]);
});

function cookieData(element, format = false) {
    $value = $(element).val();
    if (format) {
        try {
            const result = JSON.stringify(JSON.parse($value), null, 4);
            $(element).val(result);
        } catch (e) {
            console.log($value + "不是有效的json格式." + e)
            alertTip("不是有效的json格式..");
        }
    }
    $.cookie('api_data', $(element).val());
}

function save() {
    const api_url = $('#api_url').val();
    const api_data = $('#api_data').val();

    if (!api_url) {
        alertTip("接口地址不能为空.");
    } else if (!api_data) {
        alertTip("返回数据不能为空.");
    } else {
        const progressBar = showProgressBar();

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
    const timeId = setTimeout(function () {
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

function trim(str) {
    return str.replace(/\ +/g, "");
}

function getApiUrl(query) {
    //const q = query.replace('index.html', '');
    const url = window.location.href.replace('index.html', '');
    const api_path = 'php/';
    if (query === undefined) {
        return url + api_path;
    } else {
        return url + api_path + trim(query);
    }
}