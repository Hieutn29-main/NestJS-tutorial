export class ResponseData<D> {
  data: D | D[] | null;
  statusCode: number;
  massage: string;
  constructor(data: D | D[] | null, statusCode: number, massage: string) {
    this.data = data;
    this.statusCode = statusCode;
    this.massage = massage;

    return this;
  }
}
