app.service("cookieOptionService", function () {
    this.cookieName = "customerCart";
    var efterDays = 1;
    var now = new Date();
    this.exp = new Date(now.getFullYear(), now.getMonth(), now.getDate() ,now.getMinutes+ efterDays);
});