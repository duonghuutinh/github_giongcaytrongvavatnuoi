function frmValidate() {
    var frm = document.forms["regfr"];
    var hoten1 = frm.hoten1;
    var ns = frm.ns;
    var sdt= frm.sdt;
    var diachi= frm.diachi;
     //mail
    var mail = frm.mail;
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //mật khẩu
    var mk = frm.mk;
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
    );
    //nhập lại mk
    var pre_mk = frm.pre_mk;

    //kt họ tên không rỗng
    if (hoten1.value.length == 0) {
      alert("Hãy điền họ tên!");
      hoten1.focus();
      return false;
    }
    //Ngày sinh: đủ 18 tuổi trở lên
    var today = new Date();
    var t1 = new Date(ns.value);
    var ns1 = today.getFullYear() - t1.getFullYear();
    if (ns1 <= 18 || isNaN(ns1)) {
      alert("Ngày sinh không được rỗng và đủ 18 tuổi trở lên!");
      ns.focus();
      return false;
    }
    if(sdt.value.length != 10) {
        alert('Số điện thoại phải đúng 10 số!');
        sdt.focus();
        return false;
    }
    if ( diachi.value.length == 0 ||diachi.value.length > 50 )  {
        alert('Không được rỗng hoặc quá 50 ký tự!');
        diachi.focus();
        return false;
    }

    //mail đúng//Email chỉ chấp nhận 
    /*ký tự HOA, ký tự thường , chữ số ký tự đặc biệt =_., một ký tự @, theo sau là các ký tự kết thúc bằng dấu . và tối thiểu 2 ký tự, tối đa 4 ký tự  */
    if (!filter.test(mail.value)) {
      alert("Hãy nhập đúng định dạng email");
      mail.focus();
      return false;
    }
    //kiểm tra mk
                         /*   Mật khẩu phải chứa ít nhất
                            1 ký tự HOA
                            1 ký tự thường
                            1 chữ số
                            1 ký tự đặc biệt
                            độ dài tối thiểu 8 ký tự
                            */
    if (strongRegex.test(mk.value) == false) {
      alert("Mật khẩu có ký tự in HOA, thường, ký tự đặc biệt và số!");
      mk.focus();
      return false;
    }
    //Nhập lại Mật khẩu:
    //kiểm tra đúng với trường mật khẩu đã nhập trước đó
    if (mk.value != pre_mk.value) {
      alert("Mật khẩu không trùng khớp");
      pre_mk.focus();
      return false;
    }
    alert("Đăng ký thành công!");
    window.location = "./dangnhap.html";
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
