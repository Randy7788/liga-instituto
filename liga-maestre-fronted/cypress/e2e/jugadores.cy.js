describe('Flujo de Jugadores con mock HTTP', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://127.0.0.1:8000/api/jugadores', {
      statusCode: 200,
      body: [
        {
          id: 1,
          nombre: 'Lucía Gómez',
          competicion: 'futbol',
          equipo: '1º Bach A',
          posicion: 'Delantera',
          dorsal: 10
        },
        {
          id: 2,
          nombre: 'Carlos Pérez',
          competicion: 'baloncesto',
          equipo: '2º ESO B',
          posicion: 'Base',
          dorsal: 7
        }
      ]
    }).as('getJugadoresMock');

    cy.visit('http://localhost:4200/jugadores');
    cy.wait('@getJugadoresMock');
  });

  it('debe cargar la página de jugadores', () => {
    cy.contains('Jugadores');
    cy.contains('Listado de jugadores');
    cy.contains('Lucía Gómez');
    cy.contains('Carlos Pérez');
  });

  it('debe filtrar jugadores por nombre', () => {
    cy.get('[data-cy=buscar-jugador]').type('Lucía', { force: true });
    cy.get('table tbody').contains('Lucía Gómez');
    cy.get('table tbody').should('not.contain', 'Carlos Pérez');
  });

  it('debe manejar una búsqueda sin resultados', () => {
    cy.get('[data-cy=buscar-jugador]')
      .clear({ force: true })
      .type('zzzzzz', { force: true });

    cy.get('table tbody tr').should('have.length', 0);
    cy.contains('Mostrando 0 jugador(es).');
  });
});