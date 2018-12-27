;(function ($, win, doc, undefined) {

    'use strict';
    
    console.log('base.js')

    var script_file = '';
    
    script_file += '<script src="../resources/js/lib/owl.carousel.modify.js"></script>';
    script_file += '<script src="../resources/js/ui.plugins.js"></script>';
    script_file += '<script src="../resources/js/ui.common.js"></script>';

    $('head').append(script_file);

})(jQuery, window, document);	