//dangnhap
function frmValidate() {
    let name = document.querySelector('input[name="user"]').value;
    let pass = document.querySelector('input[name="pass"]').value;
    let ischeck = false;
    let data = {
        hoten: 'duonghuutinh',
        mail: 'duonghuutinh03@gmail.com',
        mk: 'duonghuutinh2008'
    }
    localStorage.setItem('check',JSON.stringify(ischeck));
    localStorage.setItem('user',JSON.stringify(data)); 
    let user = JSON.parse(localStorage.getItem('user'));
    if(name == user.mail && pass == user.mk) {
        ischeck = true;
        localStorage.setItem('check',JSON.stringify(ischeck));
        alert('Đăng nhập thành công');
        window.location = "./trangchu.html";
    }
    else {
        alert('Thất bại! Vui lòng nhập lại');
        
    }
    return false;
}
var frm = document.getElementById('frm')
var submit = frm.querySelector('button[type="submit"]');
console.log(submit);
submit.addEventListener("click",function(e){
    console.log(e);
    frmValidate();
    e.preventDefault();
})




