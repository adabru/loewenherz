
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
      console.log(x_t - x)
      addFunc( x_t - x )
      x = x_t
      if(t < t1) setTimeout(step, 10)
    }
    step()
  }

  // determine persons' scroll positions
  var scrollPane = document.querySelector('.team')
  var scrollAnchors = Array(...scrollPane.children).map( el =>
    el.offsetLeft + .5*el.clientWidth - .5*scrollPane.clientWidth )

  // add click event listeners
  document.getElementById('arrow_right').onmousedown = () => {
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
  document.getElementById('arrow_left').onmousedown = () => {
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
