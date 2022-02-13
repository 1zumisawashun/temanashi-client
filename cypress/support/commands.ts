// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import "@testing-library/cypress/add-commands";
import "cypress-file-upload";
import { configure } from "@testing-library/cypress";
configure({ testIdAttribute: "data-cy" });

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */

      upload_file(
        fileName?: any,
        fileType?: any,
        selector?: any
      ): Chainable<Element>;
      dataCy(value: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add(
  "upload_file",
  (fileName: any, fileType = "", selector: any) => {
    cy.get(selector).then((subject) => {
      cy.fixture(fileName, "base64")
        .then(Cypress.Blob.base64StringToBlob)
        .then((blob: any) => {
          cy.log(blob);
          const el = subject[0];
          const testFile = new File([blob], fileName, { type: fileType });
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
        });
    });
  }
);

Cypress.Commands.add("dataCy", (value: string): any => {
  return cy.get(`[data-cy=${value}]`);
});
