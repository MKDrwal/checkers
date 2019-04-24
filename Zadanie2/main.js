$(function() {
    $('#checkersBoard .field').sortable({
        connectWith: ".proposal",
    });
    $('#checkersBoard .field').disableSelection();

    $('.pawn').mousedown(function () {
        let pawn = $(this);
        let pawnRow = pawn.closest('.row');
        let pawnRowId = pawnRow.index();
        let allRows = $('#checkersBoard .row');

        if(pawnRowId > 0 ) {
            let row = $(allRows[pawnRowId - 1]);

            let fields = row.find('.field');
            $(fields[pawn.parent().index() + 1]).addClass('proposal').append('<div class="pawn shadow"></div>');
            $(fields[pawn.parent().index() - 1]).addClass('proposal').append('<div class="pawn shadow"></div>');
        }

        if(pawnRowId < 7){
            let row = $(allRows[pawnRowId + 1]);

            let fields = row.find('.field');
            $(fields[pawn.parent().index() + 1]).addClass('proposal').append('<div class="pawn shadow"></div>');
            $(fields[pawn.parent().index() - 1]).addClass('proposal').append('<div class="pawn shadow"></div>');
        }
    });

    $(document).mouseup(function(){
        $('.proposal').removeClass('proposal').find('.shadow').remove();
    });
});