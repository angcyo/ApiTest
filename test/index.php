<?php
/**
 * Created by IntelliJ IDEA.
 * User: angcyo
 * Date: 2018/09/10 0010
 * Time: 23:15
 */
header('Content-language: zh');

echo date_default_timezone_get();
echo '<br>';
echo date("Y-m-d H:i:s", time());
echo $_SERVER['HTTP_REFERER'];
echo '<br>';
echo $_SERVER['HTTP_HOST'];
echo '<br>';
echo $_SERVER['REQUEST_URI'];
phpinfo();