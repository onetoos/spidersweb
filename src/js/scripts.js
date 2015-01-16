$(function() {
    $("a[href=#]").click(function(e) {
      e.preventDefault();
    });
    $(".drawer").drawer();
    $('.drawer-dropdown-hover').hover(function(){
      $('[data-toggle="dropdown"]', this).trigger('click');
    });
    $(".widget-feed").rss(markqueryRSS, {
      limit: 5,
      effect: 'slideFast',
      layoutTemplate: '<ul class=\"media-list\">{entries}</ul>',
      entryTemplate: '<li class=\"media\"><a class=\"pull-left\" href=\"{url}\"><img class=\"media-object media-thumbnail\" src=\"{featuredImageUrl}\" alt=\"{featuredImageAlt}\"></a><div class=\"media-body\"><h4><a href=\"{url}\">{title}</a></h4><small>{kdate}</small></div></li>'
    });
    $('.tab-access').focus(function () {
      var e = $(this);
      if (e.offset().top - $(window).scrollTop() < 51) {
        $('html, body').animate({
          scrollTop: element.offset().top - 51
        }, 500);
      }
    });
    $("#js-user-font").userFont({
      store: true,
      userFontFamily: true,
      startFontFamily: "malgun gothic"
    });
    var getMarkdown = document.getElementById('marked');
    if(getMarkdown) {
      var setMarkdown = getMarkdown.innerText ? getMarkdown.innerText : getMarkdown.textContent;
      $(".entry-markdown").html(marked(setMarkdown));
    };
    var splitURL = window.location.host + window.location.pathname;
    var pathArray = splitURL.split( '/' );
    if(pathArray[1] == "") {
      $(".cover").addClass("cover-init");
    };
});

function printButton(){window.print();};
function searchURL(){ window.location.href= '/search/' + looseURIEncode(document.getElementsByName('q')[0].value) + '?cx=' + customSearchAPI + '&cof=FORID%3A11&q=' + looseURIEncode(document.getElementsByName('q')[0].value);};
