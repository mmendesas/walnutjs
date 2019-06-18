
Feature: Cucumber test

  @simple_web
  Scenario: I want see the Google Page
    # Given user navigates to 'https://www.google.com.br'
    Given user navigates to 'https://taniarascia.github.io/primitive/#forms'
    When user fills 'Grosa-teste2' with 'led zeppelin wikipedia'
    # When user fills 'GoogleHome-SearchInput' by JS with 'jsonla'
    When user fills 'Grosa-teste2' by replacing text with '2231'
    And user waits for 2 seconds
    And user stores the value 'asdf' in variable 'mteste'
    And user stores the following list of variables:
      | grosa | marcio |
      | name  | mendes |

    Given user stores the TEXT from element 'Grosa-combo' in variable 'grosa3'
    Then user prints all variables to console
    Then user prints the message 'gros' to console
    Then user saves a screenshot 'teste|123'

# Then user clicks on 'Grosa-teste'
