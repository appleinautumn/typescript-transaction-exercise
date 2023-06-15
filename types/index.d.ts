export {};

declare global {
  namespace Express {
    interface Response {
      success: Response<any, Record<string, any>>;
    }
  }
}

declare global {
  interface Error {
    status: number;
  }
}
