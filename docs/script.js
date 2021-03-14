$(document).ready(function ($) {
  $('.swiper-team .person').matchHeight()
})

new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 10,
  speed: 600,

  pagination: {
    el: '.swiper-pagination',
  },

  navigation: {
    nextEl: '.swipe-next',
    prevEl: '.swipe-prev',
  },
});

// enable the left/right buttons in the team view to scroll to the previous/next person
function team_view_sliding() {
  // add scroll offset over time
  var linear_timed_sum = (amount, duration, addFunc) => {
    let t0 = Date.now()
    let t1 = t0 + duration
    let x = 0
    let step = () => {
      let t = Date.now()
      if(t > t1) t = t1
      let x_t = amount / (t1 - t0) * (t - t0)
      addFunc( x_t - x )
      x = x_t
      if(t < t1) setTimeout(step, 10)
    }
    step()
  }

  // add scroll function to each view
  for(let container of document.querySelectorAll('.team_container')) {
    let scrollPane = container.querySelector('.team')
    // determine persons' scroll positions
    let scrollAnchors = Array(...scrollPane.children).map( el =>
      el.offsetLeft + .5*el.clientWidth - .5*scrollPane.clientWidth )

    // add click event listeners
    container.querySelector('.arrow_right').onmousedown = () => {
      let nextId = 0
      while(
        scrollPane.scrollLeft > scrollAnchors[nextId] - 50
        && nextId < scrollAnchors.length - 1
      ) { nextId++ }
      linear_timed_sum(
        scrollAnchors[nextId] - scrollPane.scrollLeft,
        200,
        offset => scrollPane.scrollLeft += offset
      )
    }
    container.querySelector('.arrow_left').onmousedown = () => {
      let nextId = scrollAnchors.length - 1
      while(
        scrollPane.scrollLeft < scrollAnchors[nextId] + 50
        && nextId > 0
      ) { nextId-- }
      linear_timed_sum(
        scrollAnchors[nextId] - scrollPane.scrollLeft,
        200,
        offset => scrollPane.scrollLeft += offset
      )
    }
  }
}
