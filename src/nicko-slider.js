(function($, window){

    window.$.fn.nickoSlider = function(options) {

        var settings = $.extend({
            transitionDelay: 5000,
            transitionDuration: 500,
            autoPlay: true,
            arrows: true,
            dots: true
        }, options);

        var pluginContext = this;

        return this
        
        .each(function(){
            var slideCount;
            var currentSlide = 0;
            var nextSlide = 1;
            var inProgress = false;
            var currentContext;
            var pluginSettings = settings;
            var autoTransitionID; 
            var currentContext = $(this);

            var nickoFadeToSlide = function (toSlide){
                inProgress = true;
                toSlide = toSlide - 1;

                if(currentSlide != toSlide){
                    clearInterval(autoTransitionID);
                    if(slideCount != 'undifined' && toSlide >= slideCount){
                        nextSlide = slideCount - 1;
                    }
                    else if(slideCount != 'undifined' && toSlide <= 0){
                        nextSlide = 0;
                    }
                    else{
                        nextSlide = toSlide;
                    }

                    if(slideCount != 'undifined' && currentSlide >= slideCount){
                        currentSlide = 0;
                    }
                    if(!inProgress){
                        currentContext.find('.nicko-slider-item').eq(currentSlide).css('z-index', '3');
                        currentContext.find('.nicko-slider-item').eq(nextSlide).css('z-index', '4').addClass('fading-in').fadeIn(pluginSettings.transitionDuration, function(){
                            currentContext.find('.nicko-slider-item.active').removeClass('active').css('display', 'none');
                            $(this)
                            .removeClass('fading-in')
                            .addClass('active')
                            .css('z-index', '5');
                            inProgress = false;
                            if(pluginSettings.autoPlay){
                                autoTransitionID = setInterval(function(){
                                    changeSlideAuto(pluginSettings, currentContext);
                                }, pluginSettings.transitionDelay);
                            }
                        });
                    }
                    else{
                        currentContext.find('.nicko-slider-item').eq(currentSlide).css('z-index', '3');
                        currentContext.find('.nicko-slider-item').eq(nextSlide).css('z-index', '4').addClass('fading-in').fadeIn(pluginSettings.transitionDuration, function(){
                            currentContext.find('.nicko-slider-item.active').removeClass('active').css('display', 'none');
                            $(this)
                            .removeClass('fading-in')
                            .addClass('active')
                            .css('z-index', '5');
                            inProgress = false;
                            if(pluginSettings.autoPlay){
                                autoTransitionID = setInterval(function(){
                                    changeSlideAuto(pluginSettings, currentContext);
                                }, pluginSettings.transitionDelay);
                            }
                        });
                    }
                    currentSlide = nextSlide;
                    nextSlide++;
                    dotHighlights(); 
                }      
            }
            pluginContext.nickoGoTo = nickoFadeToSlide;

            var dotHighlights = function(){
                if(pluginSettings.dots){
                    currentContext.find('.nicko-dots').find('.active').removeClass('active');
                    currentContext.find('.nicko-dots').find('.dot').eq(currentSlide).addClass('active');
                }
            }       

            var changeSlideAuto = function(settings, currentContext){
                inProgress = true;
                if(slideCount != 'undifined' && nextSlide >= slideCount){
                    nextSlide = 0;
                }
                if(slideCount != 'undifined' && currentSlide >= slideCount){
                    currentSlide = 0;
                }
                currentContext.find('.nicko-slider-item').eq(currentSlide).css('z-index', '3');
                currentContext.find('.nicko-slider-item').eq(nextSlide).css('z-index', '4').addClass('fading-in').fadeIn(settings.transitionDuration, function(){
                    currentContext.find('.nicko-slider-item.active').removeClass('active').css('display', 'none');
                    $(this)
                    .removeClass('fading-in')
                    .addClass('active')
                    .css('z-index', '5');
                    inProgress = false;
                });
                currentSlide = nextSlide;
                nextSlide++;
                dotHighlights();
            }
            var changeSlidePrev = function(settings, currentContext){
                if(currentSlide <= 0){
                    nextSlide = slideCount - 1;
                }
                else{
                    nextSlide = currentSlide - 1;
                }

                inProgress = true;
                clearInterval(autoTransitionID);
                currentContext.find('.nicko-slider-item').eq(currentSlide).css('z-index', '3');
                currentContext.find('.nicko-slider-item').eq(nextSlide).css('z-index', '4').addClass('fading-in').fadeIn(settings.transitionDuration, function(){
                    currentContext.find('.nicko-slider-item.active').removeClass('active').css('display', 'none');
                    $(this)
                    .removeClass('fading-in')
                    .addClass('active')
                    .css('z-index', '5');
                    inProgress = false;
                    if(pluginSettings.autoPlay){
                        autoTransitionID = setInterval(function(){
                            changeSlideAuto(pluginSettings, currentContext);
                        }, pluginSettings.transitionDelay);
                    }
                });
                currentSlide = nextSlide;
                nextSlide++;
                dotHighlights();
            }
            pluginContext.nickoPrev = function(){
                changeSlidePrev(pluginSettings, currentContext);
            }
            var changeSlideNext = function(settings, currentContext){
                inProgress = true;
                if(slideCount != 'undifined' && nextSlide >= slideCount){
                    nextSlide = 0;
                }
                if(slideCount != 'undifined' && currentSlide >= slideCount){
                    currentSlide = 0;
                }
                clearInterval(autoTransitionID);
                currentContext.find('.nicko-slider-item').eq(currentSlide).css('z-index', '3');
                currentContext.find('.nicko-slider-item').eq(nextSlide).css('z-index', '4').addClass('fading-in').fadeIn(settings.transitionDuration, function(){
                    currentContext.find('.nicko-slider-item.active').removeClass('active').css('display', 'none');
                    $(this)
                    .removeClass('fading-in')
                    .addClass('active')
                    .css('z-index', '5');
                    inProgress = false;
                    if(pluginSettings.autoPlay){
                        autoTransitionID = setInterval(function(){
                            changeSlideAuto(pluginSettings, currentContext);
                        }, pluginSettings.transitionDelay);
                    }
                });
                currentSlide = nextSlide;
                nextSlide++;
                dotHighlights();
            }
            pluginContext.nickoNext = function(){
                changeSlideNext(pluginSettings, currentContext);
            }

            currentContext.addClass('nicko-slider nicko-initialized');
            currentContext.children().wrap('<div class="nicko-slider-item"></div>');
            currentContext.children().wrapAll('<div class="nicko-slider-items-wrap"></div>');
            currentContext.find('.nicko-slider-item').children().wrap('<div class="nicko-slider-item-inner"></div>');
            currentContext.find('.nicko-slider-item').eq(0).addClass('active').css('z-index', '5');
            slideCount = currentContext.find('.nicko-slider-item').eq().prevObject.length;

            if(pluginSettings.autoPlay){
                autoTransitionID = setInterval(function(){
                    changeSlideAuto(pluginSettings, currentContext);
                }, pluginSettings.transitionDelay);
            }

            if(pluginSettings.arrows){
                currentContext.append('<div class="nicko-arrows"><button class="arrow prev">Previous</button><button class="arrow next">Next</button></div>');
                currentContext.find('.arrow.prev').on("click", function(){
                    if(!inProgress){
                        changeSlidePrev(pluginSettings, currentContext);
                    }
                });
                currentContext.find('.arrow.next').on("click", function(){
                    if(!inProgress){
                        changeSlideNext(pluginSettings, currentContext);
                    }
                });
            }

            if(pluginSettings.dots){
                currentContext.append('<ul class="nicko-dots"></ul>');
                for(i = 1; i <= slideCount; i++){
                    if(i==1){
                        currentContext.find('.nicko-dots').append('<li><button class="active dot dot'+ i +'">'+ i +'</button></li>');
                    }
                    else{
                        currentContext.find('.nicko-dots').append('<li><button class="dot dot'+ i +'">'+ i +'</button></li>');
                    }
                    
                    currentContext.find('.dot'+ i).on('click', function(){
                        if(!inProgress){
                            nickoFadeToSlide($(this).parents('.nicko-dots').find('.dot').index(this) + 1);
                        }
                    });
                }
            }
            
            function sliderHeight(){
                var nickoSliderItemHeight;
                var nickoSliderItemHeighTallest = 0;
                for(i = 0; i < slideCount; i++){
                    nickoSliderItemHeight = currentContext.find('.nicko-slider-item-inner').eq(i).outerHeight();
                    console.log(nickoSliderItemHeight);
                    if(nickoSliderItemHeight > nickoSliderItemHeighTallest){
                        nickoSliderItemHeighTallest = nickoSliderItemHeight;
                    }
                }
                currentContext.find('.nicko-slider-items-wrap').height(nickoSliderItemHeighTallest);
            }
            sliderHeight();

            $(window).resize(sliderHeight);

        })
};

}(jQuery, window));