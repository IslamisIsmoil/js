// * sessionStorage: stores data only for a session, meaning that the data is stored until the browser or tab is closed.
// * localStorage: stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.

var admin = { "name": "Ismoil", "email": "admin@admin.com", "password": "i1234567i" };
localStorage.setItem( "admin", JSON.stringify(admin) );
var current_date = new Date();
var current_user = localStorage.getItem(Object.keys(localStorage)[0]);
var current_user_data = JSON.parse(localStorage.getItem(Object.keys(localStorage)[0]));
var admin_data = JSON.parse(localStorage.getItem('admin'));
var admin_name = admin_data.name;
var admin_password = admin_data.password;
var login_name, login_email, login_password;
var game_over, chance = 0, start_q, change_over;
var r_n, confirming, user_score = 0, bot_score = 0;
var email_v = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
/////////////////////////////////////////////////////////////////////////////////////////////////
function forms(){
    document.write( "<form name=\"myForm\" class=\"form\" method=\"post\">" );
    document.write( "<div class=\"form__text\">Login</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your login\" type=\"text\" id=\"login_name\"></input>" );
    document.write( "<div class=\"form__text\">Email</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your email\" type=\"text\" id=\"login_email\"></input>" );
    document.write( "<div class=\"form__text\">Password</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your password\" type=\"password\" id=\"login_password\"></input>" );
    document.write( "<br><button type=\"button\" id=\"signup\" class=\"form__btn\">Sign Up</button>" );
    var form = document.querySelector("form");
    form.addEventListener("button", event => {
        console.log("Saving value", form.elements.value.value);
        event.preventDefault();
    });
    var btn = document.getElementById( 'signup' );
    btn.addEventListener( 'click', e => { console.log("process run", e); sign_up(); } );
}
function forms_in(){
    document.write( "<form name=\"myForm\" class=\"form\" method=\"post\">" );
    document.write( "<div class=\"form__text\">Login</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your login\" type=\"text\" id=\"login_name\"></input>" );
    document.write( "<div class=\"form__text\">Password</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your password\" type=\"password\" id=\"login_password\"></input>" );
    document.write( "<br><button type=\"button\" id=\"signin\" class=\"form__btn\">Sign Up</button>" );
    var form = document.querySelector("form");
    form.addEventListener("button", event => {
        console.log("Saving value", form.elements.value.value);
        event.preventDefault();
    });
    var btn = document.getElementById( 'signin' );
    btn.addEventListener( 'click', e => { console.log("process run", e); sign_in(); } );
}

function nav(){
    document.write("<nav class=\"menu\"><ul class=\"menu__list\">");
    document.write("<li class=\"menu\"><a class=\"menu__link\">" + 
    Object.keys( localStorage)[0] );
    document.write( "<ul class=\"sub-menu-list\">" );
    document.write( "<li class=\"menu\"><a class=\"menu__link\"  id=\"logout\">logout</a></li>" );
    document.write( "<li class=\"menu\"><a  id=\"score\" class=\"menu__link\">my score</a></li>" );
    if ( login_name === admin_name && login_password === admin_password ) {
        document.write( "<li class=\"menu\"><a  id=\"admin_p\" class=\"menu__link\">admin panel</a></li>" );
    }
    document.write( "</ul></a></li>" );
    document.write( "</ul></nav>" );

    document.addEventListener('click',function(e) {
        if ( e.target.id == 'admin_p' ){
            admin_panel();console.log(e);
        } 
        if ( e.target.id == 'logout'){
            log_out();clearPage();start_page();
        } 
        if ( e.target.id == 'score'){
            score();
        }
    });
}

function score(){
    document.write( "<div class='score'>" );
    document.write( "<h1 class=\"score__text\">" + `${user_score}:${bot_score}` + "</h1>" );
    document.write( "<button class=\"score__btn\" onclick=\"resetGame();\">Play Again</button>" );
    document.write( "</div>" );
    
}

function start_page() {
    document.write( "<div>" );
    document.write( "<button id=\"start_signup\" class=\"start__signUp\">Sign Up</button>" );
    document.write( "<button id=\"start_signin\" class=\"start__signIn\">Sign In</button>" );
    document.write( "</div>" );
    document.addEventListener('click',function(e) {
        if ( e.target.id == 'start_signup'){
            forms();
        }
        if ( e.target.id == 'start_signin'){
            forms_in();
        }
    });
}

function admin_panel() {
    document.write( "<link rel=\"stylesheet\" ss/style.css\">" );
    var users = Object.keys( localStorage );
    document.write( "<table class=\"table\">" );
    document.write( "<tr>" );
    document.write( "<th class=\"table__text\">Users</th>" );
    document.write( "<th class=\"table__text table__remove\">remove</th>" );
    document.write( "</tr>" );

    for ( i in users ) {
        document.write( "<tr>" );
        document.write( "<td class=\"table__users\">" + users[i] + "</td>" );
        document.write( "<td><button id='deleteUser" + i + "' class=\"btn__remove\">x</button></td>" );
        document.write( "</tr>" );        
    }
    document.write( "</table>" );  
    
    document.addEventListener('click',function(e) {
        var users = Object.keys( localStorage );
        for ( i in users ) {
            if(e.target && e.target.id == 'deleteUser' + i ){
                var element = e.target;
                var parent = element.parentElement;
                var pro_parent = parent.parentElement;
                pro_parent.remove();
                localStorage.removeItem(users[i]);
            } 
        }
    });
}

function sign_up(){
    login_name          = String(document.getElementById('login_name').value);
    login_email         = String(document.getElementById('login_email').value);
    login_password      = String(document.getElementById('login_password').value);
    var storage         = localStorage;
    // checking login is unique
    if ( storage.getItem( login_name ) !== null ) {
        alert( 'Login name not unique!' );
        return false;
    }
    if ( !email_v.test( login_email ) ) {
        alert( "Email is not valid!" );
        return false;
    }
    if ( login_name == '' || login_password == '' || login_email == '' ) { 
        alert( 'You should fill it out!' );
        return false;
    }
    else if ( storage.getItem( login_name ) === null){
        var new_user = new Object;
        new_user['login_n']       = login_name;
        new_user['login_email']   = login_email;
        new_user['login_password']= login_password;
        new_user['date']          = current_date;
        // ! u can set objects only json format to localStorage.
        storage.setItem( login_name, JSON.stringify( new_user ) );
        console.log( 'new user added!' );
        start_game();
    }
}
function log_out() {
    localStorage.removeItem( Object.keys(localStorage)[0] );
}

function sign_in(){
    last_login_name     = String(document.getElementById('login_name').value);
    login_password      = String(document.getElementById('login_password').value);
    var storage         = localStorage;
    // cheking admin
    if ( login_name == admin_name ){ clearPage();nav();admin_panel(); }
    // checking login name is exist
    if ( storage.getItem( last_login_name ) !== null ) {
        nav();console.log( 'OK!' );start_game();
    } else { console.log( "User not found!" ); }
}
// *for get keys from localStorage
var keys_of_storage = Object.keys( localStorage );
console.log( keys_of_storage );
var remove_all = () => { localStorage.clear(); };

start_page();
///////////////////////////////////////////////////////////
function reset_score() { user_score = 0, bot_score = 0; }
function congratulations(){
    user_score++;
    document.write( "<h1 class=\"animation-text\">" + `${r_n}` + "</h1>" );
    document.write( "<p class=\"text\">Congratulations! You have find out the guessed number.</p>" );
    document.write( "<button onclick=\"resetGame();\" class=\"btn\">Play Again</button>" );
    document.write( "<p class=\"score\">" + `${user_score}:${bot_score}` + "</p>" );
}

function fail(){
    bot_score++;
    document.write( "<h1 class=\"animation-text\">" + `${r_n}` + "</h1>" );
    document.write( "<p class=\"text\" style=\"color: red;\">Fail! You not found the guessed number.</p>" );
    document.write( "<button onclick=\"resetGame();\" class=\"btn\">Play Again</button>" );
    document.write( "<p class=\"score\">" + `${user_score}:${bot_score}` + "</p>" );
}
function style(){
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
}

function clearPage() { document.body.innerHTML = ""; }

function start_game() {
    r_n         = Math.floor(Math.random()*100) + 1;
    game_over   = false;
    while ( !game_over ) {
        console.log( r_n );
        start_q     = Number( prompt( "Hello, I guessed one number you should find it out!" ) );
        change_over = chance++;
        if ( start_q == r_n ) { congratulations(); game_over = true; }
        if ( !start_q ) { 
            confirming = confirm( "You want to lose it!" );
            if ( confirming ){ fail(); game_over = true; console.log("user lose"); }
        }
        if ( start_q != r_n && change_over >= 3 ) {
            alert( "wrong!" );
        }
        if ( start_q > r_n && change_over < 3 ) {
            alert( "given number is greater than imagined number!" );
        }
        else if ( start_q < r_n && change_over < 3 ) {
            alert( "given number is smaller than guessed number!" );
        }
    }
}
function resetGame() {
    clearPage();
    setTimeout(function() {
        start_game();
    }, 10);
}