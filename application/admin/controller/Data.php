<?php
namespace app\admin\controller;

use think\facade\Request;

// 数据管理
class Data extends Validate
{
    // 数据列表
    public function index()
    {
        if (Request::isAjax()) {
            $get = Request::get();

            $list = \app\common\model\Data::page($get['page'], $get['limit'])
                ->field('deleted_time', true)
                ->order('create_time', 'desc')
                ->select();

            return json([
                'code' => 0,
                'msg'  => '',
                'count' => \app\common\model\Data::count(),
                'data' => $list
            ]);
        }

        return $this->fetch();
    }

    // 添加数据
    public function add()
    {
        // 获取id
        $id = Request::get('id');
        $title = empty($id) ? '添加数据' : '数据编辑';

        // 添加或者编辑数据
        if (Request::isPost()) {
            $post = Request::post();
            $post['aid'] = $this->id;
            $db = new \app\common\model\Data();

            if (empty($post['id'])) {
                $info = $db->save($post);
                $title = '数据添加';
            } else {
                $info = $db->save($post, ['id' => 1]);
                $title = '数据编辑';
            }

            $result = $info == 0 ? ['code' => -1, 'msg' => $title.'失败'] : ['code' => 0, 'msg' => $title.'成功'];
            return json($result);
        }

        $this->assign([
            'id'    => $id,
            'title' => $title,
            'info'  => empty($id)
                ? ['wx_code' => '', 'wx_number' => '']
                : \app\common\model\Data::idGet($id)
        ]);
        return $this->fetch();
    }

    // 删除数据
    public function delete()
    {
        $data = Request::post();
        $res = \app\common\model\Data::destroy($data['id']);

        if($res) {
            $result = [ 'code' => 0 ,  'msg' => '删除成功',];
            return json($result);
        }
        return json($result =['code' => -1,'msg' =>'删除失败']);
    }
}