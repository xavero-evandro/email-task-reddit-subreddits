import axios, { AxiosResponse } from "axios";
import { REDDIT_BASE_URL } from "../config/reddit-base-url.config";

const TOP_FILTER = "top.json?t=day&limit=3";

export const getSubRedditInfo = async (subReddit: string[]) => {
  const requests = subReddit.map((name) => {
    return axios.get(`${REDDIT_BASE_URL}/r/${name}/${TOP_FILTER}`);
  });
  const responses = await Promise.all(requests).then((result) => result);
  return await sanitizeResult(responses);
};

const sanitizeResult = async (subRedditInfo: AxiosResponse<any>[]) => {
  return subRedditInfo.map((response) =>
    response.data.data.children.map((item: any) => item.data)
  );
};
