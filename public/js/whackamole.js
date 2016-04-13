(function(){

    "use strict"
    
    $(document).ready(function(){
        // these are the global variables
        var time = 35;
        var counter;
        var score = 0;
        var highScore = 0; 
        var holes = $('#box1, #box2, #box3, #box4, #box5, #box6, #box7, #box8, #box9');
        
        $("#high").append(highScore);

        $("#dog").hide();

        //this is the function that generates a random dog
        //a dog will appear in each hole
        //if a dog is clicked, add 1 point
        //dogs will be on the screen for 1 second, then disappear.
        function randomDog() {
            var hole = $(holes[Math.floor(Math.random()*holes.length)]);
            hole.addClass("selected");
            //this removes event listeners before adding the new one
            //this way, it won't count the single click 
            //multiple times.
            //one is used instead of on so that
            //the listener is automatically removed the first
            //time it is called (hooking an event once).
            $(".selected").off("click").one("click", function() {
                hole.removeClass("selected");
                score++;
                $("#score").html("Score: " + score);
                console.log("hi");
             });
            setTimeout(function(){
                hole.removeClass("selected");
            }, 1000);

        };

        //this is the timer function
        //it will decrease by 1 each interval
        function timer() {
            time = time - 1;
            //as long as the timer is greater than 0
            //it will generate a random dog(mole).
            if (time > 0) {
                randomDog();
            //stops the counter at 0
            //ends game when that happens
            } if (time === 0) {
                clearInterval(counter);
                endGame();
            }
            $("#timer").html("Time: " + time + "s");
        };

        //this function just hides elements to prevent
        //the user from playing
        //also alerts that game is over 
        function endGame() {
            $("#grid").hide();
            $(".holes").hide();
            $("#start").hide();
            $("#description").hide();
            $("#dog").show();
            if (score > highScore) {
                $("#high").html("Best :" + score);
                highScore++;
            } else {
                $("#high").html("Best :" + highScore);
            }
        };

        //prevents the timer from starting as soon as
        //the page is loaded.
        //will only start when the user clicks start button
        $("#start").on("click", function(){
            counter = setInterval(timer, 1000);
            //annoying music starts when user clicks start
            var dogSong = document.createElement("audio");
            dogSong.setAttribute("src", "/mp3/dogsong.mp3");
            dogSong.play();
            //prevents it from running the function
            //if it's clicked a second time
            $(this).off("click");
        });

        //will reload the page to reset everything
        $("#reset").on("click", function(){
            reloadPage();
        });
    });
})();