// definiciones de los NPM requeridos para funcionar
const fs = require("fs")
const yaml = require("yaml")
const RPC = require("discord-rpc")
const client = new RPC.Client({
    transport: "ipc"
})

// importe del archivo configuraciones.yml
const archivo = fs.readFileSync("./rpc/configuraciones.yml", "utf8")
// conversión del yml a un objeto utilizable en el código
const config = archivo ? yaml.parse(archivo) : {}
// definicion de las opciones puestas en configuraciones.yml
const opciones = {}

// definicion de las opciones en un objeto de discord
if (config?.texto["primera-linea"])
    opciones.details = config.texto["primera-linea"]

if (config?.texto["segunda-linea"])
    opciones.state = config.texto["segunda-linea"]

if (config?.botones?.length) {
    if (config.botones[0]?.nombre) opciones.buttons = []
    if (config.botones[1]?.nombre) opciones.buttons = []

    if (config.botones[0]?.nombre) opciones.buttons.push({
        label: config.botones[0]?.nombre,
        url: config.botones[0]?.enlace
    })

    if (config.botones[1]?.nombre) opciones.buttons.push({
        label: config.botones[1]?.nombre,
        url: config.botones[1]?.enlace
    })
}

if (config?.imagen?.grande) {
    opciones.largeImageKey = config.imagen.grande
}

if (config?.imagen?.pequeño) {
    opciones.smallImageKey = config.imagen.pequeño
}

// avisar cuando se inicie
client.on("ready", () => {
    client.setActivity(opciones)
    console.log([
        "RPC habilitado",
        "- Si te gusta y te funciona me apoyarías un montón suscribiéndote a mi canal",
        "- Att: Xertozer"
    ].join("\n"))
})

// iniciar el RPC
client.login({
    clientId: config["id-cliente"]
})