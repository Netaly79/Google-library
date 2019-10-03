"use strict"
let $searchForm=$("#search-form");

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
        console.log("response ", response);
    }).fail ((error) => {
        console.log ("error", error);
    })
}