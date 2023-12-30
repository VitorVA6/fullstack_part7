describe('Blog app', function(){
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'vitor vaz',
      username: 'vitorva6',
      password: 'vitor123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function(){
    cy.contains('log in to application')
  })

  describe('Login',function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('vitorva6')
      cy.get('#password').type('vitor123')
      cy.get('#login-button').click()
      cy.contains('vitor vaz logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('vitorva6')
      cy.get('#password').type('vitor456')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function(){
    beforeEach(function() {
      cy.login({ username: 'vitorva6', password: 'vitor123' })
    })

    it('A blog can be created', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('blog title')
      cy.get('#author').type('blog author')
      cy.get('#url').type('www.url.com')
      cy.get('#create-button').click()

      cy.contains('blog title blog author')
      cy.contains('a new blog blog title by blog author')
    })

    describe('and a blog exists', function(){
      beforeEach(function(){
        cy.createBlog({
          title: 'blog title',
          author: 'blog author',
          url: 'www.url.com',
          likes: 0
        })
      })

      it('a blog can be liked', function(){
        cy.contains('blog title blog author')
          .parent()
          .contains('view')
          .click()
        cy.contains('blog title blog author')
          .parent()
          .find('.like-button')
          .click()
        cy.contains('blog title blog author')
          .parent()
          .contains('likes 1')
      })

      it('a blog can be deleted', function(){
        cy.contains('blog title blog author')
          .parent()
          .contains('view')
          .click()
        cy.contains('blog title blog author')
          .parent()
          .find('.remove-button')
          .click()
        cy.get('html').should('not.contain', 'blog title blog author')
      })

      describe('another user exists and it creates another blog', function(){
        beforeEach(function(){
          cy.contains('logout').click()
          const user = {
            name: 'john doe',
            username: 'john2',
            password: 'john123',
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.login({ username: 'john2', password: 'john123' })
          cy.createBlog({
            title: 'second blog',
            author: 'second author',
            url: 'www.url2.com',
            likes: 1
          })
        })

        it('only the creator can see the delete button of a blog', function(){
          cy.contains('blog title blog author')
            .parent()
            .should('not.contain', 'remove')
          cy.contains('second blog second author')
            .parent()
            .should('contain', 'remove')
        })

        it('blogs are ordered', function(){
          cy.get('.blog')
            .eq(0)
            .should('contain', 'second blog second author')
          cy.get('.blog')
            .eq(1)
            .should('contain', 'blog title blog author')
          cy.contains('blog title blog author')
            .parent()
            .contains('view')
            .click()
          cy.contains('blog title blog author')
            .parent()
            .find('.like-button')
            .click()
          cy.contains('blog title blog author')
            .parent()
            .find('.like-button')
            .click()
          cy.get('.blog')
            .eq(0)
            .should('contain', 'blog title blog author')
          cy.get('.blog')
            .eq(1)
            .should('contain', 'second blog second author')
        })
      })
    })
  })
})