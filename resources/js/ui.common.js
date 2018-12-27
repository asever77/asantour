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
                ps:'top', 
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
                },300);
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

            $('#baseHeaderWrap').on('mouseover focus', function(){
                $('#baseHeader').addClass('on');
            }).on('mouseleave blur', function(){
                $('#baseHeader').removeClass('on');
            });
            $(win).on('scroll', function(){

                if ($(win).scrollTop() > 50) {
                    $('#baseHeader').addClass('on_');
                } else {
                    $('#baseHeader').removeClass('on_');
                }
            });

            $('.menu-gnb-btn').on('mouseover focus', function(){
                var n = $(this).closest('.menu-gnb-item').index();
                gnbShow(n);
            }).on('mouseleave blur', function(){
                timer = setTimeout(function(){
                     gnbHide();
                }, 50);
               
            });
            $('.menu-gnb-bar, .menu-gnb-dep2').on('mouseover focus', function(){
                clearTimeout(timer);
            }).on('mouseleave blur', function(){
                timer = setTimeout(function(){
                     gnbHide();
                }, 50);
            });

            function gnbShow(n){
                clearTimeout(timer);
                $('.menu-gnb-dep2').removeClass('ready').removeAttr('style');
                $('.menu-gnb-item').eq(n)
                .find('.menu-gnb-dep2').addClass('ready').stop().animate({
                    opacity:1
                },200);
                $bar.addClass('on');
            }
            function gnbHide(){
                $('.menu-gnb-dep2').removeClass('ready').removeAttr('style');
                $bar.removeClass('on');
            }  

            //quick menu
            $('.base-quick-btn').on('click',function(){
                $(this).closest('.base-quick.on').length ?
                    quickHide() : quickShow();
            });
            $('#quickGoodsSlide').owlCarousel({
                loop:true,
                margin:0,
                nav:false,
                dot:true,
                responsive:{
                    0:{
                        items:1
                    }
                }
            });
            function quickShow(){
                $('.base-quick').addClass('on');
            }
            function quickHide(){
                $('.base-quick').removeClass('on');
            }

            //all menu
            $('.btn-allmenu').off('click.allmenu').on('click.allmenu', function(){
                if (!$(this).data('selected')) {
                    $(this).data('selected', true).addClass('active');
                    $('#allMenuWrap').addClass('on');
                } else {
                    $(this).data('selected', false).removeClass('active');
                    $('#allMenuWrap').removeClass('on');
                }
            })
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

            $('.page-top').on('click', function(){
                $plugins.uiScroll({ ps:'top', speed:200});
            });

            setTimeout(function(){
               !!$('.img-full').length ? $plugins.uiBgScrollMove() : '';
            }, 100)
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
