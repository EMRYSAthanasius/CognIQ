export function calcIQ(r: number, mx: number, age: number){
  if(!mx) return 100;
  let p=r/mx,adj=0;
  if(age<14)adj=.10;else if(age<18)adj=.07;else if(age<22)adj=.04;
  else if(age<28)adj=.02;else if(age<40)adj=0;else if(age<50)adj=.03;
  else if(age<60)adj=.06;else if(age<70)adj=.09;else adj=.12;
  let ap=Math.max(.01,Math.min(.99,p+adj));
  return Math.max(60,Math.min(162,Math.round(100+15*(Math.log(ap/(1-ap))/1.05))));
}

export function clsIQ(iq: number){
  if(iq>=145)return"Genius / Profoundly Gifted";if(iq>=130)return"Gifted";
  if(iq>=120)return"Superior Intelligence";if(iq>=110)return"High Average";
  if(iq>=90)return"Average";if(iq>=80)return"Low Average";
  if(iq>=70)return"Borderline";return"Below Average";
}

export function pct(iq: number){
  let z=(iq-100)/15;
  return Math.max(1,Math.min(99,Math.round(100/(1+Math.exp(-1.7011*z)))));
}
