Feature: To test the cart feature of the application

    @done
    Scenario Outline: Search with website 3 different types of criteria
        Given I navigate to "http://www.kogan.com.au"
        When I fill in "global searchInput" input with <value>
            And I press "Enter" keys
            And I set page to "results_page"
            And I click on the <Delivery Options> option
            And I click on the <Brand> option
            And I click on the <Departments> option
        Then I validate "searchResultsTitle" contains <searchOptions>
        Then I validate search results relate to <Brand>

        Examples:
            | value  | searchOptions                                                          | Delivery Options | Brand        | Departments       |
            | "Dog"  | "Search for Dog in Fitbark - Home & Garden (with Fast Dispatch)"       | "Fast Dispatch"  | "Fitbark"    | "Home & Garden"   |
            | "Baby" | "Search for Baby in Bella Vita - Health & Beauty (with Fast Dispatch)" | "Fast Dispatch"  | "Bella Vita" | "Health & Beauty" |

    @done
    Scenario Outline: Adding product to cart
        Given I navigate to "http://www.kogan.com.au"
        When I fill in "global searchInput" input with <value>
            And I press "Enter" keys
            And I set page to "results_page"
        Then I validate "searchResultsTitle" contains <searchResult>
            And I click on the "Fast Dispatch" option
            And I click on the "Audio" option
            And I click on the "Beats" option
            And I click <product> item on the results
            And I set page to "products_page"
            And I save the "product" name clicked
            And I click on "global buttonText" with text "ADD TO CART"
            And I validate cart has added "1" item
            And I validate product name has been added
        Examples:
            | value     | searchResult         | product |
            | "Workout" | "Search for Workout" | "0"     |


    @done
    Scenario: Removing product from cart
        Given I navigate to "http://www.kogan.com.au"
        When I fill in "global searchInput" input with "Baby"
            And I press "Enter" keys
            And I set page to "results_page"
        Then I validate "searchResultsTitle" contains "Search for Baby"
            And I click "3" item on the results
            And I click on "global buttonText" with text "ADD TO CART"
            And I validate cart has added "1" item
            And I click on cart button
            And I click "Remove" "button" on item "0"
        Then I validate page contains text "You removed "
        Then I validate page contains text "There are no items in your cart at the moment."
