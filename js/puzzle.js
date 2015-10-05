var puzzle = (function(){

    var scope = this;

    scope.puzzle_1 = {left: 200, top:30};
    scope.puzzle_2 = {left: 125, top:73};
    scope.puzzle_3 = {left: 200, top:156};
    scope.puzzle_4 = {left: 327, top:111};
    scope.puzzle_5 = {left: 407, top:157};
    scope.puzzle_6 = {left: 200, top:290};
    scope.puzzle_7 = {left: 327, top:292};
    scope.puzzle_8 = {left: 205, top:425};
    scope.puzzle_9 = {left: 235, top:525};
    
    scope.puzzle_1_o = {left: 670, top:444};
    scope.puzzle_2_o = {left: 822, top:0};
    scope.puzzle_3_o = {left: 674, top:296};
    scope.puzzle_4_o = {left: 633, top:5};
    scope.puzzle_5_o = {left: 896, top:10};
    scope.puzzle_6_o = {left: 905, top:595};
    scope.puzzle_7_o = {left: 760, top:595};
    scope.puzzle_8_o = {left: 566, top:186};
    scope.puzzle_9_o = {left: 903, top:293};

    var myX = '';
    var myY = '';
    var whichArt = '';
    var imgName;
    var auto = 1;
    var timer = 1000; // set auto speed
    var errorMargin = 20; // set error margin for manual mode
    
    var changeAuto = function(){
        var auto = document.querySelector('#range_puzzle').value;
        
        if(auto == 0){
    
        function autoSort(){
            var allImg = document.querySelectorAll('.puzzle');
            for(var i = 0; i < allImg.length; i++){
                imgName = allImg[i].alt;
                (function(n) {
                    setTimeout(function(){

                            allImg[n].style.left = scope[''+ allImg[n].alt +''].left + 'px';
                            allImg[n].style.top = scope[''+ allImg[n].alt +''].top + 'px';

                    }, timer);
                }(i));
            }

            imgName = '';

        }; // reorganize img at end position
        
        autoSort();
        
        } else {
            function autoSorto(){
            var allImg = document.querySelectorAll('.puzzle');
            for(var i = 0; i < allImg.length; i++){
                imgName = allImg[i].alt;
                (function(n) {
                    setTimeout(function(){

                            allImg[n].style.left = scope['' + allImg[n].alt + '_o'].left + 'px';
                            allImg[n].style.top = scope['' + allImg[n].alt + '_o'].top + 'px';

                    }, timer);
                }(i));
            }

            imgName = '';

        }; // reorganize img at start position
        
        autoSorto();
        } 
    };  // auto mode      

      
        function resetZ() {
            var elements = document.querySelectorAll('.puzzle');
            for(var i = elements.length - 1; i >= 0; i--){
                elements[i].style.zIndex = 5;
            }
        } // reset zindex for .puzzle img

        function moveStart(e){
            whichArt = e.target;
            myX = e.offsetX === undefined ? e.layerX : e.offsetX;
            myY = e.offsetY === undefined ? e.layerY : e.offsetY;
            resetZ();
            whichArt.style.zIndex = 10;
        } // get position when start dragging

        function moveDragOver(e){
            e.preventDefault();
        } // prevent default when dragging

        function moveDrop(e){
            e.preventDefault();
            var whichArtLeft = e.pageX - myX;
            whichArt.style.left = whichArtLeft + 'px';
            var whichArtTop = e.pageY - myY;
            whichArt.style.top = whichArtTop + 'px';
            imgName = whichArt.alt;

            if(whichArtLeft - scope[''+ imgName +''].left < errorMargin && whichArtTop - scope[''+ imgName +''].top < errorMargin){
                whichArt.style.left = scope['' + imgName + ''].left + 'px';
                whichArt.style.top = scope['' + imgName + ''].top + 'px';
            } else{
                whichArt.style.left = scope['' + imgName + '_o'].left + 'px';
                whichArt.style.top = scope['' + imgName + '_o'].top + 'px';
            }
        } // set position when dragging ends

        function touchStart(e){
            //manages tablet click events
            e.preventDefault();
            var whichArt = e.target;
            var touch = e.touches[0];
            var moveOffsetX = whichArt.offsetLeft - touch.pageX;
            var moveOffsetY = whichArt.offsetTop - touch.pageY;
            resetZ();
            whichArt.style.zIndex = 10;

            whichArt.addEventListener('touchmove', function(){
                var positionX = touch.pageX + moveOffsetX;
                var positionY = touch.pageY + moveOffsetY;
                whichArt.style.left = positionX + 'px';
                whichArt.style.top = positionY + 'px';
            });
        } //manages tablet click events
    
    // end manual mode


        document.querySelector('#range_puzzle').addEventListener('change', changeAuto, false);
        document.querySelector('body').addEventListener('dragstart', moveStart, false);
        document.querySelector('body').addEventListener('dragover', moveDragOver, false);
        document.querySelector('body').addEventListener('drop', moveDrop, false);
        document.querySelector('body').addEventListener('touchstart', touchStart, false);
    

    
})();
