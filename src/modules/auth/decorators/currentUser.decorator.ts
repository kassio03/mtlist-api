import { ArgumentsHost, createParamDecorator } from '@nestjs/common';

const CurrentUser = createParamDecorator((_: any, host: ArgumentsHost) => {
  const request = host.switchToHttp().getRequest();
  return request.user;
});

export default CurrentUser;
