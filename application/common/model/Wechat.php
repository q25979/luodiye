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

class Wechat extends Model
{
    use SoftDelete;
    protected $deleteTime = 'deleted_time';

    // 根据id查询数据
    static public function idGet($id)
    {
        return self::where('id', $id)
            ->field('create_time, update_time, deleted_time', true)
            ->find();
    }
}