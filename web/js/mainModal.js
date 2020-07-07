$(function() {

  $(document).on('click', '[data-demo]', function() {
    var options = $(this).data('demo');
    if (!options.content.target) {
      options.content.target = '#demo-modal';
    }

    new Custombox.modal(options).open();
  });


});