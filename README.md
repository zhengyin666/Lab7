(1) 

I would put the automated tests in a GitHub Action that runs whenever code is pushed. That way, every time I make changes and push them, the project gets checked automatically. I think this is helpful because it can catch problems early instead of waiting until the whole project is finished. I would still test locally sometimes, but using GitHub Actions makes it more consistent.

(2) No. I would not use an end-to-end test for that. If I only want to check whether one function returns the right output, a unit test makes more sense because it tests that function directly. End-to-end tests are better for checking if the whole page works like a user would expect.
   
(3) Navigation mode checks the website when the page first loads. It is mainly looking at things like loading speed and overall performance. Snapshot mode checks the page as it is at that moment, so it is more useful for finding accessibility problems on the current screen. Basically, navigation is better for page load testing, while snapshot is better for checking the current state of the page.
   
(4) Based on Lighthouse, we could improve the mobile layout, reduce render-blocking requests, and make the page load faster. These changes would help the site work better on smaller screens and feel smoother for users.



