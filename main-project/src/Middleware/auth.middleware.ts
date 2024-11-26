import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const excludedPaths = ['/users/login', '/users/register'];

    if (excludedPaths.some((path) => req.path.startsWith(path))) {
      return next(); // Skip authentication for these routes
    }
    const authHeader = req.headers['authorization'];
    //console.log('Authorization Header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('No token provided.');
    }
    let token: any;
    const secret = process.env.JWT_SECRET || 'your_secret_key';
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length);
    } else {
      //Error
    }
    console.log(token);
    // Proceed to the next handler

    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded);

      req['user'] = decoded; // Attach decoded user to the request
      next(); // Proceed to the next handler
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
