// * sessionStorage: stores data only for a session, meaning that the data is stored until the browser or tab is closed.
// * localStorage: stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.

var current_date = new Date();
var admin = { "name": "admin", "email": "admin@admin.com", "password": "i1234567i" };
localStorage.setItem( "admin", JSON.stringify(admin) );
var current_user;
var current_user_data = localStorage.getItem(Object.keys(localStorage)[0]);

if ( (Object.keys(localStorage).length) < 4 ){
    current_user = (Object.keys(localStorage)[ Object.keys(localStorage).length - 1 ]);
}
if ( (Object.keys(localStorage).length) >= 4 ) {
    current_user = ( Object.keys(localStorage)[0]);
}
 
var admin_data = JSON.parse(localStorage.getItem('admin'));
var admin_name = admin_data.name;
var admin_password = admin_data.password;
var login_name, login_email, login_password;
var last_login_name, last_login_password;
var game_over, chance = 0, start_q, change_over, step = 0;
var r_n, confirming, user_score = 0, bot_score = 0;
var email_v = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
/////////////////////////////////////////////////////////////////////////////////////////////////
function forms(){
    document.write( "<div id=\"diva\">" );
    document.write( "<form name=\"myForm\" class=\"form\" method=\"post\">" );
    document.write( "<div class=\"form__text\">Login</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your login\" type=\"text\" id=\"login_name\"></input>" );
    document.write( "<div class=\"form__text\">Email</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your email\" type=\"text\" id=\"login_email\"></input>" );
    document.write( "<div class=\"form__text\">Password</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your password\" type=\"password\" id=\"login_password\"></input>" );
    document.write( "<br><button type=\"button\" id=\"signup\" class=\"form__btn\">Sign Up</button>" );
    document.write( "</div>" );
    var form = document.querySelector("form");
    form.addEventListener("button", event => {
        console.log("Saving value", form.elements.value.value);
        event.preventDefault();
    });
    var btn = document.getElementById( 'signup' );
    btn.addEventListener( 'click', e => {console.log("process run", e);sign_up();});
}
function forms_in(){
    document.write( "<div id=\"diva\">" );
    document.write( "<form name=\"myForm\" class=\"form\" method=\"post\">" );
    document.write( "<div class=\"form__text\">Login</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your login\" type=\"text\" id=\"login_name\"></input>" );
    document.write( "<div class=\"form__text\">Password</div>" );
    document.write( "<input name=\"value\" class=\"form__input\" placeholder=\"Enter your password\" type=\"password\" id=\"login_password\"></input>" );
    document.write( "<br><button type=\"button\" id=\"signin\" class=\"form__btn\">Sign In</button>" );
    document.write( "</div>" );
    var form = document.querySelector("form");
    form.addEventListener("button", event => {
        console.log("Saving value", form.elements.value.value);
        event.preventDefault();
    });
    var btn = document.getElementById( 'signin' );
    btn.addEventListener( 'click', e => { console.log("process run", e); sign_in(); } );
}

function nav(){
    document.write("<nav id=\"nava\" class=\"menu\"><ul class=\"menu__list\">");
    document.write("<li class=\"menu\"><a id=\"menu__link\" class=\"menu__link\">");
    if ( !last_login_name  ) { document.getElementById( 'menu__link' ).innerHTML = login_name; }
    if ( !login_name ) { document.getElementById( 'menu__link' ).innerHTML = last_login_name; }
    document.write( "<ul class=\"sub-menu-list\">" );
    document.write( "<li class=\"menu\"><a href='#' class=\"menu__link\"  id=\"logout\">logout</a></li>" );
    document.write( "<li class=\"menu\"><a href='#' class=\"menu__link\"  id=\"start_game\">start game</a></li>" );
    document.write( "<li class=\"menu\"><a href='#' id=\"score\" class=\"menu__link\">my score</a></li>" );
    if ( login_name === admin_name || last_login_name === admin_name ) {
        document.write( "<li class=\"menu\"><a href='#' id=\"admin_p\" class=\"menu__link\">admin panel</a></li>" );
    }
    document.write( "</ul></a></li>" );
    document.write( "</ul></nav>" );

    document.addEventListener('click',function(e) {
        if ( e.target.id == 'admin_p' ){
            admin_panel();
            console.log( 'activation of admin panel' );
        } 
        if ( e.target.id == 'logout'){
            log_out();start_page();
        } 
        if ( e.target.id == 'start_game'){
            start_game();
        } 
        if ( e.target.id == 'score'){
            score();
        }
    });
}

function score(){
    clearPage();
    if ( step != 0 ) { nav(); }
    document.write( "<div id=\"diva\">" );
    document.write( "<div class='score'>" );
    document.write( "<h1 class=\"score__text\">" + `${user_score}:${bot_score}` + "</h1>" );
    document.write( "<button class=\"score__btn\" onclick=\"resetGame();\">Play Again</button>" );
    document.write( "</div>" );
    document.write( "</div>" );
    
}

function start_page() {
    document.write( "<div id=\"diva\">" );
    document.write( "<button id=\"start_signup\" class=\"start__signUp\">Sign Up</button>" );
    document.write( "<button id=\"start_signin\" class=\"start__signIn\">Sign In</button>" );
    document.write( "</div>" );

    document.addEventListener('click',function(e) {
        if ( e.target.id == 'start_signup'){
            clearPage();    forms();
        }
        if ( e.target.id == 'start_signin'){
            clearPage();    forms_in();
        }
    });
}

function admin_panel() {
    style();
    var users = Object.keys( localStorage );
    document.write( "<div id=\"diva\">" );
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
    document.write( "</div>" );
    
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
    if ( login_name == '' ) { 
        alert( 'You should fill it out login name!' );
        return false;
    }
    if ( login_email == '' ) {
        alert( 'You should fill it out email!' );
    }
    // Password field is required
    if ( login_password == '' ) {
        alert( 'Password field is required' );
        return false;
    }
    if ( login_password.length < 6  ) {
        alert( "weak password" );
        return false;
    }
    if ( storage.getItem( login_name ) !== null ) {
        alert( 'Login name not unique!' );
        return false;
    }
    if ( !email_v.test( login_email ) ) {
        alert( "Email is not valid!" );
        return false;
    }
    
    else if ( storage.getItem( login_name ) === null){
        var new_user = new Object;
        new_user['name']       = login_name;
        new_user['email']      = login_email;
        new_user['password']   = login_password;
        new_user['date']       = current_date;
        new_user['loggined']   = true;
        // ! u can set objects only json format to localStorage.
        storage.setItem( login_name, JSON.stringify( new_user ) );
        console.log( 'new user added!' );
        nav();
        start_game();
    }
}

function nav_remove() {
    document.getElementById('nava').remove();
}

function log_out() {
    // remove logged in user from storage
    var change_status = JSON.parse(localStorage.getItem( current_user ));
    change_status.loggined = false;
    localStorage.setItem( current_user, JSON.stringify(change_status) );
    nav_remove();clearPage();
}

function sign_in(){
    last_login_name     = String(document.getElementById('login_name').value);
    last_login_password = String(document.getElementById('login_password').value);
    var storage         = localStorage;
    // Password field is required
    if ( last_login_password == '' ) {
        alert( 'Password field is required' );
        return false;
    }
    // Password is incorrect
    if ( last_login_password != JSON.parse( storage.getItem( last_login_name ) ).password ) {
        alert( 'Password is incorrect' );
        return false;
    }
    // cheking admin
    if ( last_login_name == admin_name ){ clearPage();nav();admin_panel(); }
    // checking login name is exist

    else if ( storage.getItem( last_login_name ) !== null ) {
        nav();
        console.log( 'OK!' );
        // username storage loged_user: aaaa
        var change_status = JSON.parse(localStorage.getItem( last_login_name ));
        change_status.loggined = true;
        localStorage.setItem( last_login_name, JSON.stringify(change_status) );
        start_game();
    } else { alert( "User not found!" ); }
}


function remove_all(){ 
    localStorage.clear(); 
}

///////////////////////////////////////////////////////////
function reset_score() { user_score = 0, bot_score = 0; }

function congratulations(){
    clearPage();  
    user_score++;
    document.write( "<div id=\"diva\">" );
    document.write( "<h1 class=\"animation-text\">" + `${r_n}` + "</h1>" );
    document.write( "<p class=\"text\">Congratulations! You have find out the guessed number.</p>" );
    document.write( "<button onclick=\"start_game();\" class=\"btn\">Play Again</button>" );
    document.write( "<p class=\"score\">" + `${user_score}:${bot_score}` + "</p>" );
    document.write( "</div>" );
}

function fail(){
    clearPage();
    if ( step != 0 ) { nav(); }
    bot_score++;
    document.write( "<div id=\"diva\">" );
    document.write( "<h1 class=\"animation-text\">" + `${r_n}` + "</h1>" );
    document.write( "<p class=\"text\" style=\"color: red;\">Fail! You not found the guessed number.</p>" );
    document.write( "<button onclick=\"resetGame();\" class=\"btn\">Play Again</button>" );
    document.write( "<p class=\"score\">" + `${user_score}:${bot_score}` + "</p>" );
    document.write( "</div>" );
}
function style(){
    document.write( "<link rel=\"stylesheet\" href=\"css/style.css\">" );
}

function clearPage() { 
    document.getElementById('diva').remove();
}

function start_game() {
    r_n         = Math.floor(Math.random()*100) + 1;
    game_over   = false;
    console.log( r_n );
    while ( !game_over ) {
        start_q     = Number( prompt( "Hello, I guessed one number you should find it out!" ) );
        change_over = chance++;
        if ( start_q == r_n ) { congratulations(); game_over = true; }
        if ( !start_q ) { 
            confirming = confirm( "You want to lose it!" );
            if ( confirming ){ fail(); break; }
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
    setTimeout(function() {
        start_game();
    }, 10);
}

//////////////////////////////////////////////////////////////

// *for get keys from localStorage
var keys_of_storage = Object.keys( localStorage );
console.log( keys_of_storage );

function empty(){
    document.write( "<div id=\"diva\">" );
    document.write( "<div>       </div>" );
    document.write( "</div>" );
}

if ( JSON.parse(localStorage.getItem(current_user)).loggined ) {
    login_name = current_user;
    if ( step == 0 ) { nav();empty(); }
    step ++;
}
else { start_page(); }