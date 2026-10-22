/* eslint-disable @typescript-eslint/no-require-imports -- Node release verification utility. */
const fs=require('node:fs');
const state=JSON.parse(fs.readFileSync('release-state.json','utf8'));
async function main(){
  const results=[];
  for(const [route,expected] of [['/',['Text my order','sms:+17702947145','+1 (770) 294-7145','Zelle','Apple Cash','Cash App','50% booking deposit','type="date"','type="time"']],['/release.json',['odbiryani-2026-10-22-customer-reviews']],['/images/pot-fresh.jpg',null]]){
    const r=await fetch(state.url+route,{signal:AbortSignal.timeout(20000)});
    const body=expected ? await r.text() : '';
    const ok=r.ok && (!expected || expected.every(value => body.includes(value))) && r.headers.get('x-content-type-options')==='nosniff';
    results.push({route,status:r.status,passed:ok});
  }
  console.log(JSON.stringify(results,null,2));
  if(results.some(r=>!r.passed))process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
