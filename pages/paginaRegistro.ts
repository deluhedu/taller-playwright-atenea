import {Page, Locator} from '@playwright/test';

export class PaginarRegistro{
    readonly page: Page;
    readonly nombreInput: Locator;

    constructor(page: Page){
        this.page = page;
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' });
    }
}


