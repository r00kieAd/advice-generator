async function getAdvice() {
    fetch('https://api.adviceslip.com/advice').then(response => {
        if (!response.ok) {
            throw new Error('API response was not ok.');
        }
        return response.json();
    }).then(data => {
        alert(data.slip.advice);
    }).catch(error => {
        alert(error);
        console.error('Fatal Error Occured! ', error);
    });
}


$('button').click(
    function() {
        getAdvice();
    }
)