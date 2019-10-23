Feature: To test the checkout feature of the application

    @done
    Scenario: Checkout item - Up untill credit card information
        Given I navigate to "http://www.kogan.com.au"
        When I fill in "global searchInput" input with "Baby"
            And I press "Enter" keys
            And I set page to "results_page"
        Then I validate "searchResultsTitle" contains "Search for Baby"
            And I click "1" item on the results
            And I click on "global buttonText" with text "ADD TO CART"
            And I validate cart has added "1" item
            And I click on cart button
            And I click on "global buttonText" with text "CHECKOUT"
            And I set page to "checkout_pages"
            And I fill in "emailInput" input with "Random"
            And I fill in "fullnameInput" input with "Random"
            And I fill in "phoneInput" input with "0411234567"
            And I click on "global buttonText" with text "CONTINUE"
            And I fill in "companynameInput" input with "HappyHi"
            And I input the address "30 melbourne"
            And I click on "global buttonText" with text "CONTINUE"