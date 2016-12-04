/**
 * Created by srabah-m on 10/20/16.
 */
var todos = typeof localStorage.todos !== "undefined" ? JSON.parse(localStorage.todos) : [];

// Initialize todos from localStorage
(function(){
    for (var i = 0; i < todos.length; i++){
        // Calculate time left and format it
        var timeLeft = formatTimeLeft(todos[i].timeLimit);
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todos[i].content +
            "<em class='time-limit'>"+ timeLeft +"</em></li>");
    }
})();

function formatTimeLeft(timeStr){
    var timeLeft = "";
    if (!(isNaN(Date.parse(timeStr)))){
        timeLeft = Date.parse(timeStr) - Date.now();
        var hours = Math.floor(timeLeft / (3600 * 1000));
        var minutes = Math.floor((timeLeft - (hours * 3600 * 1000)) / (60 *1000));
        minutes = minutes < 10 ? "0" + minutes : minutes;     // 0 left padding on minutes
        if (hours > 0){
            timeLeft = hours + "h:";
        }
        timeLeft += minutes + " left";
    }
    return timeLeft;
}

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
       // IF USER SELECTED HOUR, EXTRACT IT
       var hourSelect = document.querySelector("label.active > input").value;
       var date = new Date();
       date.setHours(date.getHours() + parseInt(hourSelect));
       var newTodo = {content: "", timeLimit: date };


       // Extract value out of the input text.
       var todoText = $(this).val();
       // create new li and add to ul
       $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "<em class='time-limit'>"+ formatTimeLeft(newTodo.timeLimit) +"</em></li>");
       newTodo.content = todoText;
       todos.push(newTodo);
       localStorage.todos = JSON.stringify(todos);
       // clear input
       $(this).val("");
   }
});

// Toggle input
$(".fa-plus").click(function(){
   $("input[type='text']").fadeToggle(50);
});























