
////////////////////
var itemList={	"sp001":{"name":"Xoài Đài Loan","price":80000,"photo":"..//img/Picture1.png"},
				"sp002":{"name":"Ổi Nữ Hoàng","price":15000,"photo":"..//img/Picture2.png"},
				"sp003":{"name":"Cam Sành","price":30000,"photo":"..//img/Picture3.png"},
				"sp004":{"name":"Sầu Riêng Ri6","price":110000,"photo":"..//img/Picture4.png"},
				"sp005":{"name":"Mít Thái","price":40000,"photo":"..//img/Picture5.png"},
				"sp006":{"name":"Bưởi Da Xanh","price":50000,"photo":"..//img/Picture6.png"},
				"sp007":{"name":"Gà Mía","price":12000,"photo":"..//img/Picture7.png"},
				"sp008":{"name":"Vịt Bầu Cánh Trắng","price":12000,"photo":"..//img/Picture8.png"},
				"sp009":{"name":"Cá Diêu Hồng(Giống Lớn)","price":42000,"photo":"..//img/Picture9.png"},
				"sp010":{"name":"Ba Ba","price":10000,"photo":"..//img/Picture10.png"},
				"sp011":{"name":"Cá Thác Lác","price":3500,"photo":"..//img/Picture11.png"},
				"sp012":{"name":"Cá Tra","price":8000,"photo":"..//img/Picture12.png"},	
			   };

/*Hàm thêm sản phẩm vào Giỏ hàng**/
function addCart(code)
{	
	var number=parseInt(document.getElementById(code).value);
	var name=itemList[code].name;
	if(number==0){
		alert("Vui lòng nhập số lượng sản phẩm")
		return window.location.href = "sampham.html";
	}
	if(typeof localStorage[code] === "undefined"){
		window.localStorage.setItem(code,number);
	}else{
	   var current=parseInt(window.localStorage.getItem(code));
	   if(current+number>500)

	   {	alert("Mỗi mặt hàng chỉ có thể đặt 500 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 500 sản phẩm của "+name+" này.");
			window.localStorage.setItem(code,500);
			return;		   
	   }
	   else			   
			window.localStorage.setItem(code,current+number);	   
	}
	alert("Đã cập nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+".");	
}
/*Hàm mở trang Giỏ hàng**/
function openCart()
{
	window.location.href = "donhang.html";
}
// Hàm trả về tỉ lệ giảm giá đơn hàng khi đặt hàng
// Nếu đặt hàng từ thứ 2 đến thứ 4 và trong khoảng thời gian từ 7h00-11h00 và 13h00 đến 17h00
// Quy ra số phút trong ngày thì ta có các giá trị tương đương như sau:
//  7h00 =  7 x 60 = 420 phút
// 11h00 = 11 x 60 = 660 phút
// 13h00 = 13 x 60 = 7800 phút
// 17h00 = 17 x 60 = 1020 phút
function getDiscountRate()
{
	var d=new Date();//lấy ngày hiện tại của máy tính
	var weekday=d.getDay();//lấy ngày trong tuần	
	var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút trong ngày
	if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
	return 0;
}
//hàm hiển thị nội dung giỏ hàng
function showCart()
{
var formatter = new Intl.NumberFormat('vi-VN', {
	style: 'currency',
	currency: 'VND'
	});
	var container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
	container.innerHTML="";
	var sum=0;//tổng mỗi mặt hàng
	var totalPreTax=0;//tổng trước thuế
	var discountRate=getDiscountRate();//tỉ lệ khuyến mãi
	var taxRate=0.1;//tỉ lệ thuế	
	var discount=0;//tiền giảm giá
	var tax=0;//tiền thuế
	for(var i=0;i<window.localStorage.length;i++)
	{
	 if(typeof itemList[localStorage.key(i)] === "undefined")
		continue;		
	 var tr=document.createElement("tr");
	 var photoCell=document.createElement("td");
	 var nameCell=document.createElement("td");
	 var priceCell=document.createElement("td");
	 var numberCell=document.createElement("td");
	 var sumCell=document.createElement("td");
	 var removeCell=document.createElement("td");
	 var removeLink=document.createElement("a");
	 
	 var item=itemList[localStorage.key(i)];
	 var number=localStorage.getItem(localStorage.key(i));
	 
	 photoCell.style.textAlign="center";
	 photoCell.style.padding="10px";
	 photoCell.innerHTML="<img src='"+item.photo+"'width='100px'/>";
	 
	 nameCell.innerHTML=item.name;
	 nameCell.style.textAlign="center";
	 priceCell.innerHTML=formatter.format(item.price);
	 priceCell.style.textAlign="center";
	 
	 numberCell.innerHTML=number;
	 numberCell.style.textAlign="center";
	 
	 sum=number*item.price;	 
	 sumCell.innerHTML=formatter.format(sum);
	 sumCell.style.textAlign="center";
	 
	 removeLink.innerHTML="<i class='fa fa-trash '></i>";
	 
	 removeLink.setAttribute("href","#");
	 removeLink.setAttribute("data-code",localStorage.key(i));
	 removeLink.onclick=function(){
		removeCart(this.dataset.code);
		 };
	 removeCell.style.textAlign="center";
	 removeCell.appendChild(removeLink);
	 
	 tr.appendChild(photoCell);
	 tr.appendChild(nameCell);
	 tr.appendChild(numberCell);
	 tr.appendChild(priceCell);	 
	 tr.appendChild(sumCell);
	 tr.appendChild(removeCell);
	 container.appendChild(tr);
	 totalPreTax+=sum;	 
	}
	var discount=totalPreTax*discountRate;
	var tax=(totalPreTax-discount)*taxRate;
	document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);	
	document.getElementById("bill_discount").innerHTML=discountRate+" x A = "+formatter.format(discount);		
	document.getElementById("bill_tax").innerHTML=formatter.format(tax);	
	document.getElementById("bill_total").innerHTML=formatter.format(totalPreTax-discount+tax);
	
}
/*Hàm xóa sản phẩm khỏi đơn hàng**/
function removeCart(code)
{		
	if(typeof window.localStorage[code] !== "undefined")
		{
		//xóa sản phẩm khỏi localStorage
		window.localStorage.removeItem(code);
		//Xóa nội dung của phần thân của bảng (<tbody>)
		document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
		//Hiển thị lại nội dung của đơn hàng
		showCart();
		}	
}
/*Hàm hiển thị nội dung keyword trong trang timkiem.html**/
function showSearch()
{
	var url = new URL(window.location);
	var ws = url.searchParams.get("words");
	document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm kiếm</h1> <b>"+ws+"</b>";
}
//Cập nhật trang chi tiết đơn hàng khi cập nhật số lượng sản phẩm
window.onstorage = () => {
  showCart();
};

var dathang = document.querySelectorAll(".dathang")
for(let i = 0; i < dathang.length; i++){
	dathang[i].addEventListener("click", function (){
		window.location = "./donhang.html"
	})
}
