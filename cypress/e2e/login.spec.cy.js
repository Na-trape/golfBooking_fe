describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/'); // Adjust the path if your login page is not at the root
  });

  it('should display the login page', () => {
    cy.get('h1').should('contain', 'Login');
  });

  it('should allow the user to select a username and login', () => {
    // Select a username
    cy.get('select').select('TestTest');
    // Enter passwor
    cy.get('input[type="password"]').type('securePassword123'); // Replace with a valid password for testing
    // Submit the form
    cy.get('form').submit();

    // Check if login was successful
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Login successful!');
    });

    // Check if redirected to the main page
    cy.url().should('include', '/main');
  });

  it('should display an error for incorrect credentials', () => {
    // Select a username
    cy.get('select').select('TestTest');
    // Enter wrong password
    cy.get('input[type="password"]').type('wrongpassword');
    // Submit the form
    cy.get('form').submit();

    // Check if an error message is displayed
    cy.get('p').should('contain', 'Login failed. Please check your credentials.');
  });

  it('should navigate to the signup page when Sign Up button is clicked', () => {
    // Click the Sign Up button
    cy.contains('Sign Up').click();

    // Check if redirected to the signup page
    cy.url().should('include', '/signup');
  });
});
