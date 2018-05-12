# Uso del Application.json

El JSON de la aplicacion contiene los siguientes campos

## "version"

Numero de la version actual de la aplicacion como `String`

    {"version":"0.1.4"}

## "static"

Lista de archivos estaticos o rutas que se cargaran desde la aplicacion.

    {"static":
        [
            "index.html",
            "styles.css",
            "images",
            "templates/templates.html"
        ]
    }

## "imports"

Define los objetos a importar dentro de la aplicacion. Cada objeto es una llave que a su vez puede contener otros objetos o listas

    {"imports":
        {
            "libraries": [
                "lib1/v1",
                "lib2/v2"
            ]
        }
    }

## "params"

Define una serie de objetos que siven como parametros en la aplicacion y pueden ser obtenidos dentro de la misma. Los parametros pueden ser de cualquier tipo, incluidos objetos o listas que pudieran, a su vez, contener objetos y listas.

    {"params":
        {
            "parametroString":"HolaMundo",
            "parametroNumero": 123123123,
            "parametroObjeto": {
                "clave1":"valor1",
                "clave2":"valor2"
            }
            "parametroLista": [
                "contenido1",
                "contenido2"
            ]
        }
    }

## "template"

Define la ruta hacia el template.json que define el molde de estilos que se va a utilizar en la aplicacion.

    {"template":"template/template.json"}

## "connect"
