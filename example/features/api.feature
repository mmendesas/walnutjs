
Feature: Api test

  @simple_api
  Scenario: User wants to make a simple GET
    Given (api) user creates a GET request to 'https://httpbin.org/get'
    And (api) user will send and accept JSON
    When (api) user sends the request
    Then (api) the response status should be '200'
    And (api) the JSON response key '$..headers.Host' should have value equals to 'httpbin.org'
