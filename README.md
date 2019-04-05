# Microservices Project
Satenik Hovsepyan 727561

## Outline

* RESTful services,
* Nginx for load balancing,
* SQL database.  

*to be added*

## Aspects
#### Logging

*to be added*

##### Architecture foundations
* Microservices don't know where their logs are stored, they log to *stdout* or *stderr*. The execution environemnt handles destination of logs.
* Logs are not stored internally in files. They are treated as a stream, in contrast with files that are static objects, and are channeled to the final persistent store. 
* The logs of each service are forwarded to fluentd log-driver that sends them to a log-shipping container.
* On receiving the logs, log-shipping container parses, aggregates and stores the logs in Elasticsearch cluster.

#### Service Authentication, Authorization, and Accounting
Microservices are responsible only for business logic. Authentication and authorization logic is not placed in microservice implementation.
The system uses Token Based authentication. For this reason scaling is not an issue, since the token is stored on the client side.

All the external requests to the system go through an API Gateway, that hides microservices. API Gateway translates the original user token into an opaque token
that only the API Gateway can resolve.



#### Role-based user Authentication, Authorization, and Accounting

Two types of users:
* Service Providers
* Clients

#### 