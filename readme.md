**CarMoblility Service**

This repositiory contains a simple nodejs based typescript backend application for scheduling a car sharing system.

**Install**

To install this system 

- clone the repository
- cd backend
- npm install

**Prerequisites**

Make sure you have node v8.9.4 installed. The application is developed with this version.

**Running the app**

- npm run serve or
- npm start

**testing the app**

- npm test

The tests are based on the requirements document.

**Listening ports**
- Port 5000

**Api Endpoints**
- get /cars (list cars)
- post /cars (add car)
- put /cars (update car)
- get /users (list users)
- get /bookings (list demands)

**Implementation Details/Thoughs**
- Uses Dependancy Injection to give the different services access to its data store
- This makes unittests via jest easier and more reliable via a new instance for store each time for a fresh start.
- Test Driven Design approach has extracted the usecases based on requirements and put them into unittest classes.
- Database uses a simple inmemory object-store - could be migrated to a document centric database like mongodb
- Model classes implemements the schema to access the store. To make the solution more robust we could implement another layer of dedicated schema-models only for accessing the data from the database and deliver db independant models to the consumer. Then the db could be changed without effecting the consuming logic. Usually a Schema class system is used in more complex APIs for accessing databases.
- Simple JSON based serialisation of data to/from REST API. To make it more robust, we must check the data received more deeply.
- Using GraphQL could dramatically simplyfy the modelling of the backend via dedicated reducer functions. A Schema for accessing data will automatically be a result of using GraphQL.
- Separating the different services into their own projects and interconnecting them via a message bus could drastically improve the scalability of the system as multiple instances could be spun up and working independantly. As the service classes are already seperated out, this could be done rather easy.

**Open Tasks**
- Fully implement the management REST api
- Fully implement the SchedulingService
- Cover all requested features in the Unittests/implement test dummy functions
- Implement integration tests to test the REST api andpoints.
- Implement a UI for interacting with the system.
- Create an end-to-end test system to test the UI together with backend.