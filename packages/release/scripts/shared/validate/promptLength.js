const validatePromptLength = ({ input, errorMessage }) => (input.length > 0 ? true : errorMessage)

module.exports = {
  validatePromptLength
}
