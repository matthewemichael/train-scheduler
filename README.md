# Train Scheduler

### Link: [Train-Scheduler](https://matthewemichael.github.io/train-scheduler/index.html)

### Overview

In this assignment the objective was to create a train schedule application that incorporates Firebase to host arrival and departure data. My app retrieves and manipulates the data with Moment.js. This website provides up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

### Requirements

* App must suit these basic specs:
  * When adding trains, administrators should be able to submit the following:
    * Train Name
    * Destination 
    * First Train Time -- in military time
    * Frequency -- in minutes
  * Calculate when the next train will arrive; relative to the current time.
  * Users from many different machines must be able to view same train times.

### Added Functionality

* Form Validation
  * Correct time input
  * Frequency field accepts only numeric values
  * All form fields must be completed in order to submit

* User Can Delete Trains

## Technologies Used
- [jQuery](https://api.jquery.com/)
- [Firebase](https://firebase.google.com/)
- [Moment.js](https://momentjs.com/)
- [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
