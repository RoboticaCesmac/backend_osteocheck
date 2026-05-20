import zod from 'zod';
import { Request } from "express";
import { LoginDTO } from '../dto/login.dto';

class AdminRequest {
  login(req: Request) {
    const loginSchema: zod.ZodType<LoginDTO> = zod.object({
      email: zod.email("É necessário informar o endereço de e-mail"),
      password: zod
        .string("A senha precisa ser um texto")
        .min(5, "A senha precisa conter no mínimo 5 caracteres"),
    });

    return loginSchema.safeParse(req.body);
  }
}

export default new AdminRequest();
