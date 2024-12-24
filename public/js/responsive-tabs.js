  // responsive tabs
  $(".tabContent").hide(); 
  $("ul.tabs li:first").addClass("active").show(); 
  $(".tabContent:first").show(); 
  
  $("ul.tabs li").click(function () {
    $("ul.tabs li").removeClass("active"); 
    $(this).addClass("active"); 
    $(".tabContent").hide(); 
    var activeTab = $(this).find("a").attr("href"); 
    $(activeTab).fadeIn(); 

    return false;
  });
