(1) 

I would put the automated tests in a GitHub Action that runs whenever code is pushed. That way, every time I make changes and push them, the project gets checked automatically. I think this is helpful because it can catch problems early instead of waiting until the whole project is finished. I would still test locally sometimes, but using GitHub Actions makes it more consistent.

(2) No
   
(3) Navigation mode checks the website when the page first loads. It is mainly looking at things like loading speed and overall performance. Snapshot mode checks the page as it is at that moment, so it is more useful for finding accessibility problems on the current screen. Basically, navigation is better for page load testing, while snapshot is better for checking the current state of the page.
   
(4) Based on the Lighthouse results, three things we could improve are the mobile viewport, render-blocking requests, and page loading speed. The report showed that the site could be better optimized for mobile, so we could make sure the layout works well on smaller screens. It also showed render-blocking requests and document request latency, so we could try to make the page load faster by reducing anything that slows down the first load. We could also look at the long main-thread tasks so the site feels smoother when people use it.



