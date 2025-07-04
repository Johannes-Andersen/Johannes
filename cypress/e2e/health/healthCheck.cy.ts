describe('Health Check', () => {
  it('returns a healthy status', () => {
    cy.request('/api/health').its('status').should('eq', 200);
  });

  it('returns a healthy body', () => {
    cy.request('/api/health').its('body').should('include', { status: 'ok' });
  });

  it('should not set any cache headers', () => {
    cy.request('/api/health').then((response) => {
      expect(response.headers).to.have.property(
        'cache-control',
        'no-cache, no-store, must-revalidate',
      );
      expect(response.headers).to.not.have.property('expires');
    });
  });
});
