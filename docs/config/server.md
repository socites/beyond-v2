# Uso del Server.json

El JSON del servidor contiene los siguientes campos:

## "ports"
   
Define los puertos donde se va a levantar la aplicacion dentro de su propio objeto

    {"ports":
        {
            "http": 3050,
            "rpc": 3051
        }
    }

## "paths"
Define las rutas del contenido del proyecto

    {"paths":
        {
            "code":"./",
            "build":"./build"
        }
    }

## "types"
Define una lista de rutas donde se encuentran los generadores y procesadores de los tipos usados por beyond

    {"types":[
        "./node_modules/beyond/types"
    ]}

## "applications"
Define las rutas donde se encuentra el application.json de las aplicaciones alojadas en el servidor

    {"applications":
        {
            "app1":"./applications/app1/application.json",
            "app2":"./applications/app2/application.json",
            "app3":"./applications/app3/application.json",
            ...
        }
    }

## "libraries"
Define las rutas donde se encuentra el library.json de las distintas librerias de plugins usadas por las aplicaciones del servidor

    {"libraries":
        {
            "lib1":"./node_modules/path/to/lib1/library.json",
            "lib2":"./node_modules/path/to/lib2/library.json",
            "lib3":"./libraries/lib3/library.json",
            ...
        }
    }

## "defaults"
Define los valores por defecto de distintas variables, como por ejemplo la aplicacion a la que redireccionara por defecto, o el idioma que va a mostrar

    {"defaults":
        {
            application: "app2",
            language: "spa"
        }
    }

## "services"