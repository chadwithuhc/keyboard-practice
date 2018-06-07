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
    }
  ]
}
