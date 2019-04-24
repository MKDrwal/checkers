$(function() {
    $('#checkersBoard .field').sortable({
        connectWith: ".field",
    });
    $('#checkersBoard .field').disableSelection();
});