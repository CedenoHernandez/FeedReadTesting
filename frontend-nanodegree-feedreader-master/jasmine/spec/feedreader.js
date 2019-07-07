/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Tests that it loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined and not empty', function() {
          for(let feed of allFeeds) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          }
        });
        /* Tests that it loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names defined and not empty', function() {
          for(let feed of allFeeds) {
            expect(feed.name).toBeDefined();
            expect(feed.name.length).not.toBe(0);
          }
        });
    });
    /* test suite for hamburger menu*/
    describe('the menu', function() {
      /* ensures the menu element is hidden by default*/
        it('is hidden', function() {
          expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
      /* Test ensures the menu changes
       * visibility when the menu icon is clicked. This test
       * should have two expectations: does the menu display when
       * clicked and does it hide when clicked again.
       */
       it('changes visibility', function() {
         const menu = document.querySelector('.menu-icon-link');
         menu.click(); //first click
         expect($('body').hasClass('menu-hidden')).toBe(false);
         menu.click(); //second click
         expect($('body').hasClass('menu-hidden')).toBe(true);
       });
     });
     /* new test suite for Intial Entries*/
     describe('initial entries', function() {
      /* Test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container. */
      beforeEach(function(done) {
        loadFeed(0, done); // lets test know beforeEach has finished and to go to the next step
      });
      it('executes', function() {
          expect($('.feed .entry').length).toBeGreaterThan(0);
      });
    });
    /* new test suite*/
    describe('new feed selection', function() {
      let firstFeed = []; //initialize outside of function
      let secondFeed = []; // initialize outside of function
      /* Write a test that ensures when a new feed is loaded
      * by the loadFeed function that the content actually changes.*/
      beforeEach(function(done) {
        loadFeed(0, function () {
          firstFeed = $('.feed').html(); //reassigns above variable
          done();
        });
      });

      it('is not the same', function(done) {
        loadFeed(1, function() {
          secondFeed = $('.feed').html(); //reassigns above variable
          expect(firstFeed).not.toEqual(secondFeed);
          done();
        })
      });
    });
}());
