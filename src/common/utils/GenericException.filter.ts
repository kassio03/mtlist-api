import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(Error)
class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const contextResponse = context.getResponse();
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      contextResponse.status(statusCode).json({
        statusCode,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message,
      });
      return;
    }

    contextResponse.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}

export default GenericExceptionFilter;
