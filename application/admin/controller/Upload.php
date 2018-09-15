<?php
/**
 * 描述：公共上传类
 * 作者：671
 * 时间：2018年8月28日21:16:20
 */

namespace app\admin\controller;

class Upload
{
    // 文件上传
    public function index()
    {
        // 接收数据进行上传分类
        $type = \think\facade\Request::post('type');
        $path = './uploads/'.$type;

        $file = request()->file('file');
        $info = $file->move($path);

        if ($info) {
            return json([
                'code' => 0,
                'msg' => '上传成功',
                'path' => '/uploads/'.$type.'/'.$info->getSaveName()
            ]);
        }

        return json([
            'code' => -1,
            'msg' => '上传失败',
            'data' => $file->getError()
        ]);
    }
}
