<?php
namespace app\admin\controller;

use app\common\model\Wechat;
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
                ->order('type', 'desc')
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

        $wechat = Wechat::field('id, wechat')->all();
        $this->assign([
            'id'    => $id,
            'title' => $title,
            'wechat' => $wechat,
            'info'  => empty($id)
                ? ['wx_code' => '', 'wx_number' => '', 'type' => '', 'remarks' => '']
                : \app\common\model\Data::idGet($id)
        ]);
        return $this->fetch();
    }

    // 搜索url
    public function searchurl()
    {
        $id = Request::get('id');
        $url = Wechat::where('id='.$id)->field('wxcode, wechat')->find();

        return json($url);
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

    // 获取分类 /admin/code/getclass
    public function getclass()
    {
        $list = \app\common\model\Data::field('type')
            ->distinct(true)
            ->select();

        return json($list);
    }

    // 按分类搜索 /admin/code/searchclass
    public function searchclass()
    {
        $get = Request::get();

        $list = \app\common\model\Data::page($get['page'], $get['limit'])
            ->where('type='.$get['type'])
            ->field('deleted_time', true)
            ->order('create_time', 'desc')
            ->select();

        return json($list);
    }

    // 批量更改
    public function editMore()
    {
        $post = Request::post();
        $idlist = explode(',', $post['id']);
        $data = [];

        foreach ($idlist as $key => $value) {
            $data[$key] = [
                'id' => $value,
                'remarks' => $post['remarks']
            ];
        }

        $db = new \app\common\model\Data;
        $info = $db->saveAll($data);

        $result['code'] = count($info) > 0 ? 0 : -1;
        return json($result);
    }
}