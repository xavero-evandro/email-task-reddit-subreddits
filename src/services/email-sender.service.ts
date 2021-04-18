import sgMail from '@sendgrid/mail';
import { SENDGRID_API_KEY } from '../config/config';
import { getUsers } from './user-favs-subreddits.service';
import { getHtmlTemplate } from '../template/email-html-template';
import { getSubRedditInfo } from './reddit-api.service';
import { SubReddits } from '../models/subreddits';

sgMail.setApiKey(SENDGRID_API_KEY as string);

const getSubRedditName = (subReddit: SubReddits[]) => {
  return subReddit.map(item => item.url.split('/r/')[1].replace(/\//g, ''));
};

export const sendEmail = async () => {
  const users = await getUsers();
  const subRedditTopics = users
    ?.map(user => getSubRedditName(user.subreddits))
    .flat();
  const subRedditInfo = await getSubRedditInfo(subRedditTopics);
  const messages = users?.map(user => {
    return {
      to: user.email,
      from: 'evandromelos@hotmail.com',
      subject: `Reddit Newsletter for ${user.name}`,
      text: `Hi ${user.name}`,
      html: getHtmlTemplate(user, subRedditInfo),
    };
  });
  const emailsSent = await send(messages);
  return emailsSent;
};

const send = async (msgs: any) => {
  try {
    console.log('Sending emails......');
    return await sgMail.send(msgs);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
