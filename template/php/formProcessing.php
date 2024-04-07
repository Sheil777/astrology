<?
$today = date("Y-m-d H:i:s");
$path = '../../emails.txt';
$email = trim($_POST['email']);
$str = $today.' - '.$email.PHP_EOL;

if(file_exists($path)){
    echo "true";
    file_put_contents($path, $str, FILE_APPEND);
}else{
    echo "false";
    file_put_contents($path, $str);
}