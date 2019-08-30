import * as express from 'express';

export const Logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.params.logger) {
        return res.status(200).json({
            body: req.body,
            params: req.params
        })
    }
    next()
}