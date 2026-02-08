import { serviceResponse, ServiceResponse } from '../../utils/serviceResponse';
import { SignupDTO } from './dto/signup.dto';
import { IProfessionalService } from './interface/professionalService.interface';
import { Professional } from './entity/professional.entity';
import { Repository } from 'typeorm';
import { HttpResponse } from '../../utils/httpResponses';
import { LoginDTO } from './dto/login.dto';
import { IEncrypt } from '../../commons/encrypt/encrypt.interface';
import { ILike } from 'typeorm';
import { IJwtService } from '../../commons/jwt/jwt.interface';
import { UpdateUserDTO } from './dto/update.dto';
import { ConfirmSignupTokenDTO } from './dto/confirmSignupToken.dto';
import { generateNumericCode } from '../../utils/generateNumericCode';
import { Patient } from '../patients/entity/patients.entity';
import { ConfirmForgotPasswordTokenDTO } from './dto/confirmForgotPasswordToken.dto';

export class ProfessionalService implements IProfessionalService {
  private professionalRepository: Repository<Professional>;

  private jwtService: IJwtService;

  private encrypt: IEncrypt;

  constructor(professionalRepository: Repository<Professional>, encrypt: IEncrypt, jwtService: IJwtService) {
    this.professionalRepository = professionalRepository;
    this.encrypt = encrypt;
    this.jwtService = jwtService;
  }

  sendForgotPasswordToken = async (professionalEmail: string): Promise<ServiceResponse<{ token: string; }>> => {
    const professional = await this.findProfessionalByEmail(professionalEmail);
    if (!professional) {
      throw HttpResponse.badRequest({
        message: 'Não foi encontrado nenhum profissional com esse e-mail'
      });
    }

    const forgotPasswordToken = generateNumericCode(5);
    await this.professionalRepository.update(
      {
        id: professional.id,
      },
      {
        forgotPasswordToken,
      }
    );
    return serviceResponse(HttpResponse.success({
      data: { token: forgotPasswordToken },
      message: 'Um token de confirmação foi enviado para o seu email',
    }));
  }

  confirmForgotPasswordToken = async (confirmForgotPasswordTokenDTO: ConfirmForgotPasswordTokenDTO): Promise<ServiceResponse<null>> => {
    const professional = await this.findProfessionalByEmail(confirmForgotPasswordTokenDTO.email);
    if (!professional) {
      throw HttpResponse.badRequest({
        message: 'Esse usuário não existe!',
      });
    }

    if (professional.forgotPasswordToken !== confirmForgotPasswordTokenDTO.forgotPasswordToken) {
      throw HttpResponse.badRequest({
        message: 'O código inserido não é o mesmo enviado ao e-mail',
      });
    }

    await this.professionalRepository.update(
      {
        id: professional.id,
      },
      {
        forgotPasswordToken: null as any,
      }
    );

    return serviceResponse(HttpResponse.success({
      message: 'Código validado!',
    }));
  }

  getProfessionalPatients = async (professionalId: number): Promise<ServiceResponse<Patient>> => {
    const thisProfessionalPatients = await this.professionalRepository.findOne({
      relations: {
        patientRelations: {
          patient: true,
        },
      },
      where: {
        id: professionalId,
      },
    });

    return serviceResponse(HttpResponse.success({
      data: thisProfessionalPatients,
    }))
  }

  private findProfessionalByEmail = async (email: string): Promise<Professional | null> => {
    return await this.professionalRepository.findOne({
      where: {
        email,
      },
    });
  }

  confirmSignupToken = async (confirmSignupTokenDTO: ConfirmSignupTokenDTO): Promise<ServiceResponse<null>> => {
    const professional = await this.findProfessionalByEmail(confirmSignupTokenDTO.professionalEmail);
    if (!professional) {
      throw HttpResponse.badRequest({
        message: 'Esse usuário não existe!',
      });
    }

    if (professional.accountConfirmationToken !== confirmSignupTokenDTO.signupToken) {
      throw HttpResponse.badRequest({
        message: 'O token não coincide com o código enviado ao e-mail!'
      })
    }
    await this.professionalRepository.update(
      {
        id: professional.id,
      },
      {
        hasConfirmedAccount: true,
      }
    );
    return serviceResponse({
      statusCode: 200,
      data: null,
      message: 'Conta confirmada com sucesso!',
    });
  }

  findById = async (id: number): Promise<ServiceResponse<Professional>> => {
    const user = await this.professionalRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw HttpResponse.badRequest({
        message: 'Usuário não encontrado',
      });
    }
    return serviceResponse({
      statusCode: 200,
      data: user,
    });
  };

  update = async (updateDTO: UpdateUserDTO): Promise<ServiceResponse<Professional>> => {
    const user = await this.findById(updateDTO.id);

    const updateResults = await this.professionalRepository.update(
      {
        id: user.data.id,
      },
      {
        ...updateDTO,
      }
    );

    if (!updateResults.affected || updateResults.affected < 1) {
      throw HttpResponse.badRequest({
        message: 'No user found. Update cancelled.',
      });
    }

    return serviceResponse({
      statusCode: 200,
      data: user.data,
      message: 'User updated successfully!',
    });
  };

  login = async (loginDTO: LoginDTO): Promise<ServiceResponse<{ user: Professional; jwt: string }>> => {
    try {
      const { email, password } = loginDTO;
      const user = await this.professionalRepository.findOne({
        where: {
          email: ILike(email),
        },
      });
      if (!user) {
        throw HttpResponse.badRequest({
          message: 'Não existe usuário com essas credenciais no sistema',
        });
      }

      const comparePassword = this.encrypt.compare(password, user.password);
      if (!comparePassword) {
        throw HttpResponse.badRequest({ message: "As credenciais não coincidem!" });
      }

      const thisUserJwt = this.jwtService.sign({
        id: user.id,
      });

      if (!user.hasConfirmedAccount) {
        throw HttpResponse.badRequest({
          message: 'Essa conta não foi confirmada!'
        })
      }

      return serviceResponse(
        HttpResponse.success({ data: { user, jwt: thisUserJwt }, message: 'Usuário logado' }),
      );
    } catch (err) {
      throw err;
    }
  };

  signUp = async (signupDTO: SignupDTO): Promise<ServiceResponse<Professional>> => {
    try {
      const userWithGivenEmail = await this.professionalRepository.findOne({
        where: {
          email: signupDTO.email,
        },
      });
      if (userWithGivenEmail) {
        throw HttpResponse.badRequest({
          message: 'Já existe um usuário com e-mail',
        });
      }

      const hashedPassword = this.encrypt.encrypt(signupDTO.password);
      if (!hashedPassword) {
        throw HttpResponse.systemError({
          message: 'Ocorreu um erro no sistema. Tente novamente mais tarde!',
        });
      }

      const accountConfirmationToken = generateNumericCode(5);

      await this.professionalRepository.save({
        email: signupDTO.email,
        name: signupDTO.name,
        password: hashedPassword,
        accountConfirmationToken: accountConfirmationToken,
      });
      return serviceResponse(
        HttpResponse.created({
          data: { ...signupDTO, password: hashedPassword },
          message: 'Usuário criado com sucesso!',
        }),
      );
    } catch (err) {
      throw err;
    }
  };

  getAll = async (): Promise<
    ServiceResponse<Pick<Professional, 'id' | 'createdAt' | 'email' | 'name'>[]>
  > => {
    try {
      this.professionalRepository.find({
        where: {},
      });
      const users = await this.professionalRepository.find({
        select: ['id', 'email', 'name', 'createdAt'],
      });
      return serviceResponse(HttpResponse.success({ data: users }));
    } catch (err) {
      throw err;
    }
  };
}
