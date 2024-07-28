export interface HttpResponse<D = unknown> {
  data: D;
  message: string;
}

export interface HttpErrorResponse<D = unknown> {
  data?: D;
  message: string;
}
