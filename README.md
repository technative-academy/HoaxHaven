# HoaxHaven

## The best place on the internet for misinformation!

`Group Participators: Nico, Kamila, Elyas and Sebastian Davies`

## Table of Contents

-   [Hoax Haven](https://github.com/technative-academy/HoaxHaven)

    -   [Description](#description)
    -   [View Project](#view-project)
    -   [Our Journey](#our-journey)
    -   [Contributors](#contributing)

        -   [Elyas](#elyas)
        -   [Sebastian Davies](#sebastian-davies)
        -   [Kamila](#kamila)
        -   [Nico](#nico)

    -   [References](#references)
    -   [License](#license)

## Description

Tech stack:

-   Express
-   Posgresql
-   React
-   Javascript
-   CSS

## View Project

[Click link here to view the website!](https://github.com/technative-academy/HoaxHaven)

## Our Journey

<details>
<summary>Day 1 Summary - Monday</summary>

### Key Discussions and Decisions:

#### 1. Leadership and Decision Making:

-   No designated leader; decisions made by mutual agreement.

#### 2. Pull Requests (PRs) and Documentation:

-   Document new API routes and link them in the PR.
-   Each PR creates or modifies the corresponding file in the docs folder.
-   Initial leniency on PRs; priorities will be determined as we progress.

#### 3. Work Distribution:

-   Focus on working on separate parts of the backend to avoid conflicts.
-   Use pair programming if blocked.

#### 4. Frontend Responsiveness:

-   Use Pete’s existing frontend and CSS initially.
-   Focus on mobile-first design if time permits.

#### 5. Authentication:

-   Start with regular authentication; OAuth is a backlog item.
-   Consider using BCrypt/passportjs for authentication later.

#### 6. TypeScript and Strict Mode:

-   Not using TypeScript for now.

#### 7. Database and Migrations:

-   Use regular Pool SQL queries instead of a migration library like Knex.

#### 8 Hosting Platform:

-   Decided to use Railway instead of Render.

#### 9. Documentation:

-   Maintain documentation manually with Markdown in the docs folder.

#### 10. Testing:

Prioritize authentication tests if time permits.
Other tests are a backlog item.

#### 11. Features and Enhancements:

-   Implement tags on posts.
-   Pagination is low priority and will be considered later.

#### 12. Frontend Development:

-   Utilize Pete’s frontend and modify if we have time.

#### 13. Database and API:

-   Create news articles and reports on events in fictional worlds or parallel universes.
-   Build APIs for news updates to create a continuous alternate reality game.

#### 14. Backlog Items:

-   Tests for authentication.
-   OAuth implementation.
-   Mockable database.

## Day 1 Accomplishments

-   Database Schema: Initial schema design discussed and drafted.
-   GitHub Repository: Set up the repository for the project.
-   Trello Board: Created a Trello board to track tasks and progress.
-   DB Hosting Decision: Evaluated options for database hosting (Nico’s option, Pete’s DB, - Supabase).
-   Express Endpoints: Discussed potential endpoints based on frontend requirements.
-   File Structure: Reviewed and planned the project’s file structure.
-   Hosting Strategy: Decided to start on localhost and consider hosting later for security reasons.
-   Cloudflare Tunnels: Considered for future use.
-   Prettier Configuration: Set up Prettier for code formatting.

## Next Steps

-   Finalize database schema and set up the initial database.
-   Start implementing API endpoints.
-   Continue documenting progress and decisions.
-   Set up basic authentication.
-   Plan and begin integrating the frontend with the backend.
</details>

<details>
<summary>Day 2 - Tuesday</summary>
## Development Update: Day II

Today we added support for process.env.DATABASE_URL to accommodate different database connections.

Engaged in a collaborative pair programming session, enhancing problem-solving efficiency and code quality:
Nico, elyas --> User Routes  
Kamila, Seb --> Article routes

We used Live Server in VS code.

![image](https://github.com/technative-academy/HoaxHaven/assets/107350829/503a54c4-29e1-406c-9bb4-92a635146321)

Today's updates enhance the functionality and robustness of our user and article management system. The changes are aimed at improving data integrity, user experience, and the maintainability of the codebase.

## 1. Users

### List All Users

Method: GET
Endpoint: /users

### Fetch User by Username

Method: GET  
Endpoint: /users/:username

### Create New User

Method: POST  
Endpoint: /users

### Delete User

Method: DELETE  
Endpoint: /users/:username

## 2. Articles

### Retrieval of All Articles

Method: GET  
Endpoint: /articles  
Description: Fetches all articles including their titles, descriptions, publication dates, and authors.

### Fetch Article by ID

Method: GET  
Endpoint: /articles/:id  
Description: Retrieves detailed information for a specific article by ID.  
![image](https://github.com/technative-academy/HoaxHaven/assets/107350829/b4cb1f8a-38fc-44fd-a459-f6c8a035845e)

### Create New Article and Associate Tags

Method: POST
Endpoint: /articles  
Description: Allows creation of a new article with associated tags. Handles tag existence check and insertion if not present.

### Delete Article by ID

Method: DELETE
Endpoint: /articles/:id  
Description: Deletes an article and its associated tags from the database.
![image](https://github.com/technative-academy/HoaxHaven/assets/107350829/63ed1b36-b221-4917-9e61-90d9fd7c57aa)

### Update Article and Tags

Method: PUT
Endpoint: /articles/:id
Description: Updates article details and manages tag associations by clearing old tags and adding new ones.

### Get Articles by Tag ID

Method: GET  
Endpoint: /articles/with-tag/:id  
Description: Retrieves articles associated with a specific tag ID.

### Get Tags for a Specific Article

Method: GET  
Endpoint: /articles/:articleId/tags  
Description: Fetches tags associated with a given article.

</details>

<details>
<summary>Day 3 - Wednesday</summary>
  
  ## Development Update: Day III

Today, we focused on integrating the frontend with our backend, addressing issues primarily related to authentication and state management in React/Redux.

### Team Efforts

-   **Nico**: Worked on authentication.
-   **Seb, Kamila, and Elyas**: Developed Redux slices for various components and functionalities.

### Progress Overview

#### Beginning:

-   Initiated frontend development.
-   Faced issues with authentication.
-   Nico focused on resolving authentication problems while the rest of the team worked on Redux slices.

#### Middle:

-   Encountered significant challenges and felt somewhat directionless.
-   Sought assistance from Pete, our senior engineer, for guidance and clarity.

#### End:

-   Made considerable progress in connecting the frontend and backend.
-   Successfully displayed some information on the frontend.
-   Updated backend endpoints to send data in the format expected by the client.

### Key Activities

1. **Frontend-Backend Integration**:

    - Spent a substantial amount of time understanding and working with complex React/Redux code.
    - Ensured proper connection and data flow between frontend and backend components.

2. **Authorization Fixes**:
    - Addressed and resolved issues related to user authentication.
    - Ensured secure and smooth user login and session management.

### Summary

Today's efforts were primarily aimed at bridging the gap between our frontend and backend systems, focusing on authentication and data synchronization. Despite facing hurdles and needing additional support, we made significant strides towards a cohesive and functional application.

Overall, these updates enhance the application's user experience and pave the way for smoother development in the following days.

</details>

<details>
<summary>Day 4 - Thursday</summary>

</details>

<details>
<summary>Day 5 - Friday</summary>

</details>

## Contributors

### [Elyas](https://github.com/BlueElyas)

### [Sebastian Davies](https://github.com/Sebbybobbler) 👑

### [Kamila](https://github.com/kamila-wilczynska)

### [Nico](https://github.com/hedgehog125)

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
