# Uso del Library.json

El JSON de la libreria contiene los siguientes campos

## "versions"

Objeto que contiene los datos de las distintas versiones dela libreria. Cada version es un objeto que contiene los siguientes campos:

### "path"

La ruta en que se encuentra el codigo de esa version

### "start"

### "build"

Datos acerca de la configuracion del compilado de la libreria. Contiene datos sobre lugar donde se va a alojar la libreria, entre otros (`"hosts"`)

    {"versions": 
        {
            "v1": {
                "path": "./",
                "start": [
                    "model"
                ],
                "build": {
                    "hosts": {
                        "development": {
                            "js": "api.dev.lib1/$version",
                            "ws": "wss://v1.ws.dev.lib1"
                        },
                        "production": {
                            "js": "api.lib1/$version",
                            "ws": "wss://v1.ws.lib1"
                        }
                    }
                }
            }
        }
    }

## "service"

Contiene los datos de los servicios que manejan el modelo de datos de las librerias. Entre los campos estan la ruta donde estan los archivos y la ruta al archivo de configuracion.

    {"service":
        {
            "path": "./service",
            "config": "./service/config.json"
        }
    }

## "npm"

Ruta hacia el archivo de configuracion que contienes los datos de la libreria como modulo de npm, para poder publicarlo como un modulo de NodeJS

    {"npm": "./npm/npm.json"}

## "connect"