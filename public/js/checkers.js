$(function() {
    let allRows = $('#checkersBoard .row');
    let fields;
    let points = {
        'first': 0,
        'second': 0
    }

    for(i=0;i<3;i++){
        z = (i%2) ? 1 : 0;
        fields = $(allRows[i]).find('.field');
        for(;z<8; z+=2){
            $(fields[z]).append('<div class="pawn first"></div>');
        }
    }

    for(i=5;i<8;i++){
        z = (i%2) ? 1 : 0;
        fields = $(allRows[i]).find('.field');
        for(;z<8; z+=2){
            $(fields[z]).append('<div class="pawn second"></div>');
        }
    }

    $('#checkersBoard .field').sortable({
        connectWith: ".proposal",
    });
    $('#checkersBoard .field').disableSelection();

    $('.pawn').mousedown(function () {
        let pawn = $(this);
        let pawnRowId = pawn.closest('.row').index();

        if(pawn.hasClass('first')){
            direction = 1;
        } else {
            direction = 0;
        }

        if((direction == 1 && pawnRowId < 7) || (direction == 0 && pawnRowId > 0)){
            let row = $(allRows[(direction == 1) ? pawnRowId + 1 : pawnRowId - 1]);
            let fields = row.find('.field');

            [1, -1].forEach(function(elem) {

                field = $(fields[pawn.parent().index() + elem]);
                if(field.children().length == 0){
                    field.addClass('proposal').append('<div class="pawn shadow"></div>');
                } else {
                    occupated = $(field.children()[0]);
                    if((pawn.hasClass('first') && occupated.hasClass('second')) || (pawn.hasClass('second') && occupated.hasClass('first'))) {

                        fieldsO = $(allRows[(direction == 1) ? pawnRowId + 2 : pawnRowId - 2]).find('.field');
                        fieldShot = $(fieldsO[pawn.parent().index() + ((elem == 1) ? 2 : -2)]);

                        if(fieldShot.children().length == 0){
                            fieldShot.addClass('proposal shot').append('<div class="pawn shadow "></div>');
                            field.addClass('target');
                        }
                    }
                }
            });
        }
    });

    $(document).mouseup(function(){
        $('.proposal').removeClass('proposal').find('.shadow').remove();
        let shot = $('.shot');
        if(shot.length > 0){

            let target = $('.target');
            if(shot.children().length > 0){
                let child = $(target.children()[0]);
                if(child.hasClass('first')){
                    points.second += 1;
                } else {
                    points.first += 1;
                }
                child.remove();
                console.log(points);
            }
            shot.removeClass('shot');
            target.removeClass('target');
        }
    });
});