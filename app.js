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
    const lines = Math.max(
      countLines(challenge.start),
      countLines(challenge.end)
    )
    const $container = document.createElement('article')
    $container.className = 'hero content is-fullheight'
    $container.innerHTML = `
      <div className="hero-body">
        <div className="container">
          <form class="columns">
            <fieldset class="column">
              <h1>${challenge.title}</h1>
              ${markdown(challenge.description)}
            </fieldset>
            <fieldset class="column ${challenge.width || ''}">
              <pre>${challenge.end}</pre>
              <textarea class="textarea" rows="${lines - 1}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">${challenge.start}</textarea>
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

  function countLines(text) {
    return (text.match(/\n/g) || []).length
  }

  function disableClick() {
    document.querySelector('#click-mask').addEventListener('mousedown', (e) => {
      e.preventDefault()
      // TODO: minus points
    })
  }



  startGame(getChallenges())
}())
