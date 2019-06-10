
Feature: Cucumber test

  @simple_web
  Scenario: I want see the Google Page
    # Given user navigates to 'https://www.google.com.br'
    Given user navigates to 'https://taniarascia.github.io/primitive/#forms'
    When user fills 'Grosa-teste2' with 'led zeppelin wikipedia'
    # When user fills 'GoogleHome-SearchInput' by JS with 'jsonla'
    When user fills 'Grosa-teste2' by replacing text with '2231'

# Then user clicks on 'Grosa-teste'
