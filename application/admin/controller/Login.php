<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/8/24 0024
 * Time: 16:34
 */
namespace app\admin\controller;

use app\common\model\Admin;
use think\Controller;
use think\facade\Request;

class Login extends Controller
{
    public function index()
    {
        // 账号登录
        if (Request::isPost()) {
            $post = Request::post();

            $info = Admin::where(['username' => $post['username']])
                ->field('id, username, password, create_time')
                ->find();

            // 账号不存在
            if (empty($info)) {
                return json(['code' => -1, 'msg' => '账号不存在']);
            }

            // 密码错误
            $password =  md5($post['password'].$info['create_time']);
            if ($info['password'] != $password) {
                return json(['code' => -1, 'msg' => '密码错误']);
            }

            // 都正确,设置cookie
            // json_decode(base64_decode($binfo))
            cookie('authentication', base64_encode($info));

            // 设置ip
            $ip = $_SERVER['REMOTE_ADDR'];
            Admin::where('id', $info['id'])->update(['login_ip' => $ip]);

            return json(['code' => 0, 'msg' => '登录成功']);
        }

        return $this->fetch();
    }

    // 账号退出
    public function logout()
    {
        cookie(null, 'ld_');
        return json(['code' => 0, 'msg' => '清除成功']);
    }
}