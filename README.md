# Running the App

With Node and it's CLI tools installed globdally on your computer, run `npm i` from the root directory of this repository and then `npm start` to run the app locally in your web browser

Please see `create-react-app-README.md` for further instructions if needed (includes testing, building, etc.)

# Architectural Decisions

The list API call is made from the top-level `App.js` component, and the individual user data calls are made from `UserCard.js`; see "Potential Improvements" below

Added an infinitely scrolling paginator as alternative to the manual one; scrolling pagination was not requested, but it separates out confusing state management and has a potentially smoother UX

Refactored GitHub user data display into `UserCard.js` for reusability across the different paginator components

# Potential Improvements

Making an individual call for every single user to get simple data strings like their name and location feels quite heavy — is there a way to specify that you would like fuller user data from the list endpoint? User details could also be saved in a hashmap (with login names as keys since they're unique) and check for the existence of user details before making the secondary individual requests, but that of course adds code complexity

There has to be a better way to parse the header links without an external library; using the current Regex implementation creates unnecessary complexity in both `App.js` and `ManualPaginator.js`

It would be better to use TypeScript, and generate types through whatever middleware schemas that are being used for querying so the database and frontend are aligned (or use types exposed by a third-party library)

Add more tests; `Example.test.js` can be run and works as expected, but there isn't testing for real-life use cases in the data parsing or component rendering

Handle more errors other than the top level list query
