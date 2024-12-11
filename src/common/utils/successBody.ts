const successBody = (statusCode = 200, body?: any) => ({
  statusCode,
  body,
});

export default successBody;
