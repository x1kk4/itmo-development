import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    return request.userId;
  },
);
