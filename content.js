function timeExtensionCalcTime(offset) {
    var date = new Date();
    var utc  = date.getTime() + date.getTimezoneOffset() * 60000;
    var nd   = new Date(utc + (3600000*offset));

    var options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return nd.toLocaleString('en-US', options);
}

function timeExtenstionRestoreOptions() {
    chrome.storage.sync.get({
        position: 'bottom-right',
        background: '#007bff',
        textColor: '#ffffff',
        timezones: ''
    }, function(items) {
        var timezones  = JSON.parse(items.timezones);

        if (timezones.length > 0) {
            var position   = items.position;
            var background = items.background;
            var textColor  = items.textColor;

            updateTimeExtenstionDiv(timezones, position, background, textColor);
        }
    });
}

function updateTimeExtenstionDiv(timezones, position, background, textColor) {
    var body    = document.getElementsByTagName('body')[0];
    var content = document.createElement('div');
    var style   = 'position: fixed; cursor: move; padding: 15px; z-index: 99999; font-weight: bold;';

    if (position == 'top-left') {
        style += 'top: 5px; left: 5px;';
    } else if (position == 'top-right') {
        style += 'top: 5px; right: 5px;';
    } else if (position == 'bottom-left') {
        style += 'bottom: 5px; left: 5px;';
    } else {
        style += 'bottom: 5px; right: 5px;';
    }

    style += 'background:' + background + '; color: ' + textColor + '; font-size: 14px;';

    content.setAttribute('title', 'Remove Now');
    content.setAttribute('style', style);
    content.addEventListener('click', function() {
        this.remove();
    })

    content.innerHTML = '';

    for (var obj in timezones) {
        if (obj > 0) {
            content.innerHTML += '<hr style="margin: 3px 0; border-width: 2px;" />';
        }

        content.innerHTML += '<div style="text-align: center;"><u>' + timezones[obj].city.toUpperCase() + '</u></div><div>' +
            timeExtensionCalcTime(timezones[obj].timezone) + '</div>';
    }

    body.appendChild(content);
}

timeExtenstionRestoreOptions();
