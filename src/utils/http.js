// ajax的请求  包含:get 、 post 、 ajax
// Mr.Ma  time:2022/5/5
// 此时传入地址的时候只需要传入接口的地址即可
const BASE__URL = 'http://139.9.177.51:8099';
// 需要将对象拼成字符串
function formatObj(obj) {
    let str = '';
    // 使用for in 进行拿取数据
    for (key in obj) {
        str += '&' + key + '=' + obj[key];
    }
    // 删除第一个&
    str.slice(1);
    return str;
}
const http = {
    // get请求
    get: function (url, data, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', BASE__URL + url + '?' + formatObj(data));
        xhr.send();
        xhr.onreadystatechange = function () {
            // 需要进行地址与参数的拼接
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 此时拿到的是个json格式的字符串
                callback(JSON.parse(xhr.responseText));
            }
        }

    },


    // post请求
    post: function (url, data, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('post', BASE__URL + url);
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function () {
            // 需要进行地址与参数的拼接
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 此时拿到的是个json格式的字符串
                callback(JSON.parse(xhr.responseText));
            }
        }
    },


    // ajax请求
    ajax: function (obj) {
        // 判断 是get 还是post
        if (obj.type == 'get') {
            this.get(obj.url, obj.data, obj.success)
        }
        if (obj.type == 'post') {
            this.post(obj.url, obj.data, obj.success)
        }
    },

    //上传文件
    /**
     * url:地址
     * fdkey:后端要求的传递数据的属性名 字段名
     * fdValue:值 file对象
     * sucess:回调函数
     */
    uploadFile: function (url, fdKey, fdValue, success) {
        const xhr = new XMLHttpRequest();
        //创建form表单
        const fd = new FormData();
        // 给form 表单 添加 input 框 同时写入了数据
        fd.append(fdKey, fdValue);
        xhr.open('POST', BASE__URL + url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const resData = JSON.parse(xhr.responseText)
                success(resData)
            }
        }
        xhr.send(fd);
    }
};

// 将http挂在window对象上
window.http = http;