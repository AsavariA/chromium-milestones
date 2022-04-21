## Project Abstract
What do marketers and Sesame Street monsters have in common? They love cookies.  For years, brands have been using them to track website visitors, improve the user experience, and collect data that helps us target ads to the right audiences. But the way we use cookies and Google ad-tracking tools could change dramatically with Google's efforts to phase out the third-party cookie on Chrome browsers by this year.

  Amidst this, organizations have been shifting their focus more and more towards a privacy-protected approach to admeasurement. Among these, is a multi-party-computation (MPC) based [aggregation service](https://github.com/google/privacy-sandbox-aggregation-service) integrated with the Chrome Attribution Reporting API. This new approach offers many opportunities to contribute and improve the usability and observability of the system.

  Thus, as a part of this project, one has to help design a control plane to monitor and control the status of aggregation jobs.
  
**Control Plane**
The control plane is the part of a network that controls how data packets are forwarded — meaning how data is sent from one place to another. The process of creating a routing table, for example, is considered part of the control plane. Routers use various protocols to identify network paths, and they store these paths in routing tables.

### Milestone 1:

Build a simple web app that allows you to write, update, delete and display data from [Firestore](https://firebase.google.com/docs/firestore). Imagine a jobs control plane tool where you can see all scheduled, running, finished, and failed jobs in one place.

Firebase structure as shown above -

-   Collection: jobs
    

-   DocumentId: UUIDv4 and is the same as a jobId
    

-   `status` can have the values “scheduled”, “running”, “finished”, “failed”
    
-   `created` is the timestamp when a job gets created
    
-   `updated` is the timestamp when any field in the job gets updated
    
-   `result` can be empty or has a string result in it
    
-   `message` can be empty or has an error/log message in it

**![](https://lh4.googleusercontent.com/BZIHw1cGuB-1tvqcrFKXq-uwVvH7ybYLsNYnR7kqCqLJSc163rvhLe_t2rhMuTw7XI726D3jv3B7kf42Y7JUkXYiE89AGYjfWRSc_jUGdVHZmx655PP0ViWErjPr1y_iP_tKZ4PT)**
**![](https://lh4.googleusercontent.com/A9w1qaDcNuS7wfEIMU90GhuQYZz5bXV40-9-7gcjYaV3Vj4vI99zVVlu0dFz-hTJVwf3IVGhEsoyoUHmgOO3eRL2O-KgU1CwxJTN7CbpqzKJWifbuBjKj7DQ5SgRq2bkzv8lmjpZ)**
Shown above is the interface for the first milestone. As you can see it serves the basic 4 functions -

1.  READ: Displaying data in table form
    
2.  CREATE: Creating a Job from this interface itself.
    
3.  UPDATE: Updating a pre-existing Job along with keeping a record of its updation time.
    
4.  DELETE: Removing a job from the database
    

  

Besides these there are certain other features that are implemented:

1.  SORT: In ascending and descending order of status, creation, or updation time.
    
2.  FILTER: According to the statuses of jobs, only jobs having certain statuses will be displayed
    
3.  PAGINATION: 10 jobs at a time are displayed and the user is free to increase and decrease this number to 25 or 5 respectively.
    
4.  REDUCE PADDING: In case the table is taking up too much space, one can always use this feature to view the same table compressed.

**![](https://lh3.googleusercontent.com/1GC9ugotwfb143YIL21X4MqJJ35ti5iZQCuWD_yLr1irpxbDLeR3RBw255LVNlEW1aqyfzpSO6TD3hJUNoz8wwvUqOp6Qy_Rap373gEG3MmTR_pM4BEq4-5rVCrsEv9O5JF2XX26)**

**![](https://lh3.googleusercontent.com/nwhxWOUwPN3Wk3hrylKDbrCBX4FJbkv4OcAonaUUpWlwatlfc0pGaDapBV8bgysjgvf5O86FumyeP0A6Xe40P0wF5hAbz-02XtKKbdWiJK8KJm-kr0YcBfVb6MZPxl_Jvn0iS_vD)**

### Milestone 2:

Get familiar with more complex data structures in Cloud Firestore. Imagine the following data structure to display the status of jobs where a job is composed of sub-jobs across multiple parties and multiple levels:

  

Each job has 2 parties (aggregators) involved and there are 2 sub-jobs (levels) running on each aggregator. A job is considered finished (successful) if all sub-jobs are successful. If any fail, there will be an error message in the message field which needs to be surfaced in the control plane tool.  The data structure is as follows

  
  

-   Jobs (Collection)
    

-   4eb24… (document, jobsId, type: UUIDv4)
    

-   aggregator1 (collection)
    

	-   level-0 (document)
    

		-   `created`: timestamp
    
		-   `updated`: timestamp
    
		-   `status`: string
    
		-   `total_levels`: number
    
		-   `result`: string (can be null)
    
		-   `message`: string (can be null)
    

	-   level-1 (document)
    

	-   …
    

-   Aggregator2 (collection)
    

	-   level-0 (document)
    

		- ...

	-   level-1 (document)

**![](https://lh3.googleusercontent.com/rz0cLc-fwBzVVKNYXGLzfMnTnxpKADnGWfEHBgd14yTMeGtmGy81-bjhKSQJk4Xj8HQfhku6uHtIfIMPmVzk7Y6k014te8qAENYLiU9XI6OwbujgIecbCmHR3sRmMcDIH1NDUMn0)**
    **![](https://lh4.googleusercontent.com/CygQxOacYhY1XeNEIHJrRxZMe7CfeBWA0KmUsfHlySYfYnfenT1NczrQ91USqKT_83KSO0ujIsAtjypZjO_Plz0Xcdr-s9apGAzHOr2ROczzTNKRvjlBZXHAuNqwkMS8IRB1MNrG)**
Implement the logic of summarizing the status for a specific job in the control plane tool. Support features such as sort by status/created/updated, search, filter, and pagination are built.
