<?php
namespace app\admin\controller;

use think\facade\Request;
use app\common\model\Wxtemp;
use app\common\model\Wechat;
use app\common\model\Ymtemp;

// 模板
class Template extends Validate
{
	// 微信模板
    public function wxtemp()
    {
        if (Request::isAjax()) {
            $get = Request::get();
            $table = new Wxtemp();

            return $this->temp($get, $table);
        }
    	return $this->fetch();
    }

    // 微信模板添加/编辑
    public function wxsave()
    {
    	// 获取id
        $id = Request::get('id');
        $title = empty($id) ? '添加模板' : '模板编辑';
        $db = new Wxtemp();

        // 添加或者编辑模板
        if (Request::isPost()) {
            $post = Request::post();
            return $this->save($post, $db);
        }

        $wechat = Wechat::field('id, wechat')->all();
        $this->assign([
            'id'    => $id,
            'title'	=> $title,
            'wechat' => $wechat,
            'info'  => empty($id)
                ? ['name' => '', 'wid' => '']
                : $db->idGet($id)
        ]);
        return $this->fetch();
    }

     // 删除数据
    public function wxdelete()
    {
        $data = Request::post();
        $res = Wxtemp::destroy($data['id']);

        if($res) {
            $result = ['code'=> 0 ,  'msg'=>'删除成功',];
            return json($result);
        }
        return json(['code' => -1,'msg' =>'删除失败']);
    }

    // 页面模板
    public function ymtemp()
    {
        if (Request::isAjax()) {
            $get = Request::get();
            $table = new Ymtemp();

            return $this->temp($get, $table);
        }
    	return $this->fetch();
    }

    // 页面模板保存/编辑
    public function ymsave()
    {
        // 获取id
        $id = Request::get('id');
        $title = empty($id) ? '添加模板' : '模板编辑';
        $db = new Ymtemp();

        // 添加或者编辑模板
        if (Request::isPost()) {
            $post = Request::post();
            return $this->save($post, $db);
        }

        $this->assign([
            'id'    => $id,
            'title' => $title,
            'info'  => empty($id)
                ? ['name' => '', 'abspath' => '']
                : $db->idGet($id)
        ]);
        return $this->fetch();
    }

    // 模板添加/编辑
    private function save($post, $table)
    {
        if (empty($post['id'])) {
            $info = $table->save($post);
            $title = '模板添加';
        } else {
            $info = $table->save($post, ['id' => $post['id']]);
            $title = '模板编辑';
        }

        $result = $info == 0
            ? ['code' => -1, 'msg' => $title.'失败']
            : ['code' => 0, 'msg' => $title.'成功'];
        return json($result);
    }

    // 模板数据列表
    private function temp($get, $table)
    {
        $list = $table->page($get['page'], $get['limit'])
            ->field('deleted_time, create_time', true)
            ->order('update_time', 'desc')
            ->select();

        return json([
            'code' => 0,
            'msg'  => '',
            'count' => Ymtemp::count(),
            'data' => $list
        ]);
    }
}
