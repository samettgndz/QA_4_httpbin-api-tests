/// <reference types="cypress" />

describe('HTTPBin API Otomatik Testleri', () => {

  const baseUrl = 'https://httpbin.org';

  it('TC01 - GET isteği 200 dönmeli ve JSON formatı doğrulanmalı', () => {
    cy.request(`${baseUrl}/get`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('url');
    });
  });

  it('TC02 - Dinamik (rastgele) query parametresi doğrulanmalı', () => {
    const randomValue = Math.floor(Math.random() * 1000000);

    const request = {
      method: 'GET',
      url: `${baseUrl}/get`,
      qs: {
        testId: String(randomValue)
      },
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.args.testId).to.eq(String(randomValue));
    });
  });

  it('TC03 - User-Agent ve özel header gönderilmeli ve doğrulanmalı', () => {
    const request = {
      method: 'GET',
      url: `${baseUrl}/headers`,
      headers: {
        'User-Agent': 'Cypress QA Test',
        'X-Test-Header': 'customHeaderValue'
      },
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers['User-Agent']).to.eq('Cypress QA Test');
      expect(response.body.headers['X-Test-Header']).to.eq('customHeaderValue');
    });
  });

  it('TC04 - POST isteği ile JSON body gönderilmeli', () => {
    const bodyData = {
      name: 'Samet',
      role: 'QA'
    };

    const request = {
      method: 'POST',
      url: `${baseUrl}/post`,
      body: bodyData,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.eq(bodyData);
    });
  });

  it('TC05 - PUT isteği ile JSON body güncellenmeli', () => {
    const bodyData = {
      id: 1,
      status: 'updated'
    };

    const request = {
      method: 'PUT',
      url: `${baseUrl}/put`,
      body: bodyData,
      headers: {
        'Content-Type': 'application/json'
      },
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.json).to.deep.eq(bodyData);
    });
  });

  it('TC06 - DELETE isteği başarılı olmalı ve header doğrulanmalı', () => {
    const request = {
      method: 'DELETE',
      url: `${baseUrl}/delete`,
      headers: {
        'X-Delete-Test': 'true'
      },
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.headers['X-Delete-Test']).to.eq('true');
    });
  });

  it('TC07 - Geçersiz endpoint 404 dönmeli', () => {
    const request = {
      method: 'GET',
      url: `${baseUrl}/status/404`,
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it('TC08 - Response body içindeki IP formatı kontrol edilmeli', () => {
    cy.request(`${baseUrl}/ip`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.origin).to.be.a('string');
    });
  });

  it('TC09 - Cookie gönderilmeli ve response içinde doğrulanmalı', () => {
    const request = {
      method: 'GET',
      url: `${baseUrl}/cookies`,
      headers: {
        'Cookie': 'sessionId=12345'
      },
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.cookies.sessionId).to.eq('12345');
    });
  });

  it('TC10 - Response süresi ölçülmeli (performans testi)', () => {
    const request = {
      method: 'GET',
      url: `${baseUrl}/delay/1`,
      failOnStatusCode: false
    };

    cy.request(request).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.duration).to.be.gte(1000);
      expect(response.duration).to.be.lt(8000);
    });
  });

});
