import { test, expect } from '@playwright/test';
import { PaginarRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginarRegistro;

test('TC1 - registro exitoso', async ({ page }) => {
  paginaRegistro = new PaginarRegistro(page);
  const emailAleatorio = 'deluhedu' + Math.floor(Math.random() * 1000) + '@test.com';

  await page.goto('http://localhost:3000/signup');+
  await paginaRegistro.nombreInput.fill('Deissy')
  await page.locator('[name="lastName"]').fill('Herrera');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill(emailAleatorio);
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Registro exitoso!')).toBeVisible();  
  
});

test('TC2 - registro no exitoso, email existente', async ({ page }) => {
  paginaRegistro = new PaginarRegistro(page);
  await page.goto('http://localhost:3000/signup');+
  await page.getByRole('textbox', { name: 'Nombre' }).fill('Deissy');
  await page.locator('[name="lastName"]').fill('Herrera');
  await page.getByRole('textbox', { name: 'Correo electrónico' }).fill('deluhedu113@test.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('Contraseña123');
  await page.getByTestId('boton-registrarse').click();
  await expect(page.getByText('Email already in use')).toBeVisible();  
  
});



