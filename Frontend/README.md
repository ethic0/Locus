# VerseJAM (Angular 7) - An interactive poem writing web application.
# How it works

### Making requests to the backend API


If you want to change the API URL to a local server, simply edit `src/environments/environment.ts` and change `api_url` to the local server's URL (i.e. `localhost:8080/api`)


# Getting started

Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally. We use [NPM](https://www.npmjs.org) to manage the dependencies, so we strongly recommend you to use it. you can install it from [Here](https://docs.npmjs.com/), then run `npm install` to resolve all dependencies (might take a minute).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building the project
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Functionality overview

The example application is a social blogging site called "VerseJAM". It uses a custom API for all requests, including authentication.

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD poems
- CR*D Comments on poems (no updating required)
- GET and display paginated lists of poems
- Favorite poems
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: /#/ )
    - List of tags
    - List of poems pulled from either Feed, Global, or by Tag
    - Pagination for list of poems
- Sign in/Sign up pages (URL: /#/login, /#/register )
    - Uses JWT (store the token in localStorage)
    - Authentication can be easily switched to session/cookie based
- Settings page (URL: /#/settings )
- Editor page to create/edit poems (URL: /#/editor, /#/editor/poem-slug-here )
- poem page (URL: /#/poem/poem-slug-here )
    - Delete poem button (only shown to poem's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /#/profile/:username, /#/profile/:username/favorites )
    - Show basic user info
    - List of poems populated from author's created poems or author's favorited poems


<br />


