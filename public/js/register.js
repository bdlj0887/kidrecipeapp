
let validators = {
    email: false;
    userName: false;
    password: false;
    verifyPassword: false;
}

let inputChangeHandler = (e)=>{
    console.log(event);
    switch(e.target){
        case 'email':
            console.log('email');
            break;
        case 'userName':
            console.log('userName');
            break;
        case 'password':
            console.log('password');
            break;
        case 'verifyPassword':
            console.log('verifyPassword')

    }
};


document.getElementById('email').onchange = inputChangeHandler(event);


