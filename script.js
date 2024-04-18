function displayAdvice(advice) {
    $('#advice').text(`"${advice}"`);
    const newHeight = parseInt($('#adviceDiv').css('height').slice(0, -2));
    const oldHeight = $('#adviceDiv').attr('old-height');
    let mainHeight = '';
    if (newHeight > oldHeight) {
        mainHeight = `${parseInt($('#mainDiv').css('height').slice(0, -2)) + (newHeight - oldHeight)}px`;
    } else if (newHeight < oldHeight) {
        mainHeight = `${parseInt($('#mainDiv').css('height').slice(0, -2)) - (oldHeight - newHeight)}px`;
    } else {
        mainHeight = parseInt($('#mainDiv').css('height'));
    }
    $('#mainDiv').animate({
        height: mainHeight
    });
    $('#adviceDiv').attr('old-height', newHeight);
    $('.loader').hide();
    $('#adviceId').text('#117');
}

async function getAdvice() {
    $('#adviceId').text('');
    $('.loader').show();
    setTimeout(
        () => {
            fetch('https://api.adviceslip.com/advice').then(response => {
                if (!response.ok) {
                    throw new Error('API response was not ok.');
                }
                return response.json();
            }).then(data => {
                displayAdvice(data.slip.advice);
            }).catch(error => {
                alert(error);
                console.error('Fatal Error Occured! ', error);
            });
        }, 1000
    )
}

$('.dice').click(
    function () {
        getAdvice();
    }
)