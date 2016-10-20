/**
 * Created by srabah-m on 10/20/16.
 */

// Check off specific todos by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

// Click on X to delete todos
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});


// Add listener to text input
$("input[type='text']").keypress(function(event){
   if (event.which === 13){
       // Extract value out
       var todoText = $(this).val();
       // create new li and add to ul
       $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");

       // clear input
       $(this).val("");
   }
});

// Toggle input
$(".fa-plus").click(function(){
   $("input[type='text']").fadeToggle(50);
});