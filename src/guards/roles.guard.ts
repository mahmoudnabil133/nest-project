import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./roles.decorator";

const fakeUser = {
    username: 'mary',
    roles: ['admin', 'manager', 'user']
}
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log('RolesGuard');
        const requiredRoles = this.reflector.get(Roles, context.getHandler());
        
        console.log('requiredRoles', requiredRoles);
        // const request = context.switchToHttp().getRequest();
        // const roles = request.user.roles;
        if (!requiredRoles) {
            return true;
        }
        if (requiredRoles.every(role=> fakeUser.roles.includes(role))) {
            return true;
        }
        return false;
    }
}