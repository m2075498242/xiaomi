const common = {
    /**
     * 需要传入两个参数：
     * 1：用来判断状态   0:失败    1:成功  
     * 2：用来显示判断的提示信息
     *  */
    toast: function (status, msg) {
        //复写html 代码
        let div = document.createElement('div');
        div.className = 'toast';
        div.innerHTML = `
            <div class="icon">
            <i class="iconfont ${status == 1 ? 'icon-duigou' : 'icon-gantanhao'}"></i>
            </div>
            <div class="msg">${msg}</div>
            `;
        // 将它渲染到body上
        document.body.appendChild(div);
        // 等待后移除这个元素
        setTimeout(function () {
            div.remove();
        }, 1000);
    },

    // 封装底部
    footer: function (page = 'index') {
        let foot = document.createElement('footer');
        foot.className = 'footer';
        foot.innerHTML = `
        <a href="./index.html" class="${page == 'index' ? 'active' : ''}">
            <i class="iconfont icon-shouye"></i>
            <span>首页</span>
        </a>
        <a href="./sprots_data.html" class="${page == 'sport' ? 'active' : ''}">
            <i class="iconfont icon-heart-rate-full"></i>
            <span>运动</span>
        </a>
        <a href="./my_info.html" class="${page == 'my' ? 'active' : ''}">
            <i class="iconfont icon-wode"></i>
            <span>我的</span>
        </a>
        `;
        document.body.appendChild(foot);
    },
    // 用来a标签地址栏的跨页面传值   需要一个参数
    // getData:
    //     function getData(data) {
    //         data.split(1);
    //         let obj = {};
    //         let data = location.search.substr(1).split('=');
    //         console.log(data[0], data[1]);
    //         obj[data[0]] = data[1];
    //         return obj;
    //     }


}
// 挂载window
window.common = common;