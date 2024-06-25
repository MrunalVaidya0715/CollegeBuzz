import createHttpError from "http-errors";
const createError = (status:number, message: string)=>{
    const err = createHttpError();
    err.status = status
    err.message = message
    return err
}

export default createError;