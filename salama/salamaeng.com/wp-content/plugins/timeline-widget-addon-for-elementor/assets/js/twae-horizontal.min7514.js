class HorizontalSliderClass extends elementorModules.frontend.handlers.Base{getDefaultSettings(){return{selectors:{swiperContainer:".twae-slider-container.swiper-container",nextButton:".twae-button-next",prevButton:".twae-button-prev"}}}getDefaultElements(){const selectors=this.getSettings("selectors");return{$swiperContainer:this.$element.find(selectors.swiperContainer),$nextButton:this.$element.find(selectors.nextButton),$prevButton:this.$element.find(selectors.prevButton),$paginationEl:this.$element.find(selectors.paginationEl)}}bindEvents(){var selector=this.elements.$swiperContainer,slidestoshow=selector.data("slidestoshow"),autoplay=selector.data("autoplay"),autoHeight=selector.data("autoHeight"),nextButton=this.elements.$nextButton,prevButton=this.elements.$prevButton,paginationEl=this.elements.$paginationEl,Navigation,swiper,lang_dir;if("rtl"==selector.data("dir"))var Navigation={nextEl:prevButton[0],prevEl:nextButton[0]};else Navigation={nextEl:nextButton[0],prevEl:prevButton[0]};var swiperElement=selector[0],swiperConfig={autoHeight:autoHeight,spaceBetween:15,autoplay:autoplay,delay:3e3,slidesPerView:slidestoshow,direction:"horizontal",pagination:{el:paginationEl,type:"progressbar"},navigation:Navigation,breakpoints:{280:{slidesPerView:1},768:{slidesPerView:slidestoshow},1024:{slidesPerView:slidestoshow}}};if(selector.length>0)if("undefined"==typeof Swiper){const asyncSwiper=elementorFrontend.utils.swiper;new asyncSwiper(swiperElement,swiperConfig).then(newSwiperInstance=>{swiper=newSwiperInstance})}else swiper=new Swiper(swiperElement,swiperConfig)}}jQuery(window).on("elementor/frontend/init",()=>{const addHandler=$element=>{elementorFrontend.elementsHandler.addHandler(HorizontalSliderClass,{$element:$element})};elementorFrontend.hooks.addAction("frontend/element_ready/timeline-widget-addon.default",addHandler)});