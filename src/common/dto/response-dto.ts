export class IHttpResponse {
  statusCode: number;
  success: boolean;
  error?: string;
  body?: any;
}
