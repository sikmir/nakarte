
function randId() {
    return Math.random().toString(36).substring(2, 13);
}

const sessionId = randId();

function captureMessage(msg, extra = {}) {
    extra.url = window.location.toString();
    console.log('captureMessage', msg, extra); // eslint-disable-line no-console
}

function captureException(e, description) {
    console.log('captureException', e, description); // eslint-disable-line no-console
}
function captureBreadcrumb(message, data = {}) {
    console.log(message, data); // eslint-disable-line no-console
}

function logEvent(eventName, extra) {
    const data = {event: eventName.toString()};
    data.data = {
        ...extra,
        beacon: true,
        session: sessionId,
        address: window.location.toString()
    };
    let s = JSON.stringify(data);
    console.log(s); // eslint-disable-line no-console
}

export {captureMessage, captureException, captureBreadcrumb, logEvent, randId};
