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

/* Edits a forum */
export const editForum: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(457).send("You shall not pass! ...sign in to edit your forum.");
    }

    let forumId = parseInt(req.params.forumId);
    const editedForum: any = req.body;
    editedForum.userId = user.userId;

    let [updated] = await Forum.update(editedForum, {
        where: { forumId: forumId }
    });

    if (updated === 1) {
        let forum: Forum | null = await Forum.findByPk(forumId);
        res.status(200).json(forum);
    } else {
        res.status(459).send('Update failed');
    }
}

/* Delete forum */
export const deleteForum: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(462).send("You shall not pass! ...sign in to delete a forum.");
    }

    let forumId = parseInt(req.params.forumId);
    let deleted = await Forum.destroy({
        where: { forumId: forumId }
    });

    if (deleted) {
        res.status(200).send('deleted');
    } else {
        res.status(460).render('Deletion failed');
    }
}