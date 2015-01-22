(function(window, $) {
  var markquery = {
    initialize: function() {

      $("a[href=#]").click(function(e) {
        e.preventDefault();
      });
      $(".animsition").animsition();
      $(".drawer").drawer();
      $('.drawer-dropdown-hover').hover(function(){
        $('[data-toggle="dropdown"]', this).trigger('click');
      });
      $("#js-user-font").userFont({
        store: true,
        userFontFamily: true,
        startFontFamily: "malgun gothic"
      });
      $('.tab-access').focus(function () {
        var e = $(this);
        if (e.offset().top - $(window).scrollTop() < 51) {
          $('html, body').animate({
            scrollTop: e.offset().top - 51
          }, 500);
        }
      });
    }
  };

  $(document).ready(function() {
    markquery.initialize();
  });

  window.markquery = window.markquery || {};
  window.markquery = markquery;
})(window, window.jQuery);
