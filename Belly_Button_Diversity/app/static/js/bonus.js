function buildGuage(wfreq) {
    var Guage = document.getElementById("guage");
    Plotly.newPlot(Guage, data, layout)
}
