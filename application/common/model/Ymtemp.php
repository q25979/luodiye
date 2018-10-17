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

class Ymtemp extends Model
{
    use SoftDelete;
    protected $deleteTime = 'deleted_time';

    static public function idGet($id)
    {
        return self::where('id', $id)
            ->field('name, abspath')
            ->find();
    }
}