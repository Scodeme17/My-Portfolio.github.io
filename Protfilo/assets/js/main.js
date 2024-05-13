(function() {
  "use strict";
  /**
   * Zero padding function
   */
  function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
  }
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Home type effect
   */
  document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".typed", {
      strings: ["Data Analytics", "Developer", "Photographer"],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true
    });
  });
  


  /**
   * Vue Component Initialization
   */
  Vue.component('clock', {
    template: `
      <div class="clock-container">
        <div class="clock">
          <div class="time">{{ time }}</div>
          <div class="date">{{ date }}</div>
        </div>
      </div>
    `,
    data() {
      return {
        time: '',
        date: ''
      };
    },
    mounted() {
      this.updateTime();
      // Update time every second
      this.timerID = setInterval(this.updateTime, 1000);
    },
    methods: {
      updateTime() {
        const cd = new Date();
        this.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
        this.date = cd.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      }
    },
    beforeDestroy() {
      clearInterval(this.timerID);
    }
  });

  /**
   * Clock Vue Instance
   */
  var clockApp = new Vue({
    el: '#footer'
  });

  /**
   * Skills animation
   */
  let skillsContent = select('.skills-content');
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }
})();
