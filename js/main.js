var project = 'c';
var platform = 'android';

const platformArray = [
    {
        "title": "Android",
        "value": "android",
        "project": [{"title": "C端", "value": "c"}, {"title": "B端", "value": "b"}, {"title": "工单", "value": "w"}, {"title": "伟图", "value": "wayto"}]
    },
    {
        "title": "Ios",
        "value": "ios",
        "project": [{"title": "C端", "value": "c"}, {"title": "B端", "value": "b"}, {"title": "工单", "value": "w"}]
    },
    {
        "title": "H5",
        "value": "h5",
        "project": [{"title": "小游戏", "value": "g"}, {"title": "商城", "value": "s"}]
    },
    {
        "title": "公共测试平台",
        "value": "common",
        "project": [{"title": "公有", "value": "p"}]
    }
];

$(function () {
    platform = $.cookie('platform') == undefined ? 'android' : $.cookie('platform');
    project = $.cookie('project') == undefined ? 'c' : $.cookie('project');

    let clipboard = new ClipboardJS('#copy_url', {
        text: function () {
            return getCurrentUrl();
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
        showUrl($(this).val());
        $('#data_tip_list').show();

        showDataListTip();
    });
    $('#api_url').mouseover(function () {
        // console.log('鼠标经过:' + $(this).val());
        if ($("this").is(":focus")) {

        } else {
            $('.api_url_close').fadeIn();
        }
    });
    $('#api_url').mouseout(function () {
        // console.log('鼠标离开:' + $(this).val());
        if ($("this").is(":focus")) {

        } else {
            console.log();
            if ($('.api_url_close').is(":hover")) {
            } else {
                $('.api_url_close').fadeOut();
            }
        }
    });
    $('.api_url_close').mouseout(function () {
        if ($("#api_url").is(":focus")) {
        } else {
            $('.api_url_close').fadeOut();
        }
    });

    $('#api_url').focusout(function () {
        //console.log("失去焦点!");
        //关闭提示框
        $('.api_url_close').fadeOut();
        hideDataListTip();
    });
    $('#api_url').focus(function () {
        //console.log("得到焦点!");
        //显示提示框
        showDataListTip();
        $('.api_url_close').fadeIn();
    });
    $('.api_url_close').on('click', function () {
        $('#api_url').val('');
        setTimeout(function () {
            //showDataListTip();
            $('#api_url').focus();
        }, 300);
        return false;
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

    $("body").overlayScrollbars({
        overflowBehavior: {
            x: 'hidden'
        },
        callbacks: {
            onScroll: function (event) {
                $('body').attr('scrollTopR', event.target.scrollTop);
                $('body').attr('scrollLeftR', event.target.scrollLeft);
                //console.log('L:' + event.target.scrollLeft + ' T:' + event.target.scrollTop);
            },
        }
    });
    // $('#data_tip_list').overlayScrollbars({});
    //$('#api_data_wrap').overlayScrollbars({});
    // $('#api_data').overlayScrollbars({});

    // autoTextarea($('#api_data')[0]);

    $('#data_tip_list').scrollbar();

    //平台 项目联通
    $('#platform').on('change', function () {
        platform = $('#platform').val();
        $.cookie('platform', platform);
        console.log(platform);
        console.log(getCurrentUrl());

        $('#api_tip').text(getApiUrl($('#api_url').val()));

        initProject(platform)
    });
    $('#project').on('change', function () {
        onProjectChange();
    });
    initPlatform()
});

function onProjectChange() {
    project = $('#project').val();
    $.cookie('project', project);
    console.log(project);
    console.log(getCurrentUrl());

    $('#api_tip').text(getApiUrl($('#api_url').val()));
}

function initPlatform() {
    $('#platform').children().remove();

    for (i in platformArray) {
        var p = platformArray[i];
        let chid = $('<option></option>');
        chid.attr('value', p["value"]);
        chid.text(p["title"]);
        $('#platform').append(chid);
    }
    //$('#project').val(project);

    $('#platform').val(platform);

    console.log(platform);
    initProject(platform)
}

function initProject(platform) {
    $('#project').children().remove();

    for (i in platformArray) {
        var p = platformArray[i];

        if (platform === p["value"]) {
            //console.log(p["project"]);
            var selectorProject = project;
            var firstProject = project;
            var have = false
            for (j  in p["project"]) {
                firstProject = p["project"][0]['value'];

                var pro = p["project"][j];
                //console.log(pro);
                let child = $('<option></option>');
                child.attr('value', pro["value"]);
                child.text(pro["title"]);
                $('#project').append(child);

                if (pro["value"] === project) {
                    selectorProject = project;
                    have = true
                } else {
                    //selectorProject = p["project"][0]['value'];
                }
            }

            if (have) {
                $('#project').val(selectorProject);
            } else {
                $('#project').val(firstProject);
            }

            onProjectChange();
            break
        }
    }
}

function showUrl(url) {
    $.cookie('api_url', trim(url));
    $('#api_tip').text(getApiUrl(url));
    $('#api_url').val(trim(url));
}

function cookieData(element, format) {
    let $value = $(element).val();

    if (format && trim($value).length) {
        //console.log('check json:' + $value);
        try {
            const result = JSON.stringify(JSON.parse($value), null, 4);
            $(element).val(result);

            //console.log($value + " is json..");
        } catch (e) {
            console.log($value + "不是有效的json格式." + e);
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
        const url = platform + '/' + project + '/' + api_url;
        $.post('php/' + encodeURI(url), {
            data: api_data,
            'act': 'save'
        }, function (data) {
            //alert("Data Loaded: " + data);
            console.log(data);
            alertTip(data);
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

    //console.log(window.document.body.scrollTop);
    //console.log(window.document.documentElement.scrollTop);

    var top = $('body').attr('scrollTopR');
    var left = $('body').attr('scrollLeftR');
    //window.document.body.scrollTop || window.document.documentElement.scrollTop
    // console.log();
    top = (top === undefined) ? 0 : top;
    left = (left === undefined) ? 0 : left;
    //console.log(typeof top);
    $('#alert_div').css({
        'top': parseInt(top),
        'right': -parseInt(left),
    });

    $('#alert_div').append(
        '<div class="alert alert-warning alert-dismissible fade in show" role="alert" id="alert_' + timeId + '"><strong>提示!  </strong>' +
        tip +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></div>'
    );
}

function showProgressBar() {
    let options = {
        id: 'top-progress-bar',
        color: '#f41924',
        height: '4px',
        duration: 0.2
    };
    let progressBar = new ToProgress(options);
    let progress = 1;

    let progressId = setInterval(function () {
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
    if (str === undefined) {
        return "";
    }
    return str.replace(/\ +/g, "");
}

function getCurrentUrl() {
    return getApiUrl($('#api_url').val());
}

function getApiUrl(query) {
    //const q = query.replace('index.html', '');
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('index.html', '');
    // console.log(window.location.pathname);
    // console.log(url);
    const api_path = 'php/' + platform + '/' + project + '/';
    if (query === undefined) {
        return url + api_path;
    } else {
        return url + api_path + trim(query);
    }
}

function getHttpApiUrl(query) {
    const url = window.location.protocol + '//' + window.location.host + window.location.pathname.replace('index.html', '');
    const api_path = 'php/';
    if (query === undefined) {
        return url + api_path;
    } else {
        return url + api_path + trim(query);
    }
}

function showDataListTip() {
// <a href="#" class="list-group-item  ">Cras justo odio</a>
    $url = getHttpApiUrl('data_list.php');
    console.log('请求:' + $url);
    $have = false;
    $.get(getHttpApiUrl('data_list.php'), function (data) {
        console.log(data);

        $('#data_tip_list').children().remove();

        $.each(JSON.parse(data), function (index, item) {
            // console.log(item);
            // console.log(item.indexOf($('#api_url').val()));
            const prefix = platform + '/' + project + '/';
            if (item.indexOf(prefix + $('#api_url').val()) === 0) {
                $have = true;
                $chid = $('<a></a>');
                $chid.attr('href', '#');
                $chid.addClass('list-group-item').addClass('list-group-item-action').addClass('list-group-item-action-r');

                const item_text = item.substring(prefix.length);
                $chid.text(item_text);
                $chid.val('item_data:' + item_text);
                $chid.attr('item_data', item_text);
                $chid.on('click', function () {
                    // console.log($(this).val());
                    //console.log($(this).attr('item_data'));

                    showUrl($(this).attr('item_data'));
                    getDataToShow();
                });
                $chid.mouseover(function () {
                    // console.log('鼠标经过:' + $(this).attr('item_data'));
                    // console.log($(this).children('.item_close'));
                    $(this).children('.item_close').show();
                    showFileSize($(this));
                });
                $chid.mouseout(function () {
                    //console.log('鼠标离开:' + $(this).attr('item_data'));
                    $(this).children('.item_close').hide();
                    hideFileSize($(this));
                });

                $size = $('<span class="item_size"></span>');
                $close = $('<span class="item_close">&times;</span>');
                // $close.addClass('item_close');
                $chid.append($size);
                $chid.append($close);

                $close.on('click', function () {
                    // console.log($(this).val());
                    //console.log($(this).attr('item_data'));
                    //console.log('删除:' + $(this).parent().attr('item_data'));
                    alertTip('权限不足,无法删除!');
                    $('#api_url').val('');
                    return false;
                });

                $('#data_tip_list').append($chid);
                // $('#data_tip_list').append('<a href="#" class="list-group-item list-group-item-action list-group-item-action-r">' + item + '</a>');
                // console.log('add:' + $chid);
            }
        });
        // $('#data_tip_list').height(10);
        // console.log('设置高度');

        // $('#data_tip_list').css('height', 400);
        // $('#data_tip_list').css('max-height', 400);

        // $('#data_tip_list').show();

        // $('#data_tip_list').fadeIn();

        if ($have) {
            if ($('#data_tip_list').parent().hasClass("scroll-wrapper")) {
                $('#data_tip_list').parent().show();
                $('#data_tip_list').parent().animate({'opacity': 1}, 300);
            }
            $('#data_tip_list').animate({'opacity': 1}, 300);
        } else {
            hideDataListTip();
        }

        // $(JSON.parse(data)).each(function (index, item) {
        //     console.log(item);
        // })
    })
}

function hideDataListTip() {
    if ($('#data_tip_list').parent().hasClass("scroll-wrapper")) {
        $('#data_tip_list').parent().animate({'opacity': 0}, 300, function () {
            $('#data_tip_list').parent().hide();
        });
    }
    $('#data_tip_list').animate({'opacity': 0}, 300);
}

function getDataToShow() {
    $.get(getCurrentUrl(), function (data) {
        $('#api_data').val(data);
        cookieData($('#api_data'), true);
    });
}

function showFileSize(item) {
    let item_size = $(item).children('.item_size');
    // console.log($(item_size).css('opacity'));
    // console.log(typeof $(item_size).css('opacity'));
    if ($(item_size).is(':animated')) {
        return;
    }
    // $(item_size).stop();
    let value = $(item).attr('item_data');
    // console.log(value);
    let url = getApiUrl(value);
    // console.log(url);
    // return;
    $.ajax({
        type: "POST",
        url: url,
        /*data: "act=getFileSize",*/
        data: {
            'act': 'getFileSize'
        },
        complete: function (xhr, status) {
            // let length = xhr.getResponseHeader('Content-Length');
            // console.log(length);
            // let $size = formatSize(length);
            //console.log($size);
            // console.log(xhr);
            //console.log('请求状态:' + status);
            // let item_size = $(item).children('.item_size');
            //console.log(item_size.text());
            // item_size.text($size);
            // item_size.animate({'opacity': 1}, 300);
        },
        success: function (data) {
            // let length = xhr.getResponseHeader('Content-Length');
            let $size = formatSize(data);
            item_size.text($size);
            item_size.animate({'opacity': 1}, 300);

            console.log(data);
        }
    });
}

function hideFileSize(item) {
    let item_size = $(item).children('.item_size');
    // $(item_size).stop();
    item_size.animate({'opacity': 0}, 300);
}

function formatSize(fileSize) {
    let arrUnit = ["B", "K", "M", "G", "T", "P"];
    if (fileSize === undefined || null == fileSize || fileSize === '') {
        return 0 + "" + arrUnit[0];
    }
    let powerIndex = Math.log2(fileSize) / 10;
    powerIndex = Math.floor(powerIndex);
    // index should in the unit range!
    let len = arrUnit.length;
    powerIndex = powerIndex < len ? powerIndex : len - 1;
    let sizeFormatted = fileSize / Math.pow(2, powerIndex * 10);
    sizeFormatted = sizeFormatted.toFixed(2);
    return sizeFormatted + "" + arrUnit[powerIndex];
}


/// <summary>
/// 格式化文件大小的JS方法
/// </summary>
/// <param name="filesize">文件的大小,传入的是一个bytes为单位的参数</param>
/// <returns>格式化后的值</returns>
function renderSize(value) {
    if (null == value || value == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2);//保留的小数位数
    return size + unitArr[index];
}