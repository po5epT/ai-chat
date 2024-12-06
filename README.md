# API specification for AI app

## General

In general it is expected that if any of the requests fails, the client will receive the response with the related HTTP status code and body in the format:

```js
{
  "api_error": "Error details will be described here based on the problem occurred..."
}
```

## Authentication

Authentication is done through the INFUSE auth module. Details: to be added...

## Folders

### `GET` `/api/v1/folders`

Usage - Describe current user folders on chats page on web UI.

Query params:

```js
{
  // no query parameters are implemented
}
```

Response is <b>always an array</b>, even if only one item matches the query:

```js
{
  "data" : [
      {
        "id": String,
        "name": String,
        "user_id": String,
        "is_deleted": Boolean,
      },
      {
        "id": String,
        "name": String,
        "user_id": String,
        "is_deleted": Boolean,
      },
    ],
  "last_evaluated_key": null
}
```

Response codes:

```code
200 - Success
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `GET` `/api/v1/folders/{id}`

Usage - describing single folder.

Response is a single object or an error if not found:

```js
  {
    "id": String,
    "name": String,
    "user_id": String,
    "is_deleted": Boolean,
  }
```

Response codes:

```code
200 - Success
404 - Folder not found by id
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `POST` `/api/v1/folders`

Usage - create new folder for the chats for current user from web UI.

Request body:

```js
{
    "name" : String // required
}
```

Response:

```js
{
    "id" : String,
    "name" : String,
    "user_id" : String,
    "is_deleted" : Boolean
}
```

Response codes:

```code
200 - Success
400 - Bad request params
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `PATCH` `/api/v1/folders/{id}` - partial update, only provided fields are changed

Usage - mostly for renaming folder for now.

Request body:

```js
{
    "name" : String // currently required since we can't change anything else, might make it optional later on when we get more params
}
```

Response:

```js
{
    "id" : String,
    "name" : String,
    "user_id" : String,
    "is_deleted" : Boolean
}
```

Response codes:

```code
200 - Success
400 - Bad request params
404 - Folder not found by id
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `DELETE` `/api/v1/folders/{id}`

Usage - delete the folder from web UI.

Response:

```js
null;
```

Response codes:

```code
200 - Success
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

## Chats

### `GET` `/api/v1/chats`

Usage - describe chats by user on the Chats webpage on UI.

Query params:

```js
{
  // no query parameters are implemented
}
```

Response is <b>always an array</b>, even if only one item matches the query:

```js
{
  "data" : [
      {
        "id": String,
        "creator_id": String,
        "name": String,
        "folder_id": String,
        "created_timestamp": UnixTimestamp(millis),
        "used_timestamp": UnixTimestamp(millis), // for sorting by date on UI
        "is_deleted": Boolean,
        "is_pinned": Boolean,
        // most likely model_config will have flexible number of properties
        "model_config": {
          "name": String,
          "family": String, // name of the provider that will be used
          "max_tokens": Integer,
          "temperature": Integer,
          "top_p": Integer,
        },
      },
      {
        "id": String,
        "creator_id": String,
        "name": String,
        "folder_id": String,
        "created_timestamp": UnixTimestamp(millis),
        "used_timestamp": UnixTimestamp(millis), // for sorting by date on UI
        "is_deleted": Boolean,
        "is_pinned": Boolean,
        // most likely model_config will have flexible number of properties
        "model_config": {
          "name": String,
          "family": String, // name of the provider that will be used
          "max_tokens": Integer,
          "temperature": Integer,
          "top_p": Integer,
        },
      },
    ],
    "last_evaluated_key": null
}
```

Response codes:

```code
200 - Success
400 - Bad request params
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `GET` `/api/v1/chats/{id}`

Usage - describe chats by id, right now probably is not going to be used on UI.

Response is a single object or an error if not found:

```js
{
    "id": String,
    "creator_id": String,
    "name": String,
    "folder_id": String,
    "created_timestamp": UnixTimestamp (millis),
    "used_timestamp": UnixTimestamp (millis), // for sorting by date on UI
    "is_deleted": Boolean,
    "is_pinned": Boolean,
    // most likely model_config will have flexible number of properties
    "model_config": {
        "name": String,
        "family": String, // name of the provider that will be used
        "max_tokens": Integer,
        "temperature": Integer,
        "top_p": Integer,
    },
  }
```

Response codes:

```code
200 - Success
400 - Bad request params
404 - Chat not found by id
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `POST` `/api/v1/chats` - create new chat

Usage - create a new chat, when the first message is sent by the user on UI.
🚩🚩🚩 - Not sure about usage for now. We can also create chat inside `POST` `/api/v1/messages` endpoint, the problem is that we will need to generate a chat name based on user prompt, and display it on UI, so returning chat name in messages endpoint sounds unreasonable.

Request body:

```js
{
    "first_prompt" : String, // Optiona, used to create the name of the chat (summary for the prompt will be used as name of the chat), if no prompt is passed, then generic chat name will be generated
    "folder_id" : String, // Optional, in case chat will be created in specific folder from the start
    "is_pinned" : Boolean, // Optional, if we want it pinned right from the start
    "model_config" : { // optional
        "name" : String,
        "family": String, // name of the provider that will be used
        "max_tokens" : Integer, // Optional
        "temperature" : Integer, // Optional
        "top_p" : Integer, // Optional
    }
}
```

Response:

```js
{
    "id" : String,
    "creator_id" : String, // refers to user_id
    "name" : String, // AI-generated name based on the first_prompt
    "folder_id" : String,
    "created_timestamp" : UnixTimestamp (millis),
    "used_timestamp" : UnixTimestamp (millis),
    "is_pinned" : Boolean,
    "model_config" : {
        "name" : String,
        "family": String, // name of the provider that will be used
        "max_tokens" : Integer,
        "temperature" : Integer,
        "top_p" : Integer,
    }
}
```

Response codes:

```code
200 - Success
400 - Bad request params
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `PATCH` `/api/v1/chats/{id}` - partial update by chat id, only provided fields are changed

Usage - rename chats on the Chats webpage on UI or pin them or move to a different folder.

Request body:

```js
{
    "name" : String, // optional - rename
    "folder_id" : String, // optional - move chat on web
    "is_pinned" : Boolean, // optional - pin / unpin
    // if the model should be updated
    "model_config" : { // optional
        "name" : String,
        "family": String, // name of the provider that will be used
        "max_tokens" : Integer,
        "temperature" : Integer,
        "top_p" : Integer,
    }
}
```

Response:

```js
{
    "id" : String,
    "creator_id" : String, // refers to user_id
    "name" : String,
    "folder_id" : String,
    "created_timestamp" : UnixTimestamp (millis),
    "used_timestamp" : UnixTimestamp (millis),
    "is_pinned" : Boolean,
    "model_config" : {
        "name" : String,
        "family": String, // name of the provider that will be used
        "max_tokens" : Integer,
        "temperature" : Integer,
        "top_p" : Integer,
    }
}
```

Response codes:

```code
200 - Success
400 - Bad request params
404 - Chat not found by id
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `DELETE` `/api/v1/chats/{id}`

Usage - delete the chat from web UI.

Response:

```js
null;
```

Response codes:

```code
200 - Success
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

## Messages

### `GET` `/api/v1/messages`

Usage - Describing messages for chat on web UI.

Order will be by timestamp, new messages first.

Query params:

```js
{
    "chat_id" : String, // required for now, can't see a use case for fetching everything
    "start_key" : String, // optional, URL encoded representation of the value of the "last_evaluated_key" key, received in previous response from server
    "limit" : Integer // optional, 50 by default, for loading more messages in chat on demand while scrolling
}
```

Request with params:
`GET` `/api/v1/messages?chat_id=12345&start_key=%7B%22id%22%3A%22da74da1f29b047a7a3b26166de1b9591%22%2C%22chat_id%22%3A%22ac15a2217ab148569189aeafa7160554%22%2C%22timestamp%22%3A%221733363187225%22%7D&limit=50`

Response is <b>always an array</b>, even if only one item matches the query:

```js
{
  "data" :
    [
      {
        "id": String,
        "user_id": String,
        "timestamp": UnixTimestamp(millis),
        "text": String, // message text here
        "files": [
          {
            "name": String,
            "id": String,
            "url": URL,
            "type": String, // check mimetypes
          },
        ],
      },
      {
        "id": String,
        "user_id": String,
        "timestamp": UnixTimestamp(millis),
        "text": String, // message text here
        "files": [
          {
            "name": String,
            "id": String,
            "url": URL,
            "type": String, // check mimetypes
          },
        ],
      },
    ],
    "last_evaluated_key" : {
        "id": String,
        "chat_id": String,
        "timestamp": UnixTimestamp(millis)
    }
}
```

Response codes:

```code
200 - Success
400 - Bad request params
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

### `POST` `/api/v1/messages`

Usage - create new message for the chats from web UI.

🚩🚩🚩 Is it reasonable to call this endpoint `/messages`, or is it better to make it sendMessage, and skip `POST` for `/api/v1/messages` since it might be not exactly rest?
🚩🚩🚩 Ideally we need to stream the response from our Lambdas

Request body:

```js
{
    "chat_id" : String,
    "timestamp": UnixTimestamp (millis),
    "text": String, // optional, user message text here
    "files" : File[],  // optional, list of files uploaded to chat
    "model_config": {
      "name": String,
      "family": String, // name of the provider that will be used
      "max_tokens": Integer,
      "temperature": Integer,
      "top_p": Integer,
    },
}
```

Note: either "text" or "files" must contain something, since message without both text and files is invalid

Response:

```js
{
    // Idea here is to provide the client with some information about both initial message sent (the id generated for it), and the messages generated as response to it.
    "request_message_id" : String, // prompt message id
    "id" : String, // response message id
    "user_id" : String,
    "chat_id" : String,
    "text": String, // message text here
    "files" : [
        {
            "name" : String,
            "id": String,
            "url" : URL,
            "type" : String // check mimetypes
        },
    ]
}
```

Response codes:

```code
200 - Success
400 - Bad request params
500 - Unexpected server error
503 - Service Unavailable: maintenance, etc.
```

# Notes, thoughts and considerations

## Endpoints

🚩🚩🚩 In the future we probably would need to add stateless API, that will not be reliant on chat_ids, folders, etc. We can add it in similar format OpenAI did, where users provide request context and model details, we just act as a proxy to send a request to model and return response, nothing else (no message saving to DB, etc.), and give this endpoint to other platforms so they can interact with models within our company. Pathing can probably look something like `POST` `/api/v1/stateless/messages`
Because if we can provide both context and chat id - how do even manage these items inside the system? Usually model APIs provide option to give messages to it directly, but it's probably not a good approach for interacting with front end since we delegate message managing to front end. I guess backend should manage conversation history based on chat id and adds previous messages to request. We can later add an endpoint that will actually provide ability to send context together with the message.

🚩🚩🚩 In general for endpoints that interact with certain folder, chat, etc. do we need to check their ownership for resource?

## Data structure

### Overall

🚩🚩🚩 The overall concern is do we need to use SQL or NoSQL for things like chats, users, folders, etc. (basically everything except for messages)? We decided that we will use DynamoDB for messages, is it reasonable to use other DBs in order to make it slightly more effective for querying or is it better to stick to DynamoDB for all tables / collections?

As of now I've planned datastructures to be in DynamoDB, so we will focus on one technology in general.

### Users

```js
{
    "id": String,
    "email" : String,
    "name" : String
}
```

id - Partition key

🚩🚩🚩 Not sure how the user id should be generated. Should we take it from our oauth provider maybe?
🚩🚩🚩 Can the same user have multiple folders with the same name?

### Folders

```js
{
    "id" : String (UUID),
    "name" : String,
    "user_id" : String,
    "created_timestamp" : UnixTimestamp (millis),
    "is_deleted" : Boolean
}
```

Notes:

1. `id` - Partition key
2. `user_id` - Use GSI here to fetch all folders by user id for our web interface effectively

### Chats

```js
{
    "id": String (UUID),
    "creator_id": String, // basically user_id
    "name": String,
    "folder_id": String,
    "created_timestamp": UnixTimestamp (millis),
    "used_timestamp": UnixTimestamp (millis), // for sorting by date on UI
    "is_deleted": Boolean,
    "is_pinned": Boolean,
    // 🚩🚩🚩 model configuration, we will need to have it inside the chat entity, since when we retrieve existing chat from the database we need to know what settings the user uses, right?
    // most likely model_config will have flexible number of properties per provider
    "model_config": {
      "name": String,
      "family": String, // name of the provider that will be used
      "max_tokens": Integer,
      "temperature": Integer,
      "top_p": Integer,
    },
}
```

Notes:

1. `id` - Partition key, fetch chat info by chat id when we are opening specific chat on UI or update / delete it
2. `creator_id` - use as Primary key for GSI, used_timestamp Sort key, to fetch all chats by user sort by last used, to display on web ui

🚩🚩🚩 Current concerns - how will we query the chats by user. We can have a field with creator_id in order to start with something. But later on if we will decide to have chats that allow multiple users we will need to do something since having and array of user_ids in chat is inefficient for queriying in DynamoDB, so we might need a helper table which will contain user_id and chatId combinations.

### Messages

```js
{
    "id" : String(UUID),
    "user_id" : String,
    "chat_id" : String,
    "timestamp" : UnixTimestamp (millis),
    "text": String, // message text here
    "files" : [
        {
            "name" : String,
            "id": String,
            "url" : URL,
            "type" : String // check mimetypes
        },
    ],
    "is_deleted" : Boolean,
    "is_for_ui" : Boolean, // 🚩🚩🚩 I am pretty sure that we will need to have some technical field that will show whether some of the messages should be displayed on UI. My concern here is mostly based on the upload files functionality. If we plan to upload the file to context and create messages from it to keep it in context, then we will need to be able to not display such messages on web, since user didn't send them, this is under the hood behaviour.
}
```

Notes:

1. `user_id` - will be SYSTEM for responses from our system
2. `id` - Primary key, timestamp as Sort key for Partition key
3. `chat_id` - Primary key, timestamp sort key to create GSI for cases when we need to fetch all messages for chat

🚩🚩🚩 Maybe we can also add a field, something like "response_to" an put message id of the user sent message, this way it would be easier to do analytics or debugging, tho since we already have a pretty simple structure where we are using 1 on 1 conversation where we can just sort everything by timestamp.

🚩🚩🚩 Ids for entities most likely will be UUID or something similar auto-generated.

🚩🚩🚩 In general there is a concern about how model params should be managed and where do we store the information about the model? I'd guess this should be in chat settings (chat) and things like model name, max tokens, etc. should be related to chat in this case? But in this case we are more limited in terms of quickly switching model for API calls. Because in case we save config in chats, we will first need to update chat settings with one request and then process message with different one, since we won't be able to provide those params together with message?

🚩🚩🚩 We will need to add filtering either inside DynamoDB or in the code. Code will be easier obviously, not sure about performance and pricing for filtering directly inside the DynamoDB

🚩🚩🚩 How will we estimate the read / writes for DynamoDB, or RDS (if we'll use it), will we set something or just use autoscaling?
