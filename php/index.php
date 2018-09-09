<?php
/**
 * Created by IntelliJ IDEA.
 * User: angcyo
 * Date: 2018/09/09 0009
 * Time: 22:39
 */

header("Content-type: text/html; charset=utf-8");
header('Content-language: zh');

$query_string = $_SERVER['QUERY_STRING'];
if (!empty($query_string)) {
    $query = preg_replace('# #', '', $_SERVER['QUERY_STRING']);

    $data = isset($_REQUEST['data']) ? $_REQUEST['data'] : "";
    $act = isset($_REQUEST['act']) ? $_REQUEST['act'] : "";

    if (empty($act)) {
        //调用接口
        if (!empty($query)) {
            echo file_get_contents('data/' . $query);
        }
    } else {
        //保存数据
        if (!empty($query) && !empty($data)) {
//            $myfile = fopen('data/' . $query, "w");
//            $result = fwrite($myfile, $data) ? "保存成功" : "保存失败";
//            fclose($myfile);

//            echo $result;
            echo file_put_contents('data/' . $query, $data) ? "保存成功" : "保存失败";
        }
    }
} else {
    echo "empty";
}


