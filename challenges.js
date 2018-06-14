function getChallenges() {
  return [
    {
      title: 'Renaming a function',
      type: 'refactor',
      description: 'Select the function name and re-type',
      start:
`
function getItems() {

}
`,
      end:
`
function getPosts() {

}
`
    },
    {
      title: 'Converting a function to fat arrow',
      type: 'refactor',
      description: 'Select the `function` text and erase, then use the keyboard to move over and add the fat arrow',
      start:
`
const checkStatus = function () {

}
`,
      end:
`
const checkStatus = () => {

}
`
    },
    {
      title: 'Duplicate and change',
      type: 'refactor',
      actions: ['cut-copy-paste'],
      description: 'Duplicate the line and swap out the word `section`',
      start:
`
$container.classList.add('section')
`,
      end:
`
$container.classList.add('section')
$container.classList.add('game-challenge')
`
    },
    {
      title: 'Destructuring an Object',
      type: 'refactor',
      description: `Convert the longer property name to a destructured variable`,
      start:
`
console.log(data.result.user.name)
`,
      end:
`
const { user } = data.result

console.log(user.name)
`
    },
    {
      title: 'Destructuring an Array',
      type: 'refactor',
      description: `Convert the longer property name to a destructured variable`,
      start:
`
const firstName = name[0]
const lastName = name[1]
console.log(firstName, lastName)
`,
      end:
`
const [firstName, lastName] = name
console.log(firstName, lastName)
`
    },
    {
      title: 'Extract a variable',
      type: 'refactor',
      description: `Extract the object into its own variable`,
      start:
`
response.json({
  error: {
    message: 'Something went wrong'
  }
})
`,
      end:
`
const data = {
  error: {
    message: 'Something went wrong'
  }
}

response.json(data)
`
    },
    {
      title: 'Extract a DOM node',
      type: 'refactor',
      description: `Store a DOM node to a reusable variable`,
      width: 'is-7',
      start:
`
document.querySelector('.btn').classList.add('loading')
document.querySelector('.btn').innerText = 'LOADING...'
`,
      end:
`
const $btn = document.querySelector('.btn')
$btn.classList.add('loading')
$btn.innerText = 'LOADING...'
`
    },
    {
      title: 'Shorten a fat arrow function to a single line',
      type: 'refactor',
      description: `Change the Higher-Order Function to a single-line fat arrow`,
      start:
`
cohorts.filter(function (cohort) {
  return cohort.students.length > 20
})
`,
      end:
`
cohorts.filter(cohort => cohort.students.length > 20)
`
    },
    {
      title: 'Extract a Higher-Order Function',
      type: 'refactor',
      description: `Extract the anonymous function into its own named function`,
      start:
`
images.filter(function (image) {
  return image.size <= 100
})
`,
      end:
`
function filterBySize(image) {
  return image.size <= 100
}

images.filter(filterBySize)
`
    }
  ]
}
