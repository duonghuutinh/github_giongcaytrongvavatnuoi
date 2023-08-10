function frmValidate() {
    var frm = document.forms["regfr"];
    var hoten1 = frm.hoten1;
    var sdt= frm.sdt;
    var gopy= frm.gopy;
     //mail
    var mail = frm.mail;
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //mật khẩu
    var mk = frm.mk;
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
    );
    
    //kt họ tên không rỗng
    if (hoten1.value.length == 0) {
      alert("Hãy điền họ tên!");
      hoten1.focus();
      return false;
    }
    if(sdt.value.length != 10) {
        alert('Số điện thoại phải đúng 10 số!');
        sdt.focus();
        return false;
    }
    if ( gopy.value.length == 0 ||gopy.value.length > 50 )  {
        alert('Không được rỗng hoặc quá 50 ký tự!');
        gopy.focus();
        return false;
    }
    //mail đúng//Email chỉ chấp nhận 
    /*ký tự HOA, ký tự thường , chữ số ký tự đặc biệt =_., một ký tự @, theo sau là các ký tự kết thúc bằng dấu . và tối thiểu 2 ký tự, tối đa 4 ký tự  */
    if (!filter.test(mail.value)) {
      alert("Hãy nhập đúng định dạng email");
      mail.focus();
      return false;
    }
    alert("Góp ý thành công!");
    window.location = "./trangchu.html";
    return true; 
  }
var frm = document.getElementById('frm')
var submit = frm.querySelector('button[type="submit"]');
console.log(submit);
submit.addEventListener("click",function(e){
    console.log(e);
    frmValidate();
    e.preventDefault();
})
