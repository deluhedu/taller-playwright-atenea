import { test, expect } from '@playwright/test';
/*import { PaginarRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginarRegistro;

test('TC1 - registro exitoso', async ({ page }) => {
  paginaRegistro = new PaginarRegistro(page);
  const emailAleatorio = 'deluhedu' + Math.floor(Math.random() * 1000) + '@test.com';

  await paginaRegistro.visitarPaginaRegistro(); //accion de ir a visitar la URL
  await paginaRegistro.registrarUsuario("Deissy", "Herrera", emailAleatorio, "contraseña123");
  await expect(page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();  
  
});

test('TC2 - registro no exitoso, email existente', async ({ page }) => {
  paginaRegistro = new PaginarRegistro(page);
  await paginaRegistro.visitarPaginaRegistro();

  await paginaRegistro.registrarUsuario("Deissy", "Herrera", "deluhedu113@test.com", "Contraseña123");
  
  await expect(page.getByText(paginaRegistro.mensajeEmailUtilizado)).toBeVisible();  
  
});*/

test('TC-1 - verificacion de elementos en la pagina de registro', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
  await expect(page.locator('input[name="lastName"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByTestId('boton-registrarse')).toBeVisible();
  //await page.waitForTimeout(5000);

});

test('TC-2 - verificar boton de registro esta inhabiliatdo por defecto', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByTestId('boton-registrarse')).toBeDisabled();

});

test('TC-3 - verificar boton de registro se habilita al completar los campos obligatorios', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Deissy')
  await page.locator('input[name="lastName"]').fill('Herrera')
  await page.locator('input[name="email"]').fill('deissytest'+Date.now().toString()+'@gmail.com') //email aleatorio
  await page.locator('input[name="password"]').fill('12345678');
  await expect(page.getByTestId('boton-registrarse')).toBeEnabled();

});

test('TC-4 - verificar redireccionamiento a pagina de inicio de sesion al hacer clic', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByTestId('boton-login-header-signup').click();
  await expect(page).toHaveURL('http://localhost:3000/login');
  await page.waitForTimeout(5000);  

});


test('TC-5 - verificar con datos validos registro exitoso', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Deissy')
  await page.locator('input[name="lastName"]').fill('Herrera')
  await page.locator('input[name="email"]').fill('deissytest'+Date.now().toString()+'@gmail.com') //email aleatorio
  await page.locator('input[name="password"]').fill('12345678');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();  

});

test('TC-6 - verificar usuairo no pueda registrarse con email existente', async ({ page }) => {
  const email = 'deissytest' + Date.now().toString() + '@gmail.com'
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Deissy')
  await page.locator('input[name="lastName"]').fill('Herrera')
  await page.locator('input[name="email"]').fill(email) //email aleatorio
  await page.locator('input[name="password"]').fill('12345678');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso')).toBeVisible();  
  await page.goto('http://localhost:3000/');
  await page.locator('input[name="firstName"]').fill('Deissy')
  await page.locator('input[name="lastName"]').fill('Herrera')
  await page.locator('input[name="email"]').fill(email) //email aleatorio
  await page.locator('input[name="password"]').fill('12345678');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();    

});



