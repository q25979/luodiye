#encoding=utf-8
import urllib,re,linecache

def get_keywords(url):
    "获取指定域名的排名数据"
    html=urllib.urlopen(url).read()
    title = re.findall('<title>(.*?)的百度排名情况_站长工具_百度权重查询_爱站网 - 爱站网</title>',html)
    datas=re.findall('<a rel="nofollow" target="_blank" href="http://www\.baidu\.com/s\?wd=.*?">(.*?)</a>[\s\S]*?<span class="pos">(\d+)</span>[\s\S]*?class="zhishu" href=".*?">(\d+)</a>[\s\S]*?<td align="right">(\d+)</td>[\s\S]*?<td align="right">(\d+)</td>[\s\S]*?<a rel="nofollow" target="_blank" href=".*?">(\d+)</a>',html)
    if datas:
        for x in datas:
            text=','.join(x)+'\t\n'
            op_web_txt.write(text.decode('utf8','ignore').encode('gbk'))
    else:
        print html
def main(domain):
    "主程序"
    url="http://baidurank.aizhan.com/baidu/%s/"%domain
    html=urllib.urlopen(url).read()
    fy=re.findall('<a href="/baidu/.*?/position/">(\d+)</a>',html)
    if fy:
        for x in range(1,int(fy[-1])+1):
            fyurl="http://baidurank.aizhan.com/baidu/%s/%d/position/"%(domain,x)
            print fyurl
            get_keywords(fyurl)
    else:
        fyurl="http://baidurank.aizhan.com/baidu/%s/position/"%(domain)
        get_keywords(fyurl)



if __name__=="__main__":
    url_list =  linecache.getlines('url.txt')
    op_web_txt = open('my_web.csv','a')
    op_web_txt.write("软件出处：shenzhen.seosrx.net,作者:三人行-ashin4015，转载请注明谢谢！".decode('utf-8','ignore').encode('GBK')+'\t\n')
    for x in url_list:
        print x.strip('\n')
        try:
            op_web_txt.write(x.strip('\n')+"排名情况".decode('utf-8','ignore').encode('GBK')+'\t\n')
            op_web_txt.write(main(x.strip('\n')))
        except TypeError:
            print 'its over!'




