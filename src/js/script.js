$(document).ready(function(){
    
    let SlideColor = ["#849d8f", "#8996a6", "#9d8b84"];
    function slideToggle(){
        let SlideList = $(".slide-item");
        let SlideChecked = $("[name='product']:checked").val();
        $("body").css("background-color", SlideColor[SlideChecked-1]);
        for(let i=0;i<=SlideList.length; i++){
            SlideList.eq(i).hide();
        }

        
        $("#site-wrap").attr("class", "slide_" + SlideChecked);
        $(".slide_info_" + SlideChecked).show(); 
    }
    slideToggle();
    $(".slide-controler").on("click", slideToggle);
});



