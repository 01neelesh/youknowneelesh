'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => new Intl.NumberFormat('en-IN', {style:'currency', currency:'INR', maximumFractionDigits:2}).format(value);
const formatQty = value => new Intl.NumberFormat('en-IN', {maximumFractionDigits:2}).format(value);
const products = {
  powder: {
    name:'Neem leaf powder', number:'01 / POWDER', image:'assets/powder.webp', alt:'Actual pilot neem leaf powder sample on a plate',
    description:'Dried neem leaves, pulverized and passed through a selected screen. Start with sample texture and your written acceptance limits.',
    status:'Pilot produced · current stock to confirm',
    specs:[['Botanical material','Azadirachta indica leaf'],['Preparation','Shade drying, pulverizing and sieving'],['Screen options','35 mesh / 70 mesh, subject to sample agreement'],['Catalogue quantities','5 / 10 / 25 / 100 kg; custom requests'],['Packaging','Bulk / approved custom quantities; pack to agree'],['Shelf life','Not validated in available records']],
    quality:['Agree the intended application and written acceptance limits.','Review a sample for texture, colour and visible foreign matter.','Agree screen selection; screen size does not establish a tested particle-size distribution.','Agree any moisture, microbiological, heavy-metal, ash or active-compound tests before submission.','Batch testing and release approval need completion before commercial supply.'],
    availability:'The pilot recorded 6 kg of powder produced in the final reporting month. This is production history, not live stock. No current quantity, test report, dispatch commitment or accepted commercial grade is confirmed.',
    priceRows:[['5 kg','₹249/kg'],['10 kg','₹229/kg'],['25 kg','₹209/kg'],['100 kg','₹189/kg'],['Negotiated custom bulk','From ₹169/kg, conditional']],
    priceNote:'The ₹169 starting point applies only to negotiated, cost-approved bulk contracts with confirmed capacity. Custom quantities require a quotation; no automatic interpolation or bulk-tier discount is applied here.'
  },
  leaves: {
    name:'Shade-dried neem leaves', number:'02 / LEAVES', image:'assets/leaves.webp', alt:'Leaf material spread on breathable netting in the drying hall',
    description:'Selected, cleaned and shade-dried leaf material, sorted to reduce visible dust, stems and unsuitable leaves. Whole or loose material for buyer evaluation.',
    status:'Pilot produced · lot approval required',
    specs:[['Botanical material','Azadirachta indica leaf'],['Preparation','Selection, cleaning, shade drying and sorting'],['Form','Whole / loose leaf material; tolerance to agree'],['Catalogue volume','100 kg+; smaller or graded lots on request'],['Packaging','Pack size and moisture protection to agree'],['Shelf life','Not validated in available records']],
    quality:['Agree leaf condition, colour and stem/foreign-material tolerances.','Confirm a moisture endpoint instead of relying on a fixed drying duration.','Request the relevant batch identity, dates and weights.','Confirm any laboratory scope and acceptance limits before testing.','Do not infer microbial safety or chemical composition from visual sorting.'],
    availability:'Later pilot batches recorded 7.120 kg and 6.870 kg of dried leaves. Those records are not an inventory count or a guarantee of 100 kg supply. Current lot size and readiness must be checked.',
    priceRows:[['100 kg+ bulk enquiry','₹35/kg indicative'],['Smaller or graded lots','Price on request']],
    priceNote:'The final report flags that the ₹35/kg leaf indication needs internal cost approval. Do not treat it as an automatically acceptable order price; harvest, recovery and labour costs must support the quotation.'
  },
  seeds: {
    name:'De-pulped neem seeds', number:'03 / SEEDS', image:'assets/seeds.svg', alt:'Botanical illustration of neem seeds, not a current-stock photograph',
    description:'A seasonal de-pulped, sun-dried seed specification from the catalogue. Discuss the season, required quantity and acceptance criteria ahead of procurement.',
    status:'Seasonal supply enquiry · no stock confirmed',
    specs:[['Botanical material','Azadirachta indica seed'],['Catalogue preparation','De-pulped, sun-dried'],['Catalogue MOQ','100 kg'],['Season & collection','To confirm for the proposed supply cycle'],['Packaging','Pack size and handling conditions to agree'],['Stock photograph','Pending; botanical illustration shown']],
    quality:['Agree the collection season and expected supply window.','Define de-pulping, dryness, purity and foreign-material limits.','Agree whether any active-compound or other tests are required.','Confirm harvestable quantity, batch records and storage conditions.','Do not infer germination, oil yield or active-compound content without evidence.'],
    availability:'Seed outreach established buyer interest, but the final report records that the seed requirement was not delivered during the pilot year. This site makes no current-stock or secured-supply claim.',
    priceRows:[['100 kg catalogue MOQ','₹45/kg indicative'],['Smaller enquiry','Below catalogue MOQ; discuss feasibility']],
    priceNote:'Final rate depends on season, quality and yield. Supply feasibility, sample approval and a supplier-confirmed quotation are required.'
  },
  saplings: {
    name:'Neem saplings', number:'04 / SAPLINGS', image:'assets/sapling.svg', alt:'Botanical illustration of a neem sapling, not a nursery stock photograph',
    description:'A custom nursery enquiry, subject to stock and seasonal readiness. Share quantity, destination and your intended planting window.',
    status:'Custom enquiry · nursery stock to confirm',
    specs:[['Botanical material','Azadirachta indica sapling'],['Quantity unit','Number of saplings'],['Nursery stock','Not confirmed in available records'],['Plant age / size','To agree with the supplier'],['Packaging / transport','To agree for living plants'],['Price and MOQ','On request; not provided']],
    quality:['Agree age, height, root condition and nursery specifications.','Confirm nursery stock and seasonal readiness before scheduling.','Agree destination, plant transport and handling arrangements.','Do not infer certified organic status, guaranteed survival or air-quality benefits from the illustration.'],
    availability:'The catalogue lists neem saplings for custom enquiry, subject to nursery stock and seasonal readiness. No live plant inventory, price or delivery capacity is confirmed.',
    priceRows:[['Custom quantity','Price and MOQ on request']],
    priceNote:'Supplier confirmation is needed for plant size, nursery stock, transport, final price and lead time.'
  },
  manure: {
    name:'Neem manure / cake', number:'05 / FUTURE RANGE', image:'assets/manure.svg', alt:'Concept illustration for a future neem manure or cake range, not a stocked product',
    description:'A development enquiry for future neem by-products. The catalogue proposes compost from suitable plant trimmings; cake production and a commercial formulation are not established.',
    status:'In development · no tested formulation or confirmed stock',
    specs:[['Current catalogue status','Neem-based compost is proposed'],['Neem cake route','Not established in project records'],['Composition / NPK','Not tested or specified'],['Intended application','To define and validate'],['Stock / pack / MOQ','Not available or confirmed'],['Price','Not provided']],
    quality:['First establish the material, formulation and production route.','Agree an appropriate testing and acceptance plan for the intended use.','Do not infer nutrient values, controlled release or pest-control performance without evidence.','A future enquiry does not reserve stock or establish commercial availability.'],
    availability:'This is a future-range discussion only. The project records do not establish a tested, available manure or neem-cake product.',
    priceRows:[['Development enquiry','No commercial price available']],
    priceNote:'No order or price can be confirmed until the product, process, tests and supply readiness are established.'
  }
};

// Navigation and comparison.
const menuButton = $('.menu-toggle');
const nav = $('#nav');
function closeMenu(){ nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); }
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
$$('a',nav).forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuButton.focus();}});
window.addEventListener('resize',()=>{if(window.innerWidth>780)closeMenu();});
$('#compare-toggle').addEventListener('click',event=>{const button=event.currentTarget;const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));$('#comparison').hidden=!open;button.innerHTML=(open?'Hide comparison':'Compare specifications')+' <span aria-hidden="true">↗</span>';});

// Product details. All HTML here comes from the fixed, reviewed catalogue data.
const dialog = $('#product-dialog');
function openProduct(key){
  const p=products[key]; if(!p)return;
  $('#dialog-content').innerHTML=`<div class="dialog-top"><img src="${p.image}" alt="${p.alt}"><div><p class="eyebrow">${p.number}</p><h2 id="dialog-title">${p.name}</h2><p class="dialog-description">${p.description}</p><span class="dialog-status">${p.status}</span></div></div><div class="dialog-body"><div class="dialog-tabs" role="tablist" aria-label="Product information"><button id="tab-specs" role="tab" aria-selected="true" aria-controls="panel-specs" tabindex="0">Specifications</button><button id="tab-prices" role="tab" aria-selected="false" aria-controls="panel-prices" tabindex="-1">Price & availability</button><button id="tab-quality" role="tab" aria-selected="false" aria-controls="panel-quality" tabindex="-1">Quality checklist</button></div><div id="panel-specs" role="tabpanel" aria-labelledby="tab-specs" tabindex="0"><dl class="dialog-specs">${p.specs.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>${key==='powder'?'<div class="dialog-screen-options"><div><strong>35 mesh</strong><p>Catalogue screen option. Agree sample texture and accepted output.</p></div><div><strong>70 mesh</strong><p>Catalogue screen option. Agree sample texture and accepted output.</p></div></div>':''}<p class="source-note">Photographs document project material and process. They do not establish a tested grade, a future lot specification or current stock.</p></div><div id="panel-prices" role="tabpanel" aria-labelledby="tab-prices" tabindex="0" hidden><table class="dialog-price-table"><caption>October 2026 catalogue indications</caption><thead><tr><th scope="col">Quantity / route</th><th scope="col">Material price</th></tr></thead><tbody>${p.priceRows.map(([a,b])=>`<tr><th scope="row">${a}</th><td>${b}</td></tr>`).join('')}</tbody></table><div class="dialog-callout"><p>${p.priceNote}</p></div><h3>Supply status</h3><p>${p.availability}</p><p class="source-note">All rates depend on accepted sample, grade, stock, capacity and cost approval. Freight, requested testing and applicable taxes are separate.</p></div><div id="panel-quality" role="tabpanel" aria-labelledby="tab-quality" tabindex="0" hidden><h3>Agree before supply</h3><ul>${p.quality.map(item=>`<li>${item}</li>`).join('')}</ul><div class="dialog-callout"><p>No completed batch laboratory report, organic certification, validated shelf life or regulated-grade approval is provided. Buyer-specific testing can be discussed before the order is confirmed.</p></div></div><button class="button" data-enquire="${key}">Prepare an enquiry for this product <span aria-hidden="true">↗</span></button><p class="source-note">Source: final project report (22 October 2026) and updated 2026 trade catalogue.</p></div>`;
  const tabs=$$('[role="tab"]',dialog);
  function activate(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;$('#'+t.getAttribute('aria-controls')).hidden=!selected;});}
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activate(tab));
    tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();activate(tabs[next]);tabs[next].focus();}});
  });
  dialog.showModal();dialog.scrollTop=0;$('#close-dialog').focus();
}
$('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.addEventListener('click',event=>{const details=event.target.closest('[data-product]');if(details)openProduct(details.dataset.product);const enquiry=event.target.closest('[data-enquire]');if(enquiry){const key=enquiry.dataset.enquire;if(!products[key])return;if(dialog.open)dialog.close();$('#product').value=key;$('#quantity').value=key==='powder'?'5':key==='saplings'?'10':'100';render();saveDraft();$('#requirements').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});$('#product').focus({preventScroll:true});}});

// Explore the documented leaf process.
const processImages=[
 ['assets/grove.webp','Campus neem trees and pruning activity','01 / PLAN & HARVEST'],
 ['assets/separating.webp','Deepa separating neem leaves from stems in the processing hall','02 / SEPARATE THE LEAVES'],
 ['assets/leaf-handling.webp','Deepa handling and sorting leaves on the drying nets','03 / CLEAN & SORT'],
 ['assets/leaves.webp','Leaves spread thinly on breathable nets in the shade-drying hall','04 / SHADE DRY'],
 ['assets/deepa-pulverizer.webp','Deepa using the unit’s pulverizer to process dried leaves','05 / PULVERIZE'],
 ['assets/sieve.webp','The completed workshop-built DIY sieve documented on 22 October 2026','06 / SIEVE'],
 ['assets/sample-packs.webp','Actual Neemari dried-leaf sample pouches prepared during the project','07 / WEIGH, PACK & REVIEW']
];
$$('.process-step').forEach(button=>button.addEventListener('click',()=>{
 $$('.process-step').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 const [src,alt,label]=processImages[Number(button.dataset.step)];const img=$('#process-photo');img.src=src;img.alt=alt;$('#process-image-label').textContent=label;
}));
$('#process-photo-open').addEventListener('click',()=>{const source=$('#process-photo');$('#photo-dialog-image').src=source.getAttribute('src');$('#photo-dialog-image').alt=source.alt;$('#photo-dialog-caption').textContent=source.alt;$('#photo-dialog').showModal();$('#close-photo').focus();});
$('#close-photo').addEventListener('click',()=>$('#photo-dialog').close());
$('#photo-dialog').addEventListener('click',event=>{if(event.target===$('#photo-dialog'))$('#photo-dialog').close();});

// Browser-local buyer requirements. No network or messaging integrations.
const storageKey='neem-nari-requirement-v1';
const form=$('#enquiry-form');
let prepared=false;
const fields=['product','quantity','mesh','application','destination','packaging','target-date','notes'];
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
$('#target-date').min=today;
function getData(){const result={};fields.forEach(id=>result[id]=$( '#'+id).value);result.sample=$('#sample').checked;result.tests=$$('input[name="test"]:checked').map(x=>x.value);return result;}
function saveDraft(){try{localStorage.setItem(storageKey,JSON.stringify(getData()));}catch{ $('.form-privacy').textContent='Your draft is kept on this page only; browser storage is unavailable. No enquiry is sent and no order is placed.'; }}
function loadDraft(){try{const data=JSON.parse(localStorage.getItem(storageKey)||'null');if(!data||typeof data!=='object')return;fields.forEach(id=>{if(typeof data[id]==='string')$('#'+id).value=data[id];});if(!products[$('#product').value])$('#product').value='powder';if(typeof data.sample==='boolean')$('#sample').checked=data.sample;if(Array.isArray(data.tests))$$('input[name="test"]').forEach(x=>{x.checked=data.tests.includes(x.value);});}catch{/* A missing or invalid saved draft uses form defaults. */}}
function quantityUnit(key){return key==='saplings'?'saplings':'kg';}
function validQuantity(){const input=$('#quantity');return input.value.trim()!==''&&input.checkValidity()&&Number(input.value)>0;}
function getPrice(key,qty){
  if(key==='powder'){const tiers={5:249,10:229,25:209,100:189};if(Object.hasOwn(tiers,String(qty)))return{rate:tiers[qty],note:'Exact catalogue quantity; material only.'};return null;}
  if(key==='leaves'&&qty>=100)return{rate:35,note:'100 kg+ catalogue indication. Internal cost approval required.'};
  if(key==='seeds'&&qty>=100)return{rate:45,note:'Seasonal indication. Quality, yield and supply to confirm.'};
  return null;
}
function validate(showErrors=false){let message='',invalid=null;
  if(!validQuantity()){message=$('#product').value==='saplings'?'Enter a whole number of saplings from 1 to 100,000.':'Enter a quantity from 0.25 to 100,000 kg, in steps of 0.25 kg.';invalid=$('#quantity');}
  else if($('#target-date').value&&!$('#target-date').checkValidity()){message='Choose today or a future date for the requested delivery, or leave it blank.';invalid=$('#target-date');}
  if(showErrors){$('#form-error').hidden=!message;$('#form-error').textContent=message;$$('[aria-invalid]',form).forEach(x=>x.removeAttribute('aria-invalid'));if(invalid){invalid.setAttribute('aria-invalid','true');invalid.focus();}}
  return !message;
}
function buildBrief(){
  const data=getData(),key=data.product,qty=Number(data.quantity),price=getPrice(key,qty);
  const lines=['NEEMARI — BUYER REQUIREMENTS BRIEF','Prepared from the private interactive catalogue','', 'INGREDIENT: '+products[key].name,'QUANTITY: '+formatQty(qty)+' '+quantityUnit(key)];
  if(key==='powder')lines.push('SCREEN PREFERENCE: '+data.mesh);
  lines.push('INTENDED APPLICATION: '+(data.application||'To be specified'),'DELIVERY CITY / POSTCODE: '+(data.destination.trim()||'To be confirmed'),'PACKAGING: '+data.packaging,'REQUESTED DELIVERY DATE: '+(data['target-date']||'To be agreed')+' (not a supplier commitment)','SAMPLE FIRST: '+(data.sample?'Yes — quantity, cost and shipping to agree':'Not requested in this draft'),'TESTS / DOCUMENTATION TO DISCUSS: '+(data.tests.join('; ')||'Scope to be agreed'),'OTHER REQUIREMENTS: '+(data.notes.trim()||'None specified'),'','CATALOGUE INDICATION — NOT A QUOTATION');
  if(price)lines.push(formatQty(qty)+' kg × '+money(price.rate)+'/kg = '+money(qty*price.rate),'Basis: '+price.note);
  else lines.push(key==='manure'?'Development enquiry only. No commercial product or price is available.':'Custom quotation needed; no price calculated for this quantity.');
  lines.push('PRODUCT STATUS: '+products[key].status);
  if(key==='seeds'&&qty<100)lines.push('Below catalogue MOQ of 100 kg; feasibility requires confirmation.');
  lines.push('Freight, buyer-requested laboratory testing and applicable taxes are separate.','Final sample, grade, stock, capacity, pack and cost approval are required.','','OPEN ITEMS BEFORE ANY ORDER','• Confirm current stock, sample availability and acceptance.','• Agree intended-use specification, test scope, methods, charges and release.','• Confirm price, packaging, invoicing, payment terms, freight and dispatch.','• Confirm the authorized sales contact.','','STATUS: This is a draft requirement, not an order. It has not been sent.','No completed batch test report, certified grade or validated shelf life is provided.','Source: final report updated 22 Oct 2026 and updated 2026 trade catalogue.');
  return lines.join('\n');
}
function render(){
 const data=getData(),key=products[data.product]?data.product:'powder',qty=Number(data.quantity),isPlant=key==='saplings';
 $('#quantity').min=isPlant?'1':'0.25';$('#quantity').step=isPlant?'1':'0.25';$('#quantity-label').textContent=isPlant?'Required quantity (saplings)':'Required quantity (kg)';
 const valid=validQuantity(),price=valid?getPrice(key,qty):null;$('#price-value').classList.toggle('is-text',!price);
 $('#mesh-field').hidden=key!=='powder';$('#summary-mesh-row').hidden=key!=='powder';$('#summary-product').textContent=products[key].name;$('#summary-quantity').textContent=valid?formatQty(qty)+' '+quantityUnit(key):'Enter a valid quantity';$('#summary-mesh').textContent=data.mesh;$('#summary-tests').textContent=data.tests.length?data.tests.join(' · '):'Scope to be agreed';$('#product-availability').textContent=products[key].status;
 $('#quantity-help').textContent=key==='seeds'?'Catalogue MOQ: 100 kg. Smaller requests are feasibility enquiries only.':key==='leaves'?'Catalogue bulk indication begins at 100 kg. Smaller or graded lots need a quotation.':key==='saplings'?'Enter the number of saplings. Nursery stock, plant size, price and MOQ are to confirm.':key==='manure'?'Development discussion only. No product formulation, stock, price or MOQ is established.':'Exact catalogue tiers: 5, 10, 25 and 100 kg. Other quantities need a custom quotation.';
 $$('#quantity-presets button').forEach(b=>{b.hidden=!['powder','saplings'].includes(key)&&Number(b.dataset.qty)!==100;b.textContent=b.dataset.qty+(isPlant?' plants':' kg');b.setAttribute('aria-pressed',String(valid&&Number(b.dataset.qty)===qty));});
 if(!valid){$('#price-label').textContent='QUANTITY REQUIRED';$('#price-value').textContent='Add quantity';$('#price-detail').textContent='Enter a valid amount to continue.';$('#price-qualification').textContent='No material indication calculated.';}
 else if(price){$('#price-label').textContent='CATALOGUE INDICATION';$('#price-value').textContent=money(qty*price.rate);$('#price-detail').textContent=formatQty(qty)+' kg × '+money(price.rate)+'/kg';$('#price-qualification').textContent=price.note+' Not a confirmed quotation.';}
 else{$('#price-label').textContent=key==='manure'?'DEVELOPMENT ENQUIRY':'CUSTOM REQUIREMENT';$('#price-value').textContent=key==='manure'?'In development':'Quote to agree';$('#price-detail').textContent=key==='seeds'&&qty<100?'Below catalogue MOQ — discuss feasibility.':key==='manure'?'No tested formulation or commercial stock established.':'No catalogue price calculated for this quantity.';$('#price-qualification').textContent='Supplier confirmation required; no estimated rate is invented.';}
 if(prepared&&validate()){$('#generated-brief').hidden=false;$('#brief-text').value=buildBrief();}else $('#generated-brief').hidden=true;
}
form.addEventListener('input',()=>{render();saveDraft();if(!$('#form-error').hidden)validate(true);$('#brief-feedback').textContent='';});
form.addEventListener('change',()=>{render();saveDraft();});
$$('[data-qty]').forEach(button=>button.addEventListener('click',()=>{$('#quantity').value=button.dataset.qty;render();saveDraft();if(!$('#form-error').hidden)validate(true);}));
form.addEventListener('submit',event=>{event.preventDefault();if(!validate(true))return;prepared=true;render();$('#brief-feedback').textContent='Your brief is ready. Nothing has been sent.';$('#generated-brief').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});$('#copy-brief').focus({preventScroll:true});});
$('#reset-draft').addEventListener('click',()=>{form.reset();prepared=false;try{localStorage.removeItem(storageKey);}catch{}$('#form-error').hidden=true;$$('[aria-invalid]',form).forEach(x=>x.removeAttribute('aria-invalid'));$('#brief-feedback').textContent='';render();});
$('#copy-brief').addEventListener('click',async()=>{if(!validate())return;try{await navigator.clipboard.writeText(buildBrief());$('#brief-feedback').textContent='Brief copied. Nothing has been sent.';}catch{$('#brief-text').focus();$('#brief-text').select();$('#brief-feedback').textContent='Copy is unavailable here. The brief is selected; use your device’s Copy command.';}});
$('#download-brief').addEventListener('click',()=>{if(!validate())return;const blob=new Blob([buildBrief()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='Neemari-Buyer-Brief-'+$('#product').value+'.txt';document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);$('#brief-feedback').textContent='Download prepared. Nothing has been sent.';});
$('#print-brief').addEventListener('click',()=>{if(!validate())return;const sheet=$('#print-sheet');sheet.replaceChildren();const heading=document.createElement('h1');heading.textContent='Neemari';const content=document.createElement('div');content.textContent=buildBrief();sheet.append(heading,content);window.print();});
loadDraft();render();
