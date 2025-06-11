import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable, startWith } from "rxjs";


export class OptionalAuthGuard extends AuthGuard('jwt'){

    handleRequest(err, user, info, context: ExecutionContext){

        return user || null;
    }

    canActivate(context: ExecutionContext) {

        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];

        // if( authHeader?startWith('Bearer '))
        // {
        //     return super.canActivate(context);
        // }

        return true;
        
    }
}