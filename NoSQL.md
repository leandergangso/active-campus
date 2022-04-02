# NoSQL Database

This is a list of all querys that the system needs to 
perform in order to work as intended.

## Rules:

1. Embed unless there's a compelling reason not to.
2. Avoid JOINs if they can be, but don't be afraid if they can provide a better scheme design.
3. Arrays should not grow without bound.
4. Needing to access an object on its own is a compelling reason not to embed it.
5. Design a schema based on the unique needs of your application.

## Read querys:

- Get info for a given user.
- Get all available organizations for a given user.
- Get all users with their roles for a given organization.
- Get all non archived events for a given organization.
- Get all archived events for a gvien organization.
- Get all participants for a given event.
- Get info for a given event.

## Stats

- Get total scheduled events for that organization.
- Get total amount of participants in waiting lists for that organization
- Get total amount of participant signoffs today for that organization?
- Get total amount of participant signups today for that organization?
