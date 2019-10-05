"use strict"
let $searchForm=$("#search-form");
let $bookList=$("#book-list");
let books=[];
let $currentBook=$('#current-book');
let $bookDescription=$(".book-description")

$searchForm.on("submit", function(event) {
    event.preventDefault();
    let querry=$(this).find("[name='search-term']").val().replace(/\s/g, "+");
    getBooks(querry);
});

function getBooks(query){
    let url= 'https://www.googleapis.com/books/v1/volumes';

    $.ajax({
        url,
        method:"GET",
        data: `q=${query}`
    }).done((response) => {
        books=response.items;
        addBooks(response.items);
    }).fail ((error) => {
        console.log ("error", error);
    })
}
function addBooks(data){
    $bookList.empty();
    data.forEach((book) => {
        $("<a href=''>").addClass("list-group-item")
        .text(book.volumeInfo.title)
        .attr("data-id", book.id)
        .appendTo($bookList)
    });
}
$bookList.on("click","[data-id]", function (event){
    event.preventDefault();
    let bookId=$(this).data("id");
    console.log (bookId);
    let book=books.find((item) =>item.id===bookId);
    console.log (book);
    $currentBook.fadeIn();
    $currentBook.find(".book-title").text(`${book.volumeInfo.title} | ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No author"} ${book.volumeInfo.publishedDate}`);
    $bookDescription.empty();
    
    $("<img>").attr("src",book.volumeInfo.imageLinks.thumbnail).appendTo($bookDescription);
    $("<a>").attr("href", book.volumeInfo.previewLink)
    .attr("target","_blank")
    .text("read more...")
    .addClass("read-link")
    .appendTo($bookDescription);


})