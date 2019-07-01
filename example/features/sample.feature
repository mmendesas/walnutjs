
Feature: Cucumber test

  @simple_web
  Scenario: I want to make some interaction in webpage
    Given user navigates to 'https://mmendesas.github.io/react-tutorial/'
    When user fills 'msite-name' with 'Marcio Mendes'
    When user fills 'msite-job' by replacing text with 'Developer'
    And user selects in combo 'msite-color' the option 'Orange'
    When user fills 'msite-age' by replacing text with '25'

    And user waits for 2 seconds
    And user stores the TEXT from element 'msite-ageTotal' in variable 'total'
    And user stores the following list of variables:
      | grosa | marcio |
      | name  | mendes |

    Then user prints all variables to console
    Then user prints the message 'gros' to console
    Then user saves a screenshot 'interact|my-screen'

# Then user clicks on 'Grosa-teste'
