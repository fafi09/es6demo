/**
 * Created by Administrator on 2019/3/7.
 */
var http = require("http");
//����querystringģ�飨����post�������ݣ�
var querystring = require('querystring');

http.createServer(
    function(req,res) {
        console.log(req.url);
        console.log(req.data);
        console.log(req.method);
        var dataObject = "";
        var data = '';
        //1.ͨ���ж�url·��������ʽ���ж��Ƿ��Ǳ��ύ
        if (req.url === '/test' && req.method === 'POST') {
            /**����˽���post�������������
             * ��1����req����ע���������data�¼����÷�����ִ�ж�Σ���Ҫ�����ֶ��ۼӶ��������ݣ�
             *      * �����������Խ�࣬���͵Ĵ���Խ�࣬����Ƚ��٣�����һ�ξͷ�������
             *      * ���Խ��ձ����ݵ�ʱ����Ҫͨ������ req ����� data �¼���ȡ����
             *      * Ҳ����˵��ÿ���յ�һ�α��ύ���������ݣ�req �� data �¼��ͻᱻ����һ�Σ�ͬʱͨ���ص����������õ��� �� ������
             * ��2����req����ע����ɽ�������end�¼����������ݽ�����ɻ�ִ��һ�θ÷�����
             */
            //�������ַ���������Ƭ��
            data = '';

            //2.ע��data�¼��������ݣ�ÿ���յ�һ�α��ύ�����ݣ��÷�����ִ��һ�Σ�
            req.on('data', function (chunk) {
                // chunk Ĭ����һ�����������ݣ��� data ƴ�ӻ��Զ� toString
                data += chunk;
                console.log('data on---');
            });

            // 3.�����ձ��ύ���������֮�󣬾Ϳ��Խ�һ��������
            //ע��end�¼����������ݽ�����ɻ�ִ��һ�θ÷���
            req.on('end', function () {

                //��1��.��url���н��루url������Ľ��б��룩
                data = decodeURI(data);
                console.log(data);

                /**post�����������ʹ��urlģ���������Ϊ������һ��url������һ����������� */

                //��2��.ʹ��querystring��url���з����л�������url��&��=��ֳɼ�ֵ�ԣ����õ�һ������
                //querystring��nodejs���õ�һ��ר���ڴ���url��ģ�飬APIֻ���ĸ��������nodejs�ٷ��ĵ�
                dataObject = querystring.parse(data);
                var jsonObject = JSON.parse(data);
                console.log(dataObject);
                //�����������
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
                res.setHeader("Access-Control-Allow-Headers", "Content-Type");
                res.setHeader("Access-Control-Max-Age", "1800");
                res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
                console.log('data:'+jsonObject.username + ":" + jsonObject.pass);
                res.end(data);
            });
        }
        if (req.url === '/test' && req.method === 'GET') {
            res.end('ok');
        }
        /**
         * ���Ƕ���һЩ���ܶԷ�����������Ӱ�������
         * �� PUT��DELETE �ʹ���ĳЩ MIME ���͵� POST ������
         * ����������ȷ���һ����Ԥ�����󡱡���Ҳ���Ǹղ�˵�� preflight response��
         * ��ȷ�Ϸ������Ƿ��������������Ļ�������������Ӧ������
         *
         * ���͵�������������������� application/x-www-form-urlencoded��multipart/form-data �� text/plain �����ߵĻ���
         * ��ᴥ�� OPTIONS ���󣬶� jQuery ���͵�������������Ĭ��ֵΪ application/x-www-form-urlencoded��
         * ����� jQuery ����˳�������ԭ��
         */
        if (req.url === '/test' && req.method === 'OPTIONS') {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setHeader("Access-Control-Max-Age", "1800");
            res.writeHead(200, { 'Content-Type': 'application/json;charset=UTF-8' });
            res.end("{'username':'ok','pass':'ok'}");
        }
    }
).listen(8001);