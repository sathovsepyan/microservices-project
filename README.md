# Microservices Project
Satenik Hovsepyan 727561

## Overview

The project represents an appointment booking system. In particular, it serves for booking an appointment with a doctor, however, it can be extended for various other services.
The project consists of 3 microservices. The microservices are: 
- **Booking Microservice:** Serves for viewing available slots and booking an appointment.
- **Fee Calculation Microservice:** The main concern of the service is to calculate the total price of the selection.
- **Payment Microservice:** Serves for interaction with an external bank payment system. 

In addition, there is an **API Gateway**, that serves as an entry point for all outgoing requests and authorizes them.

All services are implemented as REST APIs using Node.js.


![](/resources/architecture.jpg)

## Services
#### API Gateway

Clients can make requests to microservices only through the API Gateway. Microservice ports are not exposed. 
API Gateway also authenticates and authorizes the users. 

#### Booking Microservice

Booking Microservice is responsible for listing available booking slots, booking the selected one and adding new slots. 

Available endpoints are:

- **<code>GET</code> booking/slots** 

- **<code>POST</code> booking/slots/slot** 

- **<code>POST</code> booking/slots/:id/book** 

#### Fee Calculation Microservice

Microservice is responsible for calculating the service fee based on input parameters, such as the duration of the appointment and the type of the chosen doctor.
In real-life scenario, the calculation logic can be complicated, use more parameters and depend on configuration stored in a database or files.

Available endpoints are:

**<code>GET</code> fee-calculation/fee** 
Calculates the total price of an appointment, based on its duration and the type of the selected doctor. 

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

**Example:**

```http
GET fee-calculation/fee?duration=4&type=2
```

**<code>GET</code> fee-calculation/fees** 

Shows fees of available doctor types.

**Example:**

```http
GET fee-calculation/fees
```
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
If either authentication or authorization fails then a 401 Unauthorized response is returned.


##### Architecture foundations
* Microservices don't know where their logs are stored, they log to *stdout* or *stderr*. The execution environemnt handles destination of logs.
* Logs are not stored internally in files. They are treated as a stream, in contrast with files that are static objects, and are channeled to the final persistent store. 
* The logs of each service are forwarded to fluentd log-driver that sends them to a log-shipping container.
* On receiving the logs, log-shipping container parses, aggregates and stores the logs in Elasticsearch cluster.


#### 