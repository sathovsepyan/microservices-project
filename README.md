# Microservices Project
Satenik Hovsepyan 727561

## Overview

The project represents an appointment booking system. In particular, it serves for booking an appointment with a doctor, however, it can be extended for various other services.
The project consists of 3 microservices. The microservices are: 
- **Booking Microservice:** Serves for viewing available slots and booking an appointment.
- **Fee Calculation Microservice:** The main concern of the service is to calculate the total price of the selection.
- **Payment Microservice:** Serves for interaction with an external bank payment system. 

All services are implemented as REST APIs using Node.js.


## Services
#### Booking Microservice

#### Fee Calculation Microservice

Microservice is responsible for calculating the service fee based on input parameters, such as the duration of the appointment and the type of the chosen doctor.
In real-life scenario, the calculation logic can be complicated, use more parameters and depend on configuration stored in a database or files.

For simplicity, the mocked endpoind receives two parameters: duration and the type of the selected doctor, and calculates the total amount based on that.



###### Endpoints

- **<code>GET</code> fee-calculation/fee**


Query parameters are:
- `duration` (int): the duration of the appointment in hours

- `type` (int): type of the selected doctor. Possible values are 

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

#### Payment Microservice

## Aspects

The implemented aspects are **Caching**, **Logging** and **SomethingElse**

#### Caching

In order to easily and efficiently access already accessed data, Fee Calculation Microservice uses Redis in-memory data store.
Since the price calculations can be time effi

#### Logging

*to be added*

##### Architecture foundations
* Microservices don't know where their logs are stored, they log to *stdout* or *stderr*. The execution environemnt handles destination of logs.
* Logs are not stored internally in files. They are treated as a stream, in contrast with files that are static objects, and are channeled to the final persistent store. 
* The logs of each service are forwarded to fluentd log-driver that sends them to a log-shipping container.
* On receiving the logs, log-shipping container parses, aggregates and stores the logs in Elasticsearch cluster.

![](/resources/logging.jpeg)

#### 