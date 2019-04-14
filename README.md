# Microservices Project
Satenik Hovsepyan 727561

## Overview

The system is an appointment booking system
The project represents an appointment booking system. In particular, it serves for booking an appointment with a doctor, however, it can be extended for various other services.
The system consists of 3 microservices. The microservices are: 
- **Booking Microservice:** Serves for viewing available slots, adding a slot and booking an appointment.
- **Fee Calculation Microservice:** The main concern of the service is calculating fees for selected appointments.
- **Payment Microservice:** Serves for making and storing payments.

In addition, there is an **API Gateway**, that serves as an entry point for all incoming requests.

All services are implemented as REST APIs using Node.js.

## Building the project
Start containers by `docker-compose up` from the root directory.

The service will be available at http://localhost:7000/


## Services
The following diagram show the overall architecture of the system. 

![](/resources/overall_architecture.jpg)

#### API Gateway

API Gateway is the only entry point for the clients. Microservice ports are not exposed.

In addition, API Gateway authenticates and authorizes the users and logs all the requests. 

#### Booking Microservice

Booking Microservice is responsible for listing available booking slots, booking the selected one and adding new slots. 
For simplicity, the data is stored in a json file and data validations are omitted.

*Note: To test authenticated endpoints, please see section **Rolse-based user AAA** under **Aspects**.*

Available endpoints are:

- **<code>GET</code> booking/slots** 
Returns all available booking slots. Accessible by everybody.

- **<code>POST</code> booking/slots/slot** 
Creates a new booking slot. Accessible by Admin users.

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

- **<code>POST</code> booking/slots/:id/book** 
Books the slot by id. Accessible by all authenticated users.

Body: Empty

#### Fee Calculation Microservice

Microservice is responsible for calculating the service fee based on input parameters, such as the duration of the appointment and the type of the chosen doctor.
In real-life scenario, the calculation logic can be complicated, use more parameters and depend on configuration stored in a database or files. 
Microservices uses Redis cache for already calculated values. 

Available endpoints are:

- **<code>GET</code> fee-calculation/fee** 
Calculates the total price of an appointment, based on its duration and the type of the selected doctor. 

Example: `GET fee-calculation/fee?duration=4&type=2`

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


- **<code>GET</code> fee-calculation/fees** 

Shows fees of available doctor types.


#### Payment Microservice

Available endpoints are:

- **<code>GET</code> payments/pay** 

- **<code>POST</code> payments/** 


## Aspects

The implemented aspects are **Caching**, **Logging** and **Role-based user AAA**

#### Caching

In order to easily and efficiently access already accessed data, Fee Calculation Microservice uses **`Redis`** in-memory data store.
Calculating the price of the appointment depends on configuration values from the database and some calculations based on that. 
Once the parameters are retreived and the price is calculated, it is being stored in redis cache and will be used in subsequent requests. 

#### Logging

*to be added*

#### Rolse-based user AAA 

There are two user roles: `Admin` and `User`. Admins are allowed to add new slots for the booking system. 
For the implementation, I use 
`authenticate` endpoint serves for authenticating user credentials and returning a JWT token. For simplicity, there are two hardcoded users with both roles.

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

To authorize user roles, I use `authorize` middleware. It validates the JWT tokent in the Authorizatioon http request header and validates the roles. 
It can be added to any endpoint to authenticate users with specified roles. 
If no roles are specified, all authenticated users will be authorized. 
If either authentication or authorization fails then a **401 Unauthorized** response is returned.
