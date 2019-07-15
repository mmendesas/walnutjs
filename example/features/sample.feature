
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
    Then the 'msite-ageTotal' has text equals to '36'
    Then the 'msite-job' has value equals to 'Developer'
    Then user saves a screenshot 'interact|my-screen'

  @simple_web
  Scenario: I want see the Google Page
    Given user navigates to 'http://www.google.com.br'
    When user fills 'GoogleHome-SearchInput' by replacing text with 'led zeppelin wikipedia'
    And user clicks on 'GoogleHome-SearchButton:[Pesquisa]'
    And user clicks on 'GoogleResult-SiteLink'
    And user waits for 3 seconds

  @full_test
  Scenario: I want to test all the form method
    Then user prints the message 'other testssttst' to console
# Given user navigates to '${vars.base_url}'
