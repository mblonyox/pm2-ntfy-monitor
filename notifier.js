const bent = require('bent');
const os = require('os');


class Notifier {
  moduleConfig = null

  constructor(moduleConfig) {
    this.moduleConfig = moduleConfig;
  }

  notify(message) {
    const moduleConfig = this.moduleConfig;

    const notifyUrl = moduleConfig.webhookUrl;
    const poster = bent(notifyUrl, 'POST', {
      'Content-Type': 'application/x-www-form-urlencoded'
    });


    const params = {
      topic: moduleConfig.ntfyTopic??`pm2-${message.name}`,
      message: `${message.description}\n${message.timestamp ? new Date(message.timestamp).toLocaleString() : ''}`,
      title: `${message.name}: ${message.event}`,
      priority: 3,
      tags: [message.event],
    };

    poster('', JSON.stringify(params))
  }

  notifyAll(messageList) {
    messageList.map((item) => {
      this.notify(item);
    });
  }
}

module.exports = Notifier;
