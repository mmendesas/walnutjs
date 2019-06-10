
Feature: Cucumber test

  @simple_web
  Scenario: I want see the Google Page
    # Given user navigates to 'https://www.google.com.br'
    Given user navigates to 'https://taniarascia.github.io/primitive/#forms'
    When user fills 'Grosa-teste2' with 'led zeppelin wikipedia'
    # When user fills 'GoogleHome-SearchInput' by JS with 'jsonla'
    When user fills 'Grosa-teste2' by replacing text with 'marSRSDF'
    And user highlights the 'Grosa-teste2' on the screen
    When user fills 'Grosa-teste2' by replacing text with '2231'
    And user highlights the 'Grosa-email' on the screen

# When user selects in combo 'Grosa-combo' the option 'Option 2'
# When user checks the 'Grosa-checkbox'
# Then user clicks on 'Grosa-teste'
