
Feature: Mobile test

  @simple_mobile
  Scenario: User make some interactions in mobile app
    When user fills 'mobile-field01' with 'Marcio Mendes'
    When user fills 'mobile-field02' by replacing text with 'Developer'
