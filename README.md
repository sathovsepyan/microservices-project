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
*to be added*

#### Role-based user Authentication, Authorization, and Accounting

Two types of users:
* Service Providers
* Clients

#### 