import { Repository } from "typeorm";
import { Admin } from "./entity/admin.entity";
import { IAdminService } from "./interface/adminService.interface";
import { ServiceResponse } from "../../utils/serviceResponse";
import { CreateAdminDTO } from "./dto/createAdmin.dto";
import { HttpResponse } from "../../utils/httpResponses";
import { IEncrypt } from "../../commons/encrypt/encrypt.interface";
import { IJwtService } from "../../commons/jwt/jwt.interface";
import { LoginDTO } from "./dto/login.dto";
import { ILike } from "typeorm";

export class AdminService implements IAdminService {
    private adminRepository: Repository<Admin>;
    private encryptService: IEncrypt;
    private jwtService: IJwtService;

    constructor(adminRepository: Repository<Admin>, encryptService: IEncrypt, jwtService: IJwtService) {
        this.adminRepository = adminRepository;
        this.encryptService = encryptService;
        this.jwtService = jwtService;
    }

    private getAdminByEmail = async (email: string): Promise<Admin | null> => {
        if (!email) {
            throw HttpResponse.badRequest({
                message: 'É preciso enviar o email do admin para verificar sua existência',
            })
        }
        const admin = await this.adminRepository.findOne({
            where: {
                email: email,
            }
        });
        return admin;
    }

    create = async (createAdminDTO: CreateAdminDTO): Promise<ServiceResponse<Admin>> => {
        const adminWithSameEmail = await this.getAdminByEmail(createAdminDTO.email);
        if (adminWithSameEmail) {
            throw HttpResponse.badRequest({
                message: 'Já existe um admin com esse e-mail',
            });
        }

        const encryptedPassword = this.encryptService.encrypt(createAdminDTO.password);
        if (!encryptedPassword) {
            throw HttpResponse.badRequest({
                message: 'Houve um erro ao encriptar a senha. Verifique se a senha é válida e tente novamente',
            });
        }
        const newAdmin: Admin = new Admin();
        newAdmin.email = createAdminDTO.email;
        newAdmin.password = encryptedPassword;

        const newAdminRepositoryResponse = await this.adminRepository.save(newAdmin);
        return HttpResponse.created({
            data: newAdminRepositoryResponse,
            message: 'Usuário admin criado com sucesso!',
        });
    }

    login = async (loginDTO: LoginDTO): Promise<ServiceResponse<{ user: Admin; jwt: string }>> => {
        try {
            const { email, password } = loginDTO;
            const adminByEmail = await this.getAdminByEmail(email);
            if (!adminByEmail) {
                throw HttpResponse.badRequest({
                    message: 'Não existe usuário com essas credenciais no sistema',
                });
            }

            const comparePassword = this.encryptService.compare(password, adminByEmail.password);
            if (!comparePassword) {
                throw HttpResponse.badRequest({ message: "As credenciais não coincidem!" });
            }

            const thisUserJwt = this.jwtService.sign({
                id: adminByEmail.id,
            });

            return HttpResponse.success({ data: { user: adminByEmail, jwt: thisUserJwt }, message: 'Usuário logado' });
        } catch (err) {
            throw err;
        }
    };
}