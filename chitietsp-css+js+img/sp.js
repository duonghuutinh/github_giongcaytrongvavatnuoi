var indicator = document.getElementsByClassName('indicator');
var main = document.querySelector('.content');

for(var i=0;i<indicator.length;i++){
    indicator[i].onclick = function(e){
        var indicator_image = document.getElementsByClassName("active");
        indicator_image[0].className = indicator_image[0].className.replace("active","");
        this.className += " active";
        if (indicator_image)
        {
            main.src = e.target.src;
            main.style.display = "block";     
        }
    }
}

