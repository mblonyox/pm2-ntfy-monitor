const { fetch } = require('undici');
const { stripAnsi } = require('./strip-ansi.js')

class Notifier {
  moduleConfig = null

  constructor(moduleConfig) {
    this.moduleConfig = moduleConfig;
  }

  notify(message) {

    const moduleConfig = this.moduleConfig;

    const notifyUrl = moduleConfig.webhookUrl;

    const params = {
      topic: moduleConfig.ntfyTopic ?? `pm2-${message.name}`,
      message: `${stripAnsi(message.description)}\n${message.timestamp ? new Date(message.timestamp).toLocaleString() : ''}`,
      title: `${message.name}: ${message.event}`,
      priority: 3,
      tags: [message.event],
    };

    fetch(notifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    })

  }

  notifyAll(messageList) {
    messageList.map((item) => {
      this.notify(item);
    });
  }
}

module.exports = Notifier;
