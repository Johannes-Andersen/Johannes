describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/').as('homePage');
  });

  it('should display my name and profile ID', () => {
    cy.get('h1').should('contain', 'Johannes');
    cy.get('h2').should('contain', 'did:plc:euvjn7oyu4srnlql4efh6zar');
  });

  it('should link to Github and BlueSky profiles', () => {
    cy.get('[data-test="github-link"]')
      .should('have.attr', 'href')
      .and('include', 'https://github.com/Johannes-Andersen');

    cy.get('[data-test="bluesky-link"]')
      .should('have.attr', 'href')
      .and('include', 'https://bsky.app/profile/johand.dev');
  });

  it('should set the expected cache headers', () => {
    cy.request('/').then((response) => {
      expect(response.headers).to.have.property('cache-control');
      expect(response.headers['cache-control']).to.equal(
        'max-age=86400, stale-while-revalidate=86400, stale-if-error=259200',
      );
    });
  });

  it('should set security headers', () => {
    cy.request('/').then((response) => {
      const headers = response.headers;

      // Check key security headers
      expect(headers).to.have.property('x-xss-protection', '1; mode=block');
      expect(headers).to.have.property('x-content-type-options', 'nosniff');
      expect(headers).to.have.property('referrer-policy', 'same-origin');
      expect(headers).to.have.property('x-frame-options', 'DENY');
      expect(headers).to.have.property(
        'cross-origin-opener-policy',
        'same-origin',
      );
      expect(headers).to.have.property(
        'cross-origin-resource-policy',
        'same-origin',
      );
      expect(headers).to.have.property(
        'cross-origin-embedder-policy',
        'require-corp',
      );

      // Check permissions policy is set
      expect(headers).to.have.property('permissions-policy');
      expect(headers['permissions-policy']).to.include('accelerometer=()');
      expect(headers['permissions-policy']).to.include('camera=()');
      expect(headers['permissions-policy']).to.include('geolocation=()');
    });
  });
});
