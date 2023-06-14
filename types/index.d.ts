export {};

declare global {
  namespace Express {
    interface Response {
      success: Response<any, Record<string, any>>;
    }
  }
}
