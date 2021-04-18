import { getMongoRepository } from 'typeorm';
import HttpException from '../errors/HttpException';
import { SubReddits } from '../models/subreddits';
import { UserFavsReddit } from '../models/user-favs-subreddits';

const userFavsRedditsRepo = () => getMongoRepository(UserFavsReddit);

export const getUsers = async () => await userFavsRedditsRepo().find();

export const getUser = async (
  email: string
): Promise<UserFavsReddit | undefined> => {
  return await userFavsRedditsRepo().findOne({
    where: {
      email: { $eq: email },
    },
  });
};

export const createNewUser = async (
  name: string,
  email: string,
  subreddits: []
) => {
  const newSubReddits = createNewSubReddits(subreddits);

  return userFavsRedditsRepo().save({
    name,
    email,
    subreddits: newSubReddits,
  });
};

export const getUserAndUpdate = async (
  name: string,
  email: string,
  subReddits: []
) => {
  const user = await getUser(email);
  if (!user) throw new HttpException(`User not found`, 404);

  const updatedUserSubReddits = removeDuplicateSubReddits(
    user?.subreddits ?? [],
    subReddits
  );

  const subredditsObjects = createNewSubReddits(updatedUserSubReddits);

  return await userFavsRedditsRepo().save({
    ...user,
    name: name ?? user?.name,
    email: email ?? user?.email,
    subreddits: subredditsObjects ?? user?.subreddits,
  });
};

export const addSubReddits = async (email: string, subReddits: []) => {
  const user = await getUser(email);
  if (!user) throw new HttpException(`User not found`, 404);

  const updatedUserSubReddits = removeDuplicateSubReddits(
    user?.subreddits ?? [],
    subReddits
  );

  const newSubReddits = createNewSubReddits(updatedUserSubReddits);

  return await userFavsRedditsRepo().save({
    ...user,
    subreddits: newSubReddits ?? user?.subreddits,
  });
};

export const turnNewsLetterOnOff = async (email: string, isOn: boolean) => {
  const user = await getUser(email);
  if (!user) throw new HttpException(`User not found`, 404);

  return await userFavsRedditsRepo().save({
    ...user,
    isOn: isOn,
  });
};

const removeDuplicateSubReddits = (
  userSubReddits: SubReddits[],
  newSubReddits: []
) => {
  const userSubReedits = [
    ...Object.values(userSubReddits).map(subReddit => subReddit.url),
  ];
  return [...new Set([...userSubReedits, ...newSubReddits])];
};

const createNewSubReddits = (subreddits: string[]): SubReddits[] => {
  return subreddits
    ? subreddits.map((subreddit: string) => new SubReddits(subreddit))
    : [];
};
