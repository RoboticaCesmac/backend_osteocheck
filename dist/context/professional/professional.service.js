"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalService = void 0;
const serviceResponse_1 = require("../../utils/serviceResponse");
const httpResponses_1 = require("../../utils/httpResponses");
const typeorm_1 = require("typeorm");
const generateNumericCode_1 = require("../../utils/generateNumericCode");
const pagination_1 = require("../../utils/pagination");
const responseStatus_enum_1 = require("../questionnaire/enum/responseStatus.enum");
const signupEmail_const_1 = require("../../const/email/signupEmail.const");
const forgotPasswordEmail_const_1 = require("../../const/email/forgotPasswordEmail.const");
class ProfessionalService {
    constructor(professionalRepository, encrypt, jwtService, emailService, questionnaireResponseRepository) {
        this.changePassword = async (changePasswordDTO) => {
            const professional = await this.findProfessionalByEmail(changePasswordDTO.email);
            if (!professional) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Não foi encontrado nenhum profissional com esse e-mail'
                });
            }
            await this.update({
                id: professional.id,
                password: changePasswordDTO.password,
            });
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                message: 'Senha alterada com sucesso!',
            }));
        };
        this.sendForgotPasswordToken = async (professionalEmail) => {
            const professional = await this.findProfessionalByEmail(professionalEmail);
            if (!professional) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Não foi encontrado nenhum profissional com esse e-mail'
                });
            }
            const forgotPasswordToken = (0, generateNumericCode_1.generateNumericCode)(5);
            await this.professionalRepository.update({
                id: professional.id,
            }, {
                forgotPasswordToken,
            });
            await this.emailService.sendEmail({
                emailAddress: [professional.email],
                subject: forgotPasswordEmail_const_1.forgotPasswordEmailConst.subject,
                text: `${forgotPasswordEmail_const_1.forgotPasswordEmailConst.text} ${forgotPasswordToken}`,
            });
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                data: { token: forgotPasswordToken },
                message: 'Um token de confirmação foi enviado para o seu email',
            }));
        };
        this.deleteProfessional = async (id) => {
            const professional = await this.getProfile(id);
            if (!professional.data) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Profissional não encontrado',
                });
            }
            await this.professionalRepository.delete(professional.data.id);
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                message: 'Profissional deletado com sucesso!',
            }));
        };
        this.confirmForgotPasswordToken = async (confirmForgotPasswordTokenDTO) => {
            const professional = await this.findProfessionalByEmail(confirmForgotPasswordTokenDTO.email);
            console.log(professional);
            if (!professional) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Esse usuário não existe!',
                });
            }
            if (professional.forgotPasswordToken !== confirmForgotPasswordTokenDTO.forgotPasswordToken) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'O código inserido não é o mesmo enviado ao e-mail',
                });
            }
            await this.professionalRepository.update({
                id: professional.id,
            }, {
                forgotPasswordToken: null,
            });
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                message: 'Código validado!',
            }));
        };
        this.getProfessionalPatients = async (professionalId) => {
            const thisProfessionalPatients = await this.professionalRepository.findOne({
                relations: {
                    patients: true,
                },
                where: {
                    id: professionalId,
                },
            });
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({
                data: thisProfessionalPatients,
            }));
        };
        this.getLastQuestionnaireResponses = async (professionalId, paginationOptions) => {
            try {
                const paginatedResponses = await (0, pagination_1.paginate)(this.questionnaireResponseRepository, {
                    where: {
                        professionalId,
                        status: responseStatus_enum_1.ResponseStatus.COMPLETED,
                    },
                    relations: {
                        patient: true,
                    },
                    order: {
                        createdAt: 'DESC',
                    },
                }, paginationOptions ?? { limit: 10, page: 1 });
                return paginatedResponses;
            }
            catch (err) {
                throw err;
            }
        };
        this.getProfile = async (professionalId) => {
            const professional = await this.professionalRepository.findOne({
                where: { id: professionalId },
                select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'hasConfirmedAccount'],
            });
            if (!professional) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Profissional não encontrado',
                });
            }
            return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({ data: professional }));
        };
        this.findProfessionalByEmail = async (email) => {
            return await this.professionalRepository.findOne({
                where: {
                    email: email.toLowerCase(),
                },
            });
        };
        this.confirmSignupToken = async (confirmSignupTokenDTO) => {
            const professional = await this.findProfessionalByEmail(confirmSignupTokenDTO.professionalEmail);
            if (!professional) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Esse usuário não existe!',
                });
            }
            if (professional.accountConfirmationToken !== confirmSignupTokenDTO.signupToken) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'O token não coincide com o código enviado ao e-mail!'
                });
            }
            await this.professionalRepository.update({
                id: professional.id,
            }, {
                hasConfirmedAccount: true,
            });
            return (0, serviceResponse_1.serviceResponse)({
                statusCode: 200,
                data: null,
                message: 'Conta confirmada com sucesso!',
            });
        };
        this.findById = async (id) => {
            const user = await this.professionalRepository.findOne({
                where: {
                    id,
                },
            });
            if (!user) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'Usuário não encontrado',
                });
            }
            return (0, serviceResponse_1.serviceResponse)({
                statusCode: 200,
                data: user,
            });
        };
        this.update = async (updateDTO) => {
            const user = await this.findById(updateDTO.id);
            if (updateDTO.password) {
                const encryptedPassword = this.encrypt.encrypt(updateDTO.password);
                updateDTO.password = encryptedPassword ?? updateDTO.password;
            }
            const updateResults = await this.professionalRepository.update({
                id: user.data.id,
            }, {
                ...updateDTO,
            });
            if (!updateResults.affected || updateResults.affected < 1) {
                throw httpResponses_1.HttpResponse.badRequest({
                    message: 'No user found. Update cancelled.',
                });
            }
            return (0, serviceResponse_1.serviceResponse)({
                statusCode: 200,
                data: user.data,
                message: 'User updated successfully!',
            });
        };
        this.login = async (loginDTO) => {
            try {
                const { email, password } = loginDTO;
                const user = await this.professionalRepository.findOne({
                    where: {
                        email: (0, typeorm_1.ILike)(email),
                    },
                });
                if (!user) {
                    throw httpResponses_1.HttpResponse.badRequest({
                        message: 'Não existe usuário com essas credenciais no sistema',
                    });
                }
                const comparePassword = this.encrypt.compare(password, user.password);
                if (!comparePassword) {
                    throw httpResponses_1.HttpResponse.badRequest({ message: "As credenciais não coincidem!" });
                }
                const thisUserJwt = this.jwtService.sign({
                    id: user.id,
                });
                if (!user.hasConfirmedAccount) {
                    throw httpResponses_1.HttpResponse.badRequest({
                        message: 'Essa conta não foi confirmada!'
                    });
                }
                return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({ data: { user, jwt: thisUserJwt }, message: 'Usuário logado' }));
            }
            catch (err) {
                throw err;
            }
        };
        this.signUp = async (signupDTO) => {
            try {
                signupDTO.email = signupDTO.email.toLowerCase();
                const userWithGivenEmail = await this.professionalRepository.findOne({
                    where: {
                        email: signupDTO.email,
                    },
                });
                if (userWithGivenEmail && userWithGivenEmail.hasConfirmedAccount) {
                    throw httpResponses_1.HttpResponse.badRequest({
                        message: 'Já existe um usuário com e-mail',
                    });
                }
                if (userWithGivenEmail && !userWithGivenEmail.hasConfirmedAccount) {
                    await this.professionalRepository.delete({
                        id: userWithGivenEmail.id,
                    });
                }
                const hashedPassword = this.encrypt.encrypt(signupDTO.password);
                if (!hashedPassword) {
                    throw httpResponses_1.HttpResponse.systemError({
                        message: 'Ocorreu um erro no sistema. Tente novamente mais tarde!',
                    });
                }
                const accountConfirmationToken = (0, generateNumericCode_1.generateNumericCode)(5);
                await this.professionalRepository.save({
                    email: signupDTO.email,
                    name: signupDTO.name,
                    password: hashedPassword,
                    accountConfirmationToken: accountConfirmationToken,
                });
                this.emailService.sendEmail({
                    emailAddress: [signupDTO.email],
                    subject: signupEmail_const_1.signupEmailConst.subject,
                    text: `${signupEmail_const_1.signupEmailConst.text} ${accountConfirmationToken}`,
                });
                return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.created({
                    data: { ...signupDTO, password: hashedPassword },
                    message: 'Usuário criado com sucesso!',
                }));
            }
            catch (err) {
                throw err;
            }
        };
        this.getAll = async () => {
            try {
                this.professionalRepository.find({
                    where: {},
                });
                const users = await this.professionalRepository.find({
                    select: ['id', 'email', 'name', 'createdAt'],
                });
                return (0, serviceResponse_1.serviceResponse)(httpResponses_1.HttpResponse.success({ data: users }));
            }
            catch (err) {
                throw err;
            }
        };
        this.professionalRepository = professionalRepository;
        this.encrypt = encrypt;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.questionnaireResponseRepository = questionnaireResponseRepository;
    }
}
exports.ProfessionalService = ProfessionalService;
