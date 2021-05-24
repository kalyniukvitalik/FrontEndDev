 'use strict';
 
 (function(global, exportName) { 
    global[exportName] = createSlider;

    function createSlider(selector, sliderType, autoplay) {
        const result = {
            selector,
            init,
            showSlide,
            next,
            prev,
            render,
            activateAutoplay,
        };
    
        if (sliderType === 'slide') {
            result.render = renderSlide;
        }
    
        result.init();

        if (autoplay) {
            result.activateAutoplay();
        }

        return result;
    }

    function activateAutoplay() {
        this.autoplayEl = this.rootEl.querySelector('.slider__timeline');

        if (this.autoplayEl) {
            this.autoplayEl.classList.add('animated')
            this.autoplayEl.addEventListener(
                'animationiteration', 
                 this.next.bind(this)  
            );
        } 

        // setInterval(this.next.bind(this), 3000);
    }
    
    function init() {
        this.currentSlide = 0,
        this.rootEl = document.querySelector(this.selector);
        this.bodyEl  = this.rootEl.querySelector(`.slider__body`);
        this.slideCol = this.rootEl.querySelectorAll('.slider__slide');
        this.nextBtn = this.rootEl.querySelector(`.slider__next`);
        this.prevBtn  =  this.rootEl.querySelector(`.slider__prev`);
    
        this.nextBtn.addEventListener(`click`,  this.next.bind(this));
        this.prevBtn.addEventListener(`click`, this.prev.bind(this));
    }
    
    /**
     * @param {number} slideIdx 
     */
    function showSlide(slideIdx) {
        const slideCount = this.slideCol.length;
    
        // 1 + 7 => 8 % 7 => 1
        // 9 + 7 => 16 % 7 => 2
        // -1 + 7 => 6 % 7 => 6
        this.currentSlide = (slideCount + slideIdx) % slideCount;
    
        this.render();
    }
    
    function next() {
        this.showSlide(this.currentSlide + 1);
    }
    
    function prev() {
        this.showSlide(this.currentSlide - 1);
    }
    
    function render() {
        // const currentSlideIndx = this.currentSlide;
        const { 
            currentSlide: currentSlideIdx, 
            slideCol, 
        } = this;
        const activeElementClassName = 'slider__current';
        const currentSlideEl = slideCol[currentSlideIdx];
        const activeSlideEl = this.rootEl.querySelector(`.${activeElementClassName}`);
    
        if (activeSlideEl) {
            activeSlideEl.classList.remove(activeElementClassName);
        }
    
        if (currentSlideEl) {
            currentSlideEl.classList.add(activeElementClassName);
        } else {
            throw new Error(`Can't find current slide: ${currentSlideIdx}`);
        }
    }
    
    function renderSlide() {
        this.bodyEl.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    }
 })(window, 'Slider');

 // підгоотовкадо роботи 1 слайдера
 // const slider = createSlider('.slider.fade');
 // {
 //   selector: '.slider.fade',
 //   init,
 //   showSlide,
 //   next,
 //   prev,
 //   render,
 // };

//slider.init(); // this = slider

 // підготовка до роботи 2
 // const slider2 = createSlider('.slider.slide', 'slide');
 // {
 //   selector: '.slider.slide',
 //   init,
 //   showSlide,
 //   next,
 //   prev,
 //   render: renderSlide,
 // };

// slider2.init(); // this = slider2

// console.log( slider2 );






//////////////////////////////////
// test this
function trySomething(e) {
    console.log(this, e, arguments);
};

const a = {
    name: 'a',
    b: {
        name: 'b',
        trySomething,
    },
    trySomething
};

trySomething(1, 2, 3, 4); // undefined | global
a.trySomething(2, 4, 4, 5); // this = a
a.b.trySomething(3, 7, 7, 7, 8);  // this = b

function make(fn, value) {
    const c = {
        name: 'c',
        fn
    };
const args = [];

    console.log('make', arguments);

    for (let i = 1; i  < arguments.length; i++) {
        args.push(arguments[i]);
    }

    fn.apply(c, args);
}

make( trySomething, 1, 2, 3, 4, 5, 6, 7 ); // c
make( a.trySomething, 2 ); // c
make( a.b.trySomething, 3 ); // c

trySomething.call(a, 1, 2, 3, 4);
trySomething.apply(a.b, [2,  3, 4, 5, 5]);
trySomething.call({ name: 'd' }, 3);

const tryA = trySomething.bind(a);
const w = {
    name: 'w',
    tryA,
};

w.tryA(1, 2, 3, 4, 5);

// console.clear();

// console.log( slider );


