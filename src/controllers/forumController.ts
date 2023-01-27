import { resolveTxt } from "dns";
import { RequestHandler } from "express";
import { Forum } from "../models/forum";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

/* Retrieves list of all forums */
export const getAllForums: RequestHandler = async (req, res, next) => {
    let forumList: Forum[] = await Forum.findAll();
    res.status(200).json(forumList);
}

/* Retrieves a single forum */
export const getForumById: RequestHandler = async (req, res, next) => {
    let forumId = parseInt(req.params.forumId);
    let forum: Forum | null = await Forum.findByPk(forumId);
    if (forum) {
        res.status(200).json(forum);
    } else {
        res.status(450).send("These are not the forums you are looking for.");
    }
}

/* Creates a new forum */
export const createForum: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(451).send("You shall not pass! ...sign in to create a forum.");
    }

    const newForum: any = Forum.build(req.body);
    newForum.userId = user.userId;
    await newForum.save();
    if (newForum) {
        res.status(200).json(newForum);
    } else {
        res.status(452).send("No go.");
    }
    
}

export const editForum: RequestHandler = async (req, res, next) => {
    // let user: IUser | null = await verifyUser(req);

    // if (!user) {
    //     return res.status(403).send();
    // }

    // let itemId = req.params.id;
    // const updatedPost: IPost = new Post({
    //     _id: itemId,
    //     message: req.body.message
    // });

    // await Post.findByIdAndUpdate(itemId, { $set: updatedPost })

    // res.status(200).json(updatedPost);
}

export const deleteForum: RequestHandler = async (req, res, next) => {
    // let user: IUser | null = await verifyUser(req);

    // if (!user) {
    //     return res.status(403).send();
    // }

    // let itemId = req.params.id;
    // let result = await Post.findByIdAndDelete(itemId);
    // res.status(200).json(result);
}