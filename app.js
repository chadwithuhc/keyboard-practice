(function() {
  const $game = document.querySelector('#game')
  const converter = new showdown.Converter()
  disableClick()

  function startGame(challenges) {
    $game.innerHTML = ''

    challenges.forEach(challenge => {
      $game.appendChild(createChallenge(challenge))
    })
  }

  function createChallenge(challenge) {
    const $container = document.createElement('article')
    $container.className = 'hero content is-fullheight'
    $container.innerHTML = `
      <div className="hero-body">
        <div className="container">
          <form class="columns">
            <fieldset class="column content">
              <h1>${challenge.title}</h1>
              ${markdown(challenge.description)}
            </fieldset>
            <fieldset class="column">
              <textarea class="textarea">${challenge.start}</textarea>
              <pre>${challenge.end}</pre>
            </fieldset>
          </form>
        </div>
      </div>
    `

    $container.querySelector('.textarea').addEventListener('keyup', (e) => {
      const currentValue = e.target.value

      if (challenge.end.trim() === currentValue.trim()) {
        e.target.classList.add('is-success')
      }
      else {
        e.target.classList.remove('is-success')
      }
    })

    return $container
  }

  function markdown(content) {
    return converter.makeHtml(content)
  }

  function disableClick() {
    document.querySelector('#click-mask').addEventListener('mousedown', (e) => {
      e.preventDefault()
      // TODO: minus points
    })
  }



  startGame(getChallenges())
}())
