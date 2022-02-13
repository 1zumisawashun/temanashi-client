describe("Cypress", () => {
  it("画像のアップロード", () => {
    cy.visit("/create/furniture");
    cy.get('[data-cy="file_upload"]').attachFile(["sample.jpg", "sample.jpg"]);
  });
});

// describe("stripe", () => {
//   it("ログインする", () => {
//     // ログインページへアクセスする
//     cy.visit("/login");
//     cy.get('[data-cy="email"]').click().type("shunshun@gmail.com");
//     cy.get('[data-cy="password"]').click().type("Test1234");
//     cy.get('[data-cy="login"]').click({ multiple: true });
//   });
// });
