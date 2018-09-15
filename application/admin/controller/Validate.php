<?php
/**
 * 验证控制器
 * User: Administrator
 * Date: 2018/8/24 0024
 * Time: 14:27
 */

namespace app\admin\controller;

use app\common\model\Admin;
use think\Controller;

class Validate extends Controller
{
    public $id;

    public function __construct()
    {
        parent::__construct();
        // 读取cookie
        $auth = cookie('authentication');
        if (empty($auth)) $this->redirect('login/index');
        $info = json_decode(base64_decode($auth));

        // 判断cookie的账号是否正确
        $ainfo = Admin::where(['id' => $info->id])->find();
        if ($ainfo['username'] == $info->username && $ainfo['password'] == $info->password) {
            // 账号密码正确
            $this->id = $info->id;

        } else {
            // 重定向
            return $this->redirect('login/index');
        }
    }
}