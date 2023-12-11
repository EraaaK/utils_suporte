var menuTitles = document.querySelectorAll('.menu-item > a > .menu-title');
var articles = undefined;

menuTitles.forEach(function (menuTitle) {
    menuTitle.addEventListener('click', function () {
        switch (this.innerText) {
            case "Hi Inbox":
                $('.inbox').show();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
            case "Hi Social":
                $('.inbox').hide();
                $('.social').show();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Hi Flow":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').show();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Hi Bot":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').show();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Hi Chat":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').show();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Hi FAQ":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').show();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Hi Phone":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').show();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Hi Mail":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').show();
                $('.reviews').hide();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Reviews":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').show();
                $('.voices').hide();
                getArticles(this.innerText)
                .then(res => {
                renderArticles(this.innerText);
                });
                break;
              case "Voices":
                $('.inbox').hide();
                $('.social').hide();
                $('.flow').hide();
                $('.bot').hide();
                $('.chat').hide();
                $('.faq').hide();
                $('.phone').hide();
                $('.mail').hide();
                $('.reviews').hide();
                $('.voices').show();
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
    case "Hi Flow":
      var mainDiv = document.querySelector('.flow');
      break;
    case "Hi Bot":
      var mainDiv = document.querySelector('.bot');
      break;
    case "Hi Chat":
      var mainDiv = document.querySelector('.chat');
      break;
    case "Hi FAQ":
      var mainDiv = document.querySelector('.faq');
      break;
    case "Hi Phone":
      var mainDiv = document.querySelector('.phone');
      break;
    case "Hi Mail":
      var mainDiv = document.querySelector('.mail');
      break;
    case "Reviews":
      var mainDiv = document.querySelector('.reviews');
      break;
    case "Voices":
      var mainDiv = document.querySelector('.voices');
      break;
  }
  var accordionHTML = '';
  for (var i = 0; i < articles.length; i++) {
   accordionHTML += `
    <div class="accordion " id="accordion${i}" style="margin-top: 2%; margin-bottom: 2%;">
     <div class="accordion-item">
       <h2 class="accordion-header" id="heading${i}">
         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
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

