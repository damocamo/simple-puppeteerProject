Feature: To register a new user and login with those details
    @done
    Scenario: Register a new user
        Given I navigate to "http://www.kogan.com.au"
            And I click on "userMenu"
            And I set page to "popup"
            And I click on "signUpLink"
            And I fill in "emailInput" input with "Random"
            And I fill in "passwordInput" input with "Password123!!D"
            And I click on "global buttonLabel" with text "CREATE ACCOUNT"
            And I set page to "main_page"
        Then I validate "messageInfo" contains "You have successfully created an account."

    @done
    Scenario: Login with new created user (must run in conjunciton with above for new user creds)
        Given I navigate to "http://www.kogan.com.au"
            And I click on "userMenu"
            And I set page to "popup"
            And I fill in "emailInput" input with "ScopeInput"
            And I fill in "passwordInput" input with "Password123!!D"
            And I click on "global buttonLabel" with text "LOG IN"
            Then I wait for "login-register-box" is not visable
            And I click on "global userAvatar"
            And I set page to "account_page"
        Then I validate input "emailProp" contains "Random"


