(function($) {

 

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



    $(window).on('load', function(){

        menuScripts();

        form__Ani();

        $(".lines__el").css('opacity',1);

        new WOW().init();



        $(".preloader-area").fadeOut('400');



    }); 



    $(".header-area .main-nav .navbar-nav li ul a[href='case-studies.html']").parent('li').addClass('d-none');



    // HEADER SCRIPTS

    function menuScripts(){





        $(".header-area .main-nav .navbar-nav .link-item").hover(function() {

            var _this = $(this);

            _this.siblings(".link-item").addClass('disabled');

            _this.removeClass('disabled');

            $(this).children('ul').stop().slideDown('fast', function() {

                _this.children('ul').css({

                    height:"auto" 

                }); 

            }); 

        }, function() {

            $(this).children('ul').stop().slideUp('fast');

            $(".header-area .main-nav .navbar-nav li").removeClass('disabled');

        });



        var getLinkParent = $(".main-nav .navbar-nav li"); 

        var getLink = $(".main-nav .navbar-nav li > a .text");  

        var SocialLinks = $(".header-area .nav-container .social-links li");  



        gsap.set(getLink, {y:100});

        gsap.set(getLinkParent, {overflow:'hidden'}); 

        gsap.set(SocialLinks, {y:50, opacity:0}); 

 

        var menuTl = gsap.timeline({paused:true});

        menuTl 

        .to(".main-nav", {

            y:"0%",

            duration:1,   

            ease: Power4.easeOut 

        }) 

        .to(getLink, { 

            y:0, 

            duration:1,

            ease:Expo.easeOut, 

            stagger:{

                amount:0.6

            },

        }, "-=0.75") 

        .to(SocialLinks, {

            y:0,

            opacity:1, 

            duration:1,

            stagger:0.05,   

            ease: Power4.easeOut 

        }, "-=1"); 



        menuTl.reverse(); 



        $(".hub-toggle").on('click', function(){

            $(this).toggleClass('open');

            $(this).closest('.header-area').toggleClass('open_dropdown');

            if(menuTl.reversed()){

                menuTl.timeScale(1).play() 

            }else{

                menuTl.timeScale(2.5).reverse(); 

            }



        });



        // $(".header-area .main-nav .navbar-nav li a").on('click', function() {

        //     menuTl.timeScale(2).reverse();

        // });



        

        function SectionPagination(){

            var sectionPaginationLinks = $('.section-pagination li a[href*="#"]:not([href="#"]');

            sectionPaginationLinks.on('click', function(event) {

              event.preventDefault();

              var $section = $($(this).attr('href'));

              if($section.length){

                if($section){

                  $('html, body').animate({

                    scrollTop:$section.offset().top

                  }, 50) 

                }

              }

            });



        } SectionPagination(); 





    }

  

    function form__Ani() {

        

        var line1 = $(".form__wrapper__line .form-top-line .main-line");

        var line2 = $(".form__wrapper__line .form-title .title-line .title-line-1 .main-line");

        var line3 = $(".form__wrapper__line .form-title .title-line .title-line-2 svg path");



        if($(".form__wrapper__line").length){

            gsap.set([line1,line2], {width:"0%"});

            gsap.set(line3, {drawSVG:"0%"});



            gsap.timeline({

                scrollTrigger:{

                    trigger:".form__wrapper__line",

                    start:"top 80%",

                    end: "bottom 100%", 

                    scrub:true, 

                    // markers:{

                    //     startColor:"blue",

                    //     endColor:"blue" 

                    // }

                } 

            })

            .to(line1, {width:"100%"})

            .to(line2, {width:"100%"})

            .to(line3, {drawSVG:"100%"}) 

        }

    }



    if($('.sm-bg-color-title').length){

        let sml__BG = $('.sm-bg-color-title .bg .main-bg');

        gsap.set(sml__BG, {

            width:'0%'

        })

        $('.sm-bg-color-title').each(function() {

            let this__ = $(this);

            let b__g = $(this).find('.bg .main-bg');

            gsap.timeline({

                scrollTrigger:{

                    trigger:this__,

                    start:'top 95%',

                    end:'150 90%',  

                    scrub:0.4,

                    // markers:true

                }

            }).to(b__g, 0.5, {width:"100%", ease: Power3.easeInOut})

        });

    }


    $('.accordion__wrap > .accordion-item:eq(0) .accordion-title').next().slideDown();
    $('.accordion__wrap > .accordion-item:eq(0)').addClass('active'); 

    $('.accordion__wrap .accordion-title').click(function(j) {
        var dropDown = $(this).closest('.accordion-item').find('.accordion-body');

        $(this).closest('.accordion__wrap').find('.accordion-body').not(dropDown).slideUp(250);

        if ($(this).parent(".accordion-item").hasClass('active')) {
            $(this).parent(".accordion-item").removeClass('active');
        } else {
            $(this).closest('.accordion__wrap').find('.accordion-item.active').removeClass('active');
            $(this).parent(".accordion-item").addClass('active');
        }

        dropDown.stop(false, true).slideToggle(250); 

        j.preventDefault();
    });


})(jQuery); 


  


!(function (s) {

    "use strict";



    var html = `

        <div class="btt-progress-wrap d-flex align-items-center">

          <span class="arrow">

            <svg viewBox="0 0 12.462 17.5">

              <path d="M2.282-8.693l2.561-2.561V.313a.937.937,0,0,0,.938.938h.938A.937.937,0,0,0,7.656.313V-11.255l2.561,2.561a.937.937,0,0,0,1.326,0l.663-.663a.937.937,0,0,0,0-1.326L6.913-15.975a.937.937,0,0,0-1.326,0L.294-10.682a.937.937,0,0,0,0,1.326l.663.663A.937.937,0,0,0,2.282-8.693Z" transform="translate(-0.019 16.25)"/>

            </svg>

          </span>     

        </div>

    `; 

    $("body").append(html);



    $(window).on('scroll', function() {

        if($(this).scrollTop() > $('.main-root').innerHeight() / 3.5){

            $(".btt-progress-wrap").addClass('active');

        }else{

            $(".btt-progress-wrap").removeClass('active');

        }

    });



    $('.btt-progress-wrap').click(function() {

        gsap.to(window, 1, {

            scrollTo:{y:0},

            ease:"none"

        })

    });

    

})(jQuery);




    window.addEventListener('DOMContentLoaded', function() {
      // Get all anchor elements
      var anchors = document.getElementsByTagName('a');
      
      // Iterate over each anchor element
      for (var i = 0; i < anchors.length; i++) {
        var href = anchors[i].getAttribute('href');
        
        // Remove .html and index from href attribute
        href = href.replace(/\/index(\.html)?/g, '').replace(/\.html/g, '');
        
        // Update href attribute
        anchors[i].setAttribute('href', href);
      }
    });
