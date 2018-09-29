<?php
namespace app\admin\controller;

use app\common\model\Wechat;
use think\facade\Request;

// 数据管理
class Wxmanage extends Validate
{
    // 数据列表
    public function index()
    {
        if (Request::isAjax()) {
            $get = Request::get();

            $list = Wechat::page($get['page'], $get['limit'])
                ->order('group', 'desc')
                ->select();
            foreach ($list as $key => $value) {
                $list[$key] = $this->status($value);
            }

            return json([
                'code' => 0,
                'msg'  => '',
                'count' => Wechat::count(),
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
        $title = empty($id) ? '添加微信' : '微信编辑';

        // 添加或者编辑数据
        if (Request::isPost()) {
            $post = Request::post();
            $post['aid'] = $this->id;
            $db = new Wechat();

            if (empty($post['id'])) {
                $info = $db->save($post);
                $title = '微信添加';
            } else {
                $info = $db->save($post, ['id' => 1]);
                $title = '微信编辑';
            }

            $result = $info == 0 ? ['code' => -1, 'msg' => $title.'失败'] : ['code' => 0, 'msg' => $title.'成功'];
            return json($result);
        }

        $this->assign([
            'id'    => $id,
            'title' => $title,
            'info'  => empty($id)
                ? ['wechat' => '', 'wxcode' => '', 'group' => 1, 'group_name' => '', 'remarks' => '', 'status' => 0]
                : Wechat::idGet($id)
        ]);
        return $this->fetch();
    }

    // 删除数据
    public function delete()
    {
        $data = Request::post();
        $res = Wechat::destroy($data['id']);

        if($res) {
            $result = [ 'code' => 0 ,  'msg' => '删除成功',];
            return json($result);
        }
        return json($result =['code' => -1,'msg' =>'删除失败']);
    }

    // 状态更换
    private function status($data)
    {
        if ($data['group'] == 1) $data['group_name'] = 'A';
        if ($data['group'] == 2) $data['group_name'] = 'B';
        if ($data['group'] == 3) $data['group_name'] = 'C';
        if ($data['group'] == 4) $data['group_name'] = 'G';
        if ($data['group'] == 5) $data['group_name'] = 'I';
        if ($data['group'] == 6) $data['group_name'] = 'J';
        if ($data['group'] == 7) $data['group_name'] = 'K';
        if ($data['group'] == 8) $data['group_name'] = 'M';
        if ($data['group'] == 9) $data['group_name'] = 'O';
        if ($data['group'] == 10) $data['group_name'] = 'P';
        return $data;
    }
}