/* eslint-disable @typescript-eslint/no-require-imports -- This release utility runs directly in Node as CommonJS. */
const fs=require('node:fs');
const path=require('node:path');
const config=JSON.parse(fs.readFileSync(path.join(process.env.APPDATA,'netlify/Config/config.json'),'utf8'));
const user=config.users?.[config.userId] || Object.values(config.users||{})[0];
const token=process.env.NETLIFY_AUTH_TOKEN || user?.auth?.token || user?.token || config.access_token;
async function api(endpoint,method='GET',body){const res=await fetch('https://api.netlify.com/api/v1'+endpoint,{method,headers:{Authorization:`Bearer ${token}`,...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});if(!res.ok)throw new Error('Netlify '+method+' '+endpoint+' status '+res.status+' '+(await res.text()).slice(0,300));return res.status===204?null:res.json();}
async function main(){
if(!token)throw new Error('Netlify sign-in required. Config keys: '+Object.keys(config).join(','));
const action=process.argv[2];
const state=fs.existsSync('release-state.json')?JSON.parse(fs.readFileSync('release-state.json','utf8')):{};
if(action==='create'){
const sites=await api('/sites?per_page=100');let site=sites.find(s=>s.build_settings?.repo_url==='https://github.com/smartbyteit786/ODBiryani'||s.name==='odbiryani');
if(!site)site=await api('/sites','POST',{name:'odbiryani',build_settings:{cmd:'npm run build',dir:'out',skip:false},processing_settings:{skip:false}});
Object.assign(state,{siteId:site.id,url:site.ssl_url||site.url});fs.writeFileSync('release-state.json',JSON.stringify(state));
await api('/sites/'+site.id,'PATCH',{processing_settings:{...site.processing_settings,ignore_html_forms:false}});console.log(JSON.stringify(state));return;
}
if(action==='deploy'){
require('node:child_process').execFileSync(process.execPath,['scripts/check-reviews.mjs'],{stdio:'pipe'});
require('node:child_process').execFileSync(process.execPath,['scripts/check-private-order-export.cjs'],{stdio:'pipe'});
const release=JSON.parse(fs.readFileSync('out/release.json','utf8'));
if(release.orderHandling==='Text'&&!/href="sms:\+?\d{7,15}/.test(fs.readFileSync('out/index.html','utf8')))throw new Error('An approved public text order number is required before this text-only release can deploy.');
const res=await fetch('https://api.netlify.com/api/v1/sites/'+state.siteId+'/deploys',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/zip'},body:fs.readFileSync('release.zip'),signal:AbortSignal.timeout(120000)});if(!res.ok)throw new Error('Deploy status '+res.status+' '+(await res.text()).slice(0,300));const d=await res.json();state.deployId=d.id;fs.writeFileSync('release-state.json',JSON.stringify(state));console.log(JSON.stringify({deployId:d.id,state:d.state,url:d.ssl_url||d.url}));return;
}
if(action==='status'){const d=await api('/deploys/'+state.deployId);console.log(JSON.stringify({id:d.id,state:d.state,url:d.ssl_url||d.url,preview:d.deploy_ssl_url,error:d.error_message,publishedAt:d.published_at,required:d.required,summary:d.summary}));return;}
if(action==='forms'){const forms=await api('/sites/'+state.siteId+'/forms');console.log(JSON.stringify(forms.map(f=>({id:f.id,name:f.name,count:f.submission_count,fieldNames:f.fields?.map(field=>field.name)})),null,2));return;}
if(action==='notifications'){const hooks=await api('/hooks?site_id='+encodeURIComponent(state.siteId));console.log(JSON.stringify(hooks.filter(h=>h.event==='submission_created').map(h=>({id:h.id,type:h.type,event:h.event,formId:h.form_id,enabled:h.disabled!==true})),null,2));return;}
if(action==='inspect'){const site=await api('/sites/'+state.siteId);console.log(JSON.stringify(Object.fromEntries(Object.entries(site).filter(([k])=>/form|process|capab|account_id/.test(k))),null,2));return;}
const res=await fetch('https://api.netlify.com/api/v1/sites?per_page=100',{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(20000)});
if(!res.ok)throw new Error('Netlify API status '+res.status);
const sites=await res.json();console.log(JSON.stringify(sites.map(s=>({id:s.id,name:s.name,url:s.ssl_url||s.url,repo:s.build_settings?.repo_url})),null,2));
}
main().catch(e=>{console.error(e.message);process.exitCode=1});
