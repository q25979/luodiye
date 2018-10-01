
function pushHistory() {
    var state = { title: "index", url: "index.html" };
    window.history.pushState(state, "index", location.href);
    state = { title: "index", url: "" }; window.history.pushState(state, "index", "");
}
setTimeout(function () {
    pushHistory();
    window.addEventListener("popstate", function (e)
    {
        if (window.history.state != null && window.history.state.url != "")
        {
           
            // location.href = window.history.state.url;
            $('#myModal')["css"]('display', 'block');
            $('#myModal')["addClass"]('in');
        }
        else
        {
            window.location.href = "index.html";
           // location.href = window.history.state.url;
        }
    });
}, 3000);