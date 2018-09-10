<?php
/**
 * Created by IntelliJ IDEA.
 * User: angcyo
 * Date: 2018/09/09 0009
 * Time: 22:39
 */

header("Content-type: text/html; charset=utf-8");
header('Content-language: zh');

$cwd = getcwd();

$folder = $cwd . '/data';
if (!file_exists($folder) || !is_dir($folder)) {
    $res = mkdir($folder, 0777, true) or die($cwd . " create folder failed");
}

$query_string = $_SERVER['QUERY_STRING'];
if (!empty($query_string)) {
    $query = preg_replace('# #', '', $_SERVER['QUERY_STRING']);

    $data = isset($_REQUEST['data']) ? $_REQUEST['data'] : "";
    $act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "";

    $file_name = $folder . '/' . $query;

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
    } else {
        //保存数据
        if (!empty($query) && !empty($data)) {
//            $myfile = fopen('data/' . $query, "w");
//            $result = fwrite($myfile, $data) ? "保存成功" : "保存失败";
//            fclose($myfile);

//            echo $result;
            echo file_put_contents($file_name, $data) ? "保存成功" : "保存失败";
        }
    }
} else {
    echo "empty";
}


