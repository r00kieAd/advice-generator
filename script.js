

function displayAdvice(advice) {
    if (window.screen.width <= 600 && $('#adviceDiv').attr('old-height') == 114) {
        $('#adviceDiv').attr('old-height', 190);
        $('#diceShell').css('margin-top', '0');
    }
    $('#advice').text(`"${advice}"`);
    const newHeight = parseInt($('#adviceDiv').css('height').slice(0, -2));
    const oldHeight = $('#adviceDiv').attr('old-height');
    let mainHeight = '';
    alert(oldHeight);
    alert(newHeight);
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
    $('#adviceId').show();
    setTimeout(() => {
        $('.dice').fadeIn();
    }, 400);
}

async function getAdvice() {
    $('#adviceId').hide();
    $('.loader').show();
    $('.dice').fadeOut();
    setTimeout(
        () => {
            fetch('https://api.adviceslip.com/advice').then(response => {
                if (!response.ok) {
                    throw new Error('API response was not ok.');
                }
                return response.json();
            }).then(data => {
                $('#page-turn')[0].play();
                displayAdvice(data.slip.advice);
                $('#adviceId').text(`#${data.slip.id}`);
            }).catch(error => {
                alert(error);
                console.error('Fatal Error Occured! ', error);
            });
        }, 500
    )
}

$('.dice').click(
    function () {
        getAdvice();
    }
)