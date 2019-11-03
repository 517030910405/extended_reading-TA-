/*
 * jQuery FlexSlider v2.6.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){if(s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt",""),altText=""!==s.attr("data-thumb-alt")?altText=' alt="'+s.attr("data-thumb-alt")+'"':"",a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+altText+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var c=s.attr("data-thumbcaption");""!==c&&void 0!==c&&(a+='<span class="'+i+'caption">'+c+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;(""===l||l===e.type)&&(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),(""===l||l===e.type)&&($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,x=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!x||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!x&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,x=!1,y=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),y=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:y,o=d?y:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){y=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-y,x=d?Math.abs(m)<Math.abs(y-o):Math.abs(m)<Math.abs(b-o);var t=500;(!x||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!x&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).height()},e):t.height(n.slides.eq(n.animatingTo).height())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:n.atEnd&&n.currentSlide===a&&0===e&&"next"===n.direction?!1:!0:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!0||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);;
(function($) {
  Drupal.behaviors.csAdmin = {
    attach: function(cx, s) {
      var personForm = $("form.node-person-form");

      // Only manipulate form if on Person create/edit page
      if (!personForm.length) {
        return;
      }

      // Fields
      var positionField = $(".field-name-field-position");
      var imageField = $(".field-name-field-image");
      var statusField = $(".field-name-field-status");
      var phoneField = $(".field-name-field-phone-number");
      var locationField = $(".field-name-field-location");
      var associationsField = $(".field-name-field-associations");
      var degreesField = $(".field-name-field-degrees");
      var focusField = $(".field-name-field-research-focus");
      var advisorField = $(".field-name-field-advisor");
      var thesisField = $(".field-name-field-thesis-title");
      var yearField = $(".field-name-field-year");
      var researchField = $(".field-name-field-research-area-reference");

      // Groupings of Fields
      var allFields = [positionField, imageField, statusField, phoneField,
                       locationField, associationsField, degreesField, focusField,
                       advisorField, thesisField, yearField, researchField];
      var facultyFields = [positionField, imageField, statusField, associationsField,
                           degreesField, focusField, researchField];
      var researchFields = [positionField, imageField, associationsField,
                            degreesField, focusField, researchField];
      var staffFields = [positionField, imageField, phoneField, locationField];
      var studentFields = [locationField, imageField, focusField, researchField];
      var alumFields = [advisorField, thesisField, yearField, researchField];

      // Start by hiding all fields
      $.each(allFields, function(index, field) {
        field.hide();
      });

      // Then reveal fields based on which Role is selected
      toggleVisibleFields();

      // And update which fields are revealed if Role changes
      $("select#edit-field-role-und").change(toggleVisibleFields);

      function toggleVisibleFields() {
        var role = $("select#edit-field-role-und").find("option:selected").text();
        var fieldsToShow;

        if (/Faculty/.test(role)) { // Faculty
          fieldsToShow = facultyFields;
        } else if (/Research|Postdoc|Visiting/.test(role)) { // Researcher
          fieldsToShow = researchFields;
        } else if (/Staff/.test(role)) { // Staff
          fieldsToShow = staffFields;
        } else if (/Student/.test(role)) { // Student
          fieldsToShow = studentFields;
        } else if (/Alum/.test(role)) { // Alum
          fieldsToShow = alumFields;
        } else { // None selected
          var fieldsToShow = [];
        }

        // Find the fields *not* in fieldsToShow
        var fieldsToHide = allFields.filter(function(field) {
          return !fieldsToShow.includes(field);
        });

        // Hide unnecessary fields
        $.each(fieldsToHide, function(index, field) {
          field.hide();
        });

        // Show necessary fields
        $.each(fieldsToShow, function(index, field) {
          field.show();
        });
      }
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csAwards = {
    attach: function(cx, s) {
      var catSelector = $("select#edit-field-award-category-tid");

      catSelector.children("option[value='All']").text("Category");

      // Force redirect to category page
      catSelector.change(function() {
        var catPage = window.location.origin + "/information/awards-by-category";
        var query = "?" + this.name + "=" + this.value;

        window.location = catPage + query;
      });
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csCaption = {
    attach: function(cx, s) {
      $(".field-type-text-long img, .field-type-text-with-summary img").each(function() {
        if ($(this).parents(".view").length) {
          return;
        }

        $(this).unwrap(); // Remove parent paragraph tag

        // Make sure caption isn't wrapped in paragraph tag
        $(this).next("p").find(".wysiwyg-caption").unwrap();

        var caption = $(this).next(".wysiwyg-caption");

        // Wrap image and caption in figure
        caption.andSelf().wrapAll("<figure />");

        // Align caption by wrapping in figcaption
        caption.wrap("<figcaption></figcaption>");

        // Float figure if necessary
        $(this).parent("figure").addClass("float-" + $(this).css("float"));
      });
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csCourseFilter = {
    attach: function(cx, s) {
      $("#course-filter-input").keypress(function(event) {
        if (event.charCode !== 13) {
          return; // only take action if user presses enter
        }

        var searchTerm = this.value.toLowerCase();

        $(".cs-course").each(function() {
          var isVisible = $(this).text().toLowerCase().includes(searchTerm);

          if (isVisible) {
            $(this).show();
          } else {
            $(this).hide();
          }
        });
      });


      /*
       * This JS requires the following markup to be at the top of the course
       * listing page (added through the WYSIWYG):
       *
       * <div class="course-filter">
       * <h2>Search Courses</h2>
       * <input id="course-filter-input" type="text"></div>
       */
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csEvents = {
    attach: function(cx, s) {
      var eventBlock = $(".view-events.view-display-id-homepage_block");
      var eventListings = eventBlock.children(".attachment, .view-content, .view-empty");

      resizeEventListings();
      $(window).resize(resizeEventListings);

      function resizeEventListings() {
        var tallest = 0;

        eventListings.each(function() {
          if ($(this).css("float") === "none") {
            return;
          }

          tallest = ($(this).outerHeight() > tallest) ? $(this).outerHeight() : tallest;
        });

        eventListings.each(function() {
          if ($(this).css("float") === "none") {
            return $(this).css("height", "");
          }

          $(this).css("height", tallest);
        });
      }
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csHeader = {
    attach: function(cx, s) {
      var isLoggedIn = $("body").hasClass("logged-in");
      var isAdminPage = $("body").hasClass("page-admin");
      var isSubscribePage = $("body").hasClass("page-subscriptions");

      if ( isLoggedIn && (isAdminPage || isSubscribePage) ) {
        return;
      }

      var menu = $("body > header").clone().addClass("compact").attr('aria-label', 'compact header').hide().prependTo("body");

      $(menu).find("[id]").add(menu).each(function(){
        if(this.id != ''){
          this.id = this.id + "-compact";
        }
      });

      //need to update search label to also have a mobile designator
      var searchMenu = $(menu).find("label");
      var searchMenuFor = $(searchMenu).attr('for');
      searchMenu.attr('for', searchMenuFor + '-compact');

      $(window).scroll(function() {
        var onMobile = $(".mobile-logo").is(":visible");
        var scrollAmt = $(window).scrollTop();

        // On mobile, scrolled header styles should be activated on any scroll amount
        if (onMobile && scrollAmt > 0) {
          return $("body").addClass("scrolled-header");
        } else if (onMobile) {
          return $("body").removeClass("scrolled-header");
        }

        // On desktop, header scrolls off screen and then compact version fades in
        if (!onMobile) {
          if (scrollAmt > 150) {
            $("body header").addClass("hidden");
            $("body").addClass("scrolled-header");
            $("body header.compact").fadeIn(100);
          } else {
            $("body header.compact").fadeOut(100, function() {
              $("body").removeClass("scrolled-header");
              $("body header").removeClass("hidden");
            });
          }
        }
      });
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csListing = {
    attach: function(cx, s) {
      var personDups = {};

      // Catalog which listings have multiple people associated with them
      $(".award-recipient, .publication-author").once(function() {
        // Get list of people
        var people = $(this).find("h5").children();

        // If there is more than one person, catalog their listings separately
        if (people.length > 1) {
          var listings = [];

          // Create a unique array of the listings
          $(this).find("ul li").each(function() {
            if ($.inArray($(this).text(), listings) === -1) {
              listings.push($(this).text());
            }
          });

          // Each person becomes a key in personDups, with the array of their
          // listings as the value
          $(people).each(function() {
            var currentPerson = $(this).text();

            if (!personDups[currentPerson]) {
              // If they don't have listings cataloged yet, setup their key
              personDups[currentPerson] = {};

              // Add their html markup
              personDups[currentPerson].markup = this;

              // Add empty array for listings
              personDups[currentPerson].listings = [];
            }

            // Add listings to array for that person
            for (var i in listings) {
              personDups[currentPerson].listings.push(listings[i]);
            }
          });

          // We don't want the entries with multiple people to be visible
          $(this).addClass("hidden");
        }
      });

      // Put listings with multiple people under each person's listing
      for (var key in personDups) {
        var targetRecip = $(".listing:visible h5:contains(" + key + ")");

        if (targetRecip.length > 0) {
          var targetListing = targetRecip.parents(".listing");

          // Detach listings that are currently listed and add them to array of dups
          targetListing.find("ul li").detach().each(function() {
            personDups[key].listings.push($(this).text());
          });
        } else {
          // Pick the first listing
          var randomListing = $(".listing").first();

          var targetListing = randomListing.clone(); // clone it to make the target listing
          targetListing.find("h5 + h5").remove(); // remove any people after the first
          targetListing.removeClass("hidden"); // make sure it's visible
          targetListing.appendTo(randomListing.parent()) // append it to end of list
                       .find("h5").html(personDups[key].markup) // change the title
                       .parents(".listing").find("ul li").remove(); // remove listings
        }

        // Make sure listings are in order
        personDups[key].listings.sort();

        // Create li markup out of listings for that person
        listingsString = "<li>" + personDups[key].listings.join("</li><li>") + "</li>";

        // And rebuild their list
        targetListing.find("ul").append(listingsString);
      };

      // Detach all of the listings, alphabetize them, and put them back
      $(".award-recipient, .publication-author").detach().sort(function(first, second) {
        return alphabetizeByLastName(first, second);
      }).appendTo(".view-publications > .view-content, .view-awards > .view-content");

      function alphabetizeByLastName(a, b) {
        var nameOne = $(a).find(".person-last-name").text().toLowerCase();
        var nameTwo = $(b).find(".person-last-name").text().toLowerCase();

        if (nameOne < nameTwo) {
          return -1;
        }

        if (nameOne > nameTwo) {
          return 1;
        }

        return 0;
      }
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.infoSciMainMenu = {
    attach: function(cx, s) {
      var mainMenu = $("header .menu-name-main-menu > .menu");
      var sidebarMenu = $(".sidebar .menu-name-main-menu > .menu > li.active-trail > .menu");
      var mainMenus = mainMenu.add(sidebarMenu);
      var topLevelLinks = mainMenu.children("li");

      // Add menu-toggle elements to menu
      setupMenu();

      // Set menu to window height on mobile for smooth expand on toggle
      setMenuHeight();
      $(window).resize(setMenuHeight);

      topLevelLinks.each(function(e){
        $(this).children('a').attr('aria-expanded','false');
      })
      // Top-level link click functionality for desktop
      topLevelLinks.click(function(e) {
        // only toggle if on desktop and clicking on parent element
        if ($(".menu-toggle").is(":visible") || (e.target.parentNode !== this)) {
          return;
        }
        e.preventDefault();
        toggleMenu(this);
      });

      // Menu toggle functionality
      $(".menu-toggle").click(function() {
        $("body").toggleClass("menu-open");
        mainMenu.slideToggle();
      });

      // Menu-item toggle functionality
      $(".menu-item-toggle").click(function() {
        $(this).toggleClass("glyphicon-menu-down").toggleClass("glyphicon-menu-up").siblings("ul").slideToggle();
        if ($(this).hasClass("glyphicon-menu-up")) {
          $(this).attr('aria-expanded','true');
        }
        else {
          $(this).attr('aria-expanded','false');
        }

      });

      // "Modal" functionality (darkened bg, clicking to close menu)
      $(".modal-bg").click(function() {
        toggleMenu(".item-open");
      });

      function setupMenu() {
        // Setup top-level links
        topLevelLinks.once(function() {
          var childLink = $(this).children("a").clone();
          $(this).children(".menu").prepend("<li class='parent-link'>");
          $(this).find(".parent-link").append(childLink);
        });

        // Add menu toggle to main menu in header
        $("header .menu-name-main-menu").prepend("<span class='menu-toggle' />");

        // Add menu item toggles to main menus in header and sidebar
        mainMenus.find("li").once(function(){
          // Active menu items start expanded, with up-arrow icon
          // But only if they're in the sidebar or the user is on mobile
          var isSidebar = $(this).parents(".sidebar").length > 0;
          var isMobile = $(".menu-toggle").is(":visible");

          if ((isSidebar || isMobile) && $(this).hasClass("active-trail")) {
            var iconClass = "glyphicon-menu-up";
            $(this).children(".menu").show();
          } else {
            // Everything else starts closed, with down-arrow icon
            var iconClass = "glyphicon-menu-down";
          }

          // Add icon only to "expanded" menu items
          if ($(this).hasClass("expanded")) {
            $(this).prepend("<button aria-label='expand " + $(this).children('a').text() + " menu' aria-expanded='false' class='menu-item-toggle glyphicon " + iconClass + "'>");
          }
        });
      }

      function toggleMenu(item) {
        if ($(item).hasClass("item-open")) { // close menu if already open
          $(item).removeClass("item-open");
          $(item).children('a').attr('aria-expanded','false');
          $(".modal-bg").removeClass("modal-open");
        } else { // open menu
          $(item).siblings(".item-open").removeClass("item-open");
          $(item).addClass("item-open");
          $(item).children('a').attr('aria-expanded','true');
          $(".modal-bg").addClass("modal-open");
        }
      }

      function setMenuHeight() {
        if ($(".menu-toggle").is(":visible")) {
          $("body").height($(window).height());
          mainMenu.height($(window).height() - 50);
        } else {
          mainMenu.height("");
          $("body").height("");
        }
      }
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csResearchArea = {
    attach: function(cx, s) {
      var relatedContent = $("#block-views-research-areas-related-people, #block-views-research-areas-related-phd, #block-views-research-areas-related-news, #block-views-research-areas-related-events");
      relatedContent.detach().prependTo($("#block-system-main .related-content")).show();
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.infoSciSearch = {
    attach: function(cx, s) {
      $("header .block-search")
        .attr("tabindex","-1")
        .prepend("<button class='search-icon' aria-label='Open Search' />") // add search icon
        .append("<button class='search-close' aria-label='Close Search' />") // add close icon
        .append("<span class='cornell-search' />"); // add link to cornell search


      $(".cornell-search").append("<a href='http://www.cornell.edu/search'>Search Cornell.edu</a>")

      $("header .block-search input[type=text]").attr("placeholder", "Search Computer Science");

      $(".search-icon").click(function() {
        if (!$(".search-close").is(":visible")) {
          $("header").toggleClass("search-open");
        }

        $('#edit-search-block-form--2').focus();
      });

      $(".search-close").click(function() {
        $("header").removeClass("search-open");
      });

      $(".cornell-search").focusout(function() {
          $("header").removeClass("search-open");
      });
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csSearchResults = {
    attach: function(cx, s) {
      var searchInput = $(".page-search #edit-keys");

      // Add the search keyword to the title
      $(".page-search h2").append(" for \"" + searchInput.val() + "\"");

      // Remove the keyword from the field and set the label as the placeholder
      searchInput.val("").attr("placeholder", searchInput.prev("label").text());

      //Clean up the data in search field
      //searchInput.val().replace(/[^a-zA-Z0-9]/g, '');
    }
  }
})(jQuery);
;
(function($) {
  Drupal.behaviors.csSlideshow = {
    attach: function(cx, s) {
      $("#homepage-banner .view-slideshow").flexslider({
        start: positionSlides
      });

      $(".flex-control-nav, .flex-direction-nav").wrapAll("<div class='container' />");

      $(window).resize(positionSlides);

      function positionSlides() {
        var slideshowWidth = $(".view-slideshow ul.slides").outerWidth();
        var slideshowHeight = $(".view-slideshow ul.slides").height();

        var imgs = $(".view-slideshow ul.slides img");
        var imgWidth = imgs.width();
        var imgHeight = imgs.height();

        var windowHeight = $(window).height();

        // At landscape-oriented screens < 768px wide, the default image styles
        // (40vh tall and auto width) cause the image to not fill the screen width
        if (imgWidth <= slideshowWidth) {
          // When the image isn't wide enough, make it the width of the screen
          imgs.css({ width: "100%", height: "auto", marginLeft: "" });

          // Now that the image is forced to the width of the screen, check that
          // it's not too short (less than .4 of the height of the screen)
          if (((imgHeight / windowHeight) < .4) && imgWidth == slideshowWidth) {
            // If it is too short, revert to the default css
            imgs.css({ width: "", height: "" });
          }
        } else {
          // If the image isn't too narrow, leave it alone
          imgs.css({ width: "", height: "" });
        }

        // Check if the image is wider/taller than slideshow and calculate margin if so
        var leftMargin = (imgWidth > slideshowWidth) ? ((slideshowWidth - imgWidth) / 2) : "";
        var topMargin = (imgHeight > slideshowHeight) ? ((slideshowHeight - imgHeight) / 2) : "";

        // Center the image vertically or horizontally as necessary
        imgs.css({ marginLeft: leftMargin, marginTop: topMargin });
      }
    }
  }
})(jQuery);
;
