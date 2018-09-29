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

class Data extends Model
{
    use SoftDelete;
    protected $deleteTime = 'deleted_time';

    // 根据id查询数据
    static public function idGet($id)
    {
        return self::where('id', $id)
            ->field('id, wx_code, wx_number, type, remarks')
            ->find();
    }
}