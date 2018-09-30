<?php
namespace app\admin\controller;

use think\facade\Request;
use app\common\model\Wxtemp;
use app\common\model\Wechat;

// 模板
class Template extends Validate
{
	// 微信模板
    public function wxtemp()
    {
        if (Request::isAjax()) {
            $get = Request::get();

            $list = Wxtemp::page($get['page'], $get['limit'])
                ->field('deleted_time, create_time', true)
                ->order('update_time', 'desc')
                ->select();

            return json([
                'code' => 0,
                'msg'  => '',
                'count' => Wxtemp::count(),
                'data' => $list
            ]);
        }
    	return $this->fetch();
    }

    // 微信模板添加/编辑
    public function wxsave()
    {
    	// 获取id
        $id = Request::get('id');
        $title = empty($id) ? '添加模板' : '模板编辑';

        // 添加或者编辑模板
        if (Request::isPost()) {
            $post = Request::post();
            $post['aid'] = $this->id;
            $db = new Wxtemp();

            if (empty($post['id'])) {
                $info = $db->save($post);
                $title = '模板添加';
            } else {
                $info = $db->save($post, ['id' => 1]);
                $title = '模板编辑';
            }

            $result = $info == 0
                ? ['code' => -1, 'msg' => $title.'失败']
                : ['code' => 0, 'msg' => $title.'成功'];
            return json($result);
        }

        $wechat = Wechat::field('id, wechat')->all();
        $this->assign([
            'id'    => $id,
            'title'	=> $title,
            'wechat' => $wechat,
            'info'  => empty($id)
                ? ['name' => '', 'wid' => '']
                : Wxtemp::idGet($id)
        ]);
        return $this->fetch();
    }

     // 删除数据
    public function wxdelete()
    {
        $data = Request::post();
        $res = Wxtemp::destroy($data['id']);

        if($res) {
            $result = [ 'code' => 0 ,  'msg' => '删除成功',];
            return json($result);
        }
        return json($result =['code' => -1,'msg' =>'删除失败']);
    }

    // 页面模板
    public function ymtemp()
    {
    	return $this->fetch();
    }
}
