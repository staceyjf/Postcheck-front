# Welcome to PostChecker-API-Front

The frontend demo for my PostChecker-API backend in Flask and/or SpringBoot.

Currently the frontend is attached to the Flask backend which supports the additional reporting functionality.

Deployed at: https://www.staceyfanner.com/Postcheck-front/

Please use the following user details to log in:

username: admin

password: admin1234

_Please note that I am using the free tier of Azure Web app so it can take a while to load_

<div align="center">
  <img src="./public/postcheckAPI.gif" alt="Homepage">
</div>

## Build Steps

```bash
1. Clone the repo.
2. Cd into `PostCheck-front` folder
3. Run `npm install` to install the relevant dependencies.
3. Run `npm run dev`.
4. Test with `npm run test`.
```

## About

In this fictional brief, Aus-Post would like to add authentication to their service (in particular for their creating, updating, and deleting functionalities) that provides postcode and suburb information via an API.

The MVP to deliver on this client brief was:

- Create an API that allows clients to retrieve and add suburb and postcode combinations.
- Implement:
  - An API that allows clients to retrieve suburb information by postcode.
  - An API that allows clients to retrieve a postcode given a suburb name.
- A secured API to add new suburb and postcode combinations.
- Some form of persistence (a database).
- Testing for service layers.

## Planning

### Design Inspiration

Given the fictional brief, I used the existing Aus-post Postcode checker as my design inspiration.

<div align="center">
  <img src="./planning /aus-post-inspiration.png" alt="Aus-post home page">
</div>

## Key Features

### Frontend

1. **Full CRUD for Postcodes:** Users are able to create, read, update, and delete new postcodes.
2. **Authentication:** Users are able to log in to access restricted areas such as creating, updating, and deleting postcodes.
3. **Component Testing:** Components have a range of tests to ensure elements render as expected.
4. **Chart Visuals:** Interactive chart for user's to explore the average property price by state across time,

## Key Learning Highlights

1. **Managing Authentication:**  I explored how authentication is implemented and how to store tokens in local storage for use in HTTP request headers. I created a user context that utilized a `signin HTTP POST request` to obtain the token. Once received, the token was saved as a key/value pair in the user's local storage. The token was later retrieved from local storage and attached to the Authorization header for requests requiring authentication, such as creating a new postcode.
2. **Nivo Chart Library for chart visuals:** : I implemented Nivo's line chart for an interactive reporting experience. Despite having good documentation for customizing the UX, TypeScript support was limited, which made understanding type requirements challenging. I also had to adjust my TypeScript settings to accommodate the any type. Additionally, wrangling the data on the backend into the required format was a challenge. Since I usually develop from backend to frontend, this was a valuable experience in considering frontend data requirements during the planning phase of development.
3. **Securing Routes:** To protect routes, I added a `ProtectedRoute` component that wraps around UX components. After signing in and receiving a JWT from the backend, the `isAuthenticated` state is set to true. When navigating throughout the app, this state is checked in the ProtectedRoute component. If the criteria are met (e.g., `isAuthenticated`), the relevant component is rendered. Otherwise, the user is redirected to the homepage and cannot access secure areas, such as the reporting chart.

## To-Dos

1. **Increased functionality:** Build out more frontend functionality like additional suburb CRUD functionality to be able to update and delete suburbs.
2. **Increased Testing coverage:** Continue to build out testing to increase test coverage in things like the newer chart functionality.

## Changelog

Date: 25/06/24

Updates:

1. Structure: Separated the front end app from PostCheck repo.

Date: 27/06/24

Updates:

1. Deployment: Successfully deployed with GH pages.
2. Linting: Amends to adhere to configured linting rules.

Date: 03/0/24

Updates:

1. 404 Page: Successfully added a 404 Page for better UX
2. Reporting Page: Added Property Reporting dashboard as a way to play around with Nivo charts
3. Auth: Corrected auth so routes are protected via the routes in addition to conditionally rendering elements based on signed in status
4. UX: Improved the error handling by removing the background that was being displayed with error toasts
5. New User: New user functionality add

Date: 09/0/24

Updates:

1. Protected Route component: For improved security on routes, I have added a protected route container which wraps each wrap that required authentication. If authentication is not valid, the user is redirected to the home page.
2. useAuth custom hook: Added a useAuth hook which uses the isAuthenticated state in the user Context to conditionally render secure elements.
3. Tests: Updated to use the isAuthenticated state for conditionally rendering elements.

Date: 09/0/24

Updates:

1. Server deployment: Updated to deployed backend url

## Screenshots

| New Form                            | Update Form                            | Testing - Front                  |
| ----------------------------------- | -------------------------------------- | -------------------------------- |
| <img src="./public/newform.png"  /> | <img src="./public/updateform.png"  /> | <img src="./public/test.png"  /> |

## Technologies Used

<div align="center">

![React Testing Library](https://img.shields.io/badge/-React%20Testing%20Library-05122A?style=flat&logo=testinglibrary)  
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)  
![HTML5](https://img.shields.io/badge/-HTML5-05122A?style=flat&logo=html5)  
![CSS3](https://img.shields.io/badge/-CSS3-05122A?style=flat&logo=css3)  
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=typescript)  
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)  
![GitHub](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)

</div>
