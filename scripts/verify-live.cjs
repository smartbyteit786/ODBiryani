/* eslint-disable @typescript-eslint/no-require-imports -- Node release verification utility. */
const fs=require('node:fs');
const state=JSON.parse(fs.readFileSync('release-state.json','utf8'));
async function main(){
  const results=[];
  for(const [route,expected] of [['/','Call to order'],['/release.json','odbiryani-2026-10-20-phone-pickup-payments'],['/images/pot-fresh.jpg',null]]){
    const r=await fetch(state.url+route,{signal:AbortSignal.timeout(20000)});
    const ok=r.ok && (!expected || (await r.text()).includes(expected)) && r.headers.get('x-content-type-options')==='nosniff';
    results.push({route,status:r.status,passed:ok});
  }
  console.log(JSON.stringify(results,null,2));
  if(results.some(r=>!r.passed))process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
