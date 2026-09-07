(function(){
  const ALLOWED=['amandaciaralee@gmail.com','k.hutch.2026@gmail.com'];
  const firebaseConfig={
    apiKey:'AIzaSyAQHOKZyw8WZwNYYre8D0BrXTC309efeps',
    authDomain:'two-broke-girls-c909b.firebaseapp.com',
    projectId:'two-broke-girls-c909b',
    storageBucket:'two-broke-girls-c909b.firebasestorage.app',
    messagingSenderId:'877803956535',
    appId:'1:877803956535:web:e8e06a4597eea9024052b2'
  };
  let auth,db,ref,unsub,user=null,ready=false,saveTimer=null;
  const gate=()=>document.querySelector('#cloudGate');
  const badge=()=>document.querySelector('#syncBadge');
  function status(text,tone){const b=badge();if(b){b.textContent=text;b.dataset.tone=tone||''}}
  function showGate(message){const g=gate();if(!g)return;g.hidden=false;g.querySelector('[data-gate-message]').textContent=message||'Sign in with an approved Google account to open the shared budget.'}
  function hideGate(){const g=gate();if(g)g.hidden=true}
  async function signIn(){try{const p=new firebase.auth.GoogleAuthProvider();p.setCustomParameters({prompt:'select_account'});await auth.signInWithPopup(p)}catch(e){showGate(e.code==='auth/unauthorized-domain'?'This Vercel address still needs to be added to Firebase Authorized domains.':(e.message||'Sign-in did not finish. Please try again.'));status('Sign-in needed','warn')}}
  async function start(){
    if(!window.firebase){showGate('Firebase could not load. Check the internet connection and refresh.');return}
    if(!firebase.apps.length)firebase.initializeApp(firebaseConfig);
    auth=firebase.auth();db=firebase.firestore();ref=db.collection('budgets').doc('amanda-katie');
    document.querySelector('[data-cloud-signin]')?.addEventListener('click',signIn);
    auth.onAuthStateChanged(async u=>{
      ready=false;user=u||null;if(unsub){unsub();unsub=null}
      if(!u){status('Sign in','warn');showGate();return}
      const email=(u.email||'').toLowerCase();
      if(!ALLOWED.includes(email)){await auth.signOut();showGate(email+' is not approved for this budget.');return}
      hideGate();status('Connecting…','');
      try{
        const first=await ref.get();
        if(!first.exists){await ref.set({state:window.getCloudState(),updatedAt:firebase.firestore.FieldValue.serverTimestamp(),updatedBy:email})}
        unsub=ref.onSnapshot(s=>{
          ready=true;status('Synced','ok');const d=s.data();if(d&&d.state)window.receiveCloudState(d.state);
        },()=>{ready=false;status('Sync paused','warn')});
      }catch(e){status('Sync paused','warn');showGate('Signed in, but Firebase could not open the shared budget. Check the Firestore security rules.')}
    });
  }
  function write(next){if(!ready||!user)return;clearTimeout(saveTimer);status('Saving…','');saveTimer=setTimeout(()=>{const copy=JSON.parse(JSON.stringify(next));delete copy.view;ref.set({state:copy,updatedAt:firebase.firestore.FieldValue.serverTimestamp(),updatedBy:(user.email||'').toLowerCase()},{merge:true}).then(()=>status('Synced','ok')).catch(()=>status('Sync paused','warn'))},250)}
  window.Cloud={start,write,signIn,signOut:()=>auth&&auth.signOut(),isReady:()=>ready,user:()=>user};
})();