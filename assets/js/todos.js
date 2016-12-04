/**
 * Created by srabah-m on 10/20/16.
 */
var todos = typeof localStorage.todos !== "undefined" ? JSON.parse(localStorage.todos) : [];

// Initialize todos from localStorage
(function(){
    for (var i = 0; i < todos.length; i++){
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todos[i] + "</li>");
    }
})();

// Check off specific todos by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

// Click on X to delete todos
$("ul").on("click", "span", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
        var indexRemove = todos.indexOf($(this).val());
        todos = todos.splice(indexRemove, 1);
        localStorage.todos = JSON.stringify(todos);
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
        todos.push(todoText);
       localStorage.todos = JSON.stringify(todos);
       // clear input
       $(this).val("");
   }
});

// Toggle input
$(".fa-plus").click(function(){
   $("input[type='text']").fadeToggle(50);
});