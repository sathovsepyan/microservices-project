# Microservices Project
*Satenik Hovsepyan 727561*

The focus of the project is on how the service is structured on operated rather than what functionality it implements. The actual "business functionality" is mocked. However, inter-service operations are functional and are implemented as *three aspects* of microservice architectural patterns.

## Overview

The project represents an appointment booking system. It consists of 3 microservices and an API Gateway. The microservices are: 
- **[Booking Microservice:](/booking-service)** Serves for viewing available slots, adding a slot and booking an appointment.
- **[Fee Calculation Microservice:](/fee-calculation-service)** The main concern of the service is calculating fees for selected appointments.
- **[Payment Microservice:](/payment-service)** Serves for making and storing payments.

The **[API Gateway](/api-gateway)** serves as an entry point for all incoming requests.

All services are implemented as REST APIs using Node.js.

Implemented aspects are **Caching**, **Logging** and **Role-based user AAA**

## Building the project
Start containers by running `docker-compose up` from the root directory.

The service will be available at http://localhost:7000/


## Services
The following diagrams show the overall architecture of the system. 

![](/resources/overall_architecture.jpg)

#### API Gateway

API Gateway is the only entry point for the clients. Microservice ports are not exposed to the public.

In addition, API Gateway authenticates and authorizes the users and logs all the requests. 

To authenticate to the system, please use 
- **<code>POST</code> /authenticate** with request body: 
```javascript
    {
        "username": "user",
        "password": "user"
    }
```

It issues a **JWT token**, that needs to be used for subsequent calls as authorization header 

``` 
Authorization: Bearer <token> 
```

#### Booking Microservice

Booking Microservice is responsible for listing available booking slots, booking the selected one and adding new slots. 
For simplicity, the data is stored in a json file and data validations are omitted.

*Note: To test authenticated endpoints, please see section **Rolse-based user AAA** under the section **Aspects**.*

Available endpoints are:

- **<code>GET</code> /booking/slots** 
Returns all available booking slots. Accessible by everybody.

- **<code>POST</code> /booking/slots/slot** 
Creates a new booking slot. Accessible by *Admin* users.

Sample body: 
```javascript
    {
        "id": 15,
        "start": "Apr 19 2019 09:00:00",
        "duration": 2,
        "doctor": {
            "type": 2,
            "name": "Naida Adkisson",
            "address": "8555 Creekside St. Valrico, FL 33594"
        }
    }
```

- **<code>POST</code> /booking/slots/:id/book** 
Books the slot by id. Accessible by all *authenticated* users.

Body: Empty

#### Fee Calculation Microservice

Microservice is responsible for calculating the service fee based on input parameters, such as the duration of the appointment and the type of the chosen doctor.
In real-life scenario, the calculation logic can be complicated, use more parameters and depend on configuration stored in a database or files. 
To return already calculated values efficiently, microservice uses Redis cache.

Available endpoints are:

- **<code>GET</code> /fee-calculation/fee** 
Calculates the total price of an appointment based on its duration and the type of the selected doctor. Accessible by all *authenticated* users.

Example: `GET /fee-calculation/fee?duration=4&type=2`

Query parameters are:

`duration` (int): the duration of the appointment in hours

`type` (int): type of the selected doctor. Possible values are

```javascript
{
    "cardiologist": 1,
    "anesthesiologist": 2,
    "surgeon": 3,
    "allergist": 4,
    "other": 5
}
```


- **<code>GET</code> /fee-calculation/fees** 

Shows fees of available doctor types. Accessible by all *authenticated* users.


#### Payment Microservice

Available endpoints are:

- **<code>POST</code> /payments/payment** Completes the payment of the booking and returns the ID of the payment. 
In production, the function would use an external payment system as well as store the transaction data in a database.
In the scope of this project, it only returns a random UUID. Accessible by all *authenticated* users.

Sample body:
```javascript
    {
        "id": "c3abc640-5eef-11e9-b90d-5f13069d89fd",
        "booking_number": "faee80c0-5eef-11e9-b90d-5f13069d89fd",
        "amount": 200, 
        "date": "Apr 20 2019 09:00:00"
    }
```
 
- **<code>GET</code> /payments/payment/:paymentId** Retrieves payment data by id. Accessible by *Admin* users.



## Aspects

Implemented aspects are **Caching**, **Logging** and **Role-based user AAA**

#### Caching

In order to easily and efficiently access already accessed data, Fee Calculation Microservice uses **`Redis`** in-memory data store.
Calculating the price of the appointment depends on configuration values from the database and some calculations based on that. 
Once the parameters are retreived and the price is calculated, it is being stored in redis cache and will be used in subsequent requests. 

#### Logging

In order to manage logs, I use `winston` logging library with [Papertrail](https://papertrailapp.com/) transport. Two log levels *info* and *error* are being used.

- **Info Logger** is implemented as a middleware in API Gateway through which all the incoming requests are passed. As a result, no manual logging functions are inserted. 
- **Error Logger** logs the errors from a global exception handler. 

Papertrail transport allows to store the logs in a **centralized** location and in **real-time**. 
For testing purposes, logs are being stored in local files as well (this can be enabled or disabled if needed).

Logs can be viewed at https://papertrailapp.com/events
```
username: microservicestest8@gmail.com
password: LBtM#3#E)"w4:S\,
```

#### Rolse-based user AAA 

There are two user roles: `Admin` and `User`. Some of the endpoints are accessible only for *authenticated* or only for *Admin* users. 
For simplicity, there are two hardcoded users with both roles.

<table>
  <tr>
    <th>Role: Admin</th>
<td>{
	"username": "admin",
	"password": "admin"
}</td>
  </tr>
  <tr>
    <th>Role: User</th>
    <td>{
	"username": "user",
	"password": "user"
}</td>
  </tr> 
</table>

The implementation can be checked by authenticating as different users (`authenticate` endpoint) and trying to access methods such as:

**<code>POST</code> /booking/slots/slot** (only for *Admin* users)

**<code>GET</code> /fee-calculation/fee** (for all *authenticated* users)

**<code>GET</code> /booking/slots** (available publicly)


To authorize user roles, I use `authorize` middleware. It validates the JWT tokent in the authorization http request header and validates the roles. 
It can be added to any endpoint to authenticate users with specified roles. 
If no roles are specified, all authenticated users will be authorized. 
If either authentication or authorization fails then a **401 Unauthorized** response is returned.


#### References:
https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
https://hackernoon.com/creating-simple-api-gateway-using-node-js-6d5933c214b8
https://papertrailapp.com
https://github.com/cornflourblue/node-role-based-authorization-api
https://medium.com/@cramirez92/build-a-nodejs-cinema-microservice-and-deploying-it-with-docker-part-1-7e28e25bfa8b

