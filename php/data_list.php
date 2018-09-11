<?php
/**
 * Created by IntelliJ IDEA.
 * User: angcyo
 * Date: 2018/9/11 0011
 * Time: 11:51
 */

//phpinfo();

function read_all($root, $dir, &$result)
{
    if (!is_dir($dir)) return;

    $handle = opendir($dir);

    if ($handle) {
        while (($fl = readdir($handle)) !== false) {
            $temp = $dir . DIRECTORY_SEPARATOR . $fl;
            //如果不加  $fl!='.' && $fl != '..'  则会造成把$dir的父级目录也读取出来
            if (is_dir($temp) && $fl != '.' && $fl != '..') {
                //$result[] = $temp;
                read_all($root, $temp, $result);
            } else {
                if ($fl != '.' && $fl != '..') {
                    $sub = substr($temp, strlen($root) + 1);
                    if ($sub) {
                        $result[] = $sub;
                    }
                }
            }
        }
    }
}

$files = array();
read_all('data', 'data', $files);
var_dump($files);