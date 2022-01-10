$.ajax({
    url: "https://ipapi.co/json/",
    type: "GET",
    success: function(response) {
        document.getElementById("IPv4").innerText = response.ip
    },
    error: function(err) {
        document.getElementById("IPv4").innerText = "Failed..."
    },
    fail: function(failed) {
        console.log(failed)
    } 
})

function Hora() {
    const date = new Date()
    const hora = date.getHours()
    const minutos = date.getMinutes()
    const segundos = date.getSeconds()
    const full = `${hora}:${minutos}:${segundos}`
    document.getElementById("fecha").innerText = full
}
setInterval(Hora, 1000)