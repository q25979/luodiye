<?php
$urls = array(
    'http://www.1se01.com',
    'http://1se01.com/category?id=9&type=%E6%97%A5%E9%9F%A9',
    'http://1se01.com/play?playid=31',
    'http://1se01.com/category?id=10&type=%E6%AC%A7%E7%BE%8E',
    'http://1se01.com/category?id=11&type=%E5%9B%BD%E4%BA%A7',
    'http://1se01.com/category?id=12&type=%E5%81%B7%E6%8B%8D',
    'http://1se01.com/category?id=13&type=%E5%8A%A8%E6%BC%AB',
    'http://1se01.com/category?id=14&type=%E4%B8%89%E7%BA%A7',
    'http://1se01.com/play?playid=88',
    'http://1se01.com/play?playid=89'
);
$api = 'http://data.zz.baidu.com/urls?site=www.1se01.com&token=U7Xg1hF9T7JGgy7e';
$ch = curl_init();
$options =  array(
    CURLOPT_URL => $api,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => implode("\n", $urls),
    CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
);
curl_setopt_array($ch, $options);
$result = curl_exec($ch);
echo $result;