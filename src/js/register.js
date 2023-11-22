require('../css/register.less');
/**
 * 输入手机号的时候需要验证   11位手机号
 * 触摸离开的时候验证input的值是否符和手机号的正则判断
 * 如果符合手机号继续输入，如果不符合显示弹窗提示   请输入正确的11位手机号
 * 
 * 密码触摸离开的时候判断密码   6-12位密码
 * 如果符合密码继续输入，如果不符合显示弹窗提示   请输入6-12位密码
 * 
 * 再次输入密码的判断，如果两次密码不一致，弹出按提示两次密码不一致
 * 
 * 点击注册按钮的时候再次判断手机号跟密码的值是否符合条件，如果符合条件，则调用接口
 *  */
window.onload = function () {
    /**
     * 验证码引入
     */
    // 用来接收验证码
     let n = '';
     let captcha1 = new CaptchaMini({
        lineWidth: 1,   //线条宽度
        lineNum: 2,       //线条数量
        // dotR: 2,          //点的半径
        // dotNum: 25,       //点的数量
        // preGroundColor: [10, 80],    //前景色区间
        // backGroundColor: [150, 250], //背景色区间
        // fontSize: 30,           //字体大小
        // fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'],  //字体类型
        // fontStyle: 'stroke',      //字体绘制方法，有fill和stroke
        // content: '一个验证码abcdefghijklmnopqrstuvw生成的插件使用的是canvas显示',  //验证码内容
        // length: 6    //验证码长度
    });
    let captchaDom = document.querySelector('#captcha')
    captcha1.draw(captchaDom,function(res){
        n = res;
    });




    let tel = document.querySelector('.tel input');
    let pwd = document.querySelector('.item .pwd');
    let pwd2 = document.querySelector('.item .pwd2');
    let code = document.querySelector('.outcode .code');
    let btn = document.querySelector('.register .btn');
    // 封装正则
    // function regExp(dom,exp,){

    // }
    tel.addEventListener('keydown', function () {
        document.querySelector('.tel .triangle').style.display = "none";
    });

    // 点击按钮调用接口
    btn.addEventListener('click', function () {
        // 用户输入验证  非空判断  使用return中断  只要有一个不成立就跳出函数语句
        // 只要有一个输入框的数据不成立就跳出函数语句
        if(!(tel.value || pwd.value || pwd2.value)){
            common.toast(0,'请输入正确的信息');
            return;
        }
        // 手机正则验证
        let exp = /^1[3-9][0-9]{9}$/;
        if(!exp.test(tel.value)){
            common.toast(0,'请输入正确的手机号');
            return;
        }
        // 密码一次验证
        let exp2 = /^[0-9]{6,12}$/
        if(!exp2.test(pwd.value)){
            common.toast(0,'请输入6-12位数字密码');
            return;
        }
        // 密码二次验证
        if(pwd.value !== pwd2.value){
            common.toast(0,'两次密码不一致');
            return;
        }
        // 验证码验证  不区分大小写
        if(code.value.toLowerCase() !== n.toLowerCase()){
            common.toast(0,'验证码错误');
            return;
        }

        let obj = {
            account: tel.value,
            password: pwd2.value
        }
        // 15191744331   123456
        http.post('/users/login',obj,function(res){
            console.log(res);
        })
        // let xhr = new XMLHttpRequest();
        // xhr.open('post', 'http://139.9.177.51:8099/users/add');
        // xhr.setRequestHeader('content-type', 'application/json');
        // xhr.send(JSON.stringify(obj));
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         let data = JSON.parse(xhr.responseText);
        //         console.log(data);
        //         if(data.status === 0){
        //             common.toast(1,'恭喜你,注册成功');
        //             location.href = '../login.html';
        //         }
        //         if(data.status == 1){
        //             common.toast(0,data.msg + ',请重新注册');
        //         }
        //     }
        // }
    });
};

