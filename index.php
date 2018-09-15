<?php
/**
 * 应用入口文件
 * User: Administrator
 * Date: 2018/8/24 0024
 * Time: 13:37
 */

namespace think;

// 加载基础文件
require __DIR__ . '/thinkphp/base.php';

// 缓存常量设置
define('CACHE_TYPE', 'type');
define('CACHE_SLIDER', 'slider');

// 执行应用并响应
Container::get('app')->run()->send();
