# pm2-ntfy-monitor
A pm2 module for sending logs and more to an ntfy endpoint.
> :warning: Only testet by personal usage yet. Project itself not jet maintained. 


## Usage

You should install this module first.

```sh

pm2 install Himmelxd/pm2-ntfy-monitor

```

To get this module work, you need to tell it your ntfy url and topic:

```sh

pm2 set pm2-ntfy-monitor:webhookUrl < https://ntfy.sh/ >
pm2 set pm2-ntfy-monitor:ntfyTopic < pm2Messages >

```



## Configuration

Here are the all configuration items and their default value.

```json

{
  "webhookUrl"        : null,
  "ntfyTopic"         : null,
  "log"               : false,
  "error"             : true,
  "kill"              : true,
  "exception"         : true,
  "restart"           : true,
  "reload"            : true,
  "delete"            : true,
  "stop"              : true,
  "restart overlimit" : true,
  "exit"              : false,
  "start"             : false,
  "online"            : false,
  "bufferMaxSecond"   : 5,
  "buffer"            : true
}

```

You can config them by using:

```sh

pm2 set pm2-ntfy-monitor:<key> <value>

```

## Message merge and postpone sending

When our application is executed in cluster mode, there will be many processes. And if we restart the application, every process will trigger a `restart` event and all the events will be notified to us. I think this is unnecessary and use a message queue to avoid this behavior.

The message queue receives messages and merges the same event. Then it uses a scheduler to finish the notify task.

We can enable this by set:

```sh

pm2 set pm2-ntfy-monitor:buffer true

```

And the `bufferMaxSecond` specifies how long should the monitor program buffer the messages. The default value is 5, which means the message queue waits at most 5 seconds while the first message is arrived. Once the waiting time is over the limit, the notify task is executed immediately.

## Acknowledgements

- [pm2-webhook-monitor](https://github.com/ZhangPuXi/Pm2WebhookMonitor) : This project is mainly based on this. Only the notifier.js was really customized.