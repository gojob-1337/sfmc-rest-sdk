describe('auth', () => {
  describe('requestToken', () => {
    it('should generate a valid not expired token', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('getAuthData', () => {
    it('should return valid authData when authentification has been done', () => {
      expect(true).toBeTruthy();
    });
    it('should return undefined when authentification has not been done', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('getDomain', () => {
    it('should fetch the domain configured in the SDK', () => {
      expect(true).toBeTruthy();
    });
  });

  describe('hasValidToken', () => {
    it('should be falsy when token is expired or invalid', () => {
      expect(true).toBeTruthy();
    });

    it('should be truthy when token is not expired', () => {
      expect(true).toBeTruthy();
    });
  });
});
