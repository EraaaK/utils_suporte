var menuTitles = document.querySelectorAll('.menu-item > a > .menu-title');

menuTitles.forEach(function (menuTitle) {
    menuTitle.addEventListener('click', function () {
        switch (this.innerText) {
            case "Troubleshooting":
                break;
            case "DirectTalk":
                break;
            case "YourViews":
                break;
            case "HiInbox":
                $('.inbox').show();
                $('.social').hide();
                break;
            case "HiSocial":
                $('.inbox').hide();
                $('.social').show();
                break;
        }
    });
});


function getArticles(category) {
    $.get('' + category, function(data) {
        console.log(data);
    });
}