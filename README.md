# Canny Debugging Test

Howdy Candidate, we've created this pared down version of Canny to get a better idea of your experience debugging web applications. Best of luck!

## Getting Started

1.  **Initialize your environment**

We recommend using nvm for managing node versions.

Install nvm from [here](https://github.com/creationix/nvm)

Then install the node version for this assessment:

```sh

nvm  i

```

2.  **Install dependencies**

Next you'll need to install this app

```sh

npm  install

```

3.  **Run the backend**

The backend is a node server. Everything to do with the server lives in `/server`.

Terminal tab #1:

```sh

npm  run  backend

```

4.  **Run the frontend**

Webpack is used to bundle and serve our app. Everything to do with the frontend lives in `/app`.

Terminal tab #2:

```sh

npm  run  frontend

```

Once everything is running, you should see the app running http://127.0.0.1:8080.

## Customer Issues

For each of the following issues:

1. Identify the issue

2. Apply the fix

3. Provide a response to each technical customer in 1-2 sentences

**Customer 1:** When I open the application, my posts do not load and all I see is a 'server error'.

**Customer 2:** When I click on "Top" or "Old", the selector does not update with my new selection.

**Customer 3:** When I sort by "Top", there are posts with only 28 votes ranking higher than posts with 180 votes!

**Customer 4:** When I page through posts, although the posts are changing, the vote count in the top left corner does not match the total count of votes of the displayed posts.

## 🎉 You're Done 🎉

Congrats on completing our assessment. All that is left for you to do is submit your assessment. We made a command that will zip your submission and send it to us. Send us an email to confirm that we got it.

```sh

npm  run  submit

```

## Solutions

**Customer 1:** When I open the application, my posts do not load and all I see is a 'server error'.

- **Reason:** A typo while reading user data.

- **Solution:** Change `userData.name` to `userData.nayme`.

- **Notes:** Alternatively, the call to `authenticateUser` could be temporarily disabled inside `/server/webserver/HTTPServer.js` since user authentication is not yet implemented on the client side.

##### File: server/utils/authenticateUser.js

**Customer 2:** When I click on "Top" or "Old", the selector does not update with my new selection.

- **Reason:** Current `sort` value is received from Redux store which causes a delay due to its asynchronous nature.

- **Solution:** Set current `sort` value in a state directly inside the component which gets updated on every sort option change.

- **Notes:** Original code had one more issue where `fetchPosts()` did not receive the updated `sort` value. Because of this, only the default sorting option would retain proper sorting across all of the pages. If a different option was selected, the posts would be sorted incorrectly. This issue was solved by passing the `sort` value from state to `fetchPosts()`.

- **UX improvement:** changed the default value of `sort` to 'New' to make it more user friendly.

##### File: app/components/PostSort.js

**Customer 3:** When I sort by "Top", there are posts with only 28 votes ranking higher than posts with 180 votes!

- **Reason:** Recursive function lead to breaking down of votes into sublists and sorting these sublists instead of all the posts.

- **Solution:** Fixed `sortBy()` logic to ensure proper functioning of the merge sort algorithm.

- **Notes:** Added a ternary operator when comparing values to get rid of `.reverse()` and imporve time complexity (O<sub>(1) </sub> for the nested ternary operator vs O<sub>(n)</sub> for `.reverse()` ).

##### File: server/utils/sortBy.js

**Customer 4:** When I page through posts, although the posts are changing, the vote count in the top left corner does not match the total count of votes of the displayed posts.

- **Reason:** Delay in value update due to asynchronous call to `recountVotes()`.

- **Solution:** Add `posts` as an argument to `recountVotes()`. Call `recountVotes()` and pass `posts` to it on `componentDidMount`. Dispatch votes to state. Give reducer access to posts from updated state.

##### File: app/actions/posts.js
