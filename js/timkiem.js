function checkKeySearch(e)
{
	var key = event.which ||event.keyCode;
	if (key ==32){
     doSearch();
	}	
}
function doSearch()
{
	var frm=document.forms["frm-search"];
	if(frm.words.value.length>0)
		frm.submit();  
}
function showSearch()
{
	var url = new URL(window.location);
	var ws = url.searchParams.get("words");
	document.getElementById("searchDetail").innerHTML="<h1>Từ khóa tìm kiếm</h1> <hr> <div class=tukhoa> <b>"+ws+"</b> </div> <hr> " ;
}
