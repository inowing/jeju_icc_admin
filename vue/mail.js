function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const re = /[^\W]+[\w|\d]*(@){1}[\w]+\.{1}[\w]*/;
    return re.test(String(email).toLowerCase());
}

let mails = [
    "abc123@Gmail.co.kr",
    "123a;oe@gmail.com",
    "ze$$@gmail.com",
    "paeo@@gmail.com",
    "as2sofwe.com",
    "wpdoe@odlfesecom",
    "xzooed@.com",
    "oxkfwo@zplsoelsdoe.sar",
]

for (let mail of mails) {
    console.log(mail, ' : ', validateEmail(mail));
}
// abc123@Gmail.co.kr  :  true
// 123aoe@gmail.com  :  true      
// ze$$@gmail.com  :  true        
// paeo@@gmail.com  :  false      
// as2sofwe.com  :  false
// wpdoe@odlfesecom  :  false     
// xzooed@.com  :  false
// oxkfwo@zplsoelsdoe.sar  :  true