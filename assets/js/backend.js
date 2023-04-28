'use strict';

(function($) {
  $(function() {
    if ($('input[name="_woovr_active"]:checked').val() == 'yes') {
      $('.woovr_show_if_active').css('display', 'flex');
    }

    woovr_clear_image();
  });

  $(document).on('change', 'input[name="_woovr_active"]', function() {
    if ($(this).val() == 'yes') {
      $('.woovr_show_if_active').css('display', 'flex');
    } else {
      $('.woovr_show_if_active').css('display', 'none');
    }
  });

  $(document).on('change', '.woovr_clear_image', function() {
    woovr_clear_image();
  });

  // choose background image
  var woovr_file_frame;

  $(document).
      on('click touch', '#woovr_clear_image_upload', function(event) {
        event.preventDefault();

        // If the media frame already exists, reopen it.
        if (woovr_file_frame) {
          // Open frame
          woovr_file_frame.open();
          return;
        }

        // Create the media frame.
        woovr_file_frame = wp.media.frames.woovr_file_frame = wp.media({
          title: 'Select a image to upload', button: {
            text: 'Use this image',
          }, multiple: false,	// Set to true to allow multiple files to be selected
        });

        // When an image is selected, run a callback.
        woovr_file_frame.on('select', function() {
          // We set multiple to false so only get one image from the uploader
          var attachment = woovr_file_frame.state().
              get('selection').
              first().
              toJSON();

          // Do something with attachment.id and/or attachment.url here
          if ($('#woovr_clear_image_preview img').length) {
            $('#woovr_clear_image_preview img').
                attr('src', attachment.url);
          } else {
            $('#woovr_clear_image_preview').
                html('<img src="' + attachment.url + '"/>');
          }
          $('#woovr_clear_image_id').val(attachment.id);
        });

        // Finally, open the modal
        woovr_file_frame.open();
      });

  function woovr_clear_image() {
    if ($('.woovr_clear_image').val() == 'custom') {
      $('.woovr_clear_image_custom').show();
    } else {
      $('.woovr_clear_image_custom').hide();
    }
  }
})(jQuery);