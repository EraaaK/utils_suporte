var menuTitles = document.querySelectorAll('.menu-item > a > .menu-title');
var articles = undefined;

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
   url: "https://utilssuporte.tn-russo.repl.co/articles?category=" + categoryName,
   type: 'GET',
   dataType: 'json'
 });
  articles = response;
  $('#loadingModal').modal('hide');
  return articles;
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

$(function () {
  $('.newArticleButton').tooltip({
      placement: 'right'
  })
})

