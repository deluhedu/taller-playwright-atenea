//importaciones de Playwrright
import { Page, Locator } from '@playwright/test';

//Exponiendo la PaginaRegistro para poder usarla en los tests
export class PaginarRegistro {
    //Siempre necesitamos el page para interactuar con la pagina
    readonly page: Page;
    //Definimos los localizadores que vamos a usar con la propiedad locator
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonRegisrarse: Locator;
    readonly botonIniciarSesion: Locator;
    //variables de  textos
    readonly mensajeDeCreacionDeCuenta: string;
    readonly mensajeEmailUtilizado: string;


    //Constructor que recibe el page y define los localizadores
    constructor(page: Page) {
        //cuerpo del metodo, lo que se ejcutara cuadno se llame el metodo
        //asignamos el page a la propiedad de la clase
        this.page = page;
        //Definimos el localizador para el campo nombre
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' });
        this.apellidoInput = page.locator('[name="lastName"]');
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonRegisrarse = page.getByTestId('boton-registrarse');

        this.mensajeDeCreacionDeCuenta = "Registro exitoso!"
        this.mensajeEmailUtilizado = "Email already in use"
    }

    //clase de tipo asincrona
    async visitarPaginaRegistro(){
        await this.page.goto('http://localhost:3000/signup');
        await this.page.waitForLoadState('domcontentloaded')
    }

    async completarFormularioRegistro(nombre: string, apellido: string, email: string, contraseña: string){
        await this.nombreInput.fill(nombre);
        await this.apellidoInput.fill(apellido)
        await this.emailInput.fill(email)
        await this.contrasenaInput.fill(contraseña);        
    }

    async hacerClickBotonRegistro(){
        await this.botonRegisrarse.click()
    }

    async registrarUsuario(nombre: string, apellido: string, email: string, contraseña: string){
        await this.completarFormularioRegistro(nombre,apellido,email,contraseña)
        await this.hacerClickBotonRegistro();
    }

}


