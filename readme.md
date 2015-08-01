# Epoch Timer

# Development

- run `npm install`
- run `npm run build` to make Example.app
- run `npm start` to run app from CLI without building Example.app

# Design

## Settings Button

* Login
* Logout
* Quit App
* Idle Timer: Enabled/Disabled/Trigger Time (15 min default)

## User Experience

* First thing on UI is a list of Projects

* No projects? Plus button...

### Adding a Project

Clicking Plus button reveals a dialog to enter Project Name

* Every Project on Dash has 2 buttons: Start, Info

## Info Button

Clicking Info Button takes you to another screen

In that screen you see all tasks you did for that project in reverse chronological order

### Session Details

Each session has the following details

* start time
* end time
* duration

### Session Modification

If you have not pushed your sessions, you can:

* Edit the title
* Edit the notes
* Merge sessions
* Edit start/end time

## Start button

Automatically starts timer for that project in a new session (which shows up in the I tab)

Reveals Session Title input box. max 80 chars, required

Reveals Session Notes text area. unlimited chars, optional

Reveals Pause button

Reveals Stop button

## Export

* Logged in users can push sessions to API

* All users can export sessions as JSON

## Archive

* Pushed or exported sessions can be archived.