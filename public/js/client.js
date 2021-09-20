function getCookie(){
  let cookies = document.cookie.split(';'); 
  let ret = ' ';
  for(let i=1; i<= cookies.length; i++){
    ret += cookies[i - 1] + ',';
  }
  return ret;
}

let flag = getCookie();
let check_for = (flag.indexOf('flag=admin') > -1);

    
  if(check_for){
    $('.hidden').removeClass('hidden');
    $('.hide').addClass('hide');
  }else{
    $('.hidden').addClass('hidden');
    $('.hide').removeClass('hide');
  }

  setTimeout(()=>{location.reload()},360000);