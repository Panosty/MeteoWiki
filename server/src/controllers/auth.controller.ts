import { Router, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Authentification } from '../../../common/authentification';
import { UserDTO } from '../../../common/user';
import { User } from '../interfaces';
import { AuthService } from '../services/auth.service';
import { MongodbService } from '../services/mongodb.service';
import { TYPES } from '../types';


@injectable()
export class AuthController {
    public constructor(@inject(TYPES.AuthService) private _authService: AuthService,
        @inject(TYPES.MongodbService) private _mongodbService: MongodbService) {
        //empty
    }

    public get router(): Router {

        const router: Router = Router();

        // -> /api/v1/auth/loggin
        router.post('/login', async (req: Request, res: Response) => {
            const auth: Authentification = req.body;
            const user: User | null = await this._mongodbService.getUserByUsername(auth.username);

            //TODO Trouver l'utilisateur dans la BD, si l'utilisateur est null retournez le code 403
            if (user === null) {
                res.status(403).send('Il faut entrer un nom utilisateur');
                return;
            }

            //TODO Comparer le mot de passe de la BD avec le mot de passe de la requête, utiliser le auth.service
            //Retournez le code 403 au besoin
            /* const hash:string= await this._authService.encryptPassword(auth.password) ;
            const valid:true|false= await this._authService.isPasswordValid(auth.password,hash); */

            const hashUtilisateur = <string>user.hash;
            const valid: true | false = await this._authService.isPasswordValid(auth.password, hashUtilisateur);
            if (valid === false) {
                res.status(403).send({ error: 'les informations ne sont pas conformes a nos donnees' });
                return;
            }

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service et assigner à l'utilisateur

            const jeton = this._authService.generateToken(user?._id);
            //TODO Retourner les informations de l'utilisateur sans le hash (voir interface UserDTO) 
            const userDTO: UserDTO = <UserDTO>user;
            userDTO.token = jeton;
            res.json(userDTO);

        });

        // -> /api/v1/auth/signup
        router.post('/signup', async (req: Request, res: Response) => {

            const auth: Authentification = req.body;
            let user: User | null = await this._mongodbService.getUserByUsername(auth.username);

            //TODO Valider que l'utilisateur (username) n'est pas déjà dans la BD
            //Retounez un code 405 si déjà présent
            if (user) {
                res.status(405).send('Désolé, ce nom d\'utilsateur existe déja');
            }

            //TODO Chiffrer le mot de passe avec auth.service
            const hash: string = await this._authService.encryptPassword(auth.password);

            //TODO Ajouter l'utilisateur à la BD
            user = await this._mongodbService.createUser(auth.username, hash);

            //Retounez un code 500 en cas de problème
            if (!user) {
                res.status(500).send();
            }

            //TODO Générer le jeton de l'utilisateur à l'aide du service auth.service
            const jeton = this._authService.generateToken(user?._id);

            //TODO Retourner les informations de l'utilisateur sans le hash (voir interface UserDTO) 
            const userDTO: UserDTO = <UserDTO>user;
            userDTO.token = jeton;
            res.json(userDTO);
        });

        return router;
    }

}