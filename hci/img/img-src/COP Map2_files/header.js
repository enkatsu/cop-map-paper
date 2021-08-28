$(function() {
    const trelloToken = localStorage.getItem('trello_token');
    if (trelloToken) {
        $('#account-nav-item').append(`
        <a class="nav-link" id="trello-disable-auth-link" href="#">ログアウト</a>
        `);
        $('#trello-disable-auth-link').click(() => {
            localStorage.removeItem('trello_token');
            location.reload();
        });
    } else {
        $('#account-nav-item').append(`
        <a class="nav-link" id="trello-enable-auth-link" href="#">Trello認証</a>
        `);
        const authenticationSuccess = async (ev) => {
            location.reload();
        };
        const authenticationFailure = () => {
            console.log('Failed authentication');
        };
        $('#trello-enable-auth-link').click(() => {
            window.Trello.authorize({
                type: 'popup',
                name: 'CoP Map',
                scope: {
                    read: true,
                    write: true,
                    account: false,
                },
                persist: true,
                // expiration: 'never',
                expiration: '1hour',
                success: authenticationSuccess,
                error: authenticationFailure
            });
        });
    }
});
