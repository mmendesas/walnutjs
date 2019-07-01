
Feature: Cucumber test

  @simple_web
  Scenario: Load Variables using params
    Given user stores the following list of variables:
      | "base_url" | "${params.[$.default.base_url]}" |
      | "user"     | "${params.[$.default.user]}"     |
    And user prints the message 'my base url --> ${vars.base_url}' to console

  @simple_web
  Scenario: I want to make some interaction in webpage
    Given user navigates to '${vars.base_url}'
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


  @full_test
  Scenario: I want to test all the form methods
    Given user navigates to '${vars.base_url}'