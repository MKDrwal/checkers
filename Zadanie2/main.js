$(function() {

    let allFields = $('#checkersBoard .field');
    let allRows = $('#checkersBoard .row');
    let fields;
    console.log(allFields);

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
        let pawnRow = pawn.closest('.row');
        let pawnRowId = pawnRow.index();
        //let allRows = $('#checkersBoard .row');

        if(pawnRowId > 0 ) {
            let row = $(allRows[pawnRowId - 1]);

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

        if(pawnRowId < 7){
            let row = $(allRows[pawnRowId + 1]);

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