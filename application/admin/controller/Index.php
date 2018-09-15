<?php
namespace app\admin\controller;

use app\common\model\Admin;
use think\facade\Request;

class Index extends Validate
{
	// 首页
    public function index()
    {
        return $this->fetch();
    }

    // 主页
    public function home()
    {
        $this->assign('data', $this->amount());

    	return $this->fetch();
    }

    // 控制台
    public function console()
    {
        $controls = new Controls();

        $this->assign([
            'S' => $controls->S,
        ]);
        return $this->fetch();
    }

    // 实时获取服务器数据
    public function getRealTime()
    {
        $controls = new Controls();

        return json($controls);
    }

    // 密码修改
    public function passwordSave()
    {
        $post = Request::post();
        $admin = Admin::get($this->id);

        // 更改密码
        $admin->password = md5($post['password'].$admin->create_time);
         $info= $admin->save();

        if (empty($info)) {
            return json(['code' => -1, 'msg' => '密码修改失败']);
        }

        return json(['code' => 0, 'msg' => '密码修改成功']);
    }

    // 清除缓存
    public function clearCache()
    {
        $name = Request::get('name');
        return json(cache($name, NULL));
    }
}
