<?php
/**
 * 获取服务器信息
 * User: Administrator
 * Date: 2018/8/29 0029
 * Time: 18:03
 */

namespace app\admin\controller;

error_reporting(0);//抑制所有错误信息
@header("content-Type: text/html; charset=utf-8");//语言强制
ob_start();
date_default_timezone_set('Asia/Shanghai');//此句用于消除时间差

class Controls
{
    // 服务器参数
    public $S = array(
        'YourIP' => '',   // 你的IP
        'DomainIP' => '', // 服务器域名和IP及进程用户名
        'Flag' => '',     // 服务器标识
        'OS' => '',       // 操作语言
        'Language' => '', // 服务器语言
        'Name' => '',     // 服务器主机名
        'WebEngine' => '',    // 服务器web服务引擎
        'WebPort' => '',      // web服务器端口
        'WebPath' => '',      // web服务器路径
        'sTime' => '',        // 服务器时间
    );

    public $sysInfo;    // 系统信息
    public $CPU_Use;
    public $hd = array(
        't' => '',    // 硬盘总量
        'f' => '',    // 可用
        'u' => '',    // 已用
        'PCT' => ''   // 使用率
    );
    public $NetWork = array(
        'NetWorkName' => '',  // 网卡名称
        'NetOut' => '',       // 出网总量
        'NetInput' => '',     // 入网总量
        'OutSpeed' => '',     // 出网速度
        'InputSpeed' => '',   // 入网速度
    );

    public function __construct()
    {
        $this->S['YourIP'] = @$_SERVER['REMOTE_ADDR'];
        $domain = $this->OS() ? $_SERVER['SERVER_ADDR'] : @gethostbyname($_SERVER['SERVER_NAME']);
        $this->S['DomainIP'] = @get_current_user().'-'.$_SERVER['SERVER_NAME'].'('.$domain.')';
        $this->S['Flag'] = empty($this->sysInfo['win_n']) ? @php_uname() : $this->sysInfo['Win_n'];
        $os = explode(" ", php_uname());
        $oskernel = $this->OS() ? $os[2] : $os[1];
        $this->S['OS'] = $os[0].'内核版本'.$oskernel;
        $this->S['Language'] = getenv("HTTP_ACCEPT_LANGUAGE");
        $this->S['Name'] = $this->OS()?$os[1]:$os[2];
        $this->S['Email'] = $_SERVER['SERVER_ADMIN'];
        $this->S['WebEngine'] = $_SERVER['SERVER_SOFTWARE'];
        $this->S['WebPort'] = $_SERVER['SERVER_PORT'];
        $this->S['WebPath'] = $_SERVER['DOCUMENT_ROOT']?str_replace('\\','/',$_SERVER['DOCUMENT_ROOT']):str_replace('\\','/',dirname(__FILE__));
        $this->S['ProbePath'] = str_replace('\\','/',__FILE__)?str_replace('\\','/',__FILE__):$_SERVER['SCRIPT_FILENAME'];
        $this->S['sTime'] = date('Y-m-d H:i:s');

        $this->sysInfo = $this->GetsysInfo();

        $CPU1 = $this->GetCPUUse();
        sleep(1);
        $CPU2 = $this->GetCPUUse();
        $data = $this->GetCPUPercent($CPU1, $CPU2);
        $this->CPU_Use =$data['cpu0']['user']."%us,  ".$data['cpu0']['sys']."%sy,  ".$data['cpu0']['nice']."%ni, ".$data['cpu0']['idle']."%id,  ".$data['cpu0']['iowait']."%wa,  ".$data['cpu0']['irq']."%irq,  ".$data['cpu0']['softirq']."%softirq";
        if(!$this->OS()) $this->CPU_Use ='目前只支持Linux系统';

        $this->hd =$this->GetDisk();
        $this->NetWork =$this->GetNetWork();
    }

    public function OS() {
        return DIRECTORY_SEPARATOR == '/' ? true : false;
    }

    public function GetsysInfo()
    {
        switch (PHP_OS) {
            case 'Linux':
                $sysInfo = $this->sys_linux();
                break;
            case 'FreeBSD':
                $sysInfo = $this->sys_freebsd();
                break;
        }
        return $sysInfo;
    }

    // linux
    public function sys_linux()
    {
        $str = @file("/proc/cpuinfo"); // 获取CPU信息
        if(!$str) return false;

        $str = implode("",$str);
        @preg_match_all("/model\s+name\s{0,}\:+\s{0,}([\w\s\)\(\@.-]+)([\r\n]+)/s",$str, $model);//CPU 名称
        @preg_match_all("/cpu\s+MHz\s{0,}\:+\s{0,}([\d\.]+)[\r\n]+/",$str, $mhz);//CPU频率
        @preg_match_all("/cache\s+size\s{0,}\:+\s{0,}([\d\.]+\s{0,}[A-Z]+[\r\n]+)/",$str, $cache);//CPU缓存
        @preg_match_all("/bogomips\s{0,}\:+\s{0,}([\d\.]+)[\r\n]+/",$str, $bogomips);//

        if(is_array($model[1])){
            $cpunum= count($model[1]);
            $x1= $cpunum>1?' ×'.$cpunum:'';
            $mhz[1][0] =' | 频率:'.$mhz[1][0];
            $cache[1][0] =' | 二级缓存:'.$cache[1][0];
            $bogomips[1][0] =' | Bogomips:'.$bogomips[1][0];
            $res['cpu']['num'] = $cpunum;
            $res['cpu']['model'][] = $model[1][0].$mhz[1][0].$cache[1][0].$bogomips[1][0].$x1;
            if(is_array($res['cpu']['model']))$res['cpu']['model'] = implode("<br />", $res['cpu']['model']);
            if(is_array($res['cpu']['mhz']))$res['cpu']['mhz'] = implode("<br />", $res['cpu']['mhz']);
            if(is_array($res['cpu']['cache']))$res['cpu']['cache'] = implode("<br />", $res['cpu']['cache']);
            if(is_array($res['cpu']['bogomips']))$res['cpu']['bogomips'] = implode("<br />", $res['cpu']['bogomips']);
        }

        //服务器运行时间
        $str= @file("/proc/uptime");
        if(!$str)return false;
        $str= explode(" ", implode("",$str));
        $str= trim($str[0]);
        $min= $str/60;
        $hours= $min/60;
        $days= floor($hours/24);
        $hours= floor($hours-($days*24));
        $min= floor($min-($days*60*24)-($hours*60));
        $res['uptime'] =$days."天".$hours."小时".$min."分钟";
        //内存
        $str= @file("/proc/meminfo");
        if(!$str)return false;
        $str= implode("",$str);
        preg_match_all("/MemTotal\s{0,}\:+\s{0,}([\d\.]+).+?MemFree\s{0,}\:+\s{0,}([\d\.]+).+?Cached\s{0,}\:+\s{0,}([\d\.]+).+?SwapTotal\s{0,}\:+\s{0,}([\d\.]+).+?SwapFree\s{0,}\:+\s{0,}([\d\.]+)/s",$str, $buf);
        preg_match_all("/Buffers\s{0,}\:+\s{0,}([\d\.]+)/s",$str, $buffers);
        $resmem['memTotal'] =round($buf[1][0]/1024, 2);
        $resmem['memFree'] =round($buf[2][0]/1024, 2);
        $resmem['memBuffers'] =round($buffers[1][0]/1024, 2);
        $resmem['memCached'] =round($buf[3][0]/1024, 2);
        $resmem['memUsed'] =$resmem['memTotal']-$resmem['memFree'];
        $resmem['memPercent'] = (floatval($resmem['memTotal'])!=0)?round($resmem['memUsed']/$resmem['memTotal']*100,2):0;
        $resmem['memRealUsed'] =$resmem['memTotal'] -$resmem['memFree'] -$resmem['memCached'] -$resmem['memBuffers'];//真实内存使用
        $resmem['memRealFree'] =$resmem['memTotal'] -$resmem['memRealUsed'];//真实空闲
        $resmem['memRealPercent'] = (floatval($resmem['memTotal'])!=0)?round($resmem['memRealUsed']/$resmem['memTotal']*100,2):0;//真实内存使用率
        $resmem['memCachedPercent'] = (floatval($resmem['memCached'])!=0)?round($resmem['memCached']/$resmem['memTotal']*100,2):0;//Cached内存使用率
        $resmem['swapTotal'] =round($buf[4][0]/1024, 2);
        $resmem['swapFree'] =round($buf[5][0]/1024, 2);
        $resmem['swapUsed'] =round($resmem['swapTotal']-$resmem['swapFree'], 2);
        $resmem['swapPercent'] = (floatval($resmem['swapTotal'])!=0)?round($resmem['swapUsed']/$resmem['swapTotal']*100,2):0;
        $resmem= $this->formatmem($resmem);//格式化内存显示单位
        $res= array_merge($res,$resmem);
        // LOAD AVG 系统负载
        $str= @file("/proc/loadavg");
        if(!$str)return false;
        $str= explode(" ", implode("",$str));
        $str= array_chunk($str, 4);
        $res['loadAvg'] = implode(" ", $str[0]);
        return $res;
    }

    // freeBSD
    public function sys_freebsd()
    {
        $res['cpu']['num']   = do_command('sysctl','hw.ncpu');//CPU
        $res['cpu']['model'] = do_command('sysctl','hw.model');
        $res['loadAvg']      = do_command('sysctl','vm.loadavg');//Load AVG  系统负载
        //uptime
        $buf= do_command('sysctl','kern.boottime');
        $buf= explode(' ',$buf);
        $sys_ticks= time()-intval($buf[3]);
        $min= $sys_ticks/60;
        $hours= $min/60;
        $days= floor($hours/24);
        $hours= floor($hours-($days*24));
        $min= floor($min-($days*60*24)-($hours*60));
        $res['uptime'] =$days.'天'.$hours.'小时'.$min.'分钟';
        //内存
        $buf= do_command('sysctl','hw.physmem');
        $resmem['memTotal'] =round($buf/1024/1024, 2);
        $str= do_command('sysctl','vm.vmtotal');
        preg_match_all("/\nVirtual Memory[\:\s]*\(Total[\:\s]*([\d]+)K[\,\s]*Active[\:\s]*([\d]+)K\)\n/i",$str, $buff, PREG_SET_ORDER);
        preg_match_all("/\nReal Memory[\:\s]*\(Total[\:\s]*([\d]+)K[\,\s]*Active[\:\s]*([\d]+)K\)\n/i",$str, $buf, PREG_SET_ORDER);
        $resmem['memRealUsed'] =round($buf[0][2]/1024, 2);
        $resmem['memCached'] =round($buff[0][2]/1024, 2);
        $resmem['memUsed'] =round($buf[0][1]/1024, 2)+$resmem['memCached'];
        $resmem['memFree'] =$resmem['memTotal']-$resmem['memUsed'];
        $resmem['memPercent'] = (floatval($resmem['memTotal'])!=0)?round($resmem['memUsed']/$resmem['memTotal']*100,2):0;
        $resmem['memRealPercent'] = (floatval($resmem['memTotal'])!=0)?round($resmem['memRealUsed']/$resmem['memTotal']*100,2):0;
        $resmem= $this->formatmem($resmem);
        $res= array_merge($res,$resmem);
        return $res;
    }

    // GetCPUUse
    public function GetCPUUse()
    {
        $data= @file('/proc/stat');
        $cores= array();
        foreach($data as $line) {
            if(preg_match('/^cpu[0-9]/',$line)){
                $info= explode(' ',$line);
                $cores[]=array('user'=>$info[1],'nice'=>$info[2],'sys'=> $info[3],'idle'=>$info[4],'iowait'=>$info[5],'irq'=> $info[6],'softirq'=> $info[7]);
            }
        }
        return$cores;
    }

    public function GetCPUPercent($CPU1, $CPU2)
    {
        $num= count($CPU1);
        if($num!==count($CPU2))return;
        $cups= array();
        for($i=0;$i < $num;$i++) {
            $dif= array();
            $dif['user']    =$CPU2[$i]['user'] -$CPU1[$i]['user'];
            $dif['nice']    =$CPU2[$i]['nice'] -$CPU1[$i]['nice'];
            $dif['sys']     =$CPU2[$i]['sys'] -$CPU1[$i]['sys'];
            $dif['idle']    =$CPU2[$i]['idle'] -$CPU1[$i]['idle'];
            $dif['iowait']  =$CPU2[$i]['iowait'] -$CPU1[$i]['iowait'];
            $dif['irq']     =$CPU2[$i]['irq'] -$CPU1[$i]['irq'];
            $dif['softirq'] =$CPU2[$i]['softirq'] -$CPU1[$i]['softirq'];
            $total= array_sum($dif);
            $cpu= array();
            foreach($dif as $x=>$y)
                $cpu[$x] =round($y/$total*100, 2);
            $cpus['cpu'.$i] = $cpu;
        }
        return$cpus;
    }

    // 获取磁盘信息
    public function GetDisk()
    {
        $d['t'] =round(@disk_total_space(".")/(1024*1024*1024),3);
        $d['f'] =round(@disk_free_space(".")/(1024*1024*1024),3);
        $d['u'] =$d['t']-$d['f'];
        $d['PCT'] = (floatval($d['t'])!=0)?round($d['u']/$d['t']*100,2):0;
        return $d;
    }

    // 格式化内存显示单位
    private function formatmem($mem)
    {
        if(!is_array($mem))return $mem;
        $tmp= array(
            'memTotal','memUsed', 'memFree', 'memPercent',
            'memCached','memRealPercent',
            'swapTotal','swapUsed', 'swapFree', 'swapPercent'
        );
        foreach($mem as $k=>$v) {
            if(!strpos($k,'Percent')){
                $v= $v<1024?$v.' M':$v.' G';
            }
            $mem[$k] =$v;
        }
        foreach($tmp as $v) {
            $mem[$v] =$mem[$v]?$mem[$v]:0;
        }
        return $mem;
    }

    // 网卡流量
    public function GetNetWork()
    {
        $strs= @file("/proc/net/dev");
        $lines= count($strs);
        for($i=2;$i < $lines;$i++) {
            preg_match_all("/([^\s]+):[\s]{0,}(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/",$strs[$i],$info );
            $res['OutSpeed'][$i] = $info[10][0];
            $res['InputSpeed'][$i] = $info[2][0];
            $res['NetOut'][$i] = $this->formatsize($info[10][0]);
            $res['NetInput'][$i] = $this->formatsize($info[2][0]);
            $res['NetWorkName'][$i] = $info[1][0];
        }
        return $res;
    }

    // 单位转换
    public function formatsize($size)
    {
        $danwei=array(' B ',' K ',' M ',' G ',' T ');
        $allsize=array();
        $i=0;
        for($i= 0; $i <5; $i++) {
            if(floor($size/pow(1024,$i))==0){break;}
        }
        for($l= $i-1;$l >=0; $l--) {
            $allsize1[$l]=floor($size/pow(1024,$l));
            $allsize[$l]=$allsize1[$l]-$allsize1[$l+1]*1024;
        }
        $len=count($allsize);
        $fsize = '';
        for($j= $len-1;$j >=0; $j--) {
            $fsize .= $allsize[$j].$danwei[$j];
        }
        return $fsize;
    }
}