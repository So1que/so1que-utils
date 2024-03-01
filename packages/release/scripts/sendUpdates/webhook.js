const { IncomingWebhook } = require("@slack/webhook")

/**
 * Для тестирования бота
 * Voiso
 * dev - https://hooks.slack.com/services/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
 * prod - https://hooks.slack.com/services/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
 */
const url = {
  voiso: "https://hooks.slack.com/services/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",
  softProject: "https://hooks.slack.com/services/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"
}

const voisoHook = new IncomingWebhook(url.voiso)
const softProjectHook = new IncomingWebhook(url.softProject)

module.exports = {
  sendToSlack: (message) => {
    voisoHook.send({
      type: "mrkdwn",
      text: message
    })
    softProjectHook.send({
      type: "mrkdwn",
      text: message
    })
  }
}
