/**
 * @file
 * Custom JS for enabling/disabling the CodeMirror interface on the field_html field.
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.unl_editorCodeMirror = {

    attach: function(context, settings) {
      $('.field--name-field-html .form-type-textarea', context).each(function() {
        // Toggle link not already present?
        if ($(this).children('.unl_editor-toggle').length < 1) {
          // Create a toggle link.
          var $link = '<a href="#" class="unl_editor-toggle">' + Drupal.t('Enable syntax highlighting') + '</a>.';
          // Add toggle link to parent.
          $(this).append($link);
          // Add click event to toggle.
          $(this).children('.unl_editor-toggle').click(function(e){
            e.preventDefault();
            // Get grippie.
            var $grippie = $(this).siblings('.form-textarea-wrapper').find('textarea').parents('.resizable-textarea').find('.grippie');
            // Add nowrapping class to textarea wrapper.
            $(this).siblings('.form-textarea-wrapper').addClass("nowrapping");
            // Enabled?
            if ($(this).hasClass('enabled')) {
              // disable.
              disableCodeMirrorHighlighting($(this), $grippie);
            }
            else {
              // Enable.
              enableCodeMirrorHighlighting($(this), $grippie);
            }
          });
        }
        // Already has a toggle link?
        else {
          $(this).children('.unl_editor-toggle').each(function() {
            // Enabled?
            if ($(this).hasClass('enabled')) {
              // Get grippie
              var $grippie = $(this).siblings('.form-textarea-wrapper').find('textarea').parents('.resizable-textarea').find('.grippie');
              // Enable.
              enableCodeMirrorHighlighting($(this), $grippie);
            }
          });
        }
      });
    }
  };

  /**
   * Function to disabling codemirror syntax highlighting.
   * @param {object} $toggle
   *   Toggle link {object}.
   * @param {object} $grippie
   *   grippie DOM {object}.
   */
  function disableCodeMirrorHighlighting($toggle, $grippie) {
    $toggle.data('editor').toTextArea();
    $grippie.show();
    // Change toggle text.
    $toggle.text(Drupal.t('Enable syntax highlighting'));
    // Remove enabled class.
    $toggle.removeClass('enabled');
  }

  /**
   * function for enabling syntax highlighting.
   * @param {object} $toggle
   *   Toggle link {object}.
   * @param {object} $grippie
   *   grippie DOM {object}.
   */
  function enableCodeMirrorHighlighting($toggle, $grippie) {
    // Get text area.
    var $textarea = $toggle.siblings('.form-textarea-wrapper').find('textarea');
    // Hide grippie.
    $grippie.hide();
    // Configure editor.
    var editor = CodeMirror.fromTextArea($textarea.get(0), {
      mode: 'css',
      tabSize: 0,
      gutters: ['CodeMirror-linenumbers'],
      lineNumbers: true
    });
    $toggle.data('editor', editor);
    // Change toddle text.
    $toggle.text(Drupal.t('Disable syntax highlighting'));
    // Add enabled class.
    $toggle.addClass('enabled');
  }

})(jQuery, Drupal);
