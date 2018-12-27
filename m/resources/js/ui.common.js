;(function($, win, doc, undefined) {

    'use strict';
    
    $plugins.common = {
        init: function(){
            $plugins.uiAjax({ id:'baseHeader', url:'../inc/header.html', page:true, callback:$plugins.common.header });
            $plugins.uiAjax({ id:'baseFooter', url:'../inc/footer.html', page:true, callback:$plugins.common.footer });
            
            console.log('------------------------------------------------------');
            !!$('body.page-main').length ? '' : $('body').addClass('page-sub');
            //공통
            $plugins.uiFloating({ 
                id: 'uiBreadcrumb',
                ps: 'top', 
                add: 'baseHeader',
                fix:false
            });

            $plugins.uiSelect();
            
            !$.browser.mobile ? $plugins.uiScrolling() : '';
            //$('#baseWrap').smoothWheel();

            var timer_bread;
            $('#uiBreadcrumb .breadcrumb-btn').on('click', function(){
                clearTimeout(timer_bread);
                
                !$(this).data('selected') ?
                    breadcrumbOpen(this) : breadcrumbClose(this)
            });
            $('#uiBreadcrumb').on('mouseover focus', function(){
                clearTimeout(timer_bread);
            }).on('mouseleave blur', function(){
                breadcrumbClose();
            });

            function breadcrumbOpen(t) {
                $('.breadcrumb-btn').data('selected', false);
                $('.breadcrumb-depth').removeClass('on');
                $('.breadcrumb-list').hide();
                $(t).data('selected', true);
                $(t).closest('.breadcrumb-depth').addClass('on');
                $(t).closest('.breadcrumb-depth').find('.breadcrumb-list').show();
            }
            function breadcrumbClose(t) {
                var $t = $(t),
                    $t2 = $t.closest('.breadcrumb-depth'),
                    $t3 = $t2.find('.breadcrumb-list');

                if (t === undefined ) {
                    $t = $('.breadcrumb-btn');
                    $t2 = $('.breadcrumb-depth');
                    $t3 = $('.breadcrumb-list');
                }  
                timer_bread = setTimeout(function(){
                    $t.data('selected', false);
                    $t2.removeClass('on');
                    $t3.hide();
                },100);
            }
            $('.breadcrumb-home').on('click', function(e){
                e.preventDefault();
                location.href="../main/"
            });
            $('.util-sns').on('click', function(){
                $('.util-sns-wrap').show();
            });
            $('.util-sns-x').on('click', function(){
                $('.util-sns-wrap').hide();
            })

        },
  
        header: function(){
            console.log('header load');
            var timer,
                $bar = $('.menu-gnb-bar');


            $('.menu-gnb-open').on('click', gnbShow);
            $('.menu-gnb-close').on('click', gnbHide);
            
            function gnbShow(){
                console.log(122)
                $('body').addClass('menu-on');
            }
            function gnbHide(){
                $('body').removeClass('menu-on');
            }   

            $plugins.uiAccordion({ id: 'uiGNB', current: null });
        },
        footer: function(){
            console.log('footer load');

            $('.family-site-btn').on('click', function(){
                $('.family-site').addClass('on');
                $('.family-site-list').attr('tabindex',0).focus();
            });
            $('.family-site-list').on('mouseleave blur', function(){
                $('.family-site').removeClass('on');
            });


        }
    };

    //modal
    $plugins.modal = {
        alert: function(v){
            //console.log(v);
        }
    }

    //callback
    $plugins.callback = {
        modal: function(modalId){
            switch(modalId) {
                case 'modalID':
                    break;
            }
        }
    }
   
    $(doc).ready(function() {
         $plugins.common.init();
	});
})(jQuery, window, document);
