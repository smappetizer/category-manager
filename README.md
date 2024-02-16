# smapOne Category Manager

This lightweight application is supposed to enable users to mass manage smaps and their related categories.

## API endpoints

All endpoints used in this project are not documented in the official product documentation (yet). The endpoints are located in the internal API. The base route for all endpoints is `https://platform.smapone.com/backend/intern/smaps/overview/categories`.

### `GET /smaps/overview/categories`

Lists all categories.

#### Response body

```json
[
  {
    "id": "777cd732-600b-412d-94d9-b493b09b6bfb",
    "title": "Category A",
    "countOfSmaps": 123
  },
  {
    "id": "df3b42d0-3e88-4fa2-bd5d-ab8985713e35",
    "title": "Category B",
    "countOfSmaps": 321
  }
]
```

### `GET /smaps/overview/categories/<categoryID>`

Lists smaps that belong to a specified category.

#### Response body

```json
[
  {
    "smapId": "65e3ddbf-4458-4725-8feb-d7f27438f7a4",
    "countOfDataRecords": 12,
    "countOfInstallations": 4,
    "countOfTasks": 0,
    "createdDate": "2024-01-12T21:13:53.48Z",
    "description": null,
    "isCompanyTemplate": false,
    "isDistributed": true,
    "isPublished": true,
    "lastRecordReceived": "2024-02-01T20:02:12.037Z",
    "iconId": "9fb80247-d843-4dfa-bd97-be3ec94a80a3",
    "modifiedDate": "2024-02-14T11:22:42.137Z",
    "tasksActivated": false,
    "title": "My beloved, my precious, my smap"
  }
]
```

### `GET /smaps/overview/<smapID>/categories`

Lists all categories and assigned status for a specified smap.

```json
[
  {
    "categoryId": "2ed2c194-973c-4bb7-92d2-3c86cdaa374f",
    "isAssigned": true,
    "categoryName": "_Development"
  },
  {
    "categoryId": "4c531970-19b8-497b-99e9-9ae9d0747f92",
    "isAssigned": false,
    "categoryName": "ARCHIV"
  }
]
```

### `POST /smaps/overview/categrories`

Creates a new category.

#### Request body

```json
{
    "title": "Kategorientest"
}
```

### `PUT /smaps/overview/<smapID>/categories`


#### Request body

```json

[
    {
        "categoryId": "<categoryID>",
        "isAssigned": true|false
    },
    {
        ...
    }
]
```

### Get all smaps

API endpoints for record retrieval are well documented:

* [Swagger UI documentation](https://platform.smapone.com/backend/swagger)
* [FAQ: How can I retrieve records via the REST API?](https://faq.smapone.com/kb/guide/en/how-can-i-retrieve-records-via-the-rest-api-txijwuNfDF/Steps/1037352)

```
GET https://platform.smapone.com/Backend/v1/Smaps
GET https://platform.smapone.com/Backend/intern/Smaps
```

#### Response body

```json
[
    {
        "groupLicenseCount": 0,
        "changeType": "None",
        "userLicenseCount": 3,
        "lastChanged": "2023-07-17T11:44:43.55Z",
        "isUpToDate": true,
        "installationsCount": 1,
        "lastPublishedVersion": {
            "lastChanged": "2023-07-17T11:44:51.39Z",
            "lastRecordReceived": "2023-08-10T10:20:52.2866667",
            "dataCount": 4,
            "smapVersionId": "3f227891-ee99-4680-808b-cf9375967e78",
            "version": "3.1"
        },
        "totalDataCount": 71,
        "totalOpenTasksCount": 1,
        "tasksActivated": true,
        "isCompanyTemplate": false,
        "name": "My simple smap",
        "smapId": "818fabeb-ad5f-4917-b520-1dc692df9647",
        "logoId": "43e45c45-aec5-4de6-bc6e-d46ab3a137c9"
    }
]
```
