import { chromium } from 'playwright';
const OUT='/home/user/Shikma/.preview';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--no-sandbox']});
const errs=[];
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
p.on('pageerror',e=>errs.push('PAGEERROR: '+e.message));
p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
async function shot(u,n,{scroll=0,wait=1400}={}){
  await p.goto('http://localhost:3100'+u,{waitUntil:'networkidle'});
  await p.waitForTimeout(u==='/'?4200:wait);
  if(scroll){await p.evaluate(y=>window.scrollTo(0,y),scroll);await p.waitForTimeout(1200);}
  await p.screenshot({path:`${OUT}/${n}.png`}); console.log('✓',n);
}
await shot('/','b1-הירו');
await shot('/','b2-מסלולים',{scroll:1900});
await shot('/store','b3-חנות',{scroll:520});
await shot('/club','b4-מועדון',{scroll:1500});
console.log('canvas:',await p.locator('canvas').count());
console.log('ERRORS:',errs.length?errs.slice(0,6).join('\n'):'none');
await b.close();
