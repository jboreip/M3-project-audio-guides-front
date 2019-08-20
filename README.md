
# City Audio Guides



## Description XXXXX (name pending)

So you finally got some time to travel, right? Yay! And there is no better way to discover a new place than doing a guided tour. But I know, you are tired of ~~shitty~~ city tours; having to wakeup at 7am to join a group of random peoppe with differnt interests than yours, with a fixed route and spots you are not interested at all... What if you could discover the city at your own pace, whenever and however you want to, by visitting only what truly interests you?

Now you can do it! With XXXXX (name pending) you will be able to listen high quality audio guides of all your favourite spots from all over the world, create your own routes based in your interests and preferences, and discover new cities with total freedom.

## User Stories

### As a User 
-  **Signup:** As an anon I can sign up in the platform so that I can start using the app
-  **Login:** As a user I can login to the platform so that I can use the app
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **See my profile:** As a user I can see my profile
-  **Edit my profile:** As a user I can edit the information on my profile and change my picture
-  **Create Trip:** As a user I can create a trip, set the travel dates and the location
-  **Edit Trip:** As a user I can edit the dates of my trip 
-  **View Spots:** As a user I can view the spots from each city in a map or in a list, and use a search bar to locate other cities
-  **Filter Spots:** As a user I can filter which type of spots I want to see
-  **Save Spots to my Trip:** As a user I can save my favourite spots so I can check them when in the city
-  **Remove Spots from my Trip:** As a user I can remove spots from my trip
-  **Listen to Spots:** As a user I can listen to the audio guides embedded in the spots
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault

### As an Admin 
-  **Login:** As an admin I can login to the platform so that I can manage the spots and use the dashboard
-  **Logout:** As an admin I can logout from the platform so no one else can use it
- **Add Spot:** As an admin I can add new spots to the database
- **Remove Spot:** As an admin I can remove spots from the database
- **Edit Spot:** As an admin I can edit aand update existing spots


## Backlog

- Calculate distance from where the user is to the spots and directions
- Flickr API connection to get default images for cities
- Add different spots to create a new route and show the route in the map with directions
- Admin dashboard with Users and Trips/Spots stats
- Admin hability to manage Users (CRUD)
- User can rate Spots from 0 to 5
- User can view average rating of a Spot
- User can add a comment to a Spot
- User can view other users comments and interact with them
- User has Spots/Trips recommendations based on other Users actions
– Beautiful calendar selector done with React

<br>

# Client / Frontend

## Routes 

- **/** – SplashPage with Signup and Login buttons
- **/signup** – Signup form with 2 steps
- **/login** – Login form
- **/discover** – Page to view Spots with 2 views, Map or List
- **/trips** – Page to see the user Trips (upcoming, popular, past)
- **/trips/:id1** – Page to see the Trip details with all the Spots (saved, popular)
- **/trips/:id1/spot/:id2** – Page to see the Spot details (title, image, description, audio player)
- **/trips/new** – Page to create a new Trip (city search and dates)
- **/trips/:id1/edit** – Page to edit Trip dates or delete it
- **/spots/:id2** – Page to see the Spot details (title, image, description, audio player) from Discover (without Trip)
- **/profile** – Page to see the user profile
- **/profile/edit** – Page to edit the user details
- **/admin** – Page to login as an Admin
- **/admin/spots** – Admin Dashboard to manage Spots
- **/admin/spots/:id2** – Page to view a Spot
- **/admin/spots/new** – Page to create a new Spot
- **/admin/spots/:id2/edit** – Page to edit an Spot


## Components

- SplashPage
- LoginForm
- SignupForm1
- SignupForm2
- Navbar
- DiscoverPage
	- SpotsMap
		- SpotDot
			- SpotDetails
				- AudioPlayer
	- SpotList
		- SearchBar
		- SpotCard
			- *SpotDetails*
				- *AudioPlayer*
- TripsPage
	- TripDetails
			- *SpotCard*
			- *SpotDetails*
				- *AudioPlayer*
	- TripNewForm
	- TripEditForm
- UserProfile
- UserEditForm
- AdminDashboard
- AdinSpotview
- AdminNewSpot
- AdminEditSpot


## Pages

-   **/** – Splash Page (anon)
-   **/signup** – Signup Page (anon)
-   **/login** – Login Page (anon)
-   **/discover*** – Discover Page (user)
-   **/trips*** – Trips (user)
-   **/spots*** – Spots (user)
-   **/profile*** – Profile (user)
-   **/admin*** – Admin Dashboard (admin)
-   404 Page (public)


## Services

- Auth Service
  - auth.me()
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()

- Trips Service
  - trips.list() – Finds User Trips
  - trips.details(id) – Gets details of User Trip
  - trips.add(id) – Add Trip to User Trips
  - trips.edit(id) – Edits Trip from User Trips
  - trips.delete(id) – Deletes Trip from User Trips
  
- Spots Service
  - spots.list() – Finds User Favourite/Saved Spots
  - spots.details(id) – Gets Spot details
  - spots.addFav(id) – Adds Spot to user Favs
  - spots.removeFav(id) – Remove Spot from user Favs
  - spots.add(id) – Add new Spots to database (admin only)
  - spots.edit(id) – Edit existing Spots from database (admin only)
  - spots.delete(id) – Deletes existing Spots from database (admin only)


<br>


# Server / Backend


## Models

User model

```javascript
{
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  birthdate: {type: Date, required: true},
  city: {type: String, required: true},
  language: {type: String, enum: ['EN','ES','CN','HD','RS','PT','JP','AR'], default: 'EN', required: true}
  trips: [Schema.Types.ObjectId,ref:'Trip'}],
  spots: [Schema.Types.ObjectId,ref:'Spot'}],
  points: {type: Number, default: 0},
  isAdmin: {type: Boolean, default: false}
}
```



Trip model

```javascript
 {
   city: {type: String, required: true},
   img: {type: String},
   fromDate: {type: Date, min: Date.now},
   toDate: {type: Date}
 }
```



Spot model

```javascript
{
  name: {type: String, required: true},
  description: {type: String, required: true},
  city: {type: String, required: true},
  type: {type: String, enum: ['culture-sports', 'architecture', 'history', 'nature-sightseeing', 'gastronomy', 'alternative-others'], required: true},
  location: {type: {type: String, default: 'Point'}, coordinates: [Number], required: true},
  img: {type: String, required: true},
  rating: [Number],
  tags: [String],
  played: {type: Number},
  customIcon: {type: String},
  audioFile: {type: String, required: true},
}
```


<br>


## API Endpoints/Backend Routes

-   GET /auth/me
-   POST /auth/signup
        -   email
        -   password
        -   name
        -   birthdate
        -   city
        -   language
-   POST /auth/login
        -   email
        -   password
-   POST /auth/logout
-   GET /trips/
		-   trips
-   GET /trips/:id
        -   trip
-   POST /trips/new
        -   city
        -   img
        -   fromDate
        -   toDate
-   PUT /trips/:id1/edit
        -   fromDate
        -   toDate
-   PUT /profile/edit
        -   password
        -   name
        -   birthdate
        -   city
        -   language
-   DELETE /trips/:id1
-   DELETE /spots/:id2

-   GET /admin
-   POST /admin
		-   email
		-   password
-   GET /admin/spots
-   GET /admin/spots/:id2
-   POST /admin/spots/new
-   PUT /admin/spots/:id2/edit


<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/) 

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
