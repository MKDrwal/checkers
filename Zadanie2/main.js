$(function() {
    let allRows = $('#checkersBoard .row');
    let fields;

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

            let right = $(fields[pawn.parent().index() + 1]);
            if(right.children().length == 0){
                right.addClass('proposal').append('<div class="pawn shadow"></div>');
            }
            let left = $(fields[pawn.parent().index() - 1]);
            if(left.children().length == 0){
                left.addClass('proposal').append('<div class="pawn shadow"></div>');
            }
        }
    });

    $(document).mouseup(function(){
        $('.proposal').removeClass('proposal').find('.shadow').remove();
    });
});