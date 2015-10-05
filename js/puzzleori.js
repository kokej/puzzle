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

    function resetZ() {
        var elements = document.querySelectorAll('img');
        for(var i = elements.length - 1; i >= 0; i--){
            elements[i].style.zIndex = 5;
        }
    }

    function moveStart(e){
        whichArt = e.target;
        myX = e.offsetX === undefined ? e.layerX : e.offsetX;
        myY = e.offsetY === undefined ? e.layerY : e.offsetY;
        resetZ();
        whichArt.style.zIndex = 10;
    }

    function moveDragOver(e){
        e.preventDefault();
    }

    function moveDrop(e){
        e.preventDefault();
        var whichArtLeft = e.pageX - myX;
        whichArt.style.left = whichArtLeft + 'px';
        var whichArtTop = e.pageY - myY;
        whichArt.style.top = whichArtTop + 'px';
        imgName = whichArt.alt;

        if(whichArtLeft - scope[''+ imgName +''].left < 20 && whichArtTop - scope[''+ imgName +''].top < 20){
            whichArt.style.left = scope[''+ imgName +''].left + 'px';
            whichArt.style.top = scope[''+ imgName +''].top + 'px';
        } else{
            whichArt.style.left = scope[''+ imgName +'_o'].left + 'px';
            whichArt.style.top = scope[''+ imgName +'_o'].top + 'px';
        }
    }

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
    }


    document.querySelector('body').addEventListener('dragstart', moveStart, false);
    document.querySelector('body').addEventListener('dragover', moveDragOver, false);
    document.querySelector('body').addEventListener('drop', moveDrop, false);
    document.querySelector('body').addEventListener('touchstart', touchStart, false);
})();
