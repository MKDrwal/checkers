let lastLog;
let gameInfo;
let allRows;

changeSize();
$(window).on('resize', function () {
    changeSize()
});

$(function() {
    allRows = $('#checkersBoard .row');

    gameInfo = getCookie('gameinfo');
    gameInfo = JSON.parse(gameInfo);

    startNewGame();

    $('.pawn').click(function () {
        let pawn = $(this);
        let pawnRowId = pawn.closest('.row').index();


        if(!pawn.hasClass(lastLog.nextTurn)){
            return null;
        }

        if(!pawn.hasClass('active')){
            $('#checkersBoard .active').removeClass('active')
            pawn.addClass('active')
        }

        //if this isnt move remove old proposal
        if(!pawn.hasClass('shadow')){
            cleanProposal();
        }

        direction = pawn.hasClass('first') ? 1 : 0;

        if((direction === 1 && pawnRowId < 7) || (direction === 0 && pawnRowId > 0)){
            let row = $(allRows[(direction === 1) ? pawnRowId + 1 : pawnRowId - 1]);
            let fields = row.find('.field');

            let t = 1;
            [1, -1].forEach(function(elem) {

                field = $(fields[pawn.parent().index() + elem]);
                if(field.children().length === 0){
                    field.addClass('proposal').append('<div class="pawn shadow"></div>');
                } else {
                    occupated = $(field.children()[0]);
                    if((pawn.hasClass('first') && occupated.hasClass('second')) || (pawn.hasClass('second') && occupated.hasClass('first'))) {

                        fieldsO = $(allRows[(direction === 1) ? pawnRowId + 2 : pawnRowId - 2]).find('.field');
                        fieldShot = $(fieldsO[pawn.parent().index() + ((elem === 1) ? 2 : -2)]);

                        if(fieldShot.children().length === 0){
                            fieldShot.addClass('proposal shot').attr('data-shot', t).append('<div class="pawn shadow "></div>');
                            field.addClass('target').attr('data-target', t++);
                        }
                    }
                }
            });

            $('.proposal').click(function () {
                $(this).append($('#checkersBoard .active').detach());
                $(this).off('click');
                endStep();
            });
        }
    });
});

function setCookie(cname, arrayValue) {
    var d = new Date();
    d.setTime(d.getTime() + (60*60*24*30));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(arrayValue) + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function endStep() {
    cleanProposal();

    let lastPawn = $('#checkersBoard .active').removeClass('active');

    lastLog.nextTurn = (lastPawn.hasClass('first')) ? 'second' : 'first';
    lastLog.step++;

    let shot = $('.shot');
    if(shot.length > 0){

        shot.toArray().every(function (elem) {
           if($(elem).children().length > 0) {
               shot = $(elem);
               return false;
           } else {
               return true;
           }
        });

        let target = $('.target');
        if(shot.children().length > 0){
            let child;
            target.toArray().forEach(function (elem) {
                if ($(elem).data('target') === shot.data('shot')){
                    child = $($(elem).children()[0]);
                }
            });
            if(child.hasClass('first')){
                lastLog.pointsSecond += 1;
            } else {
                lastLog.pointsFirst += 1;
            }
            child.remove();
        }
        shot.removeClass('shot');
        target.removeClass('target');
    }

    lastLog.board = saveBoardToArray();

    saveLog();
}

function saveBoardToArray() {
    let board = [];

    $('#checkersBoard').children().toArray().forEach(function (row) {
        let rowField = [];
        $(row).children().toArray().forEach(function (field) {
            field = $(field);
            if(field.find('.first').length > 0){
                rowField.push(1);
            } else if (field.find('.second').length > 0) {
                rowField.push(2);
            } else {
                rowField.push(0);
            }
        });

        board.push(rowField);
    });

    return board;
}

function cleanProposal() {
    $('#checkersBoard .proposal').removeClass('proposal').find('.shadow').remove();
}

function changeSize() {
    let checkersBoard = $('#checkersBoard');
    let containerCheckersBoard = checkersBoard.parent();

    checkersBoard.width(containerCheckersBoard.width()).height(containerCheckersBoard.width());

}

function saveLog() {
    $.ajax({
        type: 'POST',
        data: {'gameLog': lastLog},
        url: '/game/saveLog',
        success:function(data) {
            setCookie('gamelog', lastLog);
        }
    });
}

function startNewGame(size = 3) {
    lastLog = {
        'gameInfoId': gameInfo.id,
        'step' : 0,
        'nextTurn': 'first',
        'pointsFirst': 0,
        'pointsSecond': 0,
        'board': generateDefaultBoard(size),
    };

    saveLog();

    generateBoardFromArray(lastLog.board);
}

function generateDefaultBoard(countRow = 3) {
    let arrayBoard = [];

    if(countRow < 1 || countRow > 3){
        countRow = 3;
    }

    for(i=0;i < 8; i++){
        row = [];

        if(i < countRow || i > (7-countRow)){
            z = i%2 ? 1 : 0;
            for(x=0;x<8;x++){
                row.push((x%2 === z ? (i < countRow ? 1 : 2) : 0));
            }
        } else {
            row = [0,0,0,0,0,0,0,0];
        }

        arrayBoard.push(row);
    }

    return arrayBoard;
}

function generateBoardFromArray(board) {
    board.forEach(function (row, rowId) {
        let fields = $(allRows[rowId]).children();
        row.forEach(function (field, fieldId) {
            if(field){
                $(fields[fieldId]).append('<div class="pawn '+ (field === 1 ? 'first' : 'second') +'"></div>')
            }
        });
    });
}