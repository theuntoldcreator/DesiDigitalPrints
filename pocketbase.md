List/Search (images)
Fetch a paginated images records list, supporting sorting and filtering.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://theuntoldcreator1999-desidigitalprints.hf.space');

...

// fetch a paginated records list
const resultList = await pb.collection('images').getList(1, 50, {
    filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
});

// you can also fetch all records at once via getFullList
const records = await pb.collection('images').getFullList({
    sort: '-created',
});

// or fetch only the first record that matches the specified filter
const record = await pb.collection('images').getFirstListItem('someField="test"', {
    expand: 'relField1,relField2.subRelField',
});
JavaScript SDK
API details
GET
/api/collections/images/records

Query parameters
page	Number	The page (aka. offset) of the paginated list (default to 1).
perPage	Number	Specify the max returned records per page (default to 30).
sort	String	Specify the records order attribute(s).
Add - / + (default) in front of the attribute for DESC / ASC order. Ex.:
// DESC by created and ASC by id
?sort=-created,id
Supported record sort fields:
@random, id, created, updated, occasion, file, name

filter	String	Filter the returned records. Ex.:
?filter=(id='abc' && created>'2022-01-01')
expand	String	Auto expand record relations. Ex.:
?expand=relField1,relField2.subRelField
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to each individual record under the expand property (eg. "expand": {"relField1": {...}, ...}).
Only the relations to which the request user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
skipTotal	Boolean	If it is set the total counts query will be skipped and the response fields totalItems and totalPages will have -1 value.
This could drastically speed up the search queries when the total counters are not needed or cursor based pagination is used.
For optimization purposes, it is set by default for the getFirstListItem() and getFullList() SDKs methods.
Responses
{
  "page": 1,
  "perPage": 30,
  "totalPages": 1,
  "totalItems": 2,
  "items": [
    {
      "id": "RECORD_ID",
      "collectionId": "desios_img_002",
      "collectionName": "images",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "occasion": "RELATION_RECORD_ID",
      "file": "filename.jpg",
      "name": "test"
    },
    {
      "id": "RECORD_ID",
      "collectionId": "desios_img_002",
      "collectionName": "images",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "occasion": "RELATION_RECORD_ID",
      "file": "filename.jpg",
      "name": "test"
    }
  ]
}

#view : 
View (images)
Fetch a single images record.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://theuntoldcreator1999-desidigitalprints.hf.space');

...

const record = await pb.collection('images').getOne('RECORD_ID', {
    expand: 'relField1,relField2.subRelField',
});
JavaScript SDK
API details
GET
/api/collections/images/records/:id

Path Parameters
id	String	ID of the record to view.
Query parameters
expand	String	Auto expand record relations. Ex.:
?expand=relField1,relField2.subRelField
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to the record under the expand property (eg. "expand": {"relField1": {...}, ...}).
Only the relations to which the request user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
Responses
{
  "id": "RECORD_ID",
  "collectionId": "desios_img_002",
  "collectionName": "images",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "occasion": "RELATION_RECORD_ID",
  "file": "filename.jpg",
  "name": "test"
}

# Create : 
Create (images)
Create a new images record.

Body parameters could be sent as application/json or multipart/form-data.

File upload is supported only via multipart/form-data.
For more info and examples you could check the detailed Files upload and handling docs .

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://theuntoldcreator1999-desidigitalprints.hf.space');

...

// example create data
const data = {
    "occasion": "RELATION_RECORD_ID",
    "name": "test"
};

const record = await pb.collection('images').create(data);
JavaScript SDK
API details
POST
/api/collections/images/records

Body Parameters
Optional
id
String	15 characters string to store as record ID.
If not set, it will be auto generated.
Required
occasion
String	Relation record id.
Required
file
File	File object.
Set to null to delete already uploaded file(s).
Optional
name
String	Plain text value.
Query parameters
expand	String	Auto expand relations when returning the created record. Ex.:
?expand=relField1,relField2.subRelField
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to the record under the expand property (eg. "expand": {"relField1": {...}, ...}).
Only the relations to which the request user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
Responses
{
  "id": "RECORD_ID",
  "collectionId": "desios_img_002",
  "collectionName": "images",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "occasion": "RELATION_RECORD_ID",
  "file": "filename.jpg",
  "name": "test"
}

#Update : 
Update (images)
Update a single images record.

Body parameters could be sent as application/json or multipart/form-data.

File upload is supported only via multipart/form-data.
For more info and examples you could check the detailed Files upload and handling docs .

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://theuntoldcreator1999-desidigitalprints.hf.space');

...

// example update data
const data = {
    "occasion": "RELATION_RECORD_ID",
    "name": "test"
};

const record = await pb.collection('images').update('RECORD_ID', data);
JavaScript SDK
API details
PATCH
/api/collections/images/records/:id

Path parameters
id	String	ID of the record to update.
Body Parameters
Required
occasion
String	Relation record id.
Required
file
File	File object.
Set to null to delete already uploaded file(s).
Optional
name
String	Plain text value.
Query parameters
expand	String	Auto expand relations when returning the updated record. Ex.:
?expand=relField1,relField2.subRelField21
Supports up to 6-levels depth nested relations expansion.
The expanded relations will be appended to the record under the expand property (eg. "expand": {"relField1": {...}, ...}). Only the relations that the user has permissions to view will be expanded.
fields	String	
Comma separated string of the fields to return in the JSON response (by default returns all fields). Ex.:
?fields=*,expand.relField.name

* targets all keys from the specific depth level.

In addition, the following field modifiers are also supported:

:excerpt(maxLength, withEllipsis?)
Returns a short plain text version of the field string value.
Ex.: ?fields=*,description:excerpt(200,true)
Responses
{
  "id": "RECORD_ID",
  "collectionId": "desios_img_002",
  "collectionName": "images",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "occasion": "RELATION_RECORD_ID",
  "file": "filename.jpg",
  "name": "test"
}

# Delete : 
Delete (images)
Delete a single images record.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://theuntoldcreator1999-desidigitalprints.hf.space');

...

await pb.collection('images').delete('RECORD_ID');
JavaScript SDK
API details
DELETE
/api/collections/images/records/:id

Path parameters
id	String	ID of the record to delete.
Responses
null


Realtime (images)
Subscribe to realtime changes via Server-Sent Events (SSE).

Events are sent for create, update and delete record operations (see "Event data format" section below).

You could subscribe to a single record or to an entire collection.

When you subscribe to a single record, the collection's ViewRule will be used to determine whether the subscriber has access to receive the event message.

When you subscribe to an entire collection, the collection's ListRule will be used to determine whether the subscriber has access to receive the event message.

import PocketBase from 'pocketbase';

const pb = new PocketBase('https://theuntoldcreator1999-desidigitalprints.hf.space');

...

// (Optionally) authenticate
await pb.collection('users').authWithPassword('test@example.com', '123456');

// Subscribe to changes in any images record
pb.collection('images').subscribe('*', function (e) {
    console.log(e.action);
    console.log(e.record);
}, { /* other options like expand, custom headers, etc. */ });

// Subscribe to changes only in the specified record
pb.collection('images').subscribe('RECORD_ID', function (e) {
    console.log(e.action);
    console.log(e.record);
}, { /* other options like expand, custom headers, etc. */ });

// Unsubscribe
pb.collection('images').unsubscribe('RECORD_ID'); // remove all 'RECORD_ID' subscriptions
pb.collection('images').unsubscribe('*'); // remove all '*' topic subscriptions
pb.collection('images').unsubscribe(); // remove all subscriptions in the collection
JavaScript SDK
API details
SSE
/api/realtime

Event data format
{
  "action": "create" // create, update or delete,
  "record": {
    "id": "RECORD_ID",
    "collectionId": "desios_img_002",
    "collectionName": "images",
    "created": "2022-01-01 01:00:00.123Z",
    "updated": "2022-01-01 23:59:59.456Z",
    "occasion": "RELATION_RECORD_ID",
    "file": "filename.jpg",
    "name": "test"
  }
}


