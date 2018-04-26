function addFields(parent, city, timezone)
{
    var content = document.createElement('div');

    content.setAttribute('class', 'time-container');
    content.innerHTML = '<hr /> \
            <div> \
                <img src="del.png" class="delete-block" width="15px" /> \
            </div> \
            <div style="clear:both;"></div> <br />\
            <div class="each-block"> \
                <label>City:</label> \
                <input class="city" id="city" placeholder="city" value="' + city + '" /> \
            </div> \
            <div class="each-block"> \
                <label>GMT:</label> \
                <input class="timezone" id="timezone" placeholder="GMT" value="' + timezone + '" /> \
            </div>';

    parent.appendChild(content);
}

function saveOptions()
{
    var position   = document.getElementById('position').value;
    var background = document.getElementById('background').value;
    var textColor  = document.getElementById('text-color').value;
    var cities     = document.getElementsByClassName('city');
    var zones      = document.getElementsByClassName('timezone');
    var timezones  = [];

    for (var i = 0; i < cities.length; i++) {
        var elem      = {};
        elem.city     = cities[i].value;
        elem.timezone = zones[i].value;

        timezones.push(elem);
    }

    chrome.storage.sync.set({
        position: position,
        background: background,
        textColor: textColor,
        timezones: JSON.stringify(timezones)
    }, function() {
        var status  = document.getElementById('status');
        status.innerHTML = 'Options saved.';

        setTimeout(function() {
            status.innerHTML = '';
        }, 750);
    });
}

function restoreOptions()
{
    var parent = document.getElementById('container');

    chrome.storage.sync.get({
        position: 'bottom-right',
        background: '#007bff',
        textColor: '#ffffff',
        timezones: ''
    }, function(items) {
        document.getElementById('position').value   = items.position;
        document.getElementById('background').value = items.background;
        document.getElementById('text-color').value = items.textColor;

        if (items.timezones.length > 0) {
            timezones = JSON.parse(items.timezones);

            for (var obj in timezones) {
                addFields(parent, timezones[obj].city, timezones[obj].timezone);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('add').addEventListener('click', function () {
    var parent = document.getElementById('container');

    addFields(parent, '', '');
});
document.addEventListener('click', function(e) {
    if(e.target && e.target.className== 'delete-block') {
        e.target.parentElement.parentElement.remove();
    }
});
