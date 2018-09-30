<?php
/**
 * admin 模型
 * User: Administrator
 * Date: 2018/8/25 0025
 * Time: 17:06
 */

namespace app\common\model;

use think\Model;
use think\model\concern\SoftDelete;

class UrlConfigure extends Model
{
    use SoftDelete;
    protected $deleteTime = 'deleted_time';
}