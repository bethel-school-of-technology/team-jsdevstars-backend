import { RequestHandler } from "express";
import { Article } from "../models/article";
import { ArticleComment } from "../models/articleComment";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

/* Retrieves list of all articles */
export const getAllArticles: RequestHandler = async (req, res, next) => {
    let articleList: Article[] = await Article.findAll();
    res.status(200).json(articleList);
}

/* Retrieves a single article along with all associated article comments */
export const getArticleById: RequestHandler = async (req, res, next) => {
    let articleId = parseInt(req.params.articleId);
    let article: Article | null = await Article.findByPk(articleId);
    if (article) {
        let articleCommentList: ArticleComment[] = await ArticleComment.findAll({where: {articleId: articleId}});
        let packet = {
            article: article,
            comments: articleCommentList
        };
        res.status(200).json(packet);
    } else {
        res.status(450).send("These are not the articles you are looking for.");
    }
}

/* Creates a new article */
export const createArticle: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(451).send("You shall not pass! ...sign in to create a article.");
    }

    const newArticle: any = Article.build(req.body);
    newArticle.userId = user.userId;
    await newArticle.save();
    if (newArticle) {
        res.status(200).json(newArticle);
    } else {
        res.status(452).send("No go.");
    }
    
}

/* Edits a article */
export const editArticle: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(457).send("You shall not pass! ...sign in to edit your article.");
    }

    let articleId = parseInt(req.params.articleId);

    // Check if the current user is the author of the article
    let article: any | null = await Article.findByPk(articleId);
    if (article.userId != user.userId) {
        return res.status(463).send("Thou shalt not edit thy neighbor's article.");
    }

    const editedArticle: any = req.body;
    editedArticle.userId = user.userId;

    let [updated] = await Article.update(editedArticle, {
        where: { articleId: articleId }
    });

    if (updated === 1) {
        let article: Article | null = await Article.findByPk(articleId);
        res.status(200).json(article);
    } else {
        res.status(459).send('Update failed');
    }
}

/* Deletes article */
export const deleteArticle: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(462).send("You shall not pass! ...sign in to delete an article.");
    }

    let articleId = parseInt(req.params.articleId);

    // Check if the current user is the author of the article
    let article: any | null = await Article.findByPk(articleId);
    if (article.userId != user.userId) {
        return res.status(464).send("Did you have something against the author of this article?");
    }

    let deleted = await Article.destroy({
        where: { articleId: articleId }
    });

    if (deleted) {
        res.status(200).send('You are truly successful');
    } else {
        res.status(460).send('Deletion failed');
    }
}

/* Retrieves a single article comment */
export const getArticleCommentById: RequestHandler = async (req, res, next) => {
    let articleCommentId = parseInt(req.params.articleCommentId);
    let articleComment: ArticleComment | null = await ArticleComment.findByPk(articleCommentId);
    if (articleComment) {
        res.status(200).json(articleComment);
    } else {
        res.status(465).send("These are not the article comments you are looking for.");
    }
}


/* Creates a new article comment */
export const createArticleComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(467).send("You shall not pass! ...sign in to comment on an article.");
    }

    const newArticleComment: any = ArticleComment.build(req.body);
    newArticleComment.userId = user.userId;
    newArticleComment.articleId = parseInt(req.params.articleId);
    await newArticleComment.save();
    if (newArticleComment) {
        res.status(200).json(newArticleComment);
    } else {
        res.status(468).send("No go.");
    }
}

/* Edits an article comment */
export const editArticleComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(469).send("You shall not pass! ...sign in to edit your comment.");
    }

    let articleCommentId = parseInt(req.params.articleCommentId);

    // Check if the current user is the author of the article
    let articleComment: any | null = await ArticleComment.findByPk(articleCommentId);
    if (articleComment.userId != user.userId) {
        return res.status(463).send("Thou shalt not edit thy neighbor's comment.");
    }

    const editedArticleComment: any = req.body;
    editedArticleComment.userId = user.userId;
    editedArticleComment.articleId = parseInt(req.params.articleId);

    let [updated] = await ArticleComment.update(editedArticleComment, {
        where: { articleCommentId: articleCommentId }
    });

    if (updated === 1) {
        let articleComment: ArticleComment | null = await ArticleComment.findByPk(articleCommentId);
        res.status(200).json(articleComment);
    } else {
        res.status(470).send('Update failed');
    }
}

/* Deletes article comment */
export const deleteArticleComment: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
  
    if (!user) {
      return res.status(471).send("You shall not pass! ...sign in to delete a article comment.");
    }

    let articleCommentId = parseInt(req.params.articleCommentId);

    // Check if the current user is the author of the article comment
    let articleComment: any | null = await ArticleComment.findByPk(articleCommentId);
    if (articleComment.userId != user.userId) {
        return res.status(473).send("Trying to delete another's comment?");
    }

    let deleted = await ArticleComment.destroy({
        where: { articleCommentId: articleCommentId }
    });

    if (deleted) {
        res.status(200).send('Deleted');
    } else {
        res.status(474).render('Deletion failed');
    }
}