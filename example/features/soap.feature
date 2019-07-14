Feature: SOAP test
  @simple_soap
  Scenario: I want to generate input samples
    Given (soap) user set the WSDL Path with value 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
    And (soap) user export all templates from current endpoint to folder './example/templates/correios'

  @simple_soap
  Scenario: I want to export the CalcPrazo template
    Given (soap) user set the WSDL Path with value 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
    And (soap) user exports the INPUT template of method 'CalcPreco' to file './example/templates/input.json'
    And (soap) user exports the OUTPUT template of method 'CalcPreco' to file './example/templates/output.json'

  @simple_soap
  Scenario: I want to test a simple soap
    Given (soap) user set the WSDL Path with value 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl'
    And (soap) user add the JSON body from the resource './example/templates/input_CalcPrazo.1.json'
    And (soap) user fills the (jsonpath) key '$.sCepOrigem' with value '06328080'
    When (soap) user executes the SOAP Request with operation 'CalcPrazo'
    Then (soap) user prints the current REQUEST body content
    And (soap) user prints the current RESPONSE body content
    And (soap) the JSON (jsonpath) key '$..Servicos.cServico[0].Codigo' has value equals to '4014'
