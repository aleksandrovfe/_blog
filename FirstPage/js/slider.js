'use strict';

class Slider {
  constructor(prev, next, parent, content, item, itemsCount, intervalTime) {
    this.prev = prev;
    this.next = next;
    this.parent = parent;
    this.content = content;
    this.item = item;
    this.itemsCount = itemsCount;
    this.intervalTime = intervalTime;
    this.data = [];
    this.timer = '';
  }

  loadData() {
    return loadContent(this.content).then(res => this.data = res)
  }

  renderOperation() {}

  rerenderOperation() {
    document.querySelectorAll(this.item).forEach((proj) => {
      proj.parentElement.removeChild(proj);
    })

    this.renderOperation(this.data);
  };

  nextItem() {}

  prevItem() {}

  interval() { // setInterval function
    this.timer = setInterval(() => {
      this.nextItem(this.data)
      this.rerenderOperation();
    }, this.intervalTime);
  };
}

class PortfolioSlider extends Slider {
  render() {
    const prev = document.querySelector(this.prev);
    const next = document.querySelector(this.next);
    const projectParent = document.querySelector(this.parent); // projects wrapper
    let nextPoint;

    this.renderOperation = (portfolio) => {
      let visiblePtojects = portfolio;

      if (portfolio.length > this.itemsCount) {
        visiblePtojects = portfolio.slice(0, this.itemsCount);
      };

      const layout = visiblePtojects.map((project) =>
        `<section class="project project__background-img${project.id} ${project.anim} ${project.animationleft} ${project.animationRight}">
          <h3 class="project__sign">${project.projectSign}</h3>
          <p class="project__description">${project.projectDescription}</p>
          <div class="project__icon1"></div>
          <div class="project__icon2"></div>
        </section>`
        );

      layout.forEach((item) => {
        projectParent.insertAdjacentHTML('beforeend', item);
      });
    };

    this.renderOperation(this.data);

    this.nextItem = (arr) => {
      let transitionEl = arr.shift();
      arr.push(transitionEl);
      // set animations
      arr[2].anim = 'animation';
      arr[1].animationleft = 'animationleft';
      arr[0].animationleft = 'animationleft';
      // clean animation
      arr[1].anim = null;
      arr[3].animationleft = null;
      arr[arr.length - 1].animationleft = null;
      arr[0].animationRight = null;
      arr[1].animationRight = null;
      arr[2].animationRight = null;
      arr[3].animationRight = null;
      arr[arr.length - 1].animationRight = null;
    }

    this.prevItem = (arr) => {
      let transitionEl = arr.pop();
      arr.unshift(transitionEl);
      // set animations
      arr[0].anim = 'animation';
      arr[1].animationRight = 'animationRight';
      arr[2].animationRight = 'animationRight';
      // clean animations
      arr[1].anim = null;
      arr[0].animationRight = null;
      arr[3].animationRight = null;
      arr[arr.length - 1].animationRight = null;
      arr[0].animationleft = null;
      arr[1].animationleft = null;
      arr[2].animationleft = null;
      arr[3].animationleft = null;
      arr[arr.length - 1].animationleft = null;
    }

    projectParent.addEventListener('mouseover', (event) => { // if mouseover on the project stop setInterval
      if (event.target.matches('.project') || event.target.matches('.project__icon1') || event.target.matches('.project__icon2') || event.target.matches('.project__description')) {
        clearInterval(this.timer);
      };
    })

    projectParent.addEventListener('mouseout', (event) => { // if mouseout from the project start setInterval
      if (event.target.matches('.project') || event.target.matches('.project__icon1') || event.target.matches('.project__icon2') || event.target.matches('.project__description')) {
        this.interval();
      };
    });

    prev.addEventListener('mouseover', () => { // if mouseover on the prev btn stop setInterval
      clearInterval(this.timer);
    })

    prev.addEventListener('mouseout', () => { // if mouseout from the prev btn start setInterval
      this.interval();
    })

    next.addEventListener('mouseover', () => { // if mouseover on the next btn stop setInterval
      clearInterval(this.timer);
    })

    next.addEventListener('mouseout', () => { // if mouseout from the next btn start setInterval
      this.interval();
    })

    this.interval(); // start setInterval when page loaded

    prev.addEventListener('click', () => { // flipping forward manually
      this.prevItem(this.data)
      this.rerenderOperation();
    })

    next.addEventListener('click', () => { // flipping back manually
      this.nextItem(this.data)
      this.rerenderOperation();
    })

    const swipe = (startingPoint) => {
      return (endPoint) => {
        if ((startingPoint - endPoint) > 10) {
          this.nextItem(this.data);
          this.rerenderOperation();
        }

        if ((startingPoint - endPoint) < 10) {
          this.prevItem(this.data);
          this.rerenderOperation();
        }
      }
    }

    projectParent.addEventListener('mousedown', (event) => {
      nextPoint = swipe(event.clientX); // get first point
    });

    projectParent.addEventListener('mouseup', (event) => {
      nextPoint(event.clientX); // get last point
    })
  }
}

let newPortfolioSlider = new PortfolioSlider('.move-button1', '.move-button2', '.content__portfolio', 'portfolio', '.project', 3, 3000)

newPortfolioSlider.loadData().then(() => newPortfolioSlider.render());


class TestimonialSlider extends Slider {
  render() {
    const prev = document.querySelector(this.prev);
    const next = document.querySelector(this.next);
    const testimonialParent = document.querySelector(this.parent); // projects wrapper
    let nextPoint;

    this.renderOperation = (testimonials) => {
      let visibleTestimonial = testimonials;

      if (testimonials.length > this.itemsCount) {
        visibleTestimonial = testimonials.slice(0, this.itemsCount);
      };

      const layout = visibleTestimonial.map((el) =>
        `<div class="content__project-team-wrapper ${el.anim}">
          <div class="person-card__left">
            <p class="phrase">${el.phrase}</p>
            <div class="person-information">
              <p class="person-information__name">${el.name}</p>
              <p class="person-information__position">${el.position}</p>
            </div>
          </div>
          <img class="person-card__right" src="${el.avatar}" alt="avatar">
        </div>`
      );

      const testimonialsElement = document.querySelector('.content__project-team');
      layout.forEach((item) => {
        testimonialsElement.insertAdjacentHTML('beforeend', item);
      });
    };

    this.renderOperation(this.data);

    this.nextItem = (arr) => {
      let transitionEl = arr.shift();
      arr.push(transitionEl);
      arr[0].anim = 'animationT';
    }

    this.prevItem = (arr) => {
      let transitionEl = arr.pop();
      arr.unshift(transitionEl);
      arr[0].anim = 'animationT';
    }

    testimonialParent.addEventListener('mouseover', (event) => { // if mouseover on the project stop setInterval
      if (event.target.matches('.content__project-team-wrapper') || event.target.matches('.person-card__left') || event.target.matches('.phrase') || event.target.matches('.person-information') || event.target.matches('.person-information__name') || event.target.matches('.person-information__position') || event.target.matches('.person-information__position') || event.target.matches('.person-card__right')) {
        clearInterval(this.timer);
      };
    })

    testimonialParent.addEventListener('mouseout', (event) => { // if mouseout from the project start setInterval
      if (event.target.matches('.content__project-team-wrapper') || event.target.matches('.person-card__left') || event.target.matches('.phrase') || event.target.matches('.person-information') || event.target.matches('.person-information__name') || event.target.matches('.person-information__position') || event.target.matches('.person-information__position') || event.target.matches('.person-card__right')) {
        this.interval();
      };
    });

    prev.addEventListener('mouseover', () => { // if mouseover on the prev btn stop setInterval
      clearInterval(this.timer);
    })

    prev.addEventListener('mouseout', () => { // if mouseout from the prev btn start setInterval
      this.interval();
    })

    next.addEventListener('mouseover', () => { // if mouseover on the next btn stop setInterval
      clearInterval(this.timer);
    })

    next.addEventListener('mouseout', () => { // if mouseout from the next btn start setInterval
      this.interval();
    })

    this.interval(); // start setInterval when page loaded

    prev.addEventListener('click', () => { // flipping forward manually
      this.prevItem(this.data)
      this.rerenderOperation();
    })

    next.addEventListener('click', () => { // flipping back manually
      this.nextItem(this.data)
      this.rerenderOperation();
    })

    const swipe = (startingPoint) => {
      return (endPoint) => {
        if ((startingPoint - endPoint) > 10) {
          this.prevItem(this.data);
          this.rerenderOperation();
        }

        if ((startingPoint - endPoint) < 10) {

          this.nextItem(this.data);
          this.rerenderOperation();
        }
      }
    }

    testimonialParent.addEventListener('mousedown', (event) => {
      nextPoint = swipe(event.clientX); // get first point
    });

    testimonialParent.addEventListener('mouseup', (event) => {
      nextPoint(event.clientX); // get last point
    })
  }
}

let newTestimonialSlider = new TestimonialSlider('.move-buttonn1', '.move-buttonn2', '.content__project-team', 'testimonials', '.content__project-team-wrapper', 1, 3000);

newTestimonialSlider.loadData().then(() => newTestimonialSlider.render());

