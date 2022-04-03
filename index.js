(async () => {
    console.clear()
    console.log("-------------------------------------------------------")
    console.log("Revisión de requerimientos básicos.")
    console.log(" ")
    console.log("1. Revisando si el 'require' existe...")

    if (!existeRequire())
        return console.log("2. No existe la función 'require', asegúrate que estes usando una versión correcta de node.js.")

    console.log("2. Si existe la función 'require'.")
    console.log("3. Revisando si estan instalados los NPM 'yaml' y 'discord-rpc'")

    if (existenNpm().some((i) => !i)) await descargarNpmRpc()
    else console.log("4. Si estan instalados los NPM necesarios en este proyecto.")


    console.log("5. Revisando si existe la carpeta 'rpc'...")
    if (!revisarCarpeta())
        return console.log("6. No existe la carpeta 'rpc', en este caso no puedo hacer nada automáticamente para arreglarlo, te recomiendo que descargues nuevamente el proyecto\n- https://github.com/Xertozer/TutorialRPC")
    console.log("7. Si existe la carpeta 'rpc', revisando si existe el archivo 'rpc.js'")
    if (!revisarArchivo("rpc.js"))
        return console.log("8. No existe el archivo 'rpc.js' para poder ejecutar el código, en este caso no puedo hacer nada automáticamente para arreglarlo, te recomiendo que descargues nuevamente el proyecto\n- https://github.com/Xertozer/TutorialRPC")
    console.log("8. Si existe el archivo '/rpc/rpc.js', revisando si existe el archivo 'configuraciones.yml'")
    if (!revisarArchivo("configuraciones.yml"))
        return console.log("9. No existe el archivo 'configuraciones.yml' para poder obtener las configuraciones manuales, en este caso no puedo hacer nada automáticamente para arreglarlo, te recomiendo que descargues nuevamente el proyecto\n- https://github.com/Xertozer/TutorialRPC")
    console.log("9. Si existe el archivo '/rpc/configuraciones.yml'")
    console.log("10. Todo en orden, ejecutando el código...")
    console.log("-------------------------------------------------------")
    console.log(" ")
    require("./rpc/rpc.js")

    function revisarCarpeta() {
        const fs = require("fs")
        return fs.readdirSync(".").includes("rpc")
    }

    function revisarArchivo(fl) {
        const fs = require("fs")
        return fs.readdirSync("./rpc/").includes(fl)
    }

    function existeRequire() {
        return typeof require === "function"
    }

    function existenNpm() {
        const cmd = (i) => require("child_process").execSync(i)
        cmd(`cd ${__dirname}`)
        const lista = cmd("npm list").toString()
        return [
            lista.includes("discord-rpc@4.0.1"),
            lista.includes("yaml@1.10.2")
        ]
    }

    async function descargarNpmRpc() {
        const cmd = (i) => require("child_process").execSync(i)
        cmd(`cd ${__dirname}`)
        cmd("npm i discord-rpc@4.0.1")
        cmd("npm i yaml@1.10.2")
        console.clear()
        console.log("-------------------------------------------------------")
        console.log("Este proceso es automático para evitar problemas de ejecución.")
        console.log(" ")
        console.log("1. Revisando si el 'require' existe...")
        console.log("2. Si existe la función 'require'.")
        console.log("3. Revisando si estan instalados los NPM 'yaml' y 'discord-rpc'")
        console.log("4. No estan los NPM necesarios, se han descargado automáticamente.")
    }
})()
