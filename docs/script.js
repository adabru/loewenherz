

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

// TODO: remove following function as soon as chrome implements this function, see https://caniuse.com/#search=hyphens
//
// enable wordbreak on syllables
//
// ruleset from https://www.kapiert.de/deutsch/klasse-5-6/rechtschreibung/rechtschreibstrategien/woerter-in-silben-zerlegen/
//   rule 1: v1 c1 c1 v2  =>  v1 c1 - c1 v2
//   rule 2: atomic ch, ck, ph, rh, sh, th, sch
//   rule 3: v1 c1 c2 v2  =>  v1 c1 - c2 v2
//   rule 4: v1 c1 v2  =>  v1 - c1 v2
//   rule 5: atomic au, eu, ie, ei, äu
//   rule 6: v1 c1 .. cn v2  =>  v1 c1 .. - cn v2
//   violating compositions: gasherd , hochstrukturiert
//   => separate before last atomic consonant
//   => minimum 3 characters before breaking (avoid e.g. "o-der")
// additional rules are on https://www.sofatutor.com/deutsch/videos/silbentrennung
function break_on_syllables() {
  var breaker, min3;
  {
    const vowels = [].concat(
      ['au','eu','ie','ei','äu'], ['a(?!u)','e(?![ui])','i(?!e)','o','u'], ['ä(?!u)','ö','ü'],
      ['Au','Eu','Ie','Ei','Äu'], ['A(?!u)','E(?![ui])','I(?!e)','O','U'], ['Ä(?!u)','Ö','Ü']
    )
    const consonants = [].concat(
      ['ch','ck','ph','rh',/*'sh',*/'th','sch','ß'],
      ['b','c','d','f','g','h','j','k','l','m','n','p','q','q','r','s','t','v','w','x','y','z']
    )
    const v = `(?:${vowels.join('|')})`
    const c = `(?:${consonants.join('|')})`
    breaker = new RegExp( `(${v}${c}*?)(${c}?(?=${v}))`, 'g' )
    min3 = new RegExp( `(?!${v}|${c}|;)(.(?:${v}|${c}){1,2})&shy;`, 'g' )
  }
  function break_text(text) {
    return text
      .replace(breaker, "$1&shy;$2")
      // minimum 3 letters before breaking
      .replace(min3, "$1");
  }
  for(let p of document.querySelectorAll('p, div')) {
    // no critical html tag inside
    if(!/(?!<br>|<i>)<[a-z]/.test(p.innerHTML))
      p.innerHTML = break_text(p.innerHTML)
  }
}
