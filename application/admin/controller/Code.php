<?php
/**
 * 获取二维码
 * User: Administrator
 * Date: 2018/8/24 0024
 * Time: 14:27
 */

namespace app\admin\controller;
use think\Controller;

class Code extends Controller
{

    // url: /admin/code
    public function index()
    {
    	header('Access-Control-Allow-Origin: *');
        $list = \app\common\model\Data::field('wx_number, wx_code')
            ->cache('data')
            ->all();

        $idx = rand(0, count($list)-1);
        echo $list[$idx];
    }
}