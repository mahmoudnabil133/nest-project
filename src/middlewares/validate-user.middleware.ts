import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('validate user middleware');
        next();
        
        // const { authorization } = req.headers;
        // if (authorization === '123') next();
        // else res.status(403).send({ msg : 'invalid authorization token'})
    }
}
