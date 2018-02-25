// Check Off todos by clicking
$("ul").on("click", "li", function(){
  $(this).toggleClass("completed");
});

// delete todos by clicking the icon
$("ul").on("click", "span", function(e){
  $(this).parent().fadeOut(500, function(){
    $(this).remove();
  });
  e.stopPropagation();
});

$("input[type='text']").keypress(function (e) { 
  if(e.which === 13){
    const toDo = $(this).val();
    $(this).val("");
    if (toDo){
      $("ul").append(`<li><span><i class="fa fa-trash"></i></span> ${toDo}  </li>`);
    }
  }
});


$(".fa-plus").click(function (e) { 
  $("input[type='text']").fadeToggle();  
});