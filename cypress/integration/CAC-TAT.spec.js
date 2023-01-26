/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html');
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    })
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
        cy.get('#firstName').type('Felipe')
        cy.get('#lastName').type('Lucena')
        cy.get('#email').type('felipe@exemplo.com.br')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Felipe')
        cy.get('#lastName').type('Lucena')
        cy.get('#email').type('felipe@exemplo.com,br')
        cy.get('#open-text-area').type('Texto')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('verifica se campo telefone aceita apenas números como texto', function () {
        cy.get('#phone').type('abc').should('have.value', '')
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName').type('Felipe')
        cy.get('#lastName').type('Lucena')
        cy.get('#email').type('felipe@exemplo.com.br')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Texto')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#firstName')
            .type('Felipe')
            .should('have.value', 'Felipe')
            .clear()
            .should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible');
    })
    it.only('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('youtube').should('have.value', 'youtube')

    })
})
