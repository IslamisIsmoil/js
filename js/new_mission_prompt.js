// * sessionStorage: stores data only for a session, meaning that the data is stored until the browser or tab is closed.
// * localStorage: stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.

let admin = { "name": "Ismoil", "email": "admin@admin.com", "password": "i1234567i" };
localStorage.setItem( "admin", JSON.stringify(admin) );
let current_date = new Date();
let current_user = localStorage.getItem(Object.keys(localStorage)[0]);
let current_user_data = JSON.parse(localStorage.getItem(Object.keys(localStorage)[0]));
let admin_data = JSON.parse(localStorage.getItem('admin'));
let admin_name = admin_data.name;
let admin_password = admin_data.password;
let login_name, login_email, login_password;
let game_over, chance = 1, start_q, change_over,
    r_n, confirming, user_score = 0, bot_score = 0;

const reset_score = () => { user_score = 0, bot_score = 0; };
const congratulations = () => {
    user_score++;
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
    document.write( "<h1 class=\"animation-text\">" + `${r_n}` + "</h1>" );
    document.write( "<p class=\"text\">Congratulations! You have find out the guessed number.</p>" );
    document.write( "<button onclick=\"resetGame();\" class=\"btn\">Play Again</button>" );
    document.write( "<p class=\"score\">" + `${user_score}:${bot_score}` + "</p>" );
};

const fail = () => {
    bot_score++;
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
    document.write( "<h1 class=\"animation-text\">" + `${r_n}` + "</h1>" );
    document.write( "<p class=\"text\" style=\"color: red;\">Fail! You not found the guessed number.</p>" );
    document.write( "<button onclick=\"resetGame();\" class=\"btn\">Play Again</button>" );
    document.write( "<p class=\"score\">" + `${user_score}:${bot_score}` + "</p>" );
};

const clearPage = () => { document.body.innerHTML = ""; };
function resetGame() {
    clearPage();
    setTimeout(function() {
        start_game();
    }, 10);
}

function start_game() {
    alert( 'let play game' );
    r_n         = Math.floor(Math.random()*100) + 1;
    game_over   = false;
    while ( !game_over ) {
        console.log( r_n );
        start_q     = Number( prompt( "Hello, I guessed one number you should find it out!" ) );
        change_over = chance++;
        if ( start_q == r_n ) {
            congratulations();
            game_over = true;
        }
        else if ( !start_q ) { 
            confirming = confirm( "You want to lose it!" );
            if ( confirming ){ fail(); break; }
        }
        else if ( start_q != r_n && change_over >= 3 ) {
            alert( "wrong!" );
        }
        else if ( start_q > r_n && change_over < 3 ) {
            alert( "given number is greater than imagined number!" );
        }
        else if ( start_q < r_n && change_over < 3 ) {
            alert( "given number is smaller than guessed number!" );
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////
function forms(){
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
    document.write( "<form name=\"myForm\" class=\"form\" method=\"post\">" );
    document.write( "<div class=\"form__text\">Login</div>" );
    document.write( "<input class=\"form__input\" placeholder=\"Enter your login\" type=\"text\" id=\"login_name\"></input>" );
    document.write( "<div class=\"form__text\">Email</div>" );
    document.write( "<input class=\"form__input\" placeholder=\"Enter your email\" type=\"text\" id=\"login_email\"></input>" );
    document.write( "<div class=\"form__text\">Password</div>" );
    document.write( "<input class=\"form__input\" placeholder=\"Enter your password\" type=\"password\" id=\"login_password\"></input>" );
    document.write( "<br><button type=\"submit\" href=\"#\" onclick=\"sign_up();\" class=\"form__btn\">Sign Up</button>" );
}
function forms_in(){
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
    document.write( "<form name=\"myForm\" class=\"form\" method=\"post\">" );
    document.write( "<div class=\"form__text\">Login</div>" );
    document.write( "<input class=\"form__input\" placeholder=\"Enter your login\" type=\"text\" id=\"login_name\"></input>" );
    document.write( "<div class=\"form__text\">Password</div>" );
    document.write( "<input class=\"form__input\" placeholder=\"Enter your password\" type=\"password\" id=\"login_password\"></input>" );
    document.write( "<br><button type=\"submit\" href=\"#\" onclick=\"sign_in();\" class=\"form__btn\">Sign Up</button>" );
}

function nav(){
    document.write("<nav class=\"menu\"><ul class=\"menu__list\">");
    document.write("<li class=\"menu\"><a class=\"menu__link\">" + 
    Object.keys(localStorage)[0] );
    document.write( "<ul class=\"sub-menu-list\">" );
    document.write( "<li class=\"menu\"><a class=\"menu__link\" href='#' id=\"logout\">logout</a></li>" );
    document.write( "<li class=\"menu\"><a href='#' id=\"score\" class=\"menu__link\">my score</a></li>" );
    if ( login_name === admin_name && login_password === admin_password ) {
        document.write( "<li class=\"menu\"><a href='#' id=\"admin_p\" class=\"menu__link\">admin panel</a></li>" );
    }
    document.write( "</ul></a></li>" );
    document.write( "</ul></li>" );
}

function score(){
    nav();
    clearPage();
    document.write( "<div> class='score'" );
    document.write( "<h1 class=\"score__text\">" + `${user_score}:${bot_score}` + "</h1>" );
    document.write( "<button class=\"score__btn\" onclick=\"resetGame();\"></button>" );
    document.write( "</div>" );
}

function start_page() {
    document.write( "<div>" );
    document.write( "<button id=\"start_signup\" class=\"start__signUp\">Sign Up</button>" );
    document.write( "<button class=\"start__signIn\">Sign In</button>" );
    document.write( "</div>" );
}
start_page();
function admin_panel() {
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
    let users = Object.keys( localStorage );
    document.write( "<table class=\"table\">" );
    document.write( "<tr>" );
    document.write( "<th class=\"table__text\">Users</th>" );
    document.write( "<th class=\"table__text table__remove\">remove</th>" );
    document.write( "</tr>" );

    for ( i in users ) {
        document.write( "<tr>" );
        document.write( "<td class=\"table__users\">" + users[i] + "</td>" );
        document.write( "<th><button id='deleteUser" + i + "' class=\"btn__remove\">x</button></th>" );
        document.write( "</tr>" );        
    }
    document.write( "</table>" );
    

    document.addEventListener('click',function(e) {
        for ( i in users ) {
            if(e.target && e.target.id == 'deleteUser' + i ){
                let element = e.target;
                let parent = element.parentElement;
                let pro_parent = parent.parentElement;
                pro_parent.remove();
                localStorage.removeItem(users[i]);
            } 
            if ( e.target && e.target.id == 'admin_p' ){
                admin_panel();console.log(e);
            } 
            if ( e.target && e.target.id == 'logout'){
                log_out();clearPage();start_page();
            } 
            if ( e.target && e.target.id == 'score'){
                clearPage(); score();
            }
            if ( e.target && e.target.id == 'start_signup'){
                clearPage(); forms();
            }
            if ( e.target && e.target.id == 'start_signin'){
                clearPage(); forms_in();
            }
        }
    });
    
}

function sign_up(){
    login_name          = String(document.getElementById('login_name').value);
    login_email         = String(document.getElementById('login_email').value);
    login_password      = String(document.getElementById('login_password').value);
    let storage         = localStorage;

    // checking login is unique
    if ( storage.getItem( login_name ) === null ){
        let new_user = new Object;
        new_user['login_n']       = login_name;
        new_user['login_email']   = login_email;
        new_user['login_password']= login_password;
        new_user['date']          = current_date;
        // ! u can set objects only json format to localStorage.
        storage.setItem( login_name, JSON.stringify( new_user ) );
        console.log( 'new user added!' );
        resetGame();
    }
    else {
        alert( 'Login name not unique!' );
        return false;
    }
}
let log_out = () => {return localStorage.removeItem( Object.keys(localStorage)[0] );}

function sign_in(){
    login_name          = String(document.getElementById('login_name').value);
    login_password      = String(document.getElementById('login_password').value);
    let storage         = localStorage;
    // cheking admin
    if ( login_name == admin_name ){ clearPage();nav(); }
    // checking login name is exist
    if ( storage.getItem( last_login_name ) !== null ) {
        clearPage();start_page();console.log( 'OK!' );
    } else { console.log( "User not found!" ); }
}
// *for get keys from localStorage
let keys_of_storage = Object.keys( localStorage );
console.log( keys_of_storage );
// sign_up();
const remove_all = () => { localStorage.clear(); };