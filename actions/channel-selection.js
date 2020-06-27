module.exports = (app) => async ({ ack, body, context }) => {
  ack();

  console.log("channel:selection", body);

  // const selectedProject = body.actions[0].selected_option.value; // save to DB

  try {
    // // Update the message
    // const result = await app.client.chat.update({
    //   token: context.botToken,
    //   // ts of message to update
    //   ts: body.message.ts,
    //   // Channel of message
    //   channel: body.channel.id,
    //   blocks: [
    //     {
    //       type: 'section',
    //       text: {
    //         type: 'mrkdwn',
    //         text: '*The button was clicked!*'
    //       }
    //     }
    //   ],
    //   text: 'Message from Test App'
    // });
    // console.log(result);
  } catch (error) {
    console.error(error);
  }
};
