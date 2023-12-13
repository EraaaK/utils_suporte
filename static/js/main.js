var menuTitles = document.querySelectorAll('.menu-item > a > .menu-title');
var CategorySelect = document.getElementById('categorySelect');
var articles = undefined;
var categories = undefined;

$(function () {
  $('.newArticleButton').tooltip({
      placement: 'right'
  })
  getCategories()
  $(".newArticleButton").hover(function() {
    $(this).css('cursor', 'pointer');
   });
  $(".newArticleButton").click(function() {
    $('#newArticleModal').modal('show');
  });  
})

menuTitles.forEach(function (menuTitle) {
    menuTitle.addEventListener('click', function () {
        switch (this.innerText) {
            case "Hi Inbox":
                $('.inbox').show();
                $('.social').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Social":
                $('.inbox').hide();
                $('.social').show();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
        }
    });
});

async function getArticles(categoryName) {
  $('#loadingModal').modal('show');
 const response = await $.ajax({
   url: "http://127.0.0.1:8080/articles?category=" + categoryName,
   type: 'GET',
   dataType: 'json'
 });
  articles = response;
  $('#loadingModal').modal('hide');
  return articles;
}

async function getCategories() {
 const response = await $.ajax({
   url: "http://127.0.0.1:8080/categories",
   type: 'GET',
   dataType: 'json'
 });
  categories = response;
  for (var i = 0; i < categories.length;i++){
    var option = document.createElement("option");
    option.value = categories[i].id;
    option.text = categories[i].name;
    option.setAttribute("name", categories[i].name)
    CategorySelect.appendChild(option);
  }
  return categories;
}

function renderArticles(category) {
  switch(category){
    case "Hi Inbox":
      var mainDiv = document.querySelector('.inbox');
      break;
    case "Hi Social":
      var mainDiv = document.querySelector('.social');
      break;
  }
  var accordionHTML = '';
  for (var i = 0; i < articles.length; i++) {
   accordionHTML += `
    <div class="accordion" id="accordion${i}" style="margin-top: 2%; margin-bottom: 2%;">
     <div class="accordion-item">
       <h2 class="accordion-header" id="heading${i}">
         <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
           <strong>${articles[i].title}</strong>
         </button>
       </h2>
       <div id="collapse${i}" class="accordion-collapse collapse" data-bs-parent="#accordion${i}">
         <div class="accordion-body">
           ${articles[i].content}
         </div>
       </div>
     </div>
    </div>
   `;
   }
  mainDiv.innerHTML = accordionHTML;
}
 $('#newArticleForm').on('submit', function(e) {
  e.preventDefault();
  let newArticle = {
    "categoryId": $('#categorySelect').find(':selected').attr('value'),
    "categoryName": $('#categorySelect').find(':selected').attr('name'),
    "title": document.getElementById('articleTitle').value,
    "message": document.getElementById('message').value
  };
  console.log(newArticle);
  $.ajax({
    type: "POST",
    url: $(this).attr('action'),
    data: JSON.stringify(newArticle),
    dataType: "json",
    contentType : "application/json"
  });
  location.reload(true);
 });
 
 