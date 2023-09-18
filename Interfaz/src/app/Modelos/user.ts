export class User {
    idUsuario!: number;
    fechaNacimiento!: Date;
    nombreCompleto!: string;
    contrasena!: string; // Considera cambiar el nombre a 'contrasena' para evitar problemas con el caracter especial 'ñ'
    rolSistema!: RolSistema;
    idBlockchain!: string;
    email!: string;
}

export enum RolSistema {
    Admin = 'Admin',
    Usuario = 'Usuario'
}
