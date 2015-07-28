# epoch app

# instructions

- run `npm install`
- run `npm run build` to make Example.app
- run `npm start` to run app from CLI without building Example.app

# Settings Button

* Login
* Logout
* Quit App
* Idle Timer: Enabled/Disabled/Trigger Time (15 min default)

# Cloud Feature

* Ability to push sessions

# Offline/Local Features

* Ability to export sessions as JSON

# User Experience

* First thing on UI is a list of Projects

* No projects? Plus button...

## Adding a Project

Clicking Plus button reveals a dialog to enter Project Name

* Every Project on Dash has 2 buttons
An Info button
A Start button

# Info Button

Clicking Info Button takes you to another screen

In that screen you see all tasks you did for that project in reverse chronological order

## Session Details

Info button on each task shows details of the session:

* start time
* end time
* duration
* breaks, if any

## Session Modification

If you have not pushed your sessions, you can:

* Edit the title
* Edit the notes
* Add/remove breaks
* Edit start/end time

# Start button

Automatically starts timer for that project in a new session (which shows up in the I tab)

Reveals Session Title input box. max 80 chars, required

Reveals Session Notes text area. unlimited chars, optional

Reveals Pause button

Reveals Stop button
