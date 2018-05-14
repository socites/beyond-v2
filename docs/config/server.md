# Server.json

Represents the Server configuration.

## Description

The server.json is an object containing several properties of the server:

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
|`ports`|Object||Contains data for the ports used to access the application|
|`paths`|Object||Contains data for the routes used in the application|
|`types`|Array||Contains a list of the routes where the beyond types are defined|
|`applications`|Object||Contains data for the routes of the applications|
|`libraries`|Object||Contains data for the routes of the libraries used in the applications|
|`defaults`|Object||Contains data for the default values for several properties of the application|
|`services`|Object||

---

Each object has its own properties, described in the following tables

## Ports

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
| `http` |`String`| Yes |  |
| `rpc` |`String`| Yes | |

    {"ports":
        {
            "http": 3050,
            "rpc": 3051
        }
    }

## Paths

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
| {{name}} | `String` | No | Name and location of the path. `name` can be any string. |


    {"paths":
        {
            "code":"./",
            "build":"./build"
        }
    }

## Types

    {"types":[
        "./node_modules/beyond/types"
    ]}

## "applications"

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
| {{name}} | `String` | No | Name and location of the path. `name` must be the name of a registered application. |

    {"applications":
        {
            "app1":"./applications/app1/application.json",
            "app2":"./applications/app2/application.json",
            "app3":"./applications/app3/application.json",
            ...
        }
    }

## "libraries"

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
| {{name}} | `String` | No | Name and location of the path. `name` must be the name of a registered library. |

    {"libraries":
        {
            "lib1":"./node_modules/path/to/lib1/library.json",
            "lib2":"./node_modules/path/to/lib2/library.json",
            "lib3":"./libraries/lib3/library.json",
            ...
        }
    }

## "defaults"

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
| {{name}} | `String` | No | Name and location of the path. `name` must be the name of one of the properties. |

    {"defaults":
        {
            application: "app2",
            language: "spa"
        }
    }

## "services"

| Property | Type | Required | Description |
|:-:|:-:|:-:|:-:|
| | | | |