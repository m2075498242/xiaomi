require('../css/login.less');
window.onload = function () {
    // 账号
    let account = document.querySelector('.account input');
    // 密码
    let code = document.querySelector('.code');
    let btn = document.querySelector('.btn')
    // 点击按钮验证登录
    btn.addEventListener('click', function () {
        let exp = /^1[3-9][0-9]{9}$/;
        let exp2 = /^[0-9]{6,12}$/;
        // 非空判断
        if(!(account.value || code.value)){
            common.toast(0,'请输入正确的信息');
            return;
        }
        if (!exp.test(account.value) || !exp2.test(code.value)) {
            // alert('请输入十一位手机号和6-12位数字密码')
            common.toast(0,'请输入十一位手机号和6-12位数字密码');
            return;
        }
        let obj = {
            account: account.value,
            password: code.value
        }
        http.post('/users/login',obj,function(res){
            let userId = res.data.user.userId;
            console.log(res);
            if(res.status == 0){
                common.toast(1,'登陆成功');
                localStorage.setItem('userId',userId);
                location.href = './index.html';
            }
        })
    });
};