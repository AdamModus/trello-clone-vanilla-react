# Rafa's Vanilla React Trello Clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Notes from the developer

### Completeness

This project is not complete. As of the moment I write this, it would benefit from multiple improvements/further development.
Main points that would be nice to develop are:

- Add drag and drop functionality to introduce cards in a certain location of the column. This could be achieved by removing the CSS gap between cards and replace it with a filler component.
  - Said component could listen to the `dragEnter` and `dragLeave` and then grow to occupy the space of a card, pushing the card under it away.
    Furthermore, it could also listen to the `drop` event. It could use an html data attribute with index of the card to know where the new card would be inserted.
- Even though the challenge was to build this with vanilla react, using some libs would make dev life easier and code easier to understand, such as:
  - Styled components, PostCSS or CSS modules are all valid but I am partial to PostCSS.
  - Tailwind (especially in conjunction with PostCSS) would make rapid development or prototyping without loosing nice design a lot easier.
  - Using either FontAwesome or Material UI Icons (I used emojis to be as raw/vanilla as possible)
  - Using libs to manage drag and drop (there are some react dnd libs that could do it)
  - Improve integration with IDE by setting up editorconfig, prettier, eslint, stylelint, etc.
- Setup a pipeline
- Write unit tests, increase coverage to an acceptable level (usually minimum 80% but the more the better) and use the coverage reports as part of the quality gates used by the pipeline to greenlight/redlight PRs.
- Write proper documentation, explain the code with code comments better (reduces cognitive load fo future contributions/maintenance)
- Refactor some of the drag and drop event handling to be done by a service, simplifying code complexity on the components.
- Potentially refactor the context management. Nomenclature is not my strong suit and I had never used Reacts Context API, nor functional components before so there's definitely some growing pains effects there. Could be better and match React standards a bit more. Didn't have much time to improve it further!
- Setup documentation for contribution, etc. for potential devs to contribute.
- Setup some frontend E2E tests (Cypress is a good candidate tool for this)
