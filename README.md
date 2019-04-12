# Microservices Project
Satenik Hovsepyan 727561

## Outline

* RESTful services,
* Nginx for load balancing,
* SQL database.  

*to be added*


## Services
#### Fee Calculation Microservice

Microservice is responsible for calculating the service fee based on input parameters, such as the duration of the appointment and the type of the chosen doctor.



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

Example: 

```http
GET fee-calculation/fee?duration=4&type=2
```

## Aspects
#### Logging

*to be added*

##### Architecture foundations
* Microservices don't know where their logs are stored, they log to *stdout* or *stderr*. The execution environemnt handles destination of logs.
* Logs are not stored internally in files. They are treated as a stream, in contrast with files that are static objects, and are channeled to the final persistent store. 
* The logs of each service are forwarded to fluentd log-driver that sends them to a log-shipping container.
* On receiving the logs, log-shipping container parses, aggregates and stores the logs in Elasticsearch cluster.

![](/resources/logging.jpeg)

#### Service Authentication, Authorization, and Accounting
Microservices are responsible only for business logic. Authentication and authorization logic is not placed in microservice implementation.
The system uses Token Based authentication. For this reason scaling is not an issue, since the token is stored on the client side.

All the external requests to the system go through an API Gateway, that hides microservices. API Gateway translates the original user token into an opaque token
that only the API Gateway can resolve.

![](/resources/authentication_workflow.png)


#### Role-based user Authentication, Authorization, and Accounting

Two types of users:
* Service Providers
* Clients

#### 