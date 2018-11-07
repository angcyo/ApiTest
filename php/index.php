<?php
/**
 * Created by IntelliJ IDEA.
 * User: angcyo
 * Date: 2018/09/09 0009
 * Time: 22:39
 */

header("Content-type: text/html; charset=utf-8");
header('Content-language: zh');

$data_path = 'data';
//数据保存目录
createFolder($data_path);

$query_args = $_SERVER['QUERY_STRING'];
//'www.baidu.com/html/fonttest.html?token=5f2a39e3d87bb35680fc35cdb56255d1832f1587c9376ba2da65d766540f82e90c5c4d4f8dfb78b7be5fb2e04cf296bd&ver=1536892354318';
//$a = parse_url($query_args);
//$b = array();
//parse_str($query_args, $b);

logToFile('request.log',
    getValue('HTTP_USER_AGENT') . "\n" .
    getValue('REMOTE_ADDR') . ':' . getValue('REMOTE_PORT') . '-' . getValue('HTTP_HOST') . '/' . getValue('REQUEST_URI') . "\n" .
    $query_args
);

if (!empty($query_args)) {
    $query_string = urldecode($query_args);

    //logToFile('api_log.log', '$query_string:' . $query_string);
    //去掉url中的空格字符
    $query_no_space = preg_replace('# #', '', $query_string);
    $index = stripos($query_no_space, '&');
    if ($index) {
        $query = substr($query_no_space, 0, $index);
    } else {
        $query = $query_no_space;
    }

    logToFile('api_log.log', 'query:' . $query_string . "\n" . 'query:' . $query);

//    // a//b////c/  过滤多余的/分隔符
//    $qs = explode('/', $query);
//
//    if (empty($qs)) {
//        echo 'no query..';
//    } else {
//        //拿到url中需要对应的路径名, 和文件名
//        $last = end($qs);
//        $url_name = '';
//        $url_path = '';
//        //最后一个是空格
//        if (empty($last)) {
//            //剔除最后一个元素
//            array_pop($qs);
//        }
////        var_dump($qs);
//
//        // 保证是 a b c 这样的数组, 没有空格元素
//        if (empty($qs)) {
//            echo 'no query';
//        } else {
//            $url_name = array_pop($qs);
//
//            if (!empty($qs)) {
//                $url_path = implode('/', $qs);
//            }
//        }
//    }
//    echo "<br/>1:";
//    var_dump($query);
//    echo "<br/>2:";
//    var_dump($url_name);
//    echo "<br/>3:";
//    var_dump($url_path);
//    echo "<br/>";
//    exit();

//    createFolder($data_path . '/' . $url_path);

    $data = isset($_REQUEST['data']) ? $_REQUEST['data'] : "";
    $act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "";

//    $file_name = $data_path . '/' . $url_path . '/' . $url_name;
    $file_name = $data_path . '/' . urlencode($query);

    if (empty($act)) {
        //调用接口
        if (!empty($query)) {
            if (file_exists($file_name)) {
                echo file_get_contents($file_name);
            } else {
                echo 'no data';
            }
        } else {
            echo 'no query';
        }
    } else if (strcasecmp($act, 'save') == 0) {
        //保存数据
        if (!empty($query) && !empty($data)) {
//            $myfile = fopen('data/' . $query, "w");
//            $result = fwrite($myfile, $data) ? "保存成功" : "保存失败";
//            fclose($myfile);

//            echo $result;
            echo file_put_contents($file_name, $data) ? "保存成功" : "保存失败";
        }
    } else if (strcasecmp($act, 'getFileSize') == 0) {
        if (file_exists($file_name)) {
            echo filesize($file_name);
        } else {
            echo 0;
        }
    } else {
        echo "not support action.";
    }
} else {
    echo "empty";
}

function logToFile($fileName, $log)
{
    //date_default_timezone_set("Asia/Shanghai");

    if (strcasecmp(date_default_timezone_get(), 'PRC') == 0 ||
        strcasecmp(date_default_timezone_get(), 'UTC') == 0) {
        $time = time();
    } else {
        $time = time() - 8 * 60 * 60;
    }
    file_put_contents($fileName, date_default_timezone_get() . ' ' . date("Y-m-d H:i:s", $time) . "\n" . $log . "\n\n", FILE_APPEND);
}

function createFolder($path)
{
    $cwd = getcwd();

    if (!empty($path)) {
        $folder = $path;

        if (is_file($folder)) {
            unlink($folder);
        }

        if (!file_exists($folder) || !is_dir($folder)) {
            $res = mkdir($folder, 0777, true) or die($folder . " create folder failed.");
            chmod($folder, 0777);
        }
    }
}

function getValue($key)
{
    $value = '';
    if (isset($_SERVER[$key])) {
        $value = $_SERVER[$key];
    }
    return $value;
}