import { Request, Response } from "express";
import HttpException from "../errors/HttpException";
import {
  addSubReddits,
  createNewUser,
  getUser,
  getUserAndUpdate,
  getUsers,
  turnNewsLetterOnOff,
} from "../services/user-favs-subreddits.service";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json(await getUsers());
};

export const addUser = async (
  req: Request,
  res: Response
): Promise<Response | HttpException> => {
  const { name, email, subreddits } = req.body;

  if (!email || !name)
    throw new HttpException("Please provide the user's name and email", 400);

  const userExist = await getUser(email);
  if (userExist)
    throw new HttpException(
      `User ${userExist.name} with ${userExist.email} e-mail already exists`,
      409
    );

  const newUser = await createNewUser(name, email, subreddits);

  return res.json(newUser);
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response | HttpException> => {
  const { name, email, subreddits } = req.body;

  if (!email) throw new HttpException("Please provide the user's email", 400);

  const updatedUser = await getUserAndUpdate(name, email, subreddits);

  return res.json(updatedUser);
};

export const addUserSubReddits = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, subreddits } = req.body;

  if (!email) throw new HttpException("Please provide the user's email", 400);

  const updatedUserSubReddits = await addSubReddits(email, subreddits);

  return res.json(updatedUserSubReddits);
};

export const turningOnNewsLetter = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) throw new HttpException("Please provide the user's email", 400);

  const user = await turnNewsLetterOnOff(email, true);
  return res.json({
    message: `User ${user.name} with ${user.email} email has turned the newsletter ON`,
  });
};

export const turningOffNewsLetter = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) throw new HttpException("Please provide the user's email", 400);

  const user = await turnNewsLetterOnOff(email, false);
  return res.json({
    message: `User ${user.name} with ${user.email} email has turned the newsletter OFF`,
  });
};

// export const updateUserSubReddits = async (
//   req: Request,
//   res: Response
// ): Promise<Response | HttpException> => {
//   try {
//     const { name, email, subreddits } = req.body;

//     return res.json(newUser);
//   } catch (error) {
//     return new HttpException(error.message, error.statusCode);
//   }
// };
