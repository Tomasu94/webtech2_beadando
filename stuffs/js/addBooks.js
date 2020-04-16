$(function (){
    $('form').on('submit', function (e){
        e.preventDefault();

        $.ajax({
            type:"post",
            url: 'addBooks',
            data: $('form').serialize(),
            success:function(data) {
                loadBooks();
            },
            error: function(){
                alert("Something is wrong");
            }
        })
    })
});

function loadBooks() {
    $.getJSON('books', function (data) {
        $("#booktable").empty();
        var table = $('<table border= 1; id="booktable"></table>');
        table.append('<tr><th>Title</th><th>Author</th><th>Type</th><th>Release Year</th></tr>');
        $.each(data, function (key, value) {
            var row = $('<tr></tr>');
            var titleCell = $('<td>' + value.title + '</td>');
            var authorCell = $('<td>' + value.author + '</td>');
            var typeCell = $('<td>' + value.type + '</td>');
            var yearCell = $('<td>' + value.year + '</td>');
            row.append(titleCell);
            row.append(authorCell);
            row.append(typeCell);
            row.append(yearCell);
            table.append(row);
        });
        $("#booktable").append(table);
    })
}


function openBook(books){
    document.cookie="name="+books;
    alert(books);
}