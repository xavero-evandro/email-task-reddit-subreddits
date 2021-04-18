import { REDDIT_BASE_URL } from '../config/reddit-base-url.config';
import { UserFavsReddit } from '../models/user-favs-subreddits';

export const getHtmlTemplate = (
  user: UserFavsReddit,
  subRedditsInfo: any[]
) => {
  const content = subRedditsInfo.map(subreddit => {
    let htmlString = `
    <h2>News from:</h2>
    <h3>
      <a href=${REDDIT_BASE_URL}/${subreddit[0].subreddit_name_prefixed} target="_blank">
        ${REDDIT_BASE_URL}/${subreddit[0].subreddit_name_prefixed}
      </a>
    </h3>`;
    const contentInfo = subreddit.map((info: any) => {
      const media = info.media_embed.content
        ? decodeURI(info.media_embed.content)
            .replace(/&lt;/gm, '<')
            .replace(/&gt;/gm, '>')
        : '';
      const thumbnail = info?.thumbnail
        ? `<img src=${info?.thumbnail} alt="Image" width=${info?.thumbnail_width} height=${info?.thumbnail_height}>`
        : '';
      return `
      <br/>
      <h3>${info.title}</h3>
      ${thumbnail}
      ${media}
      `;
    });
    htmlString += contentInfo;
    return htmlString;
  });
  return `
    <h1>Hello ${user.name}</h1>
    <h2>See yesterday’s top voted posts from your favorite channel</h2>
    ${content.flatMap(tags => tags)}
  `;
};
