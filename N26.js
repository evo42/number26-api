var Number26 = function(options) {
    var bearer = 'YW5kcm9pZDpzZWNyZXQ=';
    var api = 'https://api.tech26.de';

    var N26 = {};

    N26.login = function () {
        var username = $('#username').val();
        var password = $('#password').val();
        var accessToken = false;

        $.ajax({
            type: 'POST',
            url: api + '/oauth/token',
            dataType: 'json',
            data: {
                'username': username,
                'password': password,
                'grant_type': 'password'
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + bearer);
            },
            success: function (data) {
                accessToken = data.access_token;

                localStorage.setItem('N26token', accessToken);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    N26.logout = function () {
        localStorage.setItem('N26token', null);
        localStorage.removeItem('N26token');
    };

    N26.transaction = function () {
        var bearer = localStorage.getItem('N26token');
        var pin = $('#pin').val() || $('#pin').data('value') || $('#pin').text();
        var iban = $('#iban').val() || $('#iban').data('value') || $('#iban').text();
        var bic = $('#bic').val() || $('#bic').data('value') || $('#bic').text();
        var amount = $('#amount').val() || $('#amount').data('value') || $('#amount').text();
        var name = $('#name').val() || $('#name').data('value') || $('#name').text();
        var reference = $('#reference').val() || $('#reference').data('value') || $('#reference').text();

        amount = parseFloat(amount).toFixed(2);

        $.ajax({
            type: 'POST',
            url: api + '/api/transactions',
            dataType: 'json',
            data: JSON.stringify({
                'pin': pin,
                'transaction': {
                    "partnerBic": bic,
                    "amount": amount,
                    "type": "DT",
                    "partnerIban": iban,
                    "partnerName": name,
                    "referenceText": reference
                }
            }),
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + bearer);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    N26.me = function () {
        var bearer = localStorage.getItem('N26token');

        $.ajax({
            type: 'GET',
            url: api + '/api/me',
            dataType: 'json',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + bearer);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    N26.accounts = function () {
        var bearer = localStorage.getItem('N26token');

        $.ajax({
            type: 'GET',
            url: api + '/api/accounts',
            dataType: 'json',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + bearer);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    N26.transactions = function () {
        var bearer = localStorage.getItem('N26token');

        $.ajax({
            type: 'GET',
            url: api + '/api/transactions?sort=visibleTS&dir=DESC&limit=50',
            dataType: 'json',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + bearer);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    N26.cards = function () {
        var bearer = localStorage.getItem('N26token');

        $.ajax({
            type: 'GET',
            url: api + '/api/cards',
            dataType: 'json',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + bearer);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    N26.addresses = function () {
        var bearer = localStorage.getItem('N26token');

        $.ajax({
            type: 'GET',
            url: api + '/api/addresses',
            dataType: 'json',
            data: {},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'bearer ' + bearer);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.setRequestHeader('Content-Type', 'application/json');
            },
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    return N26;
}



$('#login').on('click', function () {
    Number26().login();
});

$('#logout').on('click', function () {
    Number26().logout();
});

$('#transfer').on('click', function () {
    Number26().transaction();
});

$('#data').on('click', function () {
    Number26().me();
    Number26().accounts();
    Number26().transactions();
    Number26().cards();
    Number26().addresses();
});
