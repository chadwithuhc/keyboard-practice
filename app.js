(function() {
  const $game = document.querySelector('#game')
  const $timer = document.querySelector('#timer')
  const $complete = document.querySelector('#complete')
  const $congrats = document.querySelector('#congrats')
  const $message = document.querySelector('#message')
  const converter = new showdown.Converter()
  const timer = new Timer()
  const challenges = getChallenges()
  let completedChallenges = 0
  disableClick()

  function startGame() {
    $game.innerHTML = ''

    challenges.forEach(challenge => {
      $game.appendChild(createChallenge(challenge))
    })

    $game.appendChild(createFinalChallenge())

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }, 200)
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
      const valueMatch = challenge.end.trim() === currentValue.trim()
      const isSuccess = e.target.classList.contains('is-success')

      if (valueMatch && !isSuccess) {
        e.target.classList.add('is-success')
        ++completedChallenges
        updateComplete()
      }
      else if (!valueMatch && isSuccess) {
        e.target.classList.remove('is-success')
        --completedChallenges
        updateComplete()
      }
    })

    return $container
  }

  function createFinalChallenge() {
    const $container = document.createElement('footer')
    $container.className = `hero content is-fullheight`
    $container.innerHTML = `
      <div class="hero-body">
        <div class="container is-size-4">
          <p>hit <button type="submit" class="kbd">enter</button> to complete</p>
        </div>
      </div>
    `

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

  function startTimer() {
    $timer.innerHTML = `00:00`
    timer.start()
    timer.reset()
    timer.addEventListener('secondsUpdated', (e) => {
        $timer.innerHTML = timer.getTimeValues().toString(['minutes', 'seconds'])
    })
    updateComplete()
  }

  function stopTimer() {
    timer.stop()
  }

  function updateComplete() {
    $complete.innerHTML = `${completedChallenges} of ${challenges.length}`
  }

  function alertMessage(message = '') {
    $message.innerText = message

    if (message) {
      setTimeout(alertMessage, 3000)
    }
  }

  document.querySelector('#start-here button').addEventListener('blur', (e) => {
    if (timer.getTimeValues().toString() === `00:00:00`) {
      startTimer()
    }
  })

  $game.addEventListener('submit', (e) => {
    e.preventDefault()

    if (completedChallenges === challenges.length) {
      endGame()
    }
    else {
      const challengesRemaining = challenges.length - completedChallenges
      const challengePlural = challengesRemaining > 1 ? `challenges` : `challenge`
      alertMessage(`${challengesRemaining} ${challengePlural} remaining!`)
    }
  })

  function endGame() {
    stopTimer()
    setTimeout(() => {
      window.scrollTo({
        top: $congrats.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth"
      })
    }, 200)
  }



  startGame()
}())
