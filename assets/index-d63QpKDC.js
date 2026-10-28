(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=()=>({eaten:0,kills:0,played:0,wins:0,collection:{},claimed:[]});function t(t){let n=e();if(!t||typeof t!=`object`)return n;let r=t;for(let e of[`eaten`,`kills`,`played`,`wins`]){let t=r[e];n[e]=typeof t==`number`&&Number.isFinite(t)?Math.max(0,Math.min(1e9,Math.floor(t))):0}return r.collection&&typeof r.collection==`object`&&(n.collection=Object.fromEntries(Object.entries(r.collection).filter(([e,t])=>/^[\w-]{1,100}$/.test(e)&&typeof t==`number`&&Number.isFinite(t)&&t>0).map(([e,t])=>[e,Math.min(1e9,Math.floor(t))]))),Array.isArray(r.claimed)&&(n.claimed=[...new Set(r.claimed.filter(e=>typeof e==`string`&&/^[\w-]{1,100}$/.test(e)))]),n}function n(e,t){return e.claimed.includes(t.id)||e[t.counter]<t.target?0:(e.claimed.push(t.id),t.stars)}var r={None:`无道具`,Bigger:`大洞开局`,Shrink:`缩小射线`,Magnet:`吸附道具`,Speed:`加速`,MoreTime:`额外时间`};function i(e){return Object.hasOwn(r,e)?e:`None`}var a=class{selected=`None`;expiresAt=0;candidates=[];start(e,t){if(this.selected=t,this.expiresAt=0,t===`None`||e.modeId===`endless`){this.selected=`None`;return}let n=e.config.powerups[t].stats[0];t===`Bigger`?e.player.SetLevel(Math.min(e.config.hole.levelMax,e.player.Level+n)):t===`MoreTime`?e.IsTimeBasedMode()?(e.config.match.durationSeconds+=n,e.remaining+=n):this.selected=`None`:this.expiresAt=e.time+n}update(e,t){if(this.selected===`None`||this.selected===`Bigger`||this.selected===`MoreTime`)return;let n=e.player,r=e.config.powerups;if(n.IsDead||e.time>=this.expiresAt){this.selected===`Speed`&&n.SetSpeedMultiplier(n.HoleMode===`FrenzyMode`?e.config.combat.frenzySpeedMultiplier:1),this.selected=`None`;return}if(this.selected===`Speed`){n.SetSpeedMultiplier(r.speedMultiplier*(n.HoleMode===`FrenzyMode`?e.config.combat.frenzySpeedMultiplier:1));return}let i=n.Size*r.rangeMultiplier;e.index.query(n.x,n.z,i,this.candidates);let a=0;for(let o of this.candidates)o.state!==`IDLE`||o.body||o.OnlyForPlayer||Math.hypot(o.x-n.x,o.z-n.z)>i||(this.selected===`Shrink`?!o.IsShrunk&&o.SizeRequired<=n.Level*2&&(o.Shrink(),e.index.insert(o)):o.ObjectType!==`Building`&&o.FitsOpening(n.Size)&&a++<r.magnetSlots&&(o.Attract(n,Math.max(0,1-Math.hypot(o.x-n.x,o.z-n.z)/i)*r.magnetForce*t),e.index.insert(o)))}},o=[{id:`classic`,name:`经典计时`,description:`2 分钟 · 7 个洞 · 争夺最高分`},{id:`speedrun`,name:`清图竞速`,description:`10 分钟 · 单人 · 吞净整张地图`},{id:`battleRoyale`,name:`生存淘汰`,description:`20 个洞 · 不复活 · 最后存活者获胜`},{id:`endless`,name:`无尽成长`,description:`阶段推进 · 升级能力 · 保留成长进度`}];function s(e){return o.find(t=>t.id===e)??o[0]}function c(e,t){let n=structuredClone(e);if(t===`classic`)return n;let r=n.modes[t];return n.match.totalHoles=r.totalHoles,n.match.bots=r.totalHoles-1,n.match.durationSeconds=r.durationSeconds,n.ai.playerRelativeGrowth=!1,n.growth.lateXpIncrease=0,n.growth.active=`default`,n.match.respawnObjects=t===`battleRoyale`,t===`battleRoyale`&&(n.match.starRewardsByRank=n.modes.battleRoyale.starRewards),n}function l(e,t){let{thresholds:n,starRewards:r}=t.modes.speedrun;return r[n.findIndex(t=>e>=t)]??0}var u={size:`洞口大小`,speed:`移动速度`,value:`物体价值`,spawn:`生成速度`,magnet:`吸附范围`,offline:`离线收益`,luck:`幸运收集`};function d(){return{stage:1,stagePoints:0,points:0,sessionPoints:0,upgrades:{size:0,speed:0,value:0,spawn:0,magnet:0,offline:0,luck:0},lastSeen:0,offlinePending:0}}function f(e,t){let n=d();if(!e||typeof e!=`object`)return n;let r=e,i=(e,t,n=0xe8d4a51000)=>typeof e==`number`&&Number.isFinite(e)?Math.max(0,Math.min(n,Math.floor(e))):t;n.stage=Math.max(1,i(r.stage,1,1e3));for(let e of[`stagePoints`,`points`,`sessionPoints`,`lastSeen`,`offlinePending`])n[e]=i(r[e],0,e===`lastSeen`?0x5af3107a4000:0xe8d4a51000);for(let e of Object.keys(u))n.upgrades[e]=i(r.upgrades?.[e],0,t.modes.endless.maxUpgradeLevel);return n}var p=class{data;config;constructor(e,t=d()){this.config=e.modes.endless,this.data=structuredClone(t)}get required(){return Math.min(this.config.maxRequiredPoints,Math.max(1,Math.floor(this.config.startRequiredPoints*this.config.requiredPointsMultiplier**(this.data.stage-1))))}add(e){let t=Math.max(0,e)*(1+this.data.upgrades.value);return this.data.stagePoints=Math.min(0xe8d4a51000,this.data.stagePoints+t),this.data.sessionPoints=Math.min(0xe8d4a51000,this.data.sessionPoints+t),this.data.stagePoints>=this.required}claimStage(){return this.data.stagePoints<this.required?!1:(this.data.points=Math.min(0xe8d4a51000,this.data.points+this.data.stagePoints),this.data.stagePoints=0,this.data.stage=Math.min(1e3,this.data.stage+1),!0)}price(e){return Math.ceil(this.config.startPrice*this.config.priceMultiplier**this.data.upgrades[e])}upgrade(e){let t=this.price(e);return this.data.upgrades[e]>=this.config.maxUpgradeLevel||this.data.points<t?!1:(this.data.points-=t,this.data.upgrades[e]++,!0)}accrueOffline(e){let t=Math.min(this.config.offlineMaxMinutes,Math.max(0,Math.floor((e-this.data.lastSeen)/6e4)));this.data.lastSeen>0&&this.data.stage>=this.config.offlineUnlockLevel&&(this.data.offlinePending=Math.min(0xe8d4a51000,this.data.offlinePending+t*this.data.upgrades.offline)),this.data.lastSeen=Math.max(this.data.lastSeen,e)}claimOffline(){let e=Math.min(this.data.offlinePending,0xe8d4a51000-this.data.points);return this.data.points+=e,this.data.offlinePending=0,e}},m=[{id:`classic-0`,name:`经典·天空`,color:`#56d4ff`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`classic-1`,name:`经典·琥珀`,color:`#ffb236`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`classic-2`,name:`经典·樱粉`,color:`#f36fab`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`classic-3`,name:`经典·紫罗兰`,color:`#b284f8`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`classic-4`,name:`经典·青柠`,color:`#a5df45`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`classic-5`,name:`经典·珊瑚`,color:`#ff635d`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`classic-6`,name:`经典·薄荷`,color:`#59e3bc`,layers:[],source:`原经典颜色 / HoleBelly.obj`},{id:`alien`,name:`外星访客`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Alien_01_977`,path:`assets/runtime/8b95de96554eca807c866762.webp`,x:.0068,z:-.3151,width:3.3973,height:3.4658}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`among-us`,name:`太空船员`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_AmongUs_01_1402`,path:`assets/runtime/c929bc0c34c355d2ed061eac.webp`,x:.0068,z:-.331,width:2.6301,height:3.3379}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`batman`,name:`暗夜骑士`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Batman_01_1353`,path:`assets/runtime/513c4e1510497247f6f6824b.webp`,x:0,z:-.4322,width:2.6438,height:4.1356}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`ghost`,name:`幽灵`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_BooGhost_01_1312`,path:`assets/runtime/d16c8ef7ac79ef9813e971f1.webp`,x:.0068,z:-.1597,width:2.6301,height:3},{texture:`skin-Sking_BooGhost_Arm_01_1346`,path:`assets/runtime/1033e41493aebb8f1112c8ec.webp`,x:-1.65,z:-.55,width:.7,height:1.0556},{texture:`skin-Sking_BooGhost_Arm_01_1346`,path:`assets/runtime/1033e41493aebb8f1112c8ec.webp`,x:1.65,z:-.55,width:.7,height:1.0556}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`cartman`,name:`冬帽少年`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Cartman_01_2399`,path:`assets/runtime/c45ac5acd67d96983d5f6d42.webp`,x:0,z:-.3846,width:3.2276,height:4.188}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`elf`,name:`小精灵`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Elf_01_956`,path:`assets/runtime/4afd4f12fdb886549553539d.webp`,x:.0139,z:-.4286,width:3.4583,height:3.8346}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`gingerbread`,name:`姜饼人`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Gingerbreadman_01_1292`,path:`assets/runtime/98cb574f7b0dc6da37157393.webp`,x:.007,z:-.3357,width:3.6056,height:3.4406}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`kitten`,name:`蝴蝶结猫咪`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_HelloKitty_01_1322`,path:`assets/runtime/6fdd3c054d3eb35d04928d9a.webp`,x:.0068,z:-.2603,width:3.5068,height:3.3014}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`joker`,name:`小丑`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Joker_01_1732`,path:`assets/runtime/e30c6a7c951647cfc5f6cd42.webp`,x:.0068,z:-.4872,width:3.2055,height:4.1538}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`kawai`,name:`粉色甜心`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Kawai_01_1154`,path:`assets/runtime/40b80b604b23d406a76a4bae.webp`,x:.0143,z:-.4173,width:3.5571,height:3.9213}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`panda`,name:`熊猫`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Panda_01_1766`,path:`assets/runtime/b34fd02a701e5d8330ffd37c.webp`,x:.0068,z:-.4044,width:3.0959,height:3.5882}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`pirate`,name:`海盗船长`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Pirate_01_1272`,path:`assets/runtime/4a1d8e6e77f98811daed3832.webp`,x:0,z:-.2927,width:3.2276,height:3.9675}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`pokeball`,name:`精灵球`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_PokeBall_01_1472`,path:`assets/runtime/1aa77b10d98e3dd4dc6dfbcf.webp`,x:.0068,z:.0068,width:2.6849,height:2.6849}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`polar-bear`,name:`北极熊`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_PolarBear_01_1068`,path:`assets/runtime/b8475c6c52e4410ffdfff0ab.webp`,x:.0143,z:-.2602,width:3.5571,height:4.1626}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`poop`,name:`便便表情`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_PoopEmoji_01_986`,path:`assets/runtime/3aa967102cdb0a164754ec18.webp`,x:.0068,z:-.4579,width:2.9589,height:4.5794},{texture:`skin-Skin_PoopEmoji_EyeOpen_1229`,path:`assets/runtime/9da6fe0096e9027838c59b31.webp`,x:-.62,z:-1.5,width:.55,height:.6961},{texture:`skin-Skin_PoopEmoji_EyeOpen_1229`,path:`assets/runtime/9da6fe0096e9027838c59b31.webp`,x:.62,z:-1.5,width:.55,height:.6961},{texture:`skin-Skin_PoopEmoji_Pupil_01_1563`,path:`assets/runtime/5a05a363bc93af4eece9b386.webp`,x:-.62,z:-1.5,width:.24,height:.3225},{texture:`skin-Skin_PoopEmoji_Pupil_01_1563`,path:`assets/runtime/5a05a363bc93af4eece9b386.webp`,x:.62,z:-1.5,width:.24,height:.3225}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`pug`,name:`巴哥犬`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_PugEars_01_1388`,path:`assets/runtime/ad38e6b5d9042306fed7e3c5.webp`,x:0,z:-1.35,width:2.85,height:1.6822},{texture:`skin-Skin_Pug_01_1338`,path:`assets/runtime/20d7d898f0d165ac5b4c5404.webp`,x:.0068,z:-.224,width:2.7123,height:3.68},{texture:`skin-Skin_PugPupil_01_872`,path:`assets/runtime/61aea08b244d5e31229bd46d.webp`,x:-.68,z:-1.44,width:.4,height:.4},{texture:`skin-Skin_PugPupil_01_872`,path:`assets/runtime/61aea08b244d5e31229bd46d.webp`,x:.69,z:-1.44,width:.4,height:.4}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`reindeer`,name:`驯鹿`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Rudolf_01_1206`,path:`assets/runtime/a1cb800caa53aea26f8257e3.webp`,x:.0143,z:-.4327,width:3.5571,height:4.9231},{texture:`skin-Skin_Rudolf_Ear_01_954`,path:`assets/runtime/f951b4256834ebc2c605f23f.webp`,x:-1.4,z:-2.2,width:.65,height:1.3264},{texture:`skin-Skin_Rudolf_Ear_01_954`,path:`assets/runtime/f951b4256834ebc2c605f23f.webp`,x:1.4,z:-2.2,width:.65,height:1.3264}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`santa`,name:`圣诞老人`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Santa_01_1248`,path:`assets/runtime/37efdf9b9b197affa762138d.webp`,x:.0069,z:-.3669,width:3.5,height:3.6691}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`scooby`,name:`侦探狗`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_ScoobyDoo_01_923`,path:`assets/runtime/61571a59b5f1830ad1fbe408.webp`,x:.0139,z:-.531,width:3.0972,height:4.354}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`hedgehog`,name:`刺猬`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Sonic_01_927`,path:`assets/runtime/8656fbe4a9fc5a75db94903c.webp`,x:.0068,z:-.306,width:2.7123,height:3.6716},{texture:`skin-Skin_SonicFur_01_908`,path:`assets/runtime/bc046bdd0ec81c10eee9c565.webp`,x:0,z:-.2,width:4.2,height:4.2356},{texture:`skin-Skin_SonicEar_01_1100`,path:`assets/runtime/cee7fa5282085daf5566865b.webp`,x:-1.2,z:-1.85,width:.8,height:.9851},{texture:`skin-Skin_SonicEar_01_1100`,path:`assets/runtime/cee7fa5282085daf5566865b.webp`,x:1.2,z:-1.85,width:.8,height:.9851}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`spiderman`,name:`蜘蛛侠`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Spiderman_01_1782`,path:`assets/runtime/a8622d115dfcae1c97fdde8d.webp`,x:0,z:-.3688,width:2.8429,height:3.5177}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`tiger`,name:`白虎`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Tiger_01_1055`,path:`assets/runtime/2a8cef5253185899b7f2c289.webp`,x:.0143,z:-.2835,width:3.5571,height:3.8425},{texture:`skin-Skin_Tiger_Ear_01_1703`,path:`assets/runtime/fc3de7abae7c037193e773ab.webp`,x:-1.35,z:-1.8,width:.75,height:.8295},{texture:`skin-Skin_Tiger_Ear_01_1703`,path:`assets/runtime/fc3de7abae7c037193e773ab.webp`,x:1.35,z:-1.8,width:.75,height:.8295}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-beret`,name:`贝雷帽`,color:`#88bb66`,layers:[{texture:`skin-SkinBase_951`,path:`assets/runtime/71781e16252a1a352eb13a6a.webp`,x:.0038,z:-.2222,width:2.8485,height:2.8622},{texture:`skin-Skin_hat_beret_1368`,path:`assets/runtime/b870db94aabad29c57bd4d2d.webp`,x:0,z:-1.25,width:3.5,height:1.8},{texture:`skin-Skin_teeth_beret_1810`,path:`assets/runtime/262fdbded3eda715be2e3ece.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-black`,name:`黑色士兵`,color:`#88bb66`,layers:[{texture:`skin-SkinBaseArmor_1228`,path:`assets/runtime/37e461808c49cc3e4530ba15.webp`,x:.0038,z:-.17,width:2.9848,height:3.1067},{texture:`skin-Skin_Hat_1484`,path:`assets/runtime/e0356a771252db56353af000.webp`,x:0,z:-1.25,width:3.5,height:1.7241},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-camo`,name:`迷彩士兵`,color:`#88bb66`,layers:[{texture:`skin-SkinBaseArmor_1228`,path:`assets/runtime/37e461808c49cc3e4530ba15.webp`,x:.0038,z:-.17,width:2.9848,height:3.1067},{texture:`skin-Skin_hat_camo_1150`,path:`assets/runtime/c484296afb729d6845c72314.webp`,x:0,z:-1.25,width:3.5,height:1.7241},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-capral`,name:`下士`,color:`#88bb66`,layers:[{texture:`skin-SkinBaseNoArmor_873`,path:`assets/runtime/1959c22cbc3f44f4d3473c37.webp`,x:.0038,z:-.2213,width:2.8485,height:2.8617},{texture:`skin-Skin_hat_capral_1752`,path:`assets/runtime/b8d5c8b937592b4f195cb017.webp`,x:0,z:-1.25,width:3.5,height:1.7241},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-desert`,name:`沙漠士兵`,color:`#88bb66`,layers:[{texture:`skin-SkinBaseNoArmor_873`,path:`assets/runtime/1959c22cbc3f44f4d3473c37.webp`,x:.0038,z:-.2213,width:2.8485,height:2.8617},{texture:`skin-Skin_hat_camo_hat_961`,path:`assets/runtime/5154f50317ee1e6e8f480341.webp`,x:0,z:-1.25,width:3.5,height:2.45},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-general`,name:`将军`,color:`#88bb66`,layers:[{texture:`skin-SkinBaseArmor_1228`,path:`assets/runtime/37e461808c49cc3e4530ba15.webp`,x:.0038,z:-.17,width:2.9848,height:3.1067},{texture:`skin-Skin_hat_1438`,path:`assets/runtime/9f4ade839dac032fc0737476.webp`,x:0,z:-1.25,width:3.5,height:1.9775},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-headphones`,name:`耳机士兵`,color:`#88bb66`,layers:[{texture:`skin-SkinBase_951`,path:`assets/runtime/71781e16252a1a352eb13a6a.webp`,x:.0038,z:-.2222,width:2.8485,height:2.8622},{texture:`skin-Skin_headphones_1386`,path:`assets/runtime/4d8f4602f24b02a1ec07e571.webp`,x:0,z:-1.25,width:3.5,height:2.2387},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`soldier-night-vision`,name:`夜视士兵`,color:`#88bb66`,layers:[{texture:`skin-SkinBaseArmor_1228`,path:`assets/runtime/37e461808c49cc3e4530ba15.webp`,x:.0038,z:-.17,width:2.9848,height:3.1067},{texture:`skin-Skin_Soldier_Night_vision_1536`,path:`assets/runtime/a2675733f9b9a37438640538.webp`,x:0,z:-1.25,width:3.5,height:1.7241},{texture:`skin-Skin_teeth_soldier_1382`,path:`assets/runtime/84b49fa249e569a6ea837813.webp`,x:0,z:-.92,width:1.65,height:.2357},{texture:`skin-Skin_Soldier_Night_vision_Light_1574`,path:`assets/runtime/bdacd17e058c315be534e1d1.webp`,x:-.7,z:-1.3,width:.45,height:.45}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`dragon`,name:`独角龙`,color:`#6ec8ff`,layers:[{texture:`skin-dragon01_bottom_964`,path:`assets/runtime/735d103c5b7b0161fee741c3.webp`,x:.0093,z:-.56,width:2.8519,height:3.74},{texture:`skin-dragon01_top_1514`,path:`assets/runtime/7cdbc810ae3a642c63049801.webp`,x:.0093,z:-.56,width:2.8519,height:3.74}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`emoji`,name:`笑脸`,color:`#6ec8ff`,layers:[{texture:`skin-emoji01_bottom_1153`,path:`assets/runtime/afdac14bbf8e5229a5db83c6.webp`,x:.0093,z:-.2526,width:2.7778,height:3.1579},{texture:`skin-emoji01_top_1175`,path:`assets/runtime/2857ae19b13098282fdb9b13.webp`,x:.0093,z:-.2526,width:2.7778,height:3.1579}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`grinder`,name:`粉碎机`,color:`#6ec8ff`,layers:[{texture:`skin-grinder01_bottom_1027`,path:`assets/runtime/ec171c89eeda069e8ebae348.webp`,x:.537,z:.0093,width:3.6111,height:2.5556},{texture:`skin-grinder01_top_1482`,path:`assets/runtime/ce3b22640d12bdfc86ca3910.webp`,x:.0093,z:.0093,width:2.5556,height:2.5556},{texture:`skin-grinder01_blades_1061`,path:`assets/runtime/974700f4109451a488f689a9.webp`,x:0,z:0,width:2.7,height:2.7}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`mole`,name:`鼹鼠`,color:`#6ec8ff`,layers:[{texture:`skin-mole01_bottom_1729`,path:`assets/runtime/7ce9352dfce91e2e12a79455.webp`,x:.0093,z:-.1111,width:2.7778,height:2.7963},{texture:`skin-mole01_top_1013`,path:`assets/runtime/45e3eac6078c6e20aff0ee97.webp`,x:.0093,z:-.1111,width:2.7778,height:2.7963},{texture:`skin-mole01_nose_0000_1255`,path:`assets/runtime/24473fa3a1e2c3da753affda.webp`,x:0,z:-1.15,width:.55,height:.2819,frames:[`skin-mole01_nose_0000_1255`,`skin-mole01_nose_0001_1041`,`skin-mole01_nose_0002_1631`,`skin-mole01_nose_0003_1017`,`skin-mole01_nose_0004_1374`,`skin-mole01_nose_0005_1418`,`skin-mole01_nose_0006_1023`,`skin-mole01_nose_0007_1690`,`skin-mole01_nose_0008_1164`,`skin-mole01_nose_0009_836`,`skin-mole01_nose_0010_1021`,`skin-mole01_nose_0011_1796`,`skin-mole01_nose_0012_1410`,`skin-mole01_nose_0013_1287`],fps:12}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`raccoon`,name:`浣熊`,color:`#6ec8ff`,layers:[{texture:`skin-raccoon01_bottom_821`,path:`assets/runtime/4d68faa8e2f729ecfe02f9f4.webp`,x:.0093,z:-.1389,width:3.2222,height:2.8519},{texture:`skin-raccoon01_top_1509`,path:`assets/runtime/305f53bf2315a18220e8b692.webp`,x:.0093,z:-.1429,width:3.2222,height:2.8762}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`skull`,name:`骷髅`,color:`#6ec8ff`,layers:[{texture:`skin-skull01_bottom_1347`,path:`assets/runtime/565c0f000a0143c24dee73c9.webp`,x:.0093,z:-.1771,width:2.7778,height:3.2083},{texture:`skin-skull01_top_1778`,path:`assets/runtime/7004f743dce1ec9c97abe59a.webp`,x:.0093,z:-.1856,width:2.7778,height:3.1753}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`tornado`,name:`龙卷风`,color:`#6ec8ff`,layers:[{texture:`skin-tornado01_bottom_841`,path:`assets/runtime/0ae8c5a2d42949172e6331ac.webp`,x:.0741,z:.03,width:3.537,height:3.64},{texture:`skin-tornado01_top_1697`,path:`assets/runtime/84fb49ac09618277b98f09a3.webp`,x:-.0526,z:-.1491,width:2.5789,height:2.6316}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`thundercloud`,name:`雷云`,color:`#6ec8ff`,layers:[{texture:`skin-thundercloud_bottomdark_1512`,path:`assets/runtime/2f56f6fd0a377bdd7b78c9f7.webp`,x:.1111,z:-.1296,width:3.7222,height:2.5741},{texture:`skin-thundercloud_topdark_1420`,path:`assets/runtime/67966f16446517a4263e4cb7.webp`,x:.1111,z:-.1296,width:3.7222,height:2.5741}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`spinner`,name:`指尖陀螺`,color:`#6ec8ff`,layers:[{texture:`skin-spinner dessous_1656`,path:`assets/runtime/7c3e561e56da370223bec655.webp`,x:.0094,z:-.3925,width:4.1887,height:3.7757},{texture:`skin-spinner dessus_897`,path:`assets/runtime/c2e8f01113f68581ecc7c2f7.webp`,x:.0094,z:-.3925,width:4.1887,height:3.7757}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`football`,name:`橄榄球手`,color:`#6ec8ff`,layers:[{texture:`skin-football_base_1678`,path:`assets/runtime/b5a99f1687ad6fddccdd74df.webp`,x:.0032,z:-.2214,width:2.8442,height:2.8626},{texture:`skin-football_helmet_1642`,path:`assets/runtime/81287e761eabe465ff98ebeb.webp`,x:0,z:-.25,width:3.8,height:3.8079}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`anubis`,name:`阿努比斯`,color:`#6ec8ff`,layers:[{texture:`skin-Anubis_base_1671`,path:`assets/runtime/5793fad6ac37b3240b99619a.webp`,x:.0032,z:-.6,width:2.3377,height:3.9583},{texture:`skin-Anubis_ear_1799`,path:`assets/runtime/386c12951e5c679275e674bb.webp`,x:-1.1,z:-2.4,width:.6,height:1.525},{texture:`skin-Anubis_ear_1799`,path:`assets/runtime/386c12951e5c679275e674bb.webp`,x:1.1,z:-2.4,width:.6,height:1.525},{texture:`skin-Anubis_hat_1038`,path:`assets/runtime/12887a079f01932307d1ea0b.webp`,x:0,z:-2,width:.75,height:2.1538}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`ra`,name:`太阳神`,color:`#6ec8ff`,layers:[{texture:`skin-Ra_base_1351`,path:`assets/runtime/9786bdcacee05a4b7867b898.webp`,x:.0032,z:-.1377,width:2.5195,height:3.417},{texture:`skin-Ra_hat_879`,path:`assets/runtime/6f27d391dc70c4e32024e168.webp`,x:0,z:-1.7,width:3.2,height:2.4029},{texture:`skin-Ra_cobra_1704`,path:`assets/runtime/d23894b454703e8ccf0277b6.webp`,x:0,z:-2.1,width:.7,height:.9552},{texture:`skin-Ra_sun_1180`,path:`assets/runtime/958f4f6dec56f3a9a10acfe9.webp`,x:0,z:-2.6,width:1.3,height:1.3}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`sphinx`,name:`斯芬克斯`,color:`#6ec8ff`,layers:[{texture:`skin-Sphinx_base_1217`,path:`assets/runtime/d7f0d406f98642329e8eff14.webp`,x:.0065,z:-.7195,width:3.5649,height:4.1626},{texture:`skin-Sphinx_teeth_top_1286`,path:`assets/runtime/b381545cda87528aeff59b1c.webp`,x:0,z:-.94,width:1.3,height:.425},{texture:`skin-Sphinx_teeth_bottom_1650`,path:`assets/runtime/7e01d44f8a29ecf80bf0745a.webp`,x:0,z:.94,width:1.4,height:.405}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`spiral`,name:`彩虹漩涡`,color:`#ba82ec`,layers:[{texture:`skin-spiral_02_335`,path:`assets/runtime/cef8658c27ce456554d3a9e8.webp`,x:0,z:0,width:3.1,height:3.1,circle:!0}],source:`spiral_02 原图；圆形裁切适配`},{id:`cleopatra`,name:`克娄巴特拉`,color:`#6ec8ff`,layers:[{texture:`skin-Cleopatra_neck_1389`,path:`assets/runtime/48337127f889b624ddffeb64.webp`,x:0,z:.35,width:3.1,height:1.72},{texture:`skin-Cleopatra_base_1477`,path:`assets/runtime/23507deafd2a404f531c396f.webp`,x:.0032,z:-.2214,width:2.8442,height:2.8626},{texture:`skin-Cleopatra_hat_1554`,path:`assets/runtime/a7eada9c608ae61ee0abb9b2.webp`,x:0,z:-1.65,width:3,height:1.9763}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`cursed-pharaoh`,name:`诅咒法老`,color:`#6ec8ff`,layers:[{texture:`skin-Cursed_Pharaoh_base_842`,path:`assets/runtime/9a4735651edd46b66a762f50.webp`,x:-.0065,z:-.2261,width:2.8636,height:2.8736},{texture:`skin-Cursed_Pharaoh_hat_1446`,path:`assets/runtime/30a74b4e2a91155a77b63fd0.webp`,x:0,z:-1.65,width:3,height:2.4141},{texture:`skin-Cursed_Pharaoh_teeth_bottom_1128`,path:`assets/runtime/78283d34958f471a29cfdb32.webp`,x:0,z:.94,width:1.5,height:.4455},{texture:`skin-Cursed_Pharaoh_teeth_top_1176`,path:`assets/runtime/e5129e1ea08d959432f88079.webp`,x:0,z:-.94,width:1.5,height:.3443}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`scarab`,name:`圣甲虫`,color:`#6ec8ff`,layers:[{texture:`skin-Scarab_base_1405`,path:`assets/runtime/70c30ae707809660d14670ab.webp`,x:.0032,z:-.2405,width:3.0779,height:2.8855},{texture:`skin-Scarab_hat_1301`,path:`assets/runtime/3045d20e8ff586c97ce643c6.webp`,x:0,z:-1.65,width:3,height:1.6701}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`tutankhamun`,name:`图坦卡蒙`,color:`#6ec8ff`,layers:[{texture:`skin-Tutankhamun_base_877`,path:`assets/runtime/bf373e9be582223381111d6a.webp`,x:.0032,z:-.313,width:2.8442,height:3.0305},{texture:`skin-Tutankhamun_chin_1748`,path:`assets/runtime/5d91e285685d75339bde3811.webp`,x:0,z:1.15,width:1.8,height:1.62},{texture:`skin-Tutankhamun_cobra_942`,path:`assets/runtime/7121c30940bde3525fafa0cb.webp`,x:0,z:-1.65,width:2.0696,height:2.8},{texture:`skin-Tutankhamun_hat_1515`,path:`assets/runtime/0240c5842463382c985eb2a3.webp`,x:0,z:-1.65,width:3,height:2.5322}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`geisha`,name:`花街艺伎`,color:`#6ec8ff`,layers:[{texture:`skin-geisha_base_1617`,path:`assets/runtime/a671aaac5bcc1f4d1c9f44ce.webp`,x:.0032,z:-.5191,width:2.987,height:3.4427},{texture:`skin-geisha_extra_1332`,path:`assets/runtime/6980139c770eba95da098158.webp`,x:1.05,z:-1.6,width:.32,height:1.3538}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`kitsune`,name:`狐狸`,color:`#6ec8ff`,layers:[{texture:`skin-kitsune_base_1001`,path:`assets/runtime/741104242ecca88d39475b17.webp`,x:.0032,z:-.4241,width:3.0649,height:3.5714},{texture:`skin-kitsune_ear_1371`,path:`assets/runtime/e66a9aac583715f781062b89.webp`,x:-1.6,z:-.65,width:.65,height:.8761},{texture:`skin-kitsune_ear_1371`,path:`assets/runtime/e66a9aac583715f781062b89.webp`,x:1.6,z:-.65,width:.65,height:.8761},{texture:`skin-kitsune_hair_1148`,path:`assets/runtime/43bb728a7cb9fceaa81008a8.webp`,x:0,z:-1.65,width:2.9037,height:2.8},{texture:`skin-kitsune_teeth_bottom_1084`,path:`assets/runtime/ba87d66c3e1677d850d12789.webp`,x:0,z:.94,width:1.5,height:.4382},{texture:`skin-kitsune_teeth_up_918`,path:`assets/runtime/8f2c50bcf438f7e30267c248.webp`,x:0,z:-.94,width:1.5,height:.3679}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`koi`,name:`锦鲤`,color:`#6ec8ff`,layers:[{texture:`skin-koi_base_1080`,path:`assets/runtime/bf55b779fda1ad3725ddb6d1.webp`,x:.0032,z:-.572,width:2.6494,height:3.8485},{texture:`skin-koi_fin_down_901`,path:`assets/runtime/a564133a3d4d11acd0d00c12.webp`,x:-1.6,z:-.65,width:.65,height:.4228},{texture:`skin-koi_fin_down_901`,path:`assets/runtime/a564133a3d4d11acd0d00c12.webp`,x:1.6,z:-.65,width:.65,height:.4228},{texture:`skin-koi_fin_up_1436`,path:`assets/runtime/c83c135734ced1aa974e8f98.webp`,x:-1.6,z:-.65,width:.65,height:.3193},{texture:`skin-koi_fin_up_1436`,path:`assets/runtime/c83c135734ced1aa974e8f98.webp`,x:1.6,z:-.65,width:.65,height:.3193},{texture:`skin-koi_tail_952`,path:`assets/runtime/461a25a63b4f53101e4b8d22.webp`,x:0,z:1.7,width:1.3,height:1.586}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`sensei`,name:`师傅`,color:`#6ec8ff`,layers:[{texture:`skin-sensei_hat_back_1624`,path:`assets/runtime/a7bbf82158f277ad976c4fe1.webp`,x:0,z:-1.65,width:3,height:.5553},{texture:`skin-sensei_base_1539`,path:`assets/runtime/26d2332bb8c611252c39f224.webp`,x:.0032,z:-.1947,width:2.8442,height:2.916},{texture:`skin-sensei_beard_1046`,path:`assets/runtime/7b421b4ebcfed364012c7934.webp`,x:0,z:1.15,width:1.8,height:.9138},{texture:`skin-sensei_hat_front_1118`,path:`assets/runtime/dd503b1785d1f6ca5006522f.webp`,x:0,z:-1.65,width:3,height:1.1543},{texture:`skin-sensei_moustache_930`,path:`assets/runtime/9427d3a307f480c6f0a3ddd0.webp`,x:-.95,z:.9,width:.42,height:.9113},{texture:`skin-sensei_moustache_930`,path:`assets/runtime/9427d3a307f480c6f0a3ddd0.webp`,x:.95,z:.9,width:.42,height:.9113}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`sumo`,name:`相扑手`,color:`#6ec8ff`,layers:[{texture:`skin-sumo_neck_1182`,path:`assets/runtime/3ca9c1080781a8f2e77eace1.webp`,x:0,z:.35,width:3.1,height:1.72},{texture:`skin-sumo_base_1042`,path:`assets/runtime/cc98b829695fc009963ca0db.webp`,x:.0032,z:-.4542,width:3.1429,height:3.4351},{texture:`skin-sumo_eyebrow_992`,path:`assets/runtime/a4da2b95d58ef4f57b413e30.webp`,x:0,z:-1.3,width:1.3,height:.52},{texture:`skin-sumo_hair_1674`,path:`assets/runtime/d91130369234b0e378bb7080.webp`,x:0,z:-1.65,width:3,height:1.9615}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`sushi-master`,name:`寿司师傅`,color:`#6ec8ff`,layers:[{texture:`skin-sushi_master_base_865`,path:`assets/runtime/a1ad9570777e10dd6c7b3712.webp`,x:.0032,z:-.3779,width:2.8571,height:3.2824},{texture:`skin-sushi_master_beard_1528`,path:`assets/runtime/4717cd5c876021bd01d5c1a8.webp`,x:0,z:1.15,width:1.8,height:1.0552},{texture:`skin-sushi_master_moustache_874`,path:`assets/runtime/123c14444d5e2085337beee9.webp`,x:0,z:1.15,width:.8878,height:2.8}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`tanuki`,name:`狸猫`,color:`#6ec8ff`,layers:[{texture:`skin-Tanuki_base_1611`,path:`assets/runtime/be37a5d169b023777152b5b4.webp`,x:.0065,z:-.3867,width:2.9186,height:3.4933},{texture:`skin-Tanuki_ear_1677`,path:`assets/runtime/1f3ab0db4128a0ce6df8c492.webp`,x:-1.6,z:-.65,width:.65,height:.6717},{texture:`skin-Tanuki_ear_1677`,path:`assets/runtime/1f3ab0db4128a0ce6df8c492.webp`,x:1.6,z:-.65,width:.65,height:.6717},{texture:`skin-Tanuki_hat_1396`,path:`assets/runtime/a841c1d122292816874510e3.webp`,x:0,z:-1.65,width:3,height:2.6331},{texture:`skin-Tanuki_rope_1245`,path:`assets/runtime/e4e696b24bb21381f982f128.webp`,x:0,z:1.45,width:2.5,height:1.4135},{texture:`skin-tanuki_teeth_bottom_904`,path:`assets/runtime/87f2dca4a898c415f47d2b80.webp`,x:0,z:.94,width:1.5,height:.4286},{texture:`skin-tanuki_teeth_up_1449`,path:`assets/runtime/b1aca7f2bf85fae4d0ba103e.webp`,x:0,z:-.94,width:1.5,height:.3145}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`tengu`,name:`天狗`,color:`#6ec8ff`,layers:[{texture:`skin-Tengu_base_1620`,path:`assets/runtime/848510f0f0cb58539fa675ff.webp`,x:0,z:-.5118,width:3.0879,height:3.6929},{texture:`skin-Tengu_beard_1344`,path:`assets/runtime/2e3c33fc21c62719505e7efb.webp`,x:0,z:1.15,width:1.8,height:2.5043},{texture:`skin-Tengu_eyebrow_1097`,path:`assets/runtime/2b1256863f750e5fad105bd2.webp`,x:0,z:-1.3,width:1.3,height:.5571},{texture:`skin-Tengu_moustache_1349`,path:`assets/runtime/404c8055ed757d9d6f02308b.webp`,x:0,z:1.15,width:1.8,height:.7116},{texture:`skin-Tengu_nose_1553`,path:`assets/runtime/f99b04b48808aa3a1eae0e58.webp`,x:0,z:-1.3,width:1.3,height:.8553},{texture:`skin-Tengu_teeth_bottom_909`,path:`assets/runtime/287734e99376de7cfa9d740f.webp`,x:0,z:.94,width:1.5,height:.6393},{texture:`skin-Tengu_teeth_top_1385`,path:`assets/runtime/e6ded877486cce1f42cfdb02.webp`,x:0,z:-.94,width:1.5,height:.3654}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`nomad-1`,name:`荒野游民`,color:`#6ec8ff`,layers:[{texture:`skin-nomad_1_base_1578`,path:`assets/runtime/2cd6eea75a23817ec26cc1d2.webp`,x:.0032,z:-.5992,width:2.8442,height:3.6183},{texture:`skin-nomad_1_glasses_L_1226`,path:`assets/runtime/e430f076045550078565ea1e.webp`,x:0,z:-1.3,width:1.3,height:1.7333},{texture:`skin-nomad_1_glasses_R_1184`,path:`assets/runtime/fcaa481ac1038d92862b496f.webp`,x:0,z:-1.3,width:1.3,height:1.7333}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`nomad-boss`,name:`荒野首领`,color:`#6ec8ff`,layers:[{texture:`skin-nomad_boss_base_1356`,path:`assets/runtime/0bdd896d9ccd278e40a33e04.webp`,x:.0032,z:-.4008,width:2.8442,height:3.2214},{texture:`skin-nomad_boss_eyebrow_1058`,path:`assets/runtime/97d555f3532bb126ee88b790.webp`,x:0,z:-1.3,width:1.3,height:.6783},{texture:`skin-nomad_boss_eye_1387`,path:`assets/runtime/c43efe0a2e389a81547e6e9a.webp`,x:0,z:-1.3,width:1.3,height:1.3}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`nomad-boy`,name:`荒野少年`,color:`#6ec8ff`,layers:[{texture:`skin-nomad_boy_base_1079`,path:`assets/runtime/9eae6b8b131e277488fe6b1e.webp`,x:.0032,z:-.2939,width:2.8571,height:2.9924},{texture:`skin-nomad_boy_beard_1637`,path:`assets/runtime/813a7052ffcf98fda199b786.webp`,x:0,z:1.15,width:1.6333,height:2.8}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`nomad-dirty`,name:`流浪者`,color:`#6ec8ff`,layers:[{texture:`skin-nomad_dirty_base_852`,path:`assets/runtime/692964718cdb8c01b3979ab5.webp`,x:.0032,z:-.3092,width:2.8442,height:3.0229},{texture:`skin-nomad_dirty_hair_1112`,path:`assets/runtime/9241ac3d9f83136e51c29dc8.webp`,x:0,z:-1.65,width:3,height:1.9901}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`toxic`,name:`剧毒`,color:`#6ec8ff`,layers:[{texture:`skin-toxic_base_1394`,path:`assets/runtime/a91093e8fd9125f0a2da628c.webp`,x:.0097,z:-.3511,width:3.1039,height:3.1221}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`zombie-1`,name:`僵尸一号`,color:`#6ec8ff`,layers:[{texture:`skin-zombie_1_base_1216`,path:`assets/runtime/89da3ab2cd3be9216e9d1220.webp`,x:-.0912,z:-.3359,width:3.0489,height:3.0916},{texture:`skin-zombie_1_teeth_bottom_1593`,path:`assets/runtime/9d9303ea37a606273053dfeb.webp`,x:0,z:.94,width:1.5,height:.5217},{texture:`skin-zombie_1_teeth_top_1653`,path:`assets/runtime/32120642014df493acdf14f2.webp`,x:0,z:-.94,width:1.5,height:.3237}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`zombie-2`,name:`僵尸二号`,color:`#6ec8ff`,layers:[{texture:`skin-zombie_2_base_824`,path:`assets/runtime/9259c6cbe9ebb1d78c254eee.webp`,x:-.013,z:-.3103,width:2.8766,height:3.0575},{texture:`skin-zombie_2_teeth_bottom_1450`,path:`assets/runtime/125ddc8e9f5c9e52facbba56.webp`,x:0,z:.94,width:1.5,height:.4841},{texture:`skin-zombie_2_teeth_top_1264`,path:`assets/runtime/c7dcd09c73017c7f22e5b0b4.webp`,x:0,z:-.94,width:1.5,height:.4263}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`concrete-mixer`,name:`水泥搅拌机`,color:`#6ec8ff`,layers:[{texture:`skin-concrete_mixer_base_1196`,path:`assets/runtime/1fc731ee23f727612b6af306.webp`,x:.0032,z:-.1908,width:2.8442,height:2.9237},{texture:`skin-concrete_mixer_teeth_1755`,path:`assets/runtime/fdd912480dd1cf756fa390e1.webp`,x:0,z:-.94,width:1.5,height:.54},{texture:`skin-concrete_mixer_top_1281`,path:`assets/runtime/4472af72fcd9061cc1a0d21c.webp`,x:0,z:-1.4,width:2,height:1.3571},{texture:`skin-concrete_mixer_wheel_1168`,path:`assets/runtime/92c05a374816362b1f0e0b0a.webp`,x:-1.6,z:-.65,width:.65,height:.7647},{texture:`skin-concrete_mixer_wheel_1168`,path:`assets/runtime/92c05a374816362b1f0e0b0a.webp`,x:1.6,z:-.65,width:.65,height:.7647}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`engineer`,name:`工程师`,color:`#6ec8ff`,layers:[{texture:`skin-engineer_neck_1060`,path:`assets/runtime/32d4397ead82e2225e20925e.webp`,x:0,z:.35,width:3.1,height:1.72},{texture:`skin-engineer_base_832`,path:`assets/runtime/89514679352d3781392995ba.webp`,x:.013,z:-.2061,width:3.1531,height:2.8931},{texture:`skin-engineer_helmet_1613`,path:`assets/runtime/834fa29dc2c6082f1e4c589d.webp`,x:0,z:-1.65,width:3,height:1.7115},{texture:`skin-engineer_shirt_1619`,path:`assets/runtime/97243a76b11973a8db95fb5c.webp`,x:0,z:1.45,width:2.5,height:.8387}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`generator`,name:`发电机`,color:`#6ec8ff`,layers:[{texture:`skin-generator_base_1638`,path:`assets/runtime/363381ea47e2bb3068100da6.webp`,x:.0032,z:-.6759,width:3.3766,height:3.8972},{texture:`skin-generator_teeth_bottom_1708`,path:`assets/runtime/c4c2c8307ff242a5b82b31f2.webp`,x:0,z:.94,width:1.5,height:.3913},{texture:`skin-generator_teeth_top_1048`,path:`assets/runtime/f108c8cbfb263670e1347ad2.webp`,x:0,z:-.94,width:1.5,height:.2308},{texture:`skin-generator_wheel_1779`,path:`assets/runtime/7a0ad8b847b808325d04b0ea.webp`,x:-1.6,z:-.65,width:.65,height:1.35},{texture:`skin-generator_wheel_1779`,path:`assets/runtime/7a0ad8b847b808325d04b0ea.webp`,x:1.6,z:-.65,width:.65,height:1.35}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`operator`,name:`驾驶员`,color:`#6ec8ff`,layers:[{texture:`skin-operator_base_1242`,path:`assets/runtime/71a921522e76c926ec76a07f.webp`,x:-.013,z:-.0649,width:3.1922,height:3.1756},{texture:`skin-operator_ear_1672`,path:`assets/runtime/77f7b5200c22cff34e54f05e.webp`,x:-1.6,z:-.65,width:.65,height:.8177},{texture:`skin-operator_ear_1672`,path:`assets/runtime/77f7b5200c22cff34e54f05e.webp`,x:1.6,z:-.65,width:.65,height:.8177},{texture:`skin-operator_helmet_1076`,path:`assets/runtime/51d5579ccd77f7a007b00fde.webp`,x:0,z:-1.65,width:3,height:1.701}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`surveyor`,name:`测绘员`,color:`#6ec8ff`,layers:[{texture:`skin-surveyor_base_1520`,path:`assets/runtime/17e1a9f427ca8e724365841e.webp`,x:.0032,z:-.1756,width:2.9091,height:2.9542},{texture:`skin-surveyor_beard_1772`,path:`assets/runtime/23db082caa90096f0e650e8b.webp`,x:0,z:1.15,width:1.8,height:.7017},{texture:`skin-surveyor_helmet_1569`,path:`assets/runtime/3533994ef1db4c7ca0027ec8.webp`,x:0,z:-1.65,width:3,height:1.701},{texture:`skin-surveyor_moustache_975`,path:`assets/runtime/afe1bf240a2ef74d63a46db1.webp`,x:0,z:1.15,width:1.8,height:.9672}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`welder`,name:`焊工`,color:`#6ec8ff`,layers:[{texture:`skin-welder_base_1425`,path:`assets/runtime/f917d551ff0cd6327028c4f0.webp`,x:.0032,z:-.5058,width:2.8701,height:3.4241},{texture:`skin-welder_glasses_1258`,path:`assets/runtime/723cf648a9fbef2015ae30e4.webp`,x:0,z:-1.3,width:1.3,height:.3784}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`worker`,name:`建筑工人`,color:`#6ec8ff`,layers:[{texture:`skin-worker_base_1557`,path:`assets/runtime/a82b1f9f83b3fd8fa1c0dbc2.webp`,x:.0065,z:-.2099,width:2.8766,height:2.8855},{texture:`skin-worker_helmet_1608`,path:`assets/runtime/2e96a62243ead5d79f421ab6.webp`,x:0,z:-1.65,width:3,height:1.701}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`medusa`,name:`美杜莎`,color:`#6ec8ff`,layers:[{texture:`skin-Medusa_Base_1124`,path:`assets/runtime/f65bdb853ffea8dc285b048d.webp`,x:.0038,z:-.2253,width:2.855,height:2.8221},{texture:`skin-Medusa_Snakes_Up_Front_1156`,path:`assets/runtime/a6cda4489faa8f92900fc114.webp`,x:0,z:-1.65,width:3,height:1.9043},{texture:`skin-Medusa_Teeth_Up_911`,path:`assets/runtime/c890af1d58858bd115b76c22.webp`,x:0,z:-.94,width:1.5,height:.6481}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`wrestler`,name:`摔跤手`,color:`#6ec8ff`,layers:[{texture:`skin-Skin_Wrestler_1598`,path:`assets/runtime/ed034a0824d09974029b05f6.webp`,x:0,z:-.4381,width:3.0621,height:4.419},{texture:`skin-Skin_WrestlerArm_1203`,path:`assets/runtime/12a7ae90447b4318994b095c.webp`,x:-1.75,z:.1,width:.85,height:.7153},{texture:`skin-Skin_WrestlerArm_1203`,path:`assets/runtime/12a7ae90447b4318994b095c.webp`,x:1.75,z:.1,width:.85,height:.7153}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`arc-en-ciel`,name:`彩虹`,color:`#6ec8ff`,layers:[{texture:`skin-arc en ciel dessous_1311`,path:`assets/runtime/6a8eb974fb1afc92433f1f70.webp`,x:.0472,z:.0841,width:2.8679,height:2.9346},{texture:`skin-arc en ciel dessus_1768`,path:`assets/runtime/f4bc85758b137f2e47cf17c8.webp`,x:.0472,z:.0841,width:2.8679,height:2.9346}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`baleine`,name:`鲸鱼`,color:`#6ec8ff`,layers:[{texture:`skin-baleine dessous_1020`,path:`assets/runtime/5965b09c792ccec9a5236e07.webp`,x:0,z:-.4299,width:3.2264,height:3.4393},{texture:`skin-baleine dessus_1262`,path:`assets/runtime/f42dd4d94c9f14b0c258f93f.webp`,x:0,z:-.4299,width:3.2264,height:3.4393}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`chat-gris`,name:`灰猫`,color:`#6ec8ff`,layers:[{texture:`skin-chat gris dessous_1705`,path:`assets/runtime/2fa1a070eb82a883b18e80d4.webp`,x:.0094,z:-.1923,width:2.6038,height:2.9808},{texture:`skin-chat gris dessus_988`,path:`assets/runtime/b27f0f8180cf9e3d946ccb3c.webp`,x:.0094,z:-.1923,width:2.6038,height:2.9808}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`chat-noir`,name:`黑猫`,color:`#6ec8ff`,layers:[{texture:`skin-chat noir dessous_1581`,path:`assets/runtime/b59cef9b0114c8b44d51adc8.webp`,x:.0094,z:-.1923,width:2.6038,height:2.9808},{texture:`skin-chat noir dessus_1241`,path:`assets/runtime/9d295f18b4ef386b5928f221.webp`,x:.0094,z:-.1923,width:2.6038,height:2.9808}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`chat-roux`,name:`橘猫`,color:`#6ec8ff`,layers:[{texture:`skin-chat roux dessous_1538`,path:`assets/runtime/7ff83fed394112d3140a6c15.webp`,x:.0094,z:-.1923,width:2.6038,height:2.9808},{texture:`skin-chat roux dessus_1756`,path:`assets/runtime/c90a9bbebaaef5c259d6a621.webp`,x:.0094,z:-.1923,width:2.6038,height:2.9808}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`chaudron`,name:`魔法坩埚`,color:`#6ec8ff`,layers:[{texture:`skin-chaudron dessous_1535`,path:`assets/runtime/7ab0502b680fa1a71eaae8d4.webp`,x:0,z:.0093,width:3.4906,height:2.5607},{texture:`skin-chaudron dessus_1809`,path:`assets/runtime/48e0d4c0e73994da0cf834f5.webp`,x:0,z:.0093,width:3.4906,height:2.5607}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`chauve-souris`,name:`蝙蝠`,color:`#6ec8ff`,layers:[{texture:`skin-chauve souris dessous_1469`,path:`assets/runtime/23752cb9d94c3b171e30b5a8.webp`,x:.0094,z:-.0187,width:2.6038,height:2.6168},{texture:`skin-chauve souris dessus_1745`,path:`assets/runtime/cdb6bc2b289255dbf6848eb9.webp`,x:.0094,z:-.0187,width:2.6038,height:2.6168}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`cochon`,name:`小猪`,color:`#6ec8ff`,layers:[{texture:`skin-cochon dessous_1089`,path:`assets/runtime/842eabbeb787a6b12e0dbba8.webp`,x:.0189,z:.2056,width:3,height:3.5888},{texture:`skin-cochon dessus_1078`,path:`assets/runtime/dd69b531e16d6b466fd1b859.webp`,x:.0189,z:-.1495,width:3,height:2.8785}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`cochon-groin`,name:`猪鼻`,color:`#6ec8ff`,layers:[{texture:`skin-cochon groin dessous_948`,path:`assets/runtime/1314c011cfbf7fcc9da6cd7f.webp`,x:0,z:0,width:3.4,height:2.513},{texture:`skin-cochon groin dessus_1125`,path:`assets/runtime/ae94de51c90c57df9fa0dc4e.webp`,x:0,z:0,width:3.4,height:2.513}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`coeur`,name:`爱心`,color:`#6ec8ff`,layers:[{texture:`skin-coeur dessous_1747`,path:`assets/runtime/e8608937df1bfe9ab2941de7.webp`,x:.0189,z:.1121,width:3.1887,height:3.1028},{texture:`skin-coeur dessus_947`,path:`assets/runtime/77ff1400b618215880fb161b.webp`,x:.0189,z:.1121,width:3.1887,height:3.1028}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`diable`,name:`小恶魔`,color:`#6ec8ff`,layers:[{texture:`skin-diable dessous_1270`,path:`assets/runtime/677263df0ddd152aecb8f522.webp`,x:.0187,z:-.1776,width:2.5794,height:2.9346},{texture:`skin-diable dessus_1498`,path:`assets/runtime/8c0d86ead8fbabced925e349.webp`,x:.0187,z:-.1776,width:2.5794,height:2.9346}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`godzilla`,name:`巨兽`,color:`#6ec8ff`,layers:[{texture:`skin-godzilla dessous_1558`,path:`assets/runtime/833968aa4eda9512d67221f6.webp`,x:.0094,z:-.4953,width:3.0189,height:3.5701},{texture:`skin-godzilla dessus_926`,path:`assets/runtime/aa6283d0f06cec372e0a2971.webp`,x:.0094,z:-.1495,width:2.6038,height:2.8785}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`grenouille`,name:`青蛙`,color:`#6ec8ff`,layers:[{texture:`skin-grenouille dessous_1207`,path:`assets/runtime/e93a0562945c6efcc80e6ee0.webp`,x:.0094,z:.0093,width:2.6038,height:2.5607},{texture:`skin-grenouille dessus_1350`,path:`assets/runtime/f2a4f57759c4f18de59d3e4d.webp`,x:.0094,z:-.0841,width:2.6038,height:2.7477}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`haloween-momie`,name:`木乃伊`,color:`#6ec8ff`,layers:[{texture:`skin-haloween momie dessous_1806`,path:`assets/runtime/619d1a34b13687f45a3db6af.webp`,x:.0093,z:-.1589,width:2.5607,height:2.8972},{texture:`skin-haloween momie dessus_1565`,path:`assets/runtime/2b9aa4c4d44875b12ab97c59.webp`,x:.0187,z:-.1495,width:2.6168,height:2.8785}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`haloween-water-monster`,name:`水怪`,color:`#6ec8ff`,layers:[{texture:`skin-haloween water monster dessous_889`,path:`assets/runtime/42b55fcd64361ea2b495af7c.webp`,x:.0093,z:-.1495,width:2.5607,height:2.8785},{texture:`skin-haloween water monster dessus_1510`,path:`assets/runtime/0c02242f05a3acf9faa4f74c.webp`,x:-.0187,z:-.1495,width:3.4393,height:2.8785}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`lapin`,name:`兔子`,color:`#6ec8ff`,layers:[{texture:`skin-lapin dessous_914`,path:`assets/runtime/73273f822726cf644f6aba3b.webp`,x:.0094,z:-.4766,width:2.6038,height:3.5327},{texture:`skin-lapin dessus_1621`,path:`assets/runtime/c7ecdfd84c06bda70fdb948a.webp`,x:.0094,z:-.4766,width:2.6038,height:3.5327}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`requin`,name:`鲨鱼`,color:`#6ec8ff`,layers:[{texture:`skin-requin dessous_1189`,path:`assets/runtime/00fe5215e13e763d0770b11c.webp`,x:.0094,z:-.271,width:3.434,height:3.1215},{texture:`skin-requin dessus_1580`,path:`assets/runtime/a40db808ce302c050a11b22d.webp`,x:.0094,z:-.271,width:3.434,height:3.1215}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`sandworm`,name:`沙虫`,color:`#6ec8ff`,layers:[{texture:`skin-sandworm dessous_1215`,path:`assets/runtime/a9d1e09649a99502ec4b72bf.webp`,x:.0094,z:.0093,width:2.6038,height:2.5607},{texture:`skin-sandworm dessus_917`,path:`assets/runtime/12be208108ad4ed000559a73.webp`,x:.0094,z:.0093,width:2.6038,height:2.5607}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`souris`,name:`老鼠`,color:`#6ec8ff`,layers:[{texture:`skin-souris dessous_1641`,path:`assets/runtime/8e28cf1ba7f7935065130a1b.webp`,x:.0094,z:-.3738,width:3.3962,height:3.3271},{texture:`skin-souris dessus_1253`,path:`assets/runtime/6f1718066577cd8bdd773305.webp`,x:.0094,z:-.4112,width:3.3962,height:3.4019}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`trou-noir`,name:`深空`,color:`#6ec8ff`,layers:[{texture:`skin-trou noir dessous_1007`,path:`assets/runtime/511b29d521dce8d177004fde.webp`,x:.0079,z:.008,width:3.5873,height:3.696},{texture:`skin-trou noir dessus_1701`,path:`assets/runtime/ada9a7f1dbbd08cab9f91fa9.webp`,x:.0093,z:.0185,width:3.6667,height:3.7222}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`zombie`,name:`僵尸`,color:`#6ec8ff`,layers:[{texture:`skin-zombie dessous_1283`,path:`assets/runtime/b84bb137506a85a9ac73f472.webp`,x:.0094,z:-.1682,width:3.0189,height:2.9159},{texture:`skin-zombie dessus_1651`,path:`assets/runtime/3771a35e0a3e0fff4880e625.webp`,x:.0094,z:-.1682,width:3.0189,height:2.9159}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`apollo`,name:`阿波罗`,color:`#6ec8ff`,layers:[{texture:`skin-Hole_Base_1333`,path:`assets/runtime/8830ea2123bde437ceb5b0b7.webp`,x:.0038,z:-.2213,width:2.855,height:2.83},{texture:`skin-Apollo_Hair_Back_1501`,path:`assets/runtime/6a610470827e7749cb5d3cde.webp`,x:0,z:-1.5,width:3,height:1.5796},{texture:`skin-Apollo_Hair_Front_1288`,path:`assets/runtime/0c57318a567f3391692d670e.webp`,x:0,z:-1.5,width:3,height:1.7519},{texture:`skin-Apollo_Lyre_1811`,path:`assets/runtime/9981e76850da54f08c703e5b.webp`,x:1.9,z:0,width:.85,height:.8282},{texture:`skin-Apollo_Wreath_1340`,path:`assets/runtime/b9880c604c16009ec923a892.webp`,x:0,z:-1.5,width:3,height:1.1271}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`atena`,name:`雅典娜`,color:`#6ec8ff`,layers:[{texture:`skin-Hole_Base_1333`,path:`assets/runtime/8830ea2123bde437ceb5b0b7.webp`,x:.0038,z:-.2213,width:2.855,height:2.83},{texture:`skin-Atena_Dress_1406`,path:`assets/runtime/ed3e1cc74ef657073357b570.webp`,x:0,z:1.2,width:3,height:1.1285},{texture:`skin-Atena_Hair_845`,path:`assets/runtime/580fe636b8c8209e60d8c4dc.webp`,x:0,z:-1.5,width:3,height:1.4299},{texture:`skin-Atena_Helmet_915`,path:`assets/runtime/907cc7d694c51e96105e8dfe.webp`,x:0,z:-1.5,width:3,height:2.6955},{texture:`skin-Atena_Pin_Left_1504`,path:`assets/runtime/80ede3d96b75dc3331d117eb.webp`,x:1.9,z:0,width:.85,height:.918},{texture:`skin-Atena_Shield_Right_1717`,path:`assets/runtime/7e98c3ea5f61f0787c9d4fb5.webp`,x:1.9,z:0,width:.85,height:.8609}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`cyclops`,name:`独眼巨人`,color:`#6ec8ff`,layers:[{texture:`skin-Hole_Base_1333`,path:`assets/runtime/8830ea2123bde437ceb5b0b7.webp`,x:.0038,z:-.2213,width:2.855,height:2.83},{texture:`skin-Cyclops_Ears_1087`,path:`assets/runtime/265abe0a8e2a90e8a53f107c.webp`,x:0,z:-1.5,width:3,height:.8858},{texture:`skin-Cyclops_Eye_1362`,path:`assets/runtime/97599d5d8211c9c0c453d574.webp`,x:0,z:-1.25,width:.8,height:.4077},{texture:`skin-Cyclops_Golden_Band_1736`,path:`assets/runtime/c56d9b10999d3d46679d9bce.webp`,x:0,z:-1.5,width:3,height:.4145},{texture:`skin-Cyclops_Hair_Back_1688`,path:`assets/runtime/389805ee8460f0f41d1c8a7f.webp`,x:0,z:-1.5,width:3,height:1.3701},{texture:`skin-Cyclops_Hair_Up_861`,path:`assets/runtime/cd71de5a23feb2fadf31a95a.webp`,x:0,z:-1.5,width:3,height:1.8194}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`hermes`,name:`赫尔墨斯`,color:`#6ec8ff`,layers:[{texture:`skin-Hole_Base_1333`,path:`assets/runtime/8830ea2123bde437ceb5b0b7.webp`,x:.0038,z:-.2213,width:2.855,height:2.83},{texture:`skin-Hermes_Decorations_Down_906`,path:`assets/runtime/4eb40b7c7c6783d746a2d99d.webp`,x:0,z:1.2,width:3,height:.873},{texture:`skin-Hermes_Hair_Back_1403`,path:`assets/runtime/91e192bcf8fd0299b8a9ff28.webp`,x:0,z:-1.5,width:3,height:1.2065},{texture:`skin-Hermes_Hair_Front_1047`,path:`assets/runtime/7bdf3f3cb52f7d1465cc424c.webp`,x:0,z:-1.5,width:3,height:1.0504},{texture:`skin-Hermes_Helm_1636`,path:`assets/runtime/7b7bfd00c80988de2c4988d8.webp`,x:0,z:-1.5,width:3,height:1.1376}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`poseidon`,name:`波塞冬`,color:`#6ec8ff`,layers:[{texture:`skin-Hole_Base_1333`,path:`assets/runtime/8830ea2123bde437ceb5b0b7.webp`,x:.0038,z:-.2213,width:2.855,height:2.83},{texture:`skin-Poseidon_Beard_1059`,path:`assets/runtime/ec7dce9920c11b644fd4df08.webp`,x:0,z:1.2,width:2.2,height:1.4283},{texture:`skin-Poseidon_Crown_823`,path:`assets/runtime/ea14fce10ecf9c4ff0d1f4b9.webp`,x:0,z:-1.5,width:3,height:.7916},{texture:`skin-Poseidon_Hair_Back_1531`,path:`assets/runtime/89f99c37e47a65e123f6745d.webp`,x:0,z:-1.5,width:3,height:1.7402},{texture:`skin-Poseidon_Hair_Front_898`,path:`assets/runtime/1842e3d42d03e03cf7b9e2ca.webp`,x:0,z:-1.5,width:3,height:1.4557},{texture:`skin-Poseidon_Trident_1659`,path:`assets/runtime/52fd16e2d35791843e5464e7.webp`,x:1.9,z:0,width:.85,height:.904}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`},{id:`zeus`,name:`宙斯`,color:`#6ec8ff`,layers:[{texture:`skin-Hole_Base_1333`,path:`assets/runtime/8830ea2123bde437ceb5b0b7.webp`,x:.0038,z:-.2213,width:2.855,height:2.83},{texture:`skin-Zeus_Laurel_1632`,path:`assets/runtime/9d4e4fb3d9b35701b3dbc073.webp`,x:0,z:-1.5,width:3,height:1.0965}],source:`SkinParameters / SkinResizeTransform; 原主体与配件，网页平面图层适配`}],h=[{id:`city`,name:`现代城市`,subtitle:`街区 · 车流 · 摩天大楼`,layout:`city`,models:[`dumpster`],sky:`#b9dbed`,ground:{},preview:`assets/runtime/37e5339e17d3cc8738d805e2.webp`,menuPreview:`assets/runtime/7ef5ae8dcc743800ff163a31.webp`},{id:`japan`,name:`日式小镇`,subtitle:`樱花庭院 · 寺町 · 稻田`,layout:`courtyards`,models:[`japanCastle`,`cherry`,`lantern`,`riceBasket`,`ricePlant`,`stoneLantern`,`gardenBridge`],sky:`#eedfea`,ground:{base:`japanGround`,path:`japanPath`},preview:`assets/runtime/8c66f05232eb9b521dc35a85.webp`,menuPreview:`assets/runtime/5e1afd46db2faf9493ed8ef7.webp`},{id:`pirates`,name:`海盗港湾`,subtitle:`木栈码头 · 船只 · 棕榈海岸`,layout:`wharves`,models:[`harborHut`,`warehouse`,`palm`,`barrel`,`boat`,`ship`,`well`,`cargoCrate`],sky:`#83d7df`,ground:{base:`sand`,path:`wood`},preview:`assets/runtime/ede822a9cd028c10e7e48833.webp`,menuPreview:`assets/runtime/c630dbfdffda4e0b62e3da90.webp`},{id:`farm`,name:`田园村庄`,subtitle:`田地 · 谷仓 · 乡间道路`,layout:`fields`,models:[`barn`,`farmhouse`,`hay`,`pumpkin`,`tractor`,`hayStack`,`cow`,`chickenCoop`,`wheelbarrow`],sky:`#d5ead5`,ground:{base:`farmGrass`,path:`farmPath`},preview:`assets/runtime/29b685f33623179e6f0eceb7.webp`,menuPreview:`assets/runtime/f31a597846d0b46fbf6284ec.webp`},{id:`western`,sourceId:`Western`,name:`西部小镇`,subtitle:`木屋 · 仙人掌 · 风车`,layout:`districts`,models:[`westernBarrel`,`cactus`,`westernShack`,`westernHouse`,`windmill`],sky:`#c5dcec`,ground:{base:`theme-western-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/774b21ab7d5af8931ae969c1.webp`,menuPreview:`assets/runtime/0c33709919ac759fa42dc886.webp`,district:{pattern:`avenues`,small:[`westernBarrel`],medium:[`cactus`],large:[`westernShack`],landmarks:[`westernHouse`,`windmill`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`office`,sourceId:`Office`,name:`办公园区`,subtitle:`工位 · 会议区 · 机房`,layout:`districts`,models:[`coffeeCup`,`keyboard`,`officeChair`,`officePrinter`,`officeDesk`,`officeCouch`,`serverCabinet`],sky:`#c5dcec`,ground:{base:`theme-office-ground`,path:`theme-office-ground`},groundColors:{},preview:`assets/runtime/aa7862bda1ef4fd0d20400c7.webp`,menuPreview:`assets/runtime/72c9a8b62aeb0883ccb97961.webp`,district:{pattern:`rooms`,small:[`coffeeCup`,`keyboard`,`officeChair`],medium:[`officePrinter`],large:[`officeDesk`,`officeCouch`],landmarks:[`serverCabinet`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`mall`,sourceId:`Mall`,name:`购物中心`,subtitle:`货架 · 橱窗 · 收银区`,layout:`districts`,models:[`shoppingBag`,`cashRegister`,`mannequin`,`shopShelf`,`clothesShelf`,`shopLarge`],sky:`#c5dcec`,ground:{base:`theme-mall-ground`,path:`theme-mall-ground`},groundColors:{},preview:`assets/runtime/c7eaea641b37de6179b2afa9.webp`,menuPreview:`assets/runtime/008ff7bd6a2ea34afbc4ffab.webp`,district:{pattern:`rooms`,small:[`shoppingBag`,`cashRegister`],medium:[`mannequin`,`shopShelf`],large:[`clothesShelf`],landmarks:[`shopLarge`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`scifi`,sourceId:`Scifi`,name:`未来都市`,subtitle:`机器人 · 能源站 · 科技建筑`,layout:`districts`,models:[`robotParts`,`robot`,`satelliteDish`,`scifiSmall`,`scifiLarge`],sky:`#c5dcec`,ground:{base:`theme-scifi-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/a9ffe58088329a4b935af17f.webp`,menuPreview:`assets/runtime/e024d1b0fff1f5d983ea0821.webp`,district:{pattern:`avenues`,small:[`robotParts`],medium:[`robot`,`satelliteDish`],large:[`scifiSmall`],landmarks:[`scifiLarge`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`mars`,sourceId:`Mars`,name:`火星基地`,subtitle:`科研站 · 太阳能 · 探测器`,layout:`districts`,models:[`marsBox`,`marsBarrel`,`marsRock`,`marsGenerator`,`marsSolar`,`marsStation`,`marsRocket`],sky:`#c5dcec`,ground:{base:`theme-mars-ground`,path:`farmPath`},groundColors:{base:`#b86743`,path:`#8c4d38`},preview:`assets/runtime/b5cbc6c5080114f038018461.webp`,menuPreview:`assets/runtime/cc8bbc8261facfd8800d5b36.webp`,district:{pattern:`outposts`,small:[`marsBox`,`marsBarrel`],medium:[`marsRock`],large:[`marsGenerator`,`marsSolar`],landmarks:[`marsStation`,`marsRocket`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`military`,sourceId:`Military`,name:`军事基地`,subtitle:`营房 · 瞭望塔 · 补给场`,layout:`districts`,models:[`militaryCrate`,`militaryBarrel`,`militaryTent`,`guardTower`,`barracks`],sky:`#c5dcec`,ground:{base:`theme-military-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/3456e60d6b5554b729e6fe90.webp`,menuPreview:`assets/runtime/c057341e51c6d94d155b3653.webp`,district:{pattern:`outposts`,small:[`militaryCrate`,`militaryBarrel`],medium:[`militaryCrate`,`militaryBarrel`],large:[`militaryTent`,`guardTower`],landmarks:[`barracks`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`ancient`,sourceId:`Ancient`,name:`古代城邦`,subtitle:`陶器 · 石柱 · 拱门`,layout:`districts`,models:[`ancientPot`,`ancientPotTall`,`ancientPillar`,`ancientArch`,`ancientHouse`],sky:`#c5dcec`,ground:{base:`theme-ancient-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/c3ece6149c4f86314a86896d.webp`,menuPreview:`assets/runtime/92893e5fe95f1665145eed76.webp`,district:{pattern:`courts`,small:[`ancientPot`,`ancientPotTall`],medium:[`ancientPillar`],large:[`ancientPillar`],landmarks:[`ancientArch`,`ancientHouse`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`apocalypse`,sourceId:`Apocalypse`,name:`废土街区`,subtitle:`废墟 · 残骸 · 幸存据点`,layout:`districts`,models:[`rubble`,`oldTire`,`brokenBike`,`wreckedCar`,`ruinArch`,`burnedHouse`],sky:`#c5dcec`,ground:{base:`theme-apocalypse-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/d8ea88f911defbe2a0030c35.webp`,menuPreview:`assets/runtime/1185f5a2eb71570f54bc1d42.webp`,district:{pattern:`outposts`,small:[`rubble`,`oldTire`],medium:[`brokenBike`],large:[`wreckedCar`],landmarks:[`ruinArch`,`burnedHouse`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`egypt`,sourceId:`Egypt`,name:`沙漠古迹`,subtitle:`金字塔 · 石像 · 方尖碑`,layout:`districts`,models:[`egyptPot`,`egyptRock`,`smallSphinx`,`obelisk`,`sphinx`,`pyramid`],sky:`#c5dcec`,ground:{base:`theme-egypt-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/0c8bbab37f9426d0c666cf69.webp`,menuPreview:`assets/runtime/b4df58c2c59ba16dac8e8b61.webp`,district:{pattern:`courts`,small:[`egyptPot`,`egyptRock`],medium:[`egyptPot`,`egyptRock`],large:[`smallSphinx`,`obelisk`],landmarks:[`sphinx`,`pyramid`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`construction`,sourceId:`Construction`,name:`建筑工地`,subtitle:`路障 · 材料堆 · 施工设施`,layout:`districts`,models:[`trafficCone`,`cementPallet`,`concretePipe`,`scaffolding`,`portableOffice`],sky:`#c5dcec`,ground:{base:`theme-construction-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/e32bf46e56a962c73caac7b1.webp`,menuPreview:`assets/runtime/7e2af8f0708e4195a22f614e.webp`,district:{pattern:`avenues`,small:[`trafficCone`],medium:[`cementPallet`,`concretePipe`],large:[`scaffolding`],landmarks:[`portableOffice`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`jurassic`,sourceId:`Jurassic`,name:`侏罗纪岛`,subtitle:`恐龙 · 蕨类 · 岩石`,layout:`districts`,models:[`fern`,`jungleRock`,`junglePalm`,`stegosaurus`,`tyrannosaurus`],sky:`#c5dcec`,ground:{base:`theme-jurassic-ground`,path:`farmPath`},groundColors:{},preview:`assets/runtime/dc58db7af4b70a7df9327fe2.webp`,menuPreview:`assets/runtime/88b5dd44b0e494b83b89e5fe.webp`,district:{pattern:`outposts`,small:[`fern`,`jungleRock`],medium:[`junglePalm`],large:[`junglePalm`],landmarks:[`stegosaurus`,`tyrannosaurus`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`},{id:`winter`,sourceId:`Winter`,name:`冬日村落`,subtitle:`木屋 · 松树 · 冬季街道`,layout:`districts`,models:[`winterWood`,`winterRock`,`winterPine`,`winterCabin`,`winterLodge`],sky:`#c5dcec`,ground:{base:`theme-winter-ground`,path:`farmPath`},groundColors:{base:`#e8f1f7`,path:`#b4cbd7`},preview:`assets/runtime/116e40c1dbfbc9dae149de56.webp`,menuPreview:`assets/runtime/2e7c6fdd8ee5fc671a4ccf99.webp`,district:{pattern:`courts`,small:[`winterWood`,`winterRock`],medium:[`winterWood`,`winterRock`],large:[`winterPine`],landmarks:[`winterCabin`,`winterLodge`]},adaptation:`Source world identity; authored web district layout, scales and scores. OBJ-to-material bindings use the theme atlas and require visual review.`}],g={japanCastle:{category:`Building`,shape:[24,8,24.00000092291907],level:17,points:17,radius:12.000000461459535,respawn:!1},cherry:{category:`InanimateObject`,shape:[5,7,4.669775354480189],level:3,points:3,radius:2.5,respawn:!1},lantern:{category:`InanimateObject`,shape:[1.2,2,1.1999999728375899],level:1,points:1,radius:.6,respawn:!1},riceBasket:{category:`InanimateObject`,shape:[1.3,1.3,1.4784972300912131],level:1,points:1,radius:.7392486150456066,respawn:!1},ricePlant:{category:`InanimateObject`,shape:[1.5,1.5,1.4511045355967271],level:1,points:1,radius:.75,respawn:!1},harborHut:{category:`Building`,shape:[16,13,23.40255158294649],level:12,points:12,radius:11.701275791473245,respawn:!1},warehouse:{category:`Building`,shape:[24,18,24.353374903362425],level:16,points:16,radius:12.176687451681213,respawn:!1},palm:{category:`InanimateObject`,shape:[5,9,4.577464459224144],level:3,points:3,radius:2.5,respawn:!1},barrel:{category:`InanimateObject`,shape:[1.5,2,1.480555552748738],level:1,points:1,radius:.75,respawn:!1},boat:{category:`InanimateObject`,shape:[6,4,18.32688491679888],level:7,points:7,radius:9.16344245839944,respawn:!1},ship:{category:`InanimateObject`,shape:[14,18,29.398563944501603],level:13,points:13,radius:14.699281972250802,respawn:!1},well:{category:`InanimateObject`,shape:[4,3.5,4.139072667124048],level:3,points:3,radius:2.069536333562024,respawn:!1},barn:{category:`Building`,shape:[22,20,23.05063071202594],level:15,points:15,radius:11.52531535601297,respawn:!1},farmhouse:{category:`Building`,shape:[18,15,14.651020049594063],level:13,points:13,radius:9,respawn:!1},hay:{category:`InanimateObject`,shape:[2.5,2.4,2.4963568702308976],level:2,points:2,radius:1.25,respawn:!1},pumpkin:{category:`InanimateObject`,shape:[1.2,1,2.2784012486464107],level:1,points:1,radius:1.1392006243232053,respawn:!1},tractor:{category:`Vehicle`,shape:[3.8,4,9.041967115464034],level:5,points:5,radius:4.520983557732017,respawn:!1},stoneLantern:{category:`InanimateObject`,shape:[6.5,7,6.518137660345804],level:7,points:7,radius:3.259068830172902,respawn:!1},cargoCrate:{category:`InanimateObject`,shape:[5,4,4.929654924368704],level:5,points:5,radius:2.5,respawn:!1},hayStack:{category:`InanimateObject`,shape:[5,3,3.6966670820819547],level:5,points:5,radius:2.5,respawn:!1},cow:{category:`InanimateObject`,shape:[2.5,5.611813328493363,8.902952173443015],level:3,points:3,radius:4.451476086721508,respawn:!1},chickenCoop:{category:`Building`,shape:[5,5.501583011223173,8.675032827878905],level:5,points:5,radius:4.337516413939452,respawn:!1},wheelbarrow:{category:`InanimateObject`,shape:[1.6,1.8984398252013264,3.782464654657802],level:2,points:2,radius:1.891232327328901,respawn:!1},dumpster:{category:`InanimateObject`,shape:[3,1.7017728403163903,1.8675703457415467],level:3,points:3,radius:1.5,respawn:!1},gardenBridge:{category:`InanimateObject`,shape:[7,7.194591028844269,6.878101441850252],level:6,points:6,radius:3.5,respawn:!1},westernBarrel:{category:`InanimateObject`,shape:[1.2,1.5327176982825188,1.2],level:1,points:1,radius:.6,respawn:!1},cactus:{category:`InanimateObject`,shape:[2.5,5.4165224820990385,2.3557067420665163],level:3,points:3,radius:1.25,respawn:!1},westernShack:{category:`Building`,shape:[12,3.5649813302682896,7.556009063802784],level:10,points:10,radius:6,respawn:!1},westernHouse:{category:`Building`,shape:[18,25.112581263538587,26.860924551464066],level:15,points:15,radius:13.430462275732033,respawn:!1},windmill:{category:`Building`,shape:[10,21.818180617464638,10.440771907430216],level:13,points:13,radius:5.220385953715108,respawn:!1},coffeeCup:{category:`InanimateObject`,shape:[.8,.9059348476697318,.7831028832347295],level:1,points:1,radius:.4,respawn:!1},keyboard:{category:`InanimateObject`,shape:[1.5,.08455053754366612,.4744137562376151],level:1,points:1,radius:.75,respawn:!1},officeChair:{category:`InanimateObject`,shape:[2,3.4552402372904707,2.1247527528512964],level:2,points:2,radius:1.0623763764256482,respawn:!1},officePrinter:{category:`InanimateObject`,shape:[3,1.668622562728107,2.678911721742727],level:4,points:4,radius:1.5,respawn:!1},officeDesk:{category:`InanimateObject`,shape:[6,2.298199593930895,2.6605918588182513],level:7,points:7,radius:3,respawn:!1},officeCouch:{category:`InanimateObject`,shape:[7,6.092876833593028,5.477325214482416],level:9,points:9,radius:3.5,respawn:!1},serverCabinet:{category:`InanimateObject`,shape:[5,10.806287446986689,5.356009564116289],level:12,points:12,radius:2.6780047820581445,respawn:!1},shoppingBag:{category:`InanimateObject`,shape:[1,6.801907640366327,4.75063226938569],level:1,points:1,radius:2.375316134692845,respawn:!1},cashRegister:{category:`InanimateObject`,shape:[2,1.9919426455095723,1.707828087976724],level:2,points:2,radius:1,respawn:!1},mannequin:{category:`InanimateObject`,shape:[1.5,3.313494365570654,.8115920587056308],level:3,points:3,radius:.75,respawn:!1},shopShelf:{category:`InanimateObject`,shape:[5,5.5035544,.9074560199999999],level:6,points:6,radius:2.5,respawn:!1},clothesShelf:{category:`InanimateObject`,shape:[7,13.931654722537766,3.170981528616973],level:9,points:9,radius:3.5,respawn:!1},shopLarge:{category:`Building`,shape:[20,20.998239533743963,14.080761527172683],level:16,points:16,radius:10,respawn:!1},robotParts:{category:`InanimateObject`,shape:[1.4,1.1779455778313246,2.0048337653870787],level:1,points:1,radius:1.0024168826935393,respawn:!1},robot:{category:`InanimateObject`,shape:[1.5,1.335142490000566,.3195386810963752],level:3,points:3,radius:.75,respawn:!1},satelliteDish:{category:`InanimateObject`,shape:[6,10.203634487088175,7.858361159011714],level:6,points:6,radius:3.929180579505857,respawn:!1},scifiSmall:{category:`Building`,shape:[12,7.9273553240980705,7.777525952709889],level:11,points:11,radius:6,respawn:!1},scifiLarge:{category:`Building`,shape:[8,23.463085822234305,3.919462761087762],level:17,points:17,radius:4,respawn:!1},marsBox:{category:`InanimateObject`,shape:[1.3,1.3,1.3000000000000003],level:1,points:1,radius:.6500000000000001,respawn:!1},marsBarrel:{category:`InanimateObject`,shape:[1.5,2.4061223172274295,1.5000000000000002],level:2,points:2,radius:.7500000000000001,respawn:!1},marsRock:{category:`InanimateObject`,shape:[4,1.3074120742214208,4.437424022871733],level:4,points:4,radius:2.2187120114358665,respawn:!1},marsGenerator:{category:`InanimateObject`,shape:[6,4.7780904102332045,7.68539301053833],level:7,points:7,radius:3.842696505269165,respawn:!1},marsSolar:{category:`InanimateObject`,shape:[8,15.78779839251445,10.355437480042776],level:9,points:9,radius:5.177718740021388,respawn:!1},marsStation:{category:`Building`,shape:[18,13.472528128647793,18],level:16,points:16,radius:9,respawn:!1},marsRocket:{category:`Building`,shape:[7,11.332631619574887,7],level:18,points:18,radius:3.5,respawn:!1},militaryCrate:{category:`InanimateObject`,shape:[1.4,.322971654378046,.9045943062617943],level:1,points:1,radius:.7,respawn:!1},militaryBarrel:{category:`InanimateObject`,shape:[1.5,2.161791685445018,1.4564333756388474],level:2,points:2,radius:.75,respawn:!1},militaryTent:{category:`Building`,shape:[9,6.391337660535155,8.868475007894595],level:8,points:8,radius:4.5,respawn:!1},guardTower:{category:`Building`,shape:[7,21.34033729195185,7.179067877641899],level:11,points:11,radius:3.5895339388209493,respawn:!1},barracks:{category:`Building`,shape:[15.410469547068805,11.010505133156961,27.999999999999996],level:16,points:16,radius:13.999999999999998,respawn:!1},ancientPot:{category:`InanimateObject`,shape:[1.2,1.804385643615346,1.1412690553790057],level:1,points:1,radius:.6,respawn:!1},ancientPotTall:{category:`InanimateObject`,shape:[1.8,2.858896008212632,1.7119020894511108],level:2,points:2,radius:.9,respawn:!1},ancientPillar:{category:`InanimateObject`,shape:[3,10.453483127561563,3.4641016652751397],level:6,points:6,radius:1.7320508326375699,respawn:!1},ancientArch:{category:`Building`,shape:[16,16.175685986105872,7.132128088070387],level:15,points:15,radius:8,respawn:!1},ancientHouse:{category:`Building`,shape:[18,8.395360156468845,15.174996279627136],level:16,points:16,radius:9,respawn:!1},rubble:{category:`InanimateObject`,shape:[1.5,.5885217305344105,1.7734198549482563],level:1,points:1,radius:.8867099274741281,respawn:!1},oldTire:{category:`InanimateObject`,shape:[1.8,.5346792848697334,1.8000019377740453],level:2,points:2,radius:.9000009688870226,respawn:!1},brokenBike:{category:`InanimateObject`,shape:[3,.6521531009179324,1.8962572598876433],level:4,points:4,radius:1.5,respawn:!1},wreckedCar:{category:`InanimateObject`,shape:[5,2.8273534297166627,11.830302018043366],level:7,points:7,radius:5.915151009021683,respawn:!1},ruinArch:{category:`Building`,shape:[12,16.238895866029537,3.7037622457441164],level:13,points:13,radius:6,respawn:!1},burnedHouse:{category:`Building`,shape:[20,16.37854749817529,21.391438239099926],level:17,points:17,radius:10.695719119549963,respawn:!1},egyptPot:{category:`InanimateObject`,shape:[1.2,1.6282945711777939,1.1412678454126028],level:1,points:1,radius:.6,respawn:!1},egyptRock:{category:`InanimateObject`,shape:[2,.40349615575279674,1.614026863284116],level:2,points:2,radius:1,respawn:!1},smallSphinx:{category:`InanimateObject`,shape:[5,6.527339975273573,12.250916388102905],level:7,points:7,radius:6.125458194051452,respawn:!1},obelisk:{category:`InanimateObject`,shape:[4,18.870934443803716,4],level:11,points:11,radius:2,respawn:!1},sphinx:{category:`InanimateObject`,shape:[9.983836982035323,11.415336668808171,28],level:15,points:15,radius:14,respawn:!1},pyramid:{category:`Building`,shape:[24,14.291854773516759,24.0000081438696],level:18,points:18,radius:12.0000040719348,respawn:!1},trafficCone:{category:`InanimateObject`,shape:[1.2,2.1773756500745605,1.2],level:1,points:1,radius:.6,respawn:!1},cementPallet:{category:`InanimateObject`,shape:[3,2.158460878818628,3.4140841082819033],level:3,points:3,radius:1.7070420541409517,respawn:!1},concretePipe:{category:`InanimateObject`,shape:[4,4.000000663181537,7.252271693283436],level:5,points:5,radius:3.626135846641718,respawn:!1},scaffolding:{category:`InanimateObject`,shape:[8,7.302804673424428,4.411366120248445],level:9,points:9,radius:4,respawn:!1},portableOffice:{category:`Building`,shape:[15.311422718795834,18.14334950048706,28],level:14,points:14,radius:14,respawn:!1},fern:{category:`InanimateObject`,shape:[1.6,.680083991440841,1.610273750900444],level:1,points:1,radius:.805136875450222,respawn:!1},jungleRock:{category:`InanimateObject`,shape:[2.5,1.1892825347745595,2.4690239608277538],level:2,points:2,radius:1.25,respawn:!1},junglePalm:{category:`InanimateObject`,shape:[6,6.228766507646174,6.170677976473334],level:6,points:6,radius:3.085338988236667,respawn:!1},stegosaurus:{category:`InanimateObject`,shape:[4,8.831938737491082,18.441151387695037],level:13,points:13,radius:9.220575693847518,respawn:!1},tyrannosaurus:{category:`InanimateObject`,shape:[4.8,10.715058596182152,23.69490226500197],level:17,points:17,radius:11.847451132500986,respawn:!1},winterWood:{category:`InanimateObject`,shape:[1.4,1.9599999365745504,1.381851849232155],level:1,points:1,radius:.7,respawn:!1},winterRock:{category:`InanimateObject`,shape:[2.5,.504370194690996,2.0175335791051445],level:2,points:2,radius:1.25,respawn:!1},winterPine:{category:`InanimateObject`,shape:[5,14.811946324237015,4.2534746927542235],level:7,points:7,radius:2.5,respawn:!1},winterCabin:{category:`Building`,shape:[14,8.732666001217048,9.745052489389211],level:13,points:13,radius:7,respawn:!1},winterLodge:{category:`Building`,shape:[20,8.33657956855117,8.834338569874868],level:17,points:17,radius:10,respawn:!1}},_=e=>m.find(t=>t.id===e)??m[0],v=e=>h.find(t=>t.id===e)??h[0],y=[`panda`,`pirate`,`tiger`,`alien`,`pug`,`ghost`],b=e=>`./${e}`;function x(e){return e.growth.active===`improved`?e.growth.improvedXp:e.growth.defaultXp}function S(e,t,n=!1){let r=x(e)[t];if(r<0||n)return r;let i=Math.max(0,Math.min(1,(t-e.growth.lateStartLevel)/(e.hole.levelMax-1-e.growth.lateStartLevel)));return Math.round(r*(1+e.growth.lateXpIncrease*i))}async function C(){let e=await fetch(b(`config/balance.json`));if(!e.ok)throw Error(`无法读取游戏数值，请刷新重试。`);let t=await e.json();if(!t.match||!t.growth||!t.world||!Number.isFinite(t.match.durationSeconds)||t.match.durationSeconds<=0||x(t).length<t.hole.levelMax+2||!Number.isFinite(t.storage?.starsPerCareerLevel)||t.storage.starsPerCareerLevel<=0)throw Error(`游戏数值不完整，请检查 balance.json。`);return t}var w=1e3,T=1001,E=1002,D=1003,O=1004,k=1005,A=1006,j=1007,ee=1008,M=1009,te=1010,N=1011,ne=1012,re=1013,ie=1014,ae=1015,oe=1016,se=1017,ce=1018,le=1020,P=35902,F=35899,ue=1021,de=1022,fe=1023,pe=1026,me=1027,I=1028,he=1029,ge=1030,_e=1031,ve=1033,ye=33776,be=33777,xe=33778,Se=33779,Ce=35840,we=35841,Te=35842,Ee=35843,De=36196,Oe=37492,ke=37496,Ae=37488,je=37489,L=37490,Me=37491,R=37808,Ne=37809,z=37810,Pe=37811,B=37812,V=37813,Fe=37814,Ie=37815,Le=37816,Re=37817,ze=37818,Be=37819,Ve=37820,He=37821,Ue=36492,We=36494,Ge=36495,Ke=36283,qe=36284,Je=36285,Ye=36286,Xe=2300,Ze=2301,Qe=2302,$e=2303,et=2400,tt=2401,nt=2402,rt=3200,it=3201,at=`srgb`,ot=`srgb-linear`,st=`linear`,ct=`srgb`,lt=7680,ut=35044,dt=35048,ft=2e3;function pt(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function mt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function ht(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function gt(){let e=ht(`canvas`);return e.style.display=`block`,e}var _t={};function vt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function yt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=yt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=yt(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function bt(...e){let t=e.join(` `);t in _t||(_t[t]=!0,H(...e))}function xt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var St={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Ct=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},wt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Tt=Math.PI/180,Et=180/Math.PI;function Dt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(wt[e&255]+wt[e>>8&255]+wt[e>>16&255]+wt[e>>24&255]+`-`+wt[t&255]+wt[t>>8&255]+`-`+wt[t>>16&15|64]+wt[t>>24&255]+`-`+wt[n&63|128]+wt[n>>8&255]+`-`+wt[n>>16&255]+wt[n>>24&255]+wt[r&255]+wt[r>>8&255]+wt[r>>16&255]+wt[r>>24&255]).toLowerCase()}function W(e,t,n){return Math.max(t,Math.min(n,e))}function Ot(e,t){return(e%t+t)%t}function kt(e,t,n){return(1-n)*e+n*t}function At(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function G(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var K=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(W(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},q=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Nt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Nt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Mt.copy(this).projectOnVector(e),this.sub(Mt)}reflect(e){return this.sub(Mt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Mt=new q,Nt=new jt,J=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return bt(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Pt.makeScale(e,t)),this}rotate(e){return bt(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Pt.makeRotation(-e)),this}translate(e,t){return bt(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Pt.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pt=new J,Ft=new J().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),It=new J().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Lt(){let e={enabled:!0,workingColorSpace:ot,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=Rt(e.r),e.g=Rt(e.g),e.b=Rt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=zt(e.r),e.g=zt(e.g),e.b=zt(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?st:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return bt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return bt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ot]:{primaries:t,whitePoint:r,transfer:st,toXYZ:Ft,fromXYZ:It,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:at},outputColorSpaceConfig:{drawingBufferColorSpace:at}},[at]:{primaries:t,whitePoint:r,transfer:ct,toXYZ:Ft,fromXYZ:It,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:at}}}),e}var Y=Lt();function Rt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function zt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Bt,Vt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bt===void 0&&(Bt=ht(`canvas`)),Bt.width=e.width,Bt.height=e.height;let t=Bt.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Bt}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=ht(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Rt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Rt(t[e]/255)*255):t[e]=Rt(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ht=0,Ut=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ht++}),this.uuid=Dt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Wt(r[t].image)):e.push(Wt(r[t]))}else e=Wt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Wt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Vt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var Gt=0,Kt=new q,qt=class e extends Ct{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=T,i=T,a=A,o=ee,s=fe,c=M,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gt++}),this.uuid=Dt(),this.name=``,this.source=new Ut(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new J,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Kt).x}get height(){return this.source.getSize(Kt).y}get depth(){return this.source.getSize(Kt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case w:e.x-=Math.floor(e.x);break;case T:e.x=e.x<0?0:1;break;case E:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case w:e.y-=Math.floor(e.y);break;case T:e.y=e.y<0?0:1;break;case E:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null,qt.DEFAULT_MAPPING=300,qt.DEFAULT_ANISOTROPY=1;var Jt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this.w=W(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this.w=W(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yt=class extends Ct{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:A,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Jt(0,0,e,t),this.scissorTest=!1,this.viewport=new Jt(0,0,e,t),this.textures=[];let r=new qt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:A,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Ut(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Xt=class extends Yt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Zt=class extends qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=D,this.minFilter=D,this.wrapR=T,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qt=class extends qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=D,this.minFilter=D,this.wrapR=T,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},X=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/$t.setFromMatrixColumn(e,0).length(),i=1/$t.setFromMatrixColumn(e,1).length(),a=1/$t.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tn,e,nn)}lookAt(e,t,n){let r=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),rn.crossVectors(n,on),rn.lengthSq()===0&&(Math.abs(n.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),rn.crossVectors(n,on)),rn.normalize(),an.crossVectors(on,rn),r[0]=rn.x,r[4]=an.x,r[8]=on.x,r[1]=rn.y,r[5]=an.y,r[9]=on.y,r[2]=rn.z,r[6]=an.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],N=r[11],ne=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*N,i[12]=a*w+o*O+s*ee+c*ne,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*N,i[13]=l*w+u*O+d*ee+f*ne,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*N,i[14]=p*w+m*O+h*ee+g*ne,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*N,i[15]=_*w+v*O+y*ee+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=$t.set(r[0],r[1],r[2]).length(),o=$t.set(r[4],r[5],r[6]).length(),s=$t.set(r[8],r[9],r[10]).length();i<0&&(a=-a),en.copy(this);let c=1/a,l=1/o,u=1/s;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=l,en.elements[5]*=l,en.elements[6]*=l,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,t.setFromRotationMatrix(en),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=ft,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=ft,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},$t=new q,en=new X,tn=new q(0,0,0),nn=new q(1,1,1),rn=new q,an=new q,on=new q,sn=new X,cn=new jt,ln=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(W(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-W(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(W(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-W(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(W(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-W(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return sn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(sn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cn.setFromEuler(this),this.setFromQuaternion(cn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ln.DEFAULT_ORDER=`XYZ`;var un=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},dn=0,fn=new q,pn=new jt,mn=new X,hn=new q,gn=new q,_n=new q,vn=new jt,yn=new q(1,0,0),bn=new q(0,1,0),xn=new q(0,0,1),Sn={type:`added`},Cn={type:`removed`},wn={type:`childadded`,child:null},Tn={type:`childremoved`,child:null},En=class e extends Ct{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dn++}),this.uuid=Dt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new q,n=new ln,r=new jt,i=new q(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new X},normalMatrix:{value:new J}}),this.matrix=new X,this.matrixWorld=new X,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new un,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pn.setFromAxisAngle(e,t),this.quaternion.multiply(pn),this}rotateOnWorldAxis(e,t){return pn.setFromAxisAngle(e,t),this.quaternion.premultiply(pn),this}rotateX(e){return this.rotateOnAxis(yn,e)}rotateY(e){return this.rotateOnAxis(bn,e)}rotateZ(e){return this.rotateOnAxis(xn,e)}translateOnAxis(e,t){return fn.copy(e).applyQuaternion(this.quaternion),this.position.add(fn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yn,e)}translateY(e){return this.translateOnAxis(bn,e)}translateZ(e){return this.translateOnAxis(xn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hn.copy(e):hn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(gn,hn,this.up):mn.lookAt(hn,gn,this.up),this.quaternion.setFromRotationMatrix(mn),r&&(mn.extractRotation(r.matrixWorld),pn.setFromRotationMatrix(mn),this.quaternion.premultiply(pn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sn),wn.child=e,this.dispatchEvent(wn),wn.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cn),Tn.child=e,this.dispatchEvent(Tn),Tn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sn),wn.child=e,this.dispatchEvent(wn),wn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gn,e,_n),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gn,vn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};En.DEFAULT_UP=new q(0,1,0),En.DEFAULT_MATRIX_AUTO_UPDATE=!0,En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Dn=class extends En{constructor(){super(),this.isGroup=!0,this.type=`Group`}},On={type:`move`},kn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(On)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Dn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},An={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},Mn={h:0,s:0,l:0};function Nn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Z=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=at){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Y.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Y.workingColorSpace){return this.r=e,this.g=t,this.b=n,Y.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Y.workingColorSpace){if(e=Ot(e,1),t=W(t,0,1),n=W(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Nn(i,r,e+1/3),this.g=Nn(i,r,e),this.b=Nn(i,r,e-1/3)}return Y.colorSpaceToWorking(this,r),this}setStyle(e,t=at){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=at){let n=An[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rt(e.r),this.g=Rt(e.g),this.b=Rt(e.b),this}copyLinearToSRGB(e){return this.r=zt(e.r),this.g=zt(e.g),this.b=zt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=at){return Y.workingToColorSpace(Pn.copy(this),e),Math.round(W(Pn.r*255,0,255))*65536+Math.round(W(Pn.g*255,0,255))*256+Math.round(W(Pn.b*255,0,255))}getHexString(e=at){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Y.workingColorSpace){Y.workingToColorSpace(Pn.copy(this),t);let n=Pn.r,r=Pn.g,i=Pn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Y.workingColorSpace){return Y.workingToColorSpace(Pn.copy(this),t),e.r=Pn.r,e.g=Pn.g,e.b=Pn.b,e}getStyle(e=at){Y.workingToColorSpace(Pn.copy(this),e);let t=Pn.r,n=Pn.g,r=Pn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(Mn);let n=kt(jn.h,Mn.h,t),r=kt(jn.s,Mn.s,t),i=kt(jn.l,Mn.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new Z;Z.NAMES=An;var Fn=class extends En{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},In=new q,Ln=new q,Rn=new q,zn=new q,Bn=new q,Vn=new q,Hn=new q,Un=new q,Wn=new q,Gn=new q,Kn=new Jt,qn=new Jt,Jn=new Jt,Yn=class e{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),In.subVectors(e,t),r.cross(In);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){In.subVectors(r,t),Ln.subVectors(n,t),Rn.subVectors(e,t);let a=In.dot(In),o=In.dot(Ln),s=In.dot(Rn),c=Ln.dot(Ln),l=Ln.dot(Rn),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,zn)!==null&&zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,zn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,zn.x),s.addScaledVector(a,zn.y),s.addScaledVector(o,zn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Kn.setScalar(0),qn.setScalar(0),Jn.setScalar(0),Kn.fromBufferAttribute(e,t),qn.fromBufferAttribute(e,n),Jn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Kn,i.x),a.addScaledVector(qn,i.y),a.addScaledVector(Jn,i.z),a}static isFrontFacing(e,t,n,r){return In.subVectors(n,t),Ln.subVectors(e,t),In.cross(Ln).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),In.cross(Ln).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Bn.subVectors(r,n),Vn.subVectors(i,n),Un.subVectors(e,n);let s=Bn.dot(Un),c=Vn.dot(Un);if(s<=0&&c<=0)return t.copy(n);Wn.subVectors(e,r);let l=Bn.dot(Wn),u=Vn.dot(Wn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Bn,a);Gn.subVectors(e,i);let f=Bn.dot(Gn),p=Vn.dot(Gn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Vn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Hn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Hn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Bn,a).addScaledVector(Vn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Xn=class{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Qn):Qn.fromBufferAttribute(r,t),Qn.applyMatrix4(e.matrixWorld),this.expandByPoint(Qn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),$n.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),$n.copy(e.boundingBox)),$n.applyMatrix4(e.matrixWorld),this.union($n)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qn),Qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(or),sr.subVectors(this.max,or),er.subVectors(e.a,or),tr.subVectors(e.b,or),nr.subVectors(e.c,or),rr.subVectors(tr,er),ir.subVectors(nr,tr),ar.subVectors(er,nr);let t=[0,-rr.z,rr.y,0,-ir.z,ir.y,0,-ar.z,ar.y,rr.z,0,-rr.x,ir.z,0,-ir.x,ar.z,0,-ar.x,-rr.y,rr.x,0,-ir.y,ir.x,0,-ar.y,ar.x,0];return!ur(t,er,tr,nr,sr)||(t=[1,0,0,0,1,0,0,0,1],!ur(t,er,tr,nr,sr))?!1:(cr.crossVectors(rr,ir),t=[cr.x,cr.y,cr.z],ur(t,er,tr,nr,sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Zn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Zn=[new q,new q,new q,new q,new q,new q,new q,new q],Qn=new q,$n=new Xn,er=new q,tr=new q,nr=new q,rr=new q,ir=new q,ar=new q,or=new q,sr=new q,cr=new q,lr=new q;function ur(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){lr.fromArray(e,a);let o=i.x*Math.abs(lr.x)+i.y*Math.abs(lr.y)+i.z*Math.abs(lr.z),s=t.dot(lr),c=n.dot(lr),l=r.dot(lr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var dr=new q,fr=new K,pr=0,mr=class extends Ct{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ut,this.updateRanges=[],this.gpuType=ae,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix3(e),this.setXY(t,fr.x,fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dr.fromBufferAttribute(this,t),dr.applyMatrix3(e),this.setXYZ(t,dr.x,dr.y,dr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dr.fromBufferAttribute(this,t),dr.applyMatrix4(e),this.setXYZ(t,dr.x,dr.y,dr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dr.fromBufferAttribute(this,t),dr.applyNormalMatrix(e),this.setXYZ(t,dr.x,dr.y,dr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dr.fromBufferAttribute(this,t),dr.transformDirection(e),this.setXYZ(t,dr.x,dr.y,dr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=At(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=G(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=At(t,this.array)),t}setX(e,t){return this.normalized&&(t=G(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=At(t,this.array)),t}setY(e,t){return this.normalized&&(t=G(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=At(t,this.array)),t}setZ(e,t){return this.normalized&&(t=G(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=At(t,this.array)),t}setW(e,t){return this.normalized&&(t=G(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=G(t,this.array),n=G(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=G(t,this.array),n=G(n,this.array),r=G(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=G(t,this.array),n=G(n,this.array),r=G(r,this.array),i=G(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},hr=class extends mr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},gr=class extends mr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},_r=class extends mr{constructor(e,t,n){super(new Float32Array(e),t,n)}},vr=new Xn,yr=new q,br=new q,xr=class{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?vr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;yr.subVectors(e,this.center);let t=yr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(yr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(br.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(yr.copy(e.center).add(br)),this.expandByPoint(yr.copy(e.center).sub(br))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Sr=0,Cr=new X,wr=new En,Tr=new q,Er=new Xn,Dr=new Xn,Or=new q,kr=class e extends Ct{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sr++}),this.uuid=Dt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(pt(e)?gr:hr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new J().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Cr.makeRotationFromQuaternion(e),this.applyMatrix4(Cr),this}rotateX(e){return Cr.makeRotationX(e),this.applyMatrix4(Cr),this}rotateY(e){return Cr.makeRotationY(e),this.applyMatrix4(Cr),this}rotateZ(e){return Cr.makeRotationZ(e),this.applyMatrix4(Cr),this}translate(e,t,n){return Cr.makeTranslation(e,t,n),this.applyMatrix4(Cr),this}scale(e,t,n){return Cr.makeScale(e,t,n),this.applyMatrix4(Cr),this}lookAt(e){return wr.lookAt(e),wr.updateMatrix(),this.applyMatrix4(wr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Tr).negate(),this.translate(Tr.x,Tr.y,Tr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new _r(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Er.setFromBufferAttribute(n),this.morphTargetsRelative?(Or.addVectors(this.boundingBox.min,Er.min),this.boundingBox.expandByPoint(Or),Or.addVectors(this.boundingBox.max,Er.max),this.boundingBox.expandByPoint(Or)):(this.boundingBox.expandByPoint(Er.min),this.boundingBox.expandByPoint(Er.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new q,1/0);else if(e){let n=this.boundingSphere.center;if(Er.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Dr.setFromBufferAttribute(n),this.morphTargetsRelative?(Or.addVectors(Er.min,Dr.min),Er.expandByPoint(Or),Or.addVectors(Er.max,Dr.max),Er.expandByPoint(Or)):(Er.expandByPoint(Dr.min),Er.expandByPoint(Dr.max))}Er.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Or.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Or));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Or.fromBufferAttribute(a,t),o&&(Tr.fromBufferAttribute(e,t),Or.add(Tr)),r=Math.max(r,n.distanceToSquared(Or))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new mr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new q,s[e]=new q;let c=new q,l=new q,u=new q,d=new K,f=new K,p=new K,m=new q,h=new q;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new q,y=new q,b=new q,x=new q;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new mr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new q,i=new q,a=new q,o=new q,s=new q,c=new q,l=new q,u=new q;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Or.fromBufferAttribute(e,t),Or.normalize(),e.setXYZ(t,Or.x,Or.y,Or.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new mr(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ar=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=ut,this.updateRanges=[],this.version=0,this.uuid=Dt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},jr=new q,Mr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jr.fromBufferAttribute(this,t),jr.applyMatrix4(e),this.setXYZ(t,jr.x,jr.y,jr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jr.fromBufferAttribute(this,t),jr.applyNormalMatrix(e),this.setXYZ(t,jr.x,jr.y,jr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jr.fromBufferAttribute(this,t),jr.transformDirection(e),this.setXYZ(t,jr.x,jr.y,jr.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=At(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=G(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=G(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=G(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=G(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=G(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=At(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=At(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=At(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=At(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=G(t,this.array),n=G(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=G(t,this.array),n=G(n,this.array),r=G(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=G(t,this.array),n=G(n,this.array),r=G(r,this.array),i=G(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){vt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new mr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){vt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Nr=new q,Pr=new q,Fr=new J,Ir=class{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Nr.subVectors(n,t).cross(Pr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Nr),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fr.getNormalMatrix(e),r=this.coplanarPoint(Nr).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Lr=0,Rr=class extends Ct{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lr++}),this.uuid=Dt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Z(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=lt,this.stencilZFail=lt,this.stencilZPass=lt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?H(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Z().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ir().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new K().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},zr=class extends Rr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Z(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Br,Vr=new q,Hr=new q,Ur=new q,Wr=new K,Gr=new K,Kr=new X,qr=new q,Jr=new q,Yr=new q,Xr=new K,Zr=new K,Qr=new K,$r=class extends En{constructor(e=new zr){if(super(),this.isSprite=!0,this.type=`Sprite`,Br===void 0){Br=new kr;let e=new Ar(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Br.setIndex([0,1,2,0,2,3]),Br.setAttribute(`position`,new Mr(e,3,0,!1)),Br.setAttribute(`uv`,new Mr(e,2,3,!1))}this.geometry=Br,this.material=e,this.center=new K(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&U(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Hr.setFromMatrixScale(this.matrixWorld),Kr.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ur.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hr.multiplyScalar(-Ur.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ei(qr.set(-.5,-.5,0),Ur,a,Hr,r,i),ei(Jr.set(.5,-.5,0),Ur,a,Hr,r,i),ei(Yr.set(.5,.5,0),Ur,a,Hr,r,i),Xr.set(0,0),Zr.set(1,0),Qr.set(1,1);let o=e.ray.intersectTriangle(qr,Jr,Yr,!1,Vr);if(o===null&&(ei(Jr.set(-.5,.5,0),Ur,a,Hr,r,i),Zr.set(0,1),o=e.ray.intersectTriangle(qr,Yr,Jr,!1,Vr),o===null))return;let s=e.ray.origin.distanceTo(Vr);s<e.near||s>e.far||t.push({distance:s,point:Vr.clone(),uv:Yn.getInterpolation(Vr,qr,Jr,Yr,Xr,Zr,Qr,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ei(e,t,n,r,i,a){Wr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Gr.copy(Wr):(Gr.x=a*Wr.x-i*Wr.y,Gr.y=i*Wr.x+a*Wr.y),e.copy(t),e.x+=Gr.x,e.y+=Gr.y,e.applyMatrix4(Kr)}var ti=new q,ni=new q,ri=new q,ii=new q,ai=class{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ni.copy(e).add(t).multiplyScalar(.5),ri.copy(t).sub(e).normalize(),ii.copy(this.origin).sub(ni);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ri),o=ii.dot(this.direction),s=-ii.dot(ri),c=ii.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ni).addScaledVector(ri,d),f}intersectSphere(e,t){if(e.radius<0)return null;ti.subVectors(e.center,this.origin);let n=ti.dot(this.direction),r=ti.dot(ti)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,N=C/w,ne=1/w,re=T-te*D,ie=E-N*D,ae=O-te*A,oe=k-N*A,se=j-te*M,ce=ee-N*M,le=se*oe-ce*ae,P=re*ce-ie*se,F=ae*ie-oe*re;if(r){if(le<0||P<0||F<0)return null}else if((le<0||P<0||F<0)&&(le>0||P>0||F>0))return null;let ue=le+P+F;if(ue===0)return null;let de=ne*(le*D+P*A+F*M);return(ue>0?de<0:de>0)?null:this.at(de/ue,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},oi=class extends Rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},si=new X,ci=new ai,li=new xr,ui=new q,di=new q,fi=new q,pi=new q,mi=new q,hi=new q,gi=new q,_i=new q,vi=class extends En{constructor(e=new kr,t=new oi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){hi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(mi.fromBufferAttribute(s,e),a?hi.addScaledVector(mi,r):hi.addScaledVector(mi.sub(t),r))}t.add(hi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),li.copy(n.boundingSphere),li.applyMatrix4(i),ci.copy(e.ray).recast(e.near),!(li.containsPoint(ci.origin)===!1&&(ci.intersectSphere(li,ui)===null||ci.origin.distanceToSquared(ui)>(e.far-e.near)**2))&&(si.copy(i).invert(),ci.copy(e.ray).applyMatrix4(si),(n.boundingBox===null||ci.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ci)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=bi(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=bi(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=bi(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=bi(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function yi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;_i.copy(s),_i.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(_i);return l<n.near||l>n.far?null:{distance:l,point:_i.clone(),object:e}}function bi(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,di),e.getVertexPosition(c,fi),e.getVertexPosition(l,pi);let u=yi(e,t,n,r,di,fi,pi,gi);if(u){let e=new q;Yn.getBarycoord(gi,di,fi,pi,e),i&&(u.uv=Yn.getInterpolatedAttribute(i,s,c,l,e,new K)),a&&(u.uv1=Yn.getInterpolatedAttribute(a,s,c,l,e,new K)),o&&(u.normal=Yn.getInterpolatedAttribute(o,s,c,l,e,new q),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new q,materialIndex:0};Yn.getNormal(di,fi,pi,t.normal),u.face=t,u.barycoord=e}return u}var xi=class extends qt{constructor(e=null,t=1,n=1,r,i,a,o,s,c=D,l=D,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Si=class extends mr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ci=new X,wi=new X,Ti=[],Ei=new Xn,Di=new X,Oi=new vi,ki=new xr,Ai=class extends vi{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Si(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Di)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),Ei.copy(e.boundingBox).applyMatrix4(Ci),this.boundingBox.union(Ei)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ci),ki.copy(e.boundingSphere).applyMatrix4(Ci),this.boundingSphere.union(ki)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Oi.geometry=this.geometry,Oi.material=this.material,Oi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ki.copy(this.boundingSphere),ki.applyMatrix4(n),e.ray.intersectsSphere(ki)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Ci),wi.multiplyMatrices(n,Ci),Oi.matrixWorld=wi,Oi.raycast(e,Ti);for(let e=0,n=Ti.length;e<n;e++){let n=Ti[e];n.instanceId=i,n.object=this,t.push(n)}Ti.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Si(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new xi(new Float32Array(r*this.count),r,this.count,I,ae));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ji=new xr,Mi=new K(.5,.5),Ni=new q,Pi=class{constructor(e=new Ir,t=new Ir,n=new Ir,r=new Ir,i=new Ir,a=new Ir){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ft,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){return ji.center.set(0,0,0),ji.radius=.7071067811865476+Mi.distanceTo(e.center),ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ni.x=r.normal.x>0?e.max.x:e.min.x,Ni.y=r.normal.y>0?e.max.y:e.min.y,Ni.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ni)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Fi=class extends qt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ii=class extends qt{constructor(e,t,n=ie,r,i,a,o=D,s=D,c,l=pe,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ut(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Li=class extends Ii{constructor(e,t=ie,n=301,r,i,a=D,o=D,s,c=pe){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ri=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},zi=class e extends kr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new _r(c,3)),this.setAttribute(`normal`,new _r(l,3)),this.setAttribute(`uv`,new _r(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new q;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Bi=class e extends kr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new _r(p,3)),this.setAttribute(`normal`,new _r(m,3)),this.setAttribute(`uv`,new _r(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Vi=class e extends kr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new q,p=new K;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new _r(s,3)),this.setAttribute(`normal`,new _r(c,3)),this.setAttribute(`uv`,new _r(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};function Hi(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Wi(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Wi(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ui(e){let t={};for(let n=0;n<e.length;n++){let r=Hi(e[n]);for(let e in r)t[e]=r[e]}return t}function Wi(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Gi(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Ki(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Y.workingColorSpace}var qi={clone:Hi,merge:Ui},Ji=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Yi=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Xi=class extends Rr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ji,this.fragmentShader=Yi,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=Gi(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Z().setHex(r.value);break;case`v2`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Jt().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new X().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Zi=class extends Xi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Qi=class extends Rr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$i=class extends Rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=rt,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ea=class extends Rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ta(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function na(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ra=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ia=class extends ra{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:et,endingEnd:et}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case tt:i=e,o=2*t-n;break;case nt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case tt:a=e,s=2*n-t;break;case nt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},aa=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},oa=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},sa=class extends ra{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=ua(n,t,g,y,r);i[p]=ca(x,o,_,b,m)}return i}};function ca(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function la(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function ua(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=ca(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=la(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var da=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ta(t,this.TimeBufferType),this.values=ta(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ta(e.times,Array),values:ta(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),na(e.settings)&&(n.settings={inTangents:ta(e.settings.inTangents,Array),outTangents:ta(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new oa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new aa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new sa(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Xe:t=this.InterpolantFactoryMethodDiscrete;break;case Ze:t=this.InterpolantFactoryMethodLinear;break;case Qe:t=this.InterpolantFactoryMethodSmooth;break;case $e:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xe;case this.InterpolantFactoryMethodLinear:return Ze;case this.InterpolantFactoryMethodSmooth:return Qe;case this.InterpolantFactoryMethodBezier:return $e}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;na(this.settings)&&(fa(this.settings.inTangents,e),fa(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&mt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Qe,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,na(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function fa(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}da.prototype.ValueTypeName=``,da.prototype.TimeBufferType=Float32Array,da.prototype.ValueBufferType=Float32Array,da.prototype.DefaultInterpolation=Ze;var pa=class extends da{constructor(e,t,n){super(e,t,n)}};pa.prototype.ValueTypeName=`bool`,pa.prototype.ValueBufferType=Array,pa.prototype.DefaultInterpolation=Xe,pa.prototype.InterpolantFactoryMethodLinear=void 0,pa.prototype.InterpolantFactoryMethodSmooth=void 0;var ma=class extends da{constructor(e,t,n,r){super(e,t,n,r)}};ma.prototype.ValueTypeName=`color`;var ha=class extends da{constructor(e,t,n,r){super(e,t,n,r)}};ha.prototype.ValueTypeName=`number`;var ga=class extends ra{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)jt.slerpFlat(i,0,a,c-o,a,c,s);return i}},_a=class extends da{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ga(this.times,this.values,this.getValueSize(),e)}};_a.prototype.ValueTypeName=`quaternion`,_a.prototype.InterpolantFactoryMethodSmooth=void 0;var va=class extends da{constructor(e,t,n){super(e,t,n)}};va.prototype.ValueTypeName=`string`,va.prototype.ValueBufferType=Array,va.prototype.DefaultInterpolation=Xe,va.prototype.InterpolantFactoryMethodLinear=void 0,va.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends da{constructor(e,t,n,r){super(e,t,n,r)}};ya.prototype.ValueTypeName=`vector`;var ba={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(xa(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!xa(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function xa(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Sa=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Ca=class{constructor(e){this.manager=e===void 0?Sa:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ca.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var wa=new WeakMap,Ta=class extends Ca{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=ba.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=wa.get(a);e===void 0&&(e=[],wa.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=ht(`img`);function s(){l(),t&&t(this);let n=wa.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}wa.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),ba.remove(`image:${e}`);let n=wa.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}wa.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ba.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Ea=class extends Ca{constructor(e){super(e)}load(e,t,n,r){let i=new qt,a=new Ta(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Da=class extends En{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Z(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Oa=class extends Da{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Z(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},ka=new X,Aa=new q,ja=new q,Ma=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=M,this.map=null,this.mapPass=null,this.matrix=new X,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pi,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Aa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Aa),ja.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ja),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(ka,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(ka)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Na=new q,Pa=new jt,Fa=new q,Ia=class extends En{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new X,this.projectionMatrix=new X,this.projectionMatrixInverse=new X,this.coordinateSystem=ft,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Na,Pa,Fa),Fa.x===1&&Fa.y===1&&Fa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Na,Pa,Fa.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Na,Pa,Fa),Fa.x===1&&Fa.y===1&&Fa.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Na,Pa,Fa.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},La=new q,Ra=new K,za=new K,Ba=class extends Ia{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Et*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Tt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Et*2*Math.atan(Math.tan(Tt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){La.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(La.x,La.y).multiplyScalar(-e/La.z),La.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(La.x,La.y).multiplyScalar(-e/La.z)}getViewSize(e,t){return this.getViewBounds(e,Ra,za),t.subVectors(za,Ra)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Tt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Va=class extends Ia{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ha=class extends Ma{constructor(){super(new Va(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ua=class extends Da{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(En.DEFAULT_UP),this.updateMatrix(),this.target=new En,this.shadow=new Ha}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Wa=-90,Ga=1,Ka=class extends En{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ba(Wa,Ga,e,t);r.layers=this.layers,this.add(r);let i=new Ba(Wa,Ga,e,t);i.layers=this.layers,this.add(i);let a=new Ba(Wa,Ga,e,t);a.layers=this.layers,this.add(a);let o=new Ba(Wa,Ga,e,t);o.layers=this.layers,this.add(o);let s=new Ba(Wa,Ga,e,t);s.layers=this.layers,this.add(s);let c=new Ba(Wa,Ga,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},qa=class extends Ba{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ja=`\\[\\]\\.:\\/`,Ya=RegExp(`[\\[\\]\\.:\\/]`,`g`),Xa=`[^\\[\\]\\.:\\/]`,Za=`[^`+Ja.replace(`\\.`,``)+`]`,Qa=`((?:WC+[\\/:])*)`.replace(`WC`,Xa),$a=`(WCOD+)?`.replace(`WCOD`,Za),eo=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Xa),to=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Xa),no=RegExp(`^`+Qa+$a+eo+to+`$`),ro=[`material`,`materials`,`bones`,`map`],io=class{constructor(e,t,n){let r=n||ao.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ao=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Ya,``)}static parseTrackName(e){let t=no.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);ro.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ao.Composite=io,ao.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ao.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ao.prototype.GetterByBindingType=[ao.prototype._getValue_direct,ao.prototype._getValue_array,ao.prototype._getValue_arrayElement,ao.prototype._getValue_toArray],ao.prototype.SetterByBindingTypeAndVersioning=[[ao.prototype._setValue_direct,ao.prototype._setValue_direct_setNeedsUpdate,ao.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ao.prototype._setValue_array,ao.prototype._setValue_array_setNeedsUpdate,ao.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ao.prototype._setValue_arrayElement,ao.prototype._setValue_arrayElement_setNeedsUpdate,ao.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ao.prototype._setValue_fromArray,ao.prototype._setValue_fromArray_setNeedsUpdate,ao.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};var oo=new q,so=new q,co=new q,lo=new q,uo=new q,fo=new q,po=new q,mo=class{constructor(e=new q,t=new q){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){oo.subVectors(e,this.start),so.subVectors(this.end,this.start);let n=so.dot(so);if(n===0)return 0;let r=so.dot(oo)/n;return t&&(r=W(r,0,1)),r}closestPointToPoint(e,t,n){let r=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(r).add(this.start)}distanceSqToLine3(e,t=fo,n=po){let r=1e-8*1e-8,i,a,o=this.start,s=e.start,c=this.end,l=e.end;co.subVectors(c,o),lo.subVectors(l,s),uo.subVectors(o,s);let u=co.dot(co),d=lo.dot(lo),f=lo.dot(uo);if(u<=r&&d<=r)return t.copy(o),n.copy(s),t.sub(n),t.dot(t);if(u<=r)i=0,a=f/d,a=W(a,0,1);else{let e=co.dot(uo);if(d<=r)a=0,i=W(-e/u,0,1);else{let t=co.dot(lo),n=u*d-t*t;i=n===0?0:W((t*f-e*d)/n,0,1),a=(t*i+f)/d,a<0?(a=0,i=W(-e/u,0,1)):a>1&&(a=1,i=W((t-e)/u,0,1))}}return t.copy(o).addScaledVector(co,i),n.copy(s).addScaledVector(lo,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function ho(e,t,n,r){let i=go(r);switch(n){case ue:return e*t;case I:return e*t/i.components*i.byteLength;case he:return e*t/i.components*i.byteLength;case ge:return e*t*2/i.components*i.byteLength;case _e:return e*t*2/i.components*i.byteLength;case de:return e*t*3/i.components*i.byteLength;case fe:return e*t*4/i.components*i.byteLength;case ve:return e*t*4/i.components*i.byteLength;case ye:case be:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case xe:case Se:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case we:case Ee:return Math.max(e,16)*Math.max(t,8)/4;case Ce:case Te:return Math.max(e,8)*Math.max(t,8)/2;case De:case Oe:case Ae:case je:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ke:case L:case Me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case R:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ne:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case z:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Pe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case B:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case V:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Fe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ie:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Le:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Re:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ze:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Ve:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case He:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ue:case We:case Ge:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ke:case qe:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Je:case Ye:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function go(e){switch(e){case M:case te:return{byteLength:1,components:1};case ne:case N:case oe:return{byteLength:2,components:1};case se:case ce:return{byteLength:2,components:4};case ie:case re:case ae:return{byteLength:4,components:1};case P:case F:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function _o(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function vo(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new Z(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new J}},envmap:{envMap:{value:null},envMapRotation:{value:new J},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new J}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new J}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new J},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new J},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new J},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new J}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new J}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new J}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Z(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new Z(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0},uvTransform:{value:new J}},sprite:{diffuse:{value:new Z(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}}},yo={basic:{uniforms:Ui([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:Ui([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Z(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:Ui([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Z(0)},specular:{value:new Z(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:Ui([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Z(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:Ui([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Z(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:Ui([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:Ui([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:Ui([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:Ui([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:Ui([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:Ui([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new J},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new J}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:Ui([$.common,$.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:Ui([$.lights,$.fog,{color:{value:new Z(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};yo.physical={uniforms:Ui([yo.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new J},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new J},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new J},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new J},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new J},sheen:{value:0},sheenColor:{value:new Z(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new J},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new J},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new J},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new J},attenuationDistance:{value:0},attenuationColor:{value:new Z(0)},specularColor:{value:new Z(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new J},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new J},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new J}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var bo={r:0,b:0,g:0},xo=new X,So=new J;So.set(-1,0,0,0,1,0,0,0,1);function Co(e,t,n,r,i,a){let o=new Z(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new vi(new zi(1,1,1),new Xi({name:`BackgroundCubeMaterial`,uniforms:Hi(yo.backgroundCube.uniforms),vertexShader:yo.backgroundCube.vertexShader,fragmentShader:yo.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(xo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(So),l.material.toneMapped=Y.getTransfer(i.colorSpace)!==ct,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new vi(new Bi(2,2),new Xi({name:`BackgroundMaterial`,uniforms:Hi(yo.background.uniforms),vertexShader:yo.background.vertexShader,fragmentShader:yo.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Y.getTransfer(i.colorSpace)!==ct,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(bo,Ki(e)),n.buffers.color.setClear(bo.r,bo.g,bo.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function wo(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function To(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Eo(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Do(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ir,s=new J,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Oo=4,ko=6,Ao=20,jo=256,Mo=new Va,No=new Z,Po=null,Fo=0,Io=0,Lo=!1,Ro=new q,zo=new q,Bo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Ro}=i;Po=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ko(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Po,Fo,Io),this._renderer.xr.enabled=Lo,e.scissorTest=!1,Uo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Po=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Io=this._renderer.getActiveMipmapLevel(),Lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:A,minFilter:A,generateMipmaps:!1,type:oe,format:fe,colorSpace:ot,depthBuffer:!1},r=Ho(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ho(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Vo(r)),this._blurMaterial=Go(r,e,t),this._ggxMaterial=Wo(r,e,t)}return r}_compileMaterial(e){let t=new vi(new kr,e);this._renderer.compile(t,Mo)}_sceneToCubeUV(e,t,n,r,i){let a=new Ba(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(No),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new vi(new zi,new oi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(No),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Uo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=qo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ko());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Uo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Mo)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Oo?n-d+Oo:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Uo(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Mo),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Uo(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Mo)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Uo(t,3*l*(r>this._lodMax-Oo?r-this._lodMax+Oo:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Mo)}};function Vo(e){let t=[],n=[],r=e,i=e-Oo+1+ko;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?zo.set(1,r,n):e===1?zo.set(-n,1,-r):e===2?zo.set(-n,r,1):e===3?zo.set(-1,r,-n):e===4?zo.set(-n,-1,r):zo.set(n,r,-1),zo.toArray(l,(e*6+t)*3)}}let u=new kr;u.setAttribute(`position`,new mr(c,3)),u.setAttribute(`outputDirection`,new mr(l,3)),n.push(new vi(u,null)),r>Oo&&r--}return{lodMeshes:n,sizeLods:t}}function Ho(e,t,n){let r=new Xt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Uo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Wo(e,t,n){return new Xi({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:jo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Jo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Go(e,t,n){return new Xi({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ao,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Jo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ko(){return new Xi({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qo(){return new Xi({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Jo(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Yo=class extends Xt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Fi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new zi(5,5,5),i=new Xi({name:`CubemapFromEquirect`,uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new vi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=A),new Ka(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Xo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Yo(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Bo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Bo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Zo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&bt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Qo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?gr:hr)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function $o(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function es(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ts(e,t,n){let r=new WeakMap,i=new Jt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Zt(h,p,m,u);g.type=ae,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new K(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function ns(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var rs={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function is(e,t,n,r,i,a){let o=new Xt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new kr;l.setAttribute(`position`,new _r([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new _r([0,2,0,0,2,0],2));let u=new Zi({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new vi(l,u),f=new Va(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Xt(t,n,{type:oe,depthBuffer:!1,stencilBuffer:!1}),c=new Xt(t,n,{type:oe,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Y.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=rs[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var as=new qt,os=new Ii(1,1),ss=new Zt,cs=new Qt,ls=new Fi,us=[],ds=[],fs=new Float32Array(16),ps=new Float32Array(9),ms=new Float32Array(4);function hs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=us[i];if(a===void 0&&(a=new Float32Array(i),us[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function gs(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function _s(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function vs(e,t){let n=ds[t];n===void 0&&(n=new Int32Array(t),ds[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ys(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function bs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(gs(n,t))return;e.uniform2fv(this.addr,t),_s(n,t)}}function xs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(gs(n,t))return;e.uniform3fv(this.addr,t),_s(n,t)}}function Ss(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(gs(n,t))return;e.uniform4fv(this.addr,t),_s(n,t)}}function Cs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(gs(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),_s(n,t)}else{if(gs(n,r))return;ms.set(r),e.uniformMatrix2fv(this.addr,!1,ms),_s(n,r)}}function ws(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(gs(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),_s(n,t)}else{if(gs(n,r))return;ps.set(r),e.uniformMatrix3fv(this.addr,!1,ps),_s(n,r)}}function Ts(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(gs(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),_s(n,t)}else{if(gs(n,r))return;fs.set(r),e.uniformMatrix4fv(this.addr,!1,fs),_s(n,r)}}function Es(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ds(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(gs(n,t))return;e.uniform2iv(this.addr,t),_s(n,t)}}function Os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(gs(n,t))return;e.uniform3iv(this.addr,t),_s(n,t)}}function ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(gs(n,t))return;e.uniform4iv(this.addr,t),_s(n,t)}}function As(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function js(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(gs(n,t))return;e.uniform2uiv(this.addr,t),_s(n,t)}}function Ms(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(gs(n,t))return;e.uniform3uiv(this.addr,t),_s(n,t)}}function Ns(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(gs(n,t))return;e.uniform4uiv(this.addr,t),_s(n,t)}}function Ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(os.compareFunction=n.isReversedDepthBuffer()?518:515,a=os):a=as,n.setTexture2D(t||a,i)}function Fs(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||cs,i)}function Is(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ls,i)}function Ls(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||ss,i)}function Rs(e){switch(e){case 5126:return ys;case 35664:return bs;case 35665:return xs;case 35666:return Ss;case 35674:return Cs;case 35675:return ws;case 35676:return Ts;case 5124:case 35670:return Es;case 35667:case 35671:return Ds;case 35668:case 35672:return Os;case 35669:case 35673:return ks;case 5125:return As;case 36294:return js;case 36295:return Ms;case 36296:return Ns;case 35678:case 36198:case 36298:case 36306:case 35682:return Ps;case 35679:case 36299:case 36307:return Fs;case 35680:case 36300:case 36308:case 36293:return Is;case 36289:case 36303:case 36311:case 36292:return Ls}}function zs(e,t){e.uniform1fv(this.addr,t)}function Bs(e,t){let n=hs(t,this.size,2);e.uniform2fv(this.addr,n)}function Vs(e,t){let n=hs(t,this.size,3);e.uniform3fv(this.addr,n)}function Hs(e,t){let n=hs(t,this.size,4);e.uniform4fv(this.addr,n)}function Us(e,t){let n=hs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Ws(e,t){let n=hs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Gs(e,t){let n=hs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ks(e,t){e.uniform1iv(this.addr,t)}function qs(e,t){e.uniform2iv(this.addr,t)}function Js(e,t){e.uniform3iv(this.addr,t)}function Ys(e,t){e.uniform4iv(this.addr,t)}function Xs(e,t){e.uniform1uiv(this.addr,t)}function Zs(e,t){e.uniform2uiv(this.addr,t)}function Qs(e,t){e.uniform3uiv(this.addr,t)}function $s(e,t){e.uniform4uiv(this.addr,t)}function ec(e,t,n){let r=this.cache,i=t.length,a=vs(n,i);gs(r,a)||(e.uniform1iv(this.addr,a),_s(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?os:as;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function tc(e,t,n){let r=this.cache,i=t.length,a=vs(n,i);gs(r,a)||(e.uniform1iv(this.addr,a),_s(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||cs,a[e])}function nc(e,t,n){let r=this.cache,i=t.length,a=vs(n,i);gs(r,a)||(e.uniform1iv(this.addr,a),_s(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ls,a[e])}function rc(e,t,n){let r=this.cache,i=t.length,a=vs(n,i);gs(r,a)||(e.uniform1iv(this.addr,a),_s(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||ss,a[e])}function ic(e){switch(e){case 5126:return zs;case 35664:return Bs;case 35665:return Vs;case 35666:return Hs;case 35674:return Us;case 35675:return Ws;case 35676:return Gs;case 5124:case 35670:return Ks;case 35667:case 35671:return qs;case 35668:case 35672:return Js;case 35669:case 35673:return Ys;case 5125:return Xs;case 36294:return Zs;case 36295:return Qs;case 36296:return $s;case 35678:case 36198:case 36298:case 36306:case 35682:return ec;case 35679:case 36299:case 36307:return tc;case 35680:case 36300:case 36308:case 36293:return nc;case 36289:case 36303:case 36311:case 36292:return rc}}var ac=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rs(t.type)}},oc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ic(t.type)}},sc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},cc=/(\w+)(\])?(\[|\.)?/g;function lc(e,t){e.seq.push(t),e.map[t.id]=t}function uc(e,t,n){let r=e.name,i=r.length;for(cc.lastIndex=0;;){let a=cc.exec(r),o=cc.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){lc(n,l===void 0?new ac(s,e,t):new oc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new sc(s),lc(n,e)),n=e}}}var dc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);uc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function fc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var pc=37297,mc=0;function hc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var gc=new J;function _c(e){Y._getMatrix(gc,Y.workingColorSpace,e);let t=`mat3( ${gc.elements.map(e=>e.toFixed(4))} )`;switch(Y.getTransfer(e)){case st:return[t,`LinearTransferOETF`];case ct:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function vc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+hc(e.getShaderSource(t),r)}return i}function yc(e,t){let n=_c(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var bc={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function xc(e,t){let n=bc[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Sc=new q;function Cc(){return Y.getLuminanceCoefficients(Sc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Sc.x.toFixed(4)}, ${Sc.y.toFixed(4)}, ${Sc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function wc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Dc).join(`
`)}function Tc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ec(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Dc(e){return e!==``}function Oc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function kc(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ac=/^[ \t]*#include +<([\w\d./]+)>/gm;function jc(e){return e.replace(Ac,Nc)}var Mc=new Map;function Nc(e,t){let n=Q[t];if(n===void 0){let e=Mc.get(t);if(e!==void 0)n=Q[e],H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return jc(n)}var Pc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fc(e){return e.replace(Pc,Ic)}function Ic(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Lc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Rc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function zc(e){return Rc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Bc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Vc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Bc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Hc={302:`ENVMAP_MODE_REFRACTION`};function Uc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Hc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Wc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Gc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Wc[e.combine]||`ENVMAP_BLENDING_NONE`}function Kc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function qc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=zc(n),l=Vc(n),u=Uc(n),d=Gc(n),f=Kc(n),p=wc(n),m=Tc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Dc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Dc).join(`
`),_.length>0&&(_+=`
`)):(g=[Lc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Dc).join(`
`),_=[Lc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:xc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,yc(`linearToOutputTexel`,n.outputColorSpace),Cc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Dc).join(`
`)),o=jc(o),o=Oc(o,n),o=kc(o,n),s=jc(s),s=Oc(s,n),s=kc(s,n),o=Fc(o),s=Fc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=fc(i,i.VERTEX_SHADER,y),S=fc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=vc(i,x,`vertex`),n=vc(i,S,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new dc(i,h),T=Ec(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,pc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=mc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Jc=0,Yc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Xc(e),t.set(e,n)),n}},Xc=class{constructor(e){this.id=Jc++,this.code=e,this.usedTimes=0}};function Zc(e){return e===1030||e===37490||e===36285}function Qc(e,t,n,r,i,a){let o=new un,s=new Yc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=yo[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,te=h.isBatchedMesh===!0,N=!!i.map,ne=!!i.matcap,re=!!x,ie=!!i.aoMap,ae=!!i.lightMap,oe=!!i.bumpMap&&i.wireframe===!1,se=!!i.normalMap,ce=!!i.displacementMap,le=!!i.emissiveMap,P=!!i.metalnessMap,F=!!i.roughnessMap,ue=i.anisotropy>0,de=i.clearcoat>0,fe=i.dispersion>0,pe=i.retroreflectivity>0,me=i.iridescence>0,I=i.sheen>0,he=i.transmission>0,ge=ue&&!!i.anisotropyMap,_e=de&&!!i.clearcoatMap,ve=de&&!!i.clearcoatNormalMap,ye=de&&!!i.clearcoatRoughnessMap,be=me&&!!i.iridescenceMap,xe=me&&!!i.iridescenceThicknessMap,Se=I&&!!i.sheenColorMap,Ce=I&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,Ee=!!i.specularIntensityMap,De=he&&!!i.transmissionMap,Oe=he&&!!i.thicknessMap,ke=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,L=!!i.alphaHash,Me=!!i.extensions,R=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(R=e.toneMapping);let Ne={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:te,batchingColor:te&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Y.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:ne,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:ie,lightMap:ae,bumpMap:oe,normalMap:se,displacementMap:ce,emissiveMap:le,normalMapObjectSpace:se&&i.normalMapType===1,normalMapTangentSpace:se&&i.normalMapType===0,packedNormalMap:se&&i.normalMapType===0&&Zc(i.normalMap.format),metalnessMap:P,roughnessMap:F,anisotropy:ue,anisotropyMap:ge,clearcoat:de,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:fe,retroreflection:pe,iridescence:me,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:I,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:Ee,transmission:he,transmissionMap:De,thicknessMap:Oe,gradientMap:ke,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:L,combine:i.combine,mapUv:N&&m(i.map.channel),aoMapUv:ie&&m(i.aoMap.channel),lightMapUv:ae&&m(i.lightMap.channel),bumpMapUv:oe&&m(i.bumpMap.channel),normalMapUv:se&&m(i.normalMap.channel),displacementMapUv:ce&&m(i.displacementMap.channel),emissiveMapUv:le&&m(i.emissiveMap.channel),metalnessMapUv:P&&m(i.metalnessMap.channel),roughnessMapUv:F&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(i.sheenRoughnessMap.channel),specularMapUv:we&&m(i.specularMap.channel),specularColorMapUv:Te&&m(i.specularColorMap.channel),specularIntensityMapUv:Ee&&m(i.specularIntensityMap.channel),transmissionMapUv:De&&m(i.transmissionMap.channel),thicknessMapUv:Oe&&m(i.thicknessMap.channel),alphaMapUv:Ae&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(se||ue),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(N||Ae),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&se===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:R,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&Y.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:le&&i.emissiveMap.isVideoTexture===!0&&Y.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Me&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Me&&i.extensions.multiDraw===!0||te)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=c.has(1),Ne.vertexUv2s=c.has(2),Ne.vertexUv3s=c.has(3),c.clear(),Ne}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=yo[t];n=qi.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new qc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function $c(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function el(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function tl(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function nl(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||el),r.length>1&&r.sort(t||tl),i.length>1&&i.sort(t||tl)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function rl(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new nl,e.set(t,[i])):n>=r.length?(i=new nl,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function il(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new q,color:new Z};break;case`SpotLight`:n={position:new q,direction:new q,color:new Z,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new q,color:new Z,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new q,skyColor:new Z,groundColor:new Z};break;case`RectAreaLight`:n={color:new Z,position:new q,halfWidth:new q,halfHeight:new q}}return e[t.id]=n,n}}}function al(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var ol=0;function sl(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function cl(e){let t=new il,n=al(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new q);let i=new q,a=new X,o=new X;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(sl);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=ol++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ll(e){let t=new cl(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function ul(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ll(e),t.set(n,[a])):r>=i.length?(a=new ll(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var dl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fl=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,pl=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],ml=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],hl=new X,gl=new q,_l=new q;function vl(e,t,n){let r=new Pi,i=new K,a=new K,o=new Jt,s=new $i,c=new ea,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Xi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:dl,fragmentShader:fl}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new kr;m.setAttribute(`position`,new mr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new vi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Xt(i.x,i.y,{format:ge,type:oe,minFilter:A,magFilter:A,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Ii(i.x,i.y,ae),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=pe,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=D,d.map.depthTexture.magFilter=D}else l.isPointLight?(d.map=new Yo(i.x),d.map.depthTexture=new Li(i.x,ie)):(d.map=new Xt(i.x,i.y),d.map.depthTexture=new Ii(i.x,i.y,ie)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=pe,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=A,d.map.depthTexture.magFilter=A):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=D,d.map.depthTexture.magFilter=D);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),gl.setFromMatrixPosition(l.matrixWorld),e.position.copy(gl),_l.copy(e.position),_l.add(pl[t]),e.up.copy(ml[t]),e.lookAt(_l),e.updateMatrixWorld(),n.makeTranslation(-gl.x,-gl.y,-gl.z),hl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(hl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new Xt(i.x,i.y,{format:ge,type:oe}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function yl(e,t){function n(){let t=!1,n=new Jt,r=null,i=new Jt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?P(e.DEPTH_TEST):F(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=St[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?P(e.STENCIL_TEST):F(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(N)[1]),M=te>=1);let ne=null,re={},ie=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),oe=new Jt().fromArray(ie),se=new Jt().fromArray(ae);function ce(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let le={};le[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),le[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),le[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),P(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),P(e.CULL_FACE),I(0);function P(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function F(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let pe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};pe[103]=e.MIN,pe[104]=e.MAX;let me={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function I(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(F(e.BLEND),g=!1);else if(g===!1&&(P(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(pe[n],pe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(me[r],me[i],me[o],me[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?F(e.CULL_FACE):P(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?I(0):I(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?P(e.SAMPLE_ALPHA_TO_COVERAGE):F(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?F(e.CULL_FACE):(P(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(P(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):F(e.POLYGON_OFFSET_FILL)}function be(t){t?P(e.SCISSOR_TEST):F(e.SCISSOR_TEST)}function xe(t){t===void 0&&(t=e.TEXTURE0+ee-1),ne!==t&&(e.activeTexture(t),ne=t)}function Se(t,n,r){r===void 0&&(r=ne===null?e.TEXTURE0+ee-1:ne);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(ne!==r&&(e.activeTexture(r),ne=r),e.bindTexture(t,n||le[t]),i.type=t,i.texture=n)}function Ce(){let t=re[ne];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function we(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ae(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function je(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function L(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Me(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function R(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ne(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function z(t){oe.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),oe.copy(t))}function Pe(t){se.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),se.copy(t))}function B(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function V(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ne=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,oe.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:P,disable:F,bindFramebuffer:ue,drawBuffers:de,useProgram:fe,setBlending:I,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:xe,bindTexture:Se,unbindTexture:Ce,compressedTexImage2D:we,compressedTexImage3D:Te,texImage2D:L,texImage3D:Me,pixelStorei:Ne,getParameter:R,updateUBOMapping:B,uniformBlockBinding:V,texStorage2D:Ae,texStorage3D:je,texSubImage2D:Ee,texSubImage3D:De,compressedTexSubImage2D:Oe,compressedTexSubImage3D:ke,scissor:z,viewport:Pe,reset:Fe}}function bl(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new K,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):ht(`canvas`)}function g(e,t,n){let r=1,i=R(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?st:Y.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),te(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function M(e){let t=e.target;t.removeEventListener(`dispose`,M),ne(t)}function te(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&N(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function N(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function ne(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let re=0;function ie(){re=0}function ae(){return re}function oe(e){re=e}function se(){let e=re;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),re+=1,e}function ce(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function le(t,i){let a=r.get(t);if(t.isVideoTexture&&L(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ve(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ve(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ve(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ue(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?ye(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let de={[w]:e.REPEAT,[T]:e.CLAMP_TO_EDGE,[E]:e.MIRRORED_REPEAT},fe={[D]:e.NEAREST,[O]:e.NEAREST_MIPMAP_NEAREST,[k]:e.NEAREST_MIPMAP_LINEAR,[A]:e.LINEAR,[j]:e.LINEAR_MIPMAP_NEAREST,[ee]:e.LINEAR_MIPMAP_LINEAR},pe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function I(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,de[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,de[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,de[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,fe[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,fe[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,pe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function he(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=ce(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&N(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ge(e,t,n){return Math.floor(Math.floor(e/n)/t)}function _e(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ge(n.start,r.width,4),c=ge(t.start,r.width,4);n.start<=i+1&&a===c&&ge(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ve(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=he(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Y.getPrimaries(Y.workingColorSpace),r=o.colorSpace===``?null:Y.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Me(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);I(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===me,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&_e(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=ho(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=ho(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=R(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=R(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ye(t,o,s){if(o.image.length!==6)return;let c=he(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Y.getPrimaries(Y.workingColorSpace),r=o.colorSpace===``?null:Y.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Me(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);I(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=R(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function be(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),je(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Ae(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;je(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ae(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);je(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ae(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ae(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Se(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),I(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else le(i.depthTexture,0);let u=l.__webglTexture,d=Ae(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)je(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)je(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Ce(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)Se(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Se(i.__webglFramebuffer[0],t,0):Se(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),xe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),xe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function we(t,n,i){let a=r.get(t);n!==void 0&&be(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&Ce(t)}function Te(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,M);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&je(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Ae(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),xe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),I(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)be(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else be(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),I(c,a),be(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),I(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)be(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else be(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&Ce(t)}function Ee(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let De=[],Oe=[];function ke(t){if(t.samples>0){if(je(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(De.length=0,Oe.length=0,De.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(De.push(l),Oe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Oe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,De))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ae(e){return Math.min(i.maxSamples,e.samples)}function je(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function L(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Me(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Y.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function R(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=se,this.resetTextureUnits=ie,this.getTextureUnits=ae,this.setTextureUnits=oe,this.setTexture2D=le,this.setTexture2DArray=P,this.setTexture3D=F,this.setTextureCube=ue,this.rebindTextures=we,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ee,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function xl(e,t){function n(n,r=``){let i,a=Y.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Sl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,wl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Ri(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Xi({vertexShader:Sl,fragmentShader:Cl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new vi(new Bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tl=class extends Ct{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new wl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new K,C=null,w=null,T=new Ba;T.viewport=new Jt;let E=new Ba;E.viewport=new Jt;let D=[T,E],O=new qa,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new kn,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new kn,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new kn,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,P.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?me:pe,a=_.stencil?le:ie);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Xt(d.textureWidth,d.textureHeight,{format:fe,type:M,depthTexture:new Ii(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Xt(f.framebufferWidth,f.framebufferHeight,{format:fe,type:M,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),P.setContext(r),P.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let N=new q,ne=new q;function re(e,t,n){N.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=N.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;ae(O,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?re(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,O,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Et*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let se=null;function ce(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ba,o.layers.enable(n),o.viewport=new Jt,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Ri,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let P=new _o;P.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},El=new X,Dl=new J;Dl.set(-1,0,0,0,1,0,0,0,1);function Ol(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Ki(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(El.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Dl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function kl(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Al=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),jl=null;function Ml(){return jl===null&&(jl=new xi(Al,16,16,ge,oe),jl.name=`DFG_LUT`,jl.minFilter=A,jl.magFilter=A,jl.wrapS=T,jl.wrapT=T,jl.generateMipmaps=!1,jl.needsUpdate=!0),jl}var Nl=class{constructor(e={}){let{canvas:t=gt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=M}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ve,_e,he]),g=new Set([M,ie,ne,le,se,ce]),_=new Uint32Array(4),v=new Int32Array(4),y=new q,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=at;let j=0,te=0,N=null,re=-1,ae=null,P=new Jt,F=new Jt,ue=null,de=new Z(0),fe=0,pe=t.width,me=t.height,I=1,ge=null,ye=null,be=new Jt(0,0,pe,me),xe=new Jt(0,0,pe,me),Se=!1,Ce=new Pi,we=!1,Te=!1,Ee=new X,De=new q,Oe=new Jt,ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ae=!1;function je(){return N===null?I:1}let L=n;function Me(e,n){return t.getContext(e,n)}let R,Ne,z,Pe,B,V,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,et,!1),t.addEventListener(`webglcontextrestored`,tt,!1),t.addEventListener(`webglcontextcreationerror`,nt,!1),L===null){let t=`webgl2`;if(L=Me(t,e),L===null)throw Me(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Qe()}catch(e){throw t.removeEventListener(`webglcontextlost`,et,!1),t.removeEventListener(`webglcontextrestored`,tt,!1),t.removeEventListener(`webglcontextcreationerror`,nt,!1),U(`WebGLRenderer: `+e.message),e}function Qe(){R=new Zo(L),R.init(),Ye=new xl(L,R),Ne=new Eo(L,R,e,Ye),z=new yl(L,R),Ne.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=L.createFramebuffer(),k=L.createFramebuffer(),A=L.createFramebuffer(),Pe=new es(L),B=new $c,V=new bl(L,R,z,B,Ne,Ye,Pe),Fe=new Xo(T),Ie=new vo(L),Xe=new wo(L,Ie),Le=new Qo(L,Ie,Pe,Xe),Re=new ns(L,Le,Ie,Xe,Pe),Ke=new ts(L,Ne,V),Ue=new Do(B),ze=new Qc(T,Fe,R,Ne,Xe,Ue),Be=new Ol(T,B),Ve=new rl,He=new ul(R),Ge=new Co(T,Fe,z,Re,p,s),We=new vl(T,Re,Ne),Ze=new kl(L,Pe,Ne,z),qe=new To(L,R,Pe),Je=new $o(L,R,Pe),Pe.programs=ze.programs,T.capabilities=Ne,T.extensions=R,T.properties=B,T.renderLists=Ve,T.shadowMap=We,T.state=z,T.info=Pe}m!==1009&&(w=new is(m,t.width,t.height,o,r,i));let $e=new Tl(T,L);this.xr=$e,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=R.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=R.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(e){e!==void 0&&(I=e,this.setSize(pe,me,!1))},this.getSize=function(e){return e.set(pe,me)},this.setSize=function(e,n,r=!0){$e.isPresenting?H(`WebGLRenderer: Can't change size while VR device is presenting.`):(pe=e,me=n,t.width=Math.floor(e*I),t.height=Math.floor(n*I),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(pe*I,me*I).floor()},this.setDrawingBufferSize=function(e,n,r){pe=e,me=n,I=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(be)},this.setViewport=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),z.viewport(P.copy(be).multiplyScalar(I).round())},this.getScissor=function(e){return e.copy(xe)},this.setScissor=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),z.scissor(F.copy(xe).multiplyScalar(I).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(e){z.setScissorTest(Se=e)},this.setOpaqueSort=function(e){ge=e},this.setTransparentSort=function(e){ye=e},this.getClearColor=function(e){return e.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Ge.getClearColor(),r=Ge.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,L.clearBufferiv(L.COLOR,0,v))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,et,!1),t.removeEventListener(`webglcontextrestored`,tt,!1),t.removeEventListener(`webglcontextcreationerror`,nt,!1),Ge.dispose(),Ve.dispose(),He.dispose(),B.dispose(),Fe.dispose(),Re.dispose(),Xe.dispose(),Ze.dispose(),ze.dispose(),$e.dispose(),$e.removeEventListener(`sessionstart`,ut),$e.removeEventListener(`sessionend`,dt),pt.stop()};function et(e){e.preventDefault(),vt(`WebGLRenderer: Context Lost.`),E=!0}function tt(){vt(`WebGLRenderer: Context Restored.`),E=!1;let e=Pe.autoReset,t=We.enabled,n=We.autoUpdate,r=We.needsUpdate,i=We.type;Qe(),Pe.autoReset=e,We.enabled=t,We.autoUpdate=n,We.needsUpdate=r,We.type=i}function nt(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function rt(e){let t=e.target;t.removeEventListener(`dispose`,rt),it(t)}function it(e){ot(e),B.remove(e)}function ot(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){ze.releaseProgram(e)}),e.isShaderMaterial&&ze.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ke);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Et(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Le.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Xe.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Ie.get(c),g=Je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*je()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*je()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(R.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ie.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function st(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),we===!0&&Ue.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=He.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),Te=this.localClippingEnabled,we=Ue.init(this.clippingPlanes,Te),we===!0&&Ue.setGlobalState(this.clippingPlanes,t),D!==null&&We.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];st(o,n,t,e),r.add(o)}else st(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}R.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ct=null;function lt(e){ct&&ct(e)}function ut(){pt.stop()}function dt(){pt.start()}let pt=new _o;pt.setAnimationLoop(lt),typeof self<`u`&&pt.setContext(self),this.setAnimationLoop=function(e){ct=e,$e.setAnimationLoop(e),e===null?pt.stop():pt.start()},$e.addEventListener(`sessionstart`,ut),$e.addEventListener(`sessionend`,dt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=$e.enabled===!0&&$e.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),$e.enabled===!0&&$e.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&($e.cameraAutoUpdate===!0&&$e.updateCamera(t),t=$e.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=He.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),Ee.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Ce.setFromProjectionMatrix(Ee,ft,t.reversedDepth),Te=this.localClippingEnabled,we=Ue.init(this.clippingPlanes,Te),b=Ve.get(e,S.length),b.init(),S.push(b),$e.enabled===!0&&$e.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&mt(e,t,-1/0,T.sortObjects)}mt(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ge,ye),Ae=$e.enabled===!1||$e.isPresenting===!1||$e.hasDepthSensing()===!1,Ae&&Ge.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),we===!0&&Ue.beginShadows();let i=x.state.shadowsArray;if(We.render(i,e,t),we===!0&&Ue.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];_t(n,r,e,a)}Ae&&Ge.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ht(b,e,n,n.viewport)}}else r.length>0&&_t(n,r,e,t),Ae&&Ge.render(e),ht(b,e,t)}N!==null&&te===0&&(V.updateMultisampleRenderTarget(N),V.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Xe.resetDefaultState(),re=-1,ae=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),we===!0&&Ue.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function mt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Ce)){r&&Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);let i=Re.update(e),a=e.material;a.visible&&b.push(e,i,a,n,Oe.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Ce))){let i=Re.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Oe.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Oe.copy(e.boundingSphere.center)),Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,Oe.z,s,t)}}else a.visible&&b.push(e,i,a,n,Oe.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)mt(i[e],t,n,r)}function ht(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),we===!0&&Ue.setGlobalState(T.clippingPlanes,n),r&&z.viewport(P.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function _t(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=R.has(`EXT_color_buffer_half_float`)||R.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Xt(1,1,{generateMipmaps:!0,type:e?oe:M,minFilter:ee,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Y.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(de),fe=T.getClearAlpha(),fe<1&&T.setClearColor(16777215,.5),T.clear(),Ae&&Ge.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),we===!0&&Ue.setGlobalState(T.clippingPlanes,r),yt(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),R.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(de,fe),d!==void 0&&(r.viewport=d),T.toneMapping=u}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function St(e,t,n){t.isScene!==!0&&(t=ke);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=ze.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=ze.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Fe.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,rt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return wt(e,s),d}else s.uniforms=ze.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=ze.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ue.uniform),wt(e,s),r.needsLights=W(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=dc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function wt(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Tt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function Et(e,t,n,r,i){t.isScene!==!0&&(t=ke),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Y.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Fe.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=x.state.lights;if(we===!0&&(Te===!0||e!==ae)){let t=e===ae&&r.id===re;Ue.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ue.numPlanes||v.numIntersection!==Ue.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=St(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(z.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==re&&(re=r.id,w=!0),v.needsLights){let e=Tt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ae!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(L,`projectionMatrix`,e.projectionMatrix),O.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(L,De.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&O.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(L,`sunShadowMap`,y.state.sunShadowMap,V),y.state.directionalShadowMap.length>0&&O.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&O.setValue(L,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&O.setValue(L,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){O.setOptional(L,i,`bindMatrix`),O.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(L,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(O.setOptional(L,i,`batchingTexture`),O.setValue(L,`batchingTexture`,i._matricesTexture,V),O.setOptional(L,i,`batchingIdTexture`),O.setValue(L,`batchingIdTexture`,i._indirectTexture,V),O.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(L,`batchingColorTexture`,i._colorsTexture,V));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ke.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Ml()),w){if(O.setValue(L,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&Dt(k,E),a&&r.fog===!0&&Be.refreshFogUniforms(k,a),Be.refreshMaterialUniforms(k,r,I,me,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}dc.upload(L,Ct(v),k,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(dc.upload(L,Ct(v),k,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(L,`center`,i.center),O.setValue(L,`modelViewMatrix`,i.modelViewMatrix),O.setValue(L,`normalMatrix`,i.normalMatrix),O.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ze.update(n,S),Ze.bind(n,S)}}return S}function Dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function W(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,te=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),F.copy(e.scissor),ue=e.scissorTest,z.viewport(P),z.scissor(F),z.setScissorTest(ue),re=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),F.copy(e.scissor),ue=e.scissorTest}else P.copy(be).multiplyScalar(I).floor(),F.copy(xe).multiplyScalar(I).floor(),ue=Se;if(n!==0&&(r=O),z.bindFramebuffer(L.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(P),z.scissor(F),z.setScissorTest(ue),i){let r=B.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}re=-1};function Ot(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let u=Ot(o);if(u.__formatReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,Ye.convert(c),Ye.convert(l),a)}finally{let e=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s);let d=Ot(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,Ye.convert(l),Ye.convert(u),0),L.bindBuffer(L.PIXEL_PACK_BUFFER,null);let p=N===null?null:B.get(N).__webglFramebuffer;z.bindFramebuffer(L.FRAMEBUFFER,p);let m=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await xt(L,m,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,f),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.bindBuffer(L.PIXEL_PACK_BUFFER,null),L.deleteBuffer(f),L.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ye.convert(t.format),_=Ye.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=L.TEXTURE_2D),z.activeTexture(L.TEXTURE0),z.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(L.UNPACK_ROW_LENGTH),b=z.getParameter(L.UNPACK_IMAGE_HEIGHT),x=z.getParameter(L.UNPACK_SKIP_PIXELS),S=z.getParameter(L.UNPACK_SKIP_ROWS),C=z.getParameter(L.UNPACK_SKIP_IMAGES);z.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(L.UNPACK_SKIP_PIXELS,l),z.pixelStorei(L.UNPACK_SKIP_ROWS,u),z.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);z.bindFramebuffer(L.READ_FRAMEBUFFER,null),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(L.READ_FRAMEBUFFER,k),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);z.bindFramebuffer(L.READ_FRAMEBUFFER,null),z.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(L.UNPACK_ROW_LENGTH,y),z.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(L.UNPACK_SKIP_PIXELS,x),z.pixelStorei(L.UNPACK_SKIP_ROWS,S),z.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){j=0,te=0,N=null,z.reset(),Xe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return ft}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Y._getDrawingBufferColorSpace(e),t.unpackColorSpace=Y._getUnpackColorSpace()}};async function Pl(e){let t=await fetch(e);if(!t.ok||!t.body)throw Error(`模型资源加载失败`);let n=await new Response(t.body.pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer(),r=new DataView(n).getUint32(0,!0);if(r>n.byteLength-4)throw Error(`模型资源损坏`);let i=JSON.parse(new TextDecoder().decode(new Uint8Array(n,4,r)));if(i.version!==1)throw Error(`模型资源版本不支持`);let a=Math.ceil((4+r)/4)*4,o=new Dn;for(let e of i.meshes){let t=new kr;for(let[r,i]of Object.entries(e))t.setAttribute(r,new _r(new Float32Array(n,a+i.offset,i.length),i.itemSize));o.add(new vi(t,new oi))}return o}function Fl(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new kr,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Il(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Il(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Il(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new mr(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Ll=0,Rl=1,zl=new q,Bl=new mo,Vl=new Ir,Hl=new q,Ul=new Yn,Wl=class{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Jl,this.unassigned=new Jl,this.vertices=[]}setFromPoints(e){if(e.length>=4){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.vertices.push(new ql(e[t]));this._compute()}return this}setFromObject(e){let t=[];return e.updateMatrixWorld(!0),e.traverse(function(e){let n=e.geometry;if(n!==void 0){let r=n.attributes.position;if(r!==void 0)for(let n=0,i=r.count;n<i;n++){let i=new q;i.fromBufferAttribute(r,n).applyMatrix4(e.matrixWorld),t.push(i)}}}),this.setFromPoints(t)}containsPoint(e){let t=this.faces;for(let n=0,r=t.length;n<r;n++)if(t[n].distanceToPoint(e)>this.tolerance)return!1;return!0}intersectRay(e,t){let n=this.faces,r=-1/0,i=1/0;for(let t=0,a=n.length;t<a;t++){let a=n[t],o=a.distanceToPoint(e.origin),s=a.normal.dot(e.direction);if(o>0&&s>=0)return null;let c=s===0?0:-o/s;if(!(c<=0)&&(s>0?i=Math.min(c,i):r=Math.max(c,r),r>i))return null}return r===-1/0?e.at(i,t):e.at(r,t),t}intersectsRay(e){return this.intersectRay(e,zl)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(e,t){return e.face=t,t.outside===null?this.assigned.append(e):this.assigned.insertBefore(t.outside,e),t.outside=e,this}_removeVertexFromFace(e,t){return e===t.outside&&(t.outside=e.next!==null&&e.next.face===t?e.next:null),this.assigned.remove(e),this}_removeAllVerticesFromFace(e){if(e.outside!==null){let t=e.outside,n=e.outside;for(;n.next!==null&&n.next.face===e;)n=n.next;return this.assigned.removeSubList(t,n),t.prev=n.next=null,e.outside=null,t}}_deleteFaceVertices(e,t){let n=this._removeAllVerticesFromFace(e);if(n!==void 0){if(t===void 0)this.unassigned.appendChain(n);else{let e=n;do{let n=e.next;t.distanceToPoint(e.point)>this.tolerance?this._addVertexToFace(e,t):this.unassigned.append(e),e=n}while(e!==null)}}return this}_resolveUnassignedPoints(e){if(this.unassigned.isEmpty()===!1){let t=this.unassigned.first();do{let n=t.next,r=this.tolerance,i=null;for(let n=0;n<e.length;n++){let a=e[n];if(a.mark===Ll){let e=a.distanceToPoint(t.point);if(e>r&&(r=e,i=a),r>1e3*this.tolerance)break}}i!==null&&this._addVertexToFace(t,i),t=n}while(t!==null)}return this}_computeExtremes(){let e=new q,t=new q,n=[],r=[];for(let e=0;e<3;e++)n[e]=r[e]=this.vertices[0];e.copy(this.vertices[0].point),t.copy(this.vertices[0].point);for(let i=0,a=this.vertices.length;i<a;i++){let a=this.vertices[i],o=a.point;for(let t=0;t<3;t++)o.getComponent(t)<e.getComponent(t)&&(e.setComponent(t,o.getComponent(t)),n[t]=a);for(let e=0;e<3;e++)o.getComponent(e)>t.getComponent(e)&&(t.setComponent(e,o.getComponent(e)),r[e]=a)}return this.tolerance=3*2**-52*(Math.max(Math.abs(e.x),Math.abs(t.x))+Math.max(Math.abs(e.y),Math.abs(t.y))+Math.max(Math.abs(e.z),Math.abs(t.z))),{min:n,max:r}}_computeInitialHull(){let e=this.vertices,t=this._computeExtremes(),n=t.min,r=t.max,i=0,a=0;for(let e=0;e<3;e++){let t=r[e].point.getComponent(e)-n[e].point.getComponent(e);t>i&&(i=t,a=e)}let o=n[a],s=r[a],c,l;i=0,Bl.set(o.point,s.point);for(let t=0,n=this.vertices.length;t<n;t++){let n=e[t];if(n!==o&&n!==s){Bl.closestPointToPoint(n.point,!0,Hl);let e=Hl.distanceToSquared(n.point);e>i&&(i=e,c=n)}}i=-1,Vl.setFromCoplanarPoints(o.point,s.point,c.point);for(let t=0,n=this.vertices.length;t<n;t++){let n=e[t];if(n!==o&&n!==s&&n!==c){let e=Math.abs(Vl.distanceToPoint(n.point));e>i&&(i=e,l=n)}}let u=[];if(Vl.distanceToPoint(l.point)<0){u.push(Gl.create(o,s,c),Gl.create(l,s,o),Gl.create(l,c,s),Gl.create(l,o,c));for(let e=0;e<3;e++){let t=(e+1)%3;u[e+1].getEdge(2).setTwin(u[0].getEdge(t)),u[e+1].getEdge(1).setTwin(u[t+1].getEdge(0))}}else{u.push(Gl.create(o,c,s),Gl.create(l,o,s),Gl.create(l,s,c),Gl.create(l,c,o));for(let e=0;e<3;e++){let t=(e+1)%3;u[e+1].getEdge(2).setTwin(u[0].getEdge((3-e)%3)),u[e+1].getEdge(0).setTwin(u[t+1].getEdge(1))}}for(let e=0;e<4;e++)this.faces.push(u[e]);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n!==o&&n!==s&&n!==c&&n!==l){i=this.tolerance;let e=null;for(let t=0;t<4;t++){let r=this.faces[t].distanceToPoint(n.point);r>i&&(i=r,e=this.faces[t])}e!==null&&this._addVertexToFace(n,e)}}return this}_reindexFaces(){let e=[];for(let t=0;t<this.faces.length;t++){let n=this.faces[t];n.mark===Ll&&e.push(n)}return this.faces=e,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let e,t=0,n=this.assigned.first().face,r=n.outside;do{let i=n.distanceToPoint(r.point);i>t&&(t=i,e=r),r=r.next}while(r!==null&&r.face===n);return e}}_computeHorizon(e,t,n,r){this._deleteFaceVertices(n),n.mark=Rl;let i;i=t===null?t=n.getEdge(0):t.next;do{let t=i.twin,n=t.face;n.mark===Ll&&(n.distanceToPoint(e)>this.tolerance?this._computeHorizon(e,t,n,r):r.push(i)),i=i.next}while(i!==t);return this}_addAdjoiningFace(e,t){let n=Gl.create(e,t.tail(),t.head());return this.faces.push(n),n.getEdge(-1).setTwin(t.twin),n.getEdge(0)}_addNewFaces(e,t){this.newFaces=[];let n=null,r=null;for(let i=0;i<t.length;i++){let a=t[i],o=this._addAdjoiningFace(e,a);n===null?n=o:o.next.setTwin(r),this.newFaces.push(o.face),r=o}return n.next.setTwin(r),this}_addVertexToHull(e){let t=[];return this.unassigned.clear(),this._removeVertexFromFace(e,e.face),this._computeHorizon(e.point,null,e.face,t),this._addNewFaces(e,t),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let e;for(this._computeInitialHull();(e=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(e);return this._reindexFaces(),this._cleanup(),this}},Gl=class e{constructor(){this.normal=new q,this.midpoint=new q,this.area=0,this.constant=0,this.outside=null,this.mark=Ll,this.edge=null}static create(t,n,r){let i=new e,a=new Kl(t,i),o=new Kl(n,i),s=new Kl(r,i);return a.next=s.prev=o,o.next=a.prev=s,s.next=o.prev=a,i.edge=a,i.compute()}getEdge(e){let t=this.edge;for(;e>0;)t=t.next,e--;for(;e<0;)t=t.prev,e++;return t}compute(){let e=this.edge.tail(),t=this.edge.head(),n=this.edge.next.head();return Ul.set(e.point,t.point,n.point),Ul.getNormal(this.normal),Ul.getMidpoint(this.midpoint),this.area=Ul.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(e){return this.normal.dot(e)-this.constant}},Kl=class{constructor(e,t){this.vertex=e,this.prev=null,this.next=null,this.twin=null,this.face=t}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){let e=this.head(),t=this.tail();return t===null?-1:t.point.distanceTo(e.point)}lengthSquared(){let e=this.head(),t=this.tail();return t===null?-1:t.point.distanceToSquared(e.point)}setTwin(e){return this.twin=e,e.twin=this,this}},ql=class{constructor(e){this.point=e,this.prev=null,this.next=null,this.face=null}},Jl=class{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(e,t){return t.prev=e.prev,t.next=e,t.prev===null?this.head=t:t.prev.next=t,e.prev=t,this}insertAfter(e,t){return t.prev=e,t.next=e.next,t.next===null?this.tail=t:t.next.prev=t,e.next=t,this}append(e){return this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail,e.next=null,this.tail=e,this}appendChain(e){for(this.head===null?this.head=e:this.tail.next=e,e.prev=this.tail;e.next!==null;)e=e.next;return this.tail=e,this}remove(e){return e.prev===null?this.head=e.next:e.prev.next=e.next,e.next===null?this.tail=e.prev:e.next.prev=e.prev,this}removeSubList(e,t){return e.prev===null?this.head=t.next:e.prev.next=t.next,t.next===null?this.tail=e.prev:t.next.prev=e.prev,this}isEmpty(){return this.head===null}};async function Yl(e){let t=(await Promise.allSettled(e)).find(e=>e.status===`rejected`);if(t)throw t.reason}function Xl(e){let t=new Wl().setFromPoints(e),n=new Set,r=new Map;for(let e of t.faces){let t=e.edge;do n.add(t.head().point),t=t.next;while(t!==e.edge);let i=e.normal.toArray(),a=e.constant;r.set([...i,a].map(e=>e.toFixed(5)).join(`,`),{normal:i,constant:a})}return{vertices:[...n].map(e=>e.toArray()),planes:[...r.values()]}}function Zl(e,t,n){let r=e.attributes.position,i=new Map,a=[],o=[],s=[];for(let e=0;e<r.count;e++){let t=new q().fromBufferAttribute(r,e),n=t.toArray().map(e=>e.toFixed(4)).join(`,`);i.has(n)||(i.set(n,a.length),s.push(a.length),a.push(t)),o.push(i.get(n))}let c=e=>{for(;s[e]!==e;)s[e]=s[s[e]],e=s[e];return e};for(let e=0;e<o.length;e+=3){let t=c(o[e]);s[c(o[e+1])]=t,s[c(o[e+2])]=t}let l=new Map;a.forEach((e,t)=>{let n=c(t);l.has(n)||l.set(n,[]),l.get(n).push(e)});let u=[];for(let e of l.values()){let n=new Xn().setFromPoints(e),r=n.getSize(new q),i=n.getCenter(new q);if(e.length<6||n.min.y>=t.y*.08||!(n.min.x>0||n.max.x<0)||r.x>=t.x*.3||r.y<=t.y*.12||r.y>=t.y*.8||r.z/r.y<.6||r.z/r.y>1.5)continue;let a=u.find(e=>Math.sign(e.center.x)===Math.sign(i.x)&&Math.abs(e.center.z-i.z)<Math.max(r.y,e.radius*2)*.6),o=Math.max(r.y,r.z)/2;a?o>a.radius&&(a.center.copy(i),a.radius=o,a.halfWidth=r.x/2):u.push({center:i,radius:o,halfWidth:r.x/2})}if(u.length<4)return n;for(let e of u)e.radius=Math.max(...u.filter(t=>Math.abs(t.center.z-e.center.z)<.4).map(e=>e.radius));let d=Math.min(...u.map(e=>e.radius))*.65,f=[Xl(a.filter(e=>e.y>=d))];for(let e of u){let t=[];for(let n of[-1,1])for(let r=0;r<12;r++){let i=r*Math.PI/6;t.push(new q(e.center.x+n*e.halfWidth,e.radius+Math.cos(i)*e.radius,e.center.z+Math.sin(i)*e.radius))}f.push(Xl(t))}return{vertices:f.flatMap(e=>e.vertices),planes:n.planes,parts:f}}var Ql=class{manifest;models=new Map;textures=new Map;selectedModels=new Set;selectedTextures=new Set;async load(e,t=`city`,n=`classic-0`){let r=await fetch(b(`assets/manifest.json`));if(!r.ok)throw Error(`素材清单加载失败。`);this.manifest=await r.json(),await this.loadSelection(t,n,e)}async loadSelection(e,t,n=()=>{}){let r=v(e),i=new Set(this.models.keys()),a=new Set(this.textures.keys()),o=r.id===`city`?[...Object.keys(this.manifest.models).filter(e=>!g[e]&&!e.endsWith(`-base`)&&!e.endsWith(`-path`)),...r.models]:[`person`,`crown`,`holeInterior`,...r.models];for(let[e,t]of Object.entries(r.ground)){let n=r.id+`-`+e;if(this.manifest.models[n]={...this.manifest.models.grass,texture:t,tile:!0},r.groundColors?.[e]){let t=new Z(r.groundColors[e]);this.manifest.models[n].texture=null,this.manifest.models[n].material={source:`web-adaptation/terrain-colors`,color:{r:t.r,g:t.g,b:t.b,a:1},alphaTest:0,offset:{x:0,y:0},repeat:{x:1,y:1}}}o.push(n)}let s=new Set(o.map(e=>this.manifest.models[e].texture).filter(e=>!!e));s.add(`captureDust`);for(let e of[t,...y])for(let t of _(e).layers){s.add(t.texture);for(let e of t.frames??[])s.add(e)}let c=0,l=o.length+s.size;try{await Yl([...s].map(async e=>{if(!this.textures.has(e)){let t=await new Ea().loadAsync(b(this.manifest.textures[e]));t.colorSpace=at,t.anisotropy=4,this.textures.set(e,t)}n(++c/l)})),await this.loadModels(o,()=>n(++c/l)),this.selectedModels=new Set(o),this.selectedTextures=s}catch(e){for(let[e,t]of this.models)i.has(e)||(t.geometry.dispose(),this.models.delete(e));for(let[e,t]of this.textures)a.has(e)||(t.dispose(),this.textures.delete(e));throw e}}releaseUnused(){for(let[e,t]of this.models)this.selectedModels.has(e)||(t.geometry.dispose(),this.models.delete(e));for(let[e,t]of this.textures)this.selectedTextures.has(e)||(t.dispose(),this.textures.delete(e))}async loadModels(e,t){await Yl(e.map(async e=>{if(this.models.has(e)){t();return}let n=this.manifest.models[e];if(n.tile){let r=new Bi(n.width,n.width);if(r.rotateX(-Math.PI/2),n.texture===`japanPath`||n.texture===`farmPath`){let e=r.attributes.uv;for(let t=0;t<e.count;t++)e.setXY(t,(n.texture===`farmPath`?.29:.49)+e.getX(t)*.02,.49+e.getY(t)*.02)}this.models.set(e,{geometry:r,texture:this.textures.get(n.texture),size:new q(n.width,0,n.width)}),t();return}let r=[];try{for(let e of[{path:n.path,offset:[0,0,0]},...n.parts??[]]){let t=e.path.endsWith(`.hgm`)?await Pl(b(e.path)):await this.loadDevelopmentModel(e.path);t.updateMatrixWorld(!0),t.traverse(t=>{if(t instanceof vi){let n=t.geometry.clone();n.applyMatrix4(t.matrixWorld),n.translate(e.offset[0],e.offset[1],e.offset[2]),n.attributes.normal||n.computeVertexNormals(),n.index?(r.push(n.toNonIndexed()),n.dispose()):r.push(n),t.geometry.dispose();for(let e of Array.isArray(t.material)?t.material:[t.material])e.dispose()}})}let i=Fl(r,!1);if(!i)throw Error(`模型无法载入：${e}`);if(n.material&&i.attributes.uv){let e=i.attributes.uv,{offset:t,repeat:r}=n.material;for(let n=0;n<e.count;n++)e.setXY(n,e.getX(n)*r.x+t.x,e.getY(n)*r.y+t.y)}if(n.rotateX&&i.rotateX(n.rotateX),(n.kind===`plane`||n.kind===`hole`)&&i.rotateX(-Math.PI/2),n.flipUV){let e=i.attributes.uv;for(let t=0;t<e.count;t++)e.setY(t,1-e.getY(t))}if(n.pose===`pedestrian`){i.computeBoundingBox();let e=i.boundingBox,t=(e.min.x+e.max.x)/2,n=e.max.y-e.min.y,r=e.min.y+n*.77,a=n*.13,o=i.attributes.position;for(let i=0;i<o.count;i++){let s=o.getX(i)-t,c=o.getY(i);if(Math.abs(s)<=a||c<e.min.y+n*.57)continue;let l=Math.sign(s),u=-l*Math.PI*.37,d=s-l*a,f=c-r;o.setXY(i,t+l*a+d*Math.cos(u)-f*Math.sin(u),r+d*Math.sin(u)+f*Math.cos(u))}i.computeVertexNormals()}i.computeBoundingBox();let a=i.boundingBox,o=a.getCenter(new q),s=a.getSize(new q);i.translate(-o.x,-a.min.y,-o.z);let c=n.width/Math.max(s.x,.001),l=n.height&&s.y>0?n.height/s.y:c,u=n.kind===`plane`?n.width/Math.max(s.z,.001):c;i.scale(c,l,u),i.computeBoundingBox(),i.computeBoundingSphere(),s.multiply(new q(c,l,u));let d;if(n.kind!==`plane`&&n.kind!==`hole`&&e!==`crown`){let e=i.attributes.position,t=new Map;for(let n=0;n<e.count;n++){let r=new q().fromBufferAttribute(e,n);t.set(`${r.x.toFixed(5)},${r.y.toFixed(5)},${r.z.toFixed(5)}`,r)}d=Xl([...t.values()]),n.behavior===`Vehicle`&&(d=Zl(i,s,d))}this.models.set(e,{geometry:i,texture:n.texture?this.textures.get(n.texture):void 0,size:s,hull:d}),t()}finally{for(let e of r)e.dispose()}}))}sprite(e){return b(this.manifest.sprites[e])}async loadDevelopmentModel(e){throw Error(`发行包包含未转换的模型`)}dispose(){for(let e of this.models.values())e.geometry.dispose();for(let e of this.textures.values())e.dispose()}},$l=(e,t,n)=>Math.max(t,Math.min(n,e)),eu=(e,t,n)=>e+(t-e)*n,tu=(e,t)=>(e.x-t.x)**2+(e.z-t.z)**2,nu=class{state;constructor(e){this.state=e>>>0}next(){let e=this.state+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return eu(e,t,this.next())}int(e,t){return Math.floor(this.range(e,t))}pick(e){return e[this.int(0,e.length)]}},ru=class{distance;height;zoom;_targetDistance;_targetHeight;config;constructor(e){this.config=e;let t=e.camera.levelCurves.NormalMode;this.distance=this._targetDistance=t.distance[0],this.height=this._targetHeight=t.height[0],this.zoom=e.camera.zoom}SetDistance(e){this._targetDistance=e}SetHeight(e){this._targetHeight=e}SetZoom(e){this.zoom=e}Reset(e,t){this.distance=this._targetDistance=e,this.height=this._targetHeight=t}LateUpdate(e){let t=Math.max(0,e)*this.config.camera.travelSpeed;this.distance+=Math.sign(this._targetDistance-this.distance)*Math.min(Math.abs(this._targetDistance-this.distance),t),this.height+=Math.sign(this._targetHeight-this.height)*Math.min(Math.abs(this._targetHeight-this.height),t)}},iu=class{renderer;scene=new Fn;camera=new Ba(50,1,.1,1800);cameraFollow;config;assets;city=new Dn;holes=new Dn;feedback=new Dn;dust=[];holeViews=[];batches=new Map;bodySupports=new Map;nearby=[];frustum=new Pi;frustumMatrix=new X;sphere=new xr;queryCorner=new q;uniforms;playerWindow={value:new Jt(0,0,1,1)};undergroundCamera={value:new q};matrix=new X;position=new q;scale=new q;rotation=new jt;euler=new ln;occlusionRay=new ai;occlusionBox=new Xn;opacityByObject=new Map;follow=new q;sun=new Ua(16774107,2.4);width=1;height=1;pixelRatio=1;elapsed=0;isMenu=!0;color=new Z;quality=`high`;visibleObjectCount=0;skyColor=new Z(12180461);reducedMotion=!1;feedbackAt=-1/0;contactAt=-1/0;disposed=!1;grayscale=!1;constructor(e,t,n){this.config=t,this.assets=n,this.camera.fov=t.camera.fieldOfView,this.cameraFollow=new ru(t),e.style.transition=`filter ${t.camera.grayscaleSeconds}s ease-out`,this.renderer=new Nl({canvas:e,antialias:!0,alpha:!0,powerPreference:`high-performance`}),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=at,this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.15,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=1,this.uniforms={value:Array.from({length:Math.max(t.match.totalHoles,t.modes.battleRoyale.totalHoles)},()=>new Jt(0,0,-1,0))},this.scene.add(new Oa(15005183,7894379,2)),this.sun.position.set(-70,150,50),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),Object.assign(this.sun.shadow.camera,{left:-100,right:100,top:100,bottom:-100,near:1,far:500}),this.sun.shadow.bias=-2e-4,this.sun.shadow.normalBias=.15,this.scene.add(this.sun,this.sun.target,this.city,this.holes,this.feedback),this.resize()}material(e,t=!1){let n=new Qi({map:e??null,side:2});return t?(n.onBeforeCompile=e=>{e.uniforms.cityHoles=this.uniforms,e.vertexShader=`varying vec3 cityWorldPosition;\n${e.vertexShader}`.replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vec4 cityVertex = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
cityVertex = instanceMatrix * cityVertex;
#endif
cityWorldPosition = (modelMatrix * cityVertex).xyz;`),e.fragmentShader=`uniform vec4 cityHoles[${Math.max(this.config.match.totalHoles,this.config.modes.battleRoyale.totalHoles)}];\nvarying vec3 cityWorldPosition;\n${e.fragmentShader}`.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>\nfor (int i = 0; i < ${Math.max(this.config.match.totalHoles,this.config.modes.battleRoyale.totalHoles)}; i++) {\nif (cityHoles[i].z > 0.0 && distance(cityWorldPosition.xz, cityHoles[i].xy) < cityHoles[i].z) discard;\n}`)},n.customProgramCacheKey=()=>`city-ground-cutouts-v1`):this.maskUnderground(n),n}maskUnderground(e){return e.onBeforeCompile=e=>{e.uniforms.cityHoles=this.uniforms,e.uniforms.undergroundCamera=this.undergroundCamera,e.vertexShader=`varying vec3 undergroundWorldPosition;\n${e.vertexShader}`.replace(`#include <worldpos_vertex>`,`#include <worldpos_vertex>
vec4 undergroundVertex = vec4(transformed, 1.0);
#ifdef USE_INSTANCING
undergroundVertex = instanceMatrix * undergroundVertex;
#endif
undergroundWorldPosition = (modelMatrix * undergroundVertex).xyz;`),e.fragmentShader=`uniform vec4 cityHoles[${Math.max(this.config.match.totalHoles,this.config.modes.battleRoyale.totalHoles)}];\nuniform vec3 undergroundCamera;\nvarying vec3 undergroundWorldPosition;\n${e.fragmentShader}`.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>\nif (undergroundWorldPosition.y < 0.0) {\nvec2 viewSlope = (undergroundCamera.xz - undergroundWorldPosition.xz) / max(0.001, undergroundCamera.y - undergroundWorldPosition.y);\nvec2 surfacePoint = undergroundWorldPosition.xz - undergroundWorldPosition.y * viewSlope;\nbool throughHole = false;\nfor (int i = 0; i < ${Math.max(this.config.match.totalHoles,this.config.modes.battleRoyale.totalHoles)}; i++) {\nif (cityHoles[i].z > 0.0 && distance(surfacePoint, cityHoles[i].xy) < cityHoles[i].z) throughHole = true;\n}\nif (!throughHole) discard;\n}`),e.fragmentShader=e.fragmentShader.replace(`#include <opaque_fragment>`,`outgoingLight *= mix(${this.config.presentation.cavityMinLight.toFixed(4)}, 1.0, exp(min(0.0, undergroundWorldPosition.y) / ${this.config.presentation.cavityShadeDepth.toFixed(4)}));\n#include <opaque_fragment>`)},e.customProgramCacheKey=()=>`city-underground-perspective-aperture-v3`,e}instanced(e,t,n,r=!1){let i=this.assets.models.get(e),a=this.material(i.texture,r),o=this.assets.manifest.models[e].material;o&&(a.color.setRGB(o.color.r,o.color.g,o.color.b),a.opacity=o.color.a,a.alphaTest=o.alphaTest);let s=new Ai(i.geometry,a,t);if(this.assets.manifest.models[e].behavior===`Building`&&n===this.city){s.geometry=i.geometry.clone(),s.userData.ownedGeometry=!0,s.geometry.setAttribute(`instanceOpacity`,new Si(new Float32Array(t).fill(1),1));let e=s.material;e.alphaHash=!0,e.side=2;let n=e.onBeforeCompile;e.onBeforeCompile=(t,r)=>{n.call(e,t,r),t.uniforms.playerWindow=this.playerWindow,t.vertexShader=`attribute float instanceOpacity;\nvarying float buildingOpacity;\n${t.vertexShader}`.replace(`#include <begin_vertex>`,`#include <begin_vertex>
buildingOpacity = instanceOpacity;`),t.fragmentShader=`uniform vec4 playerWindow;\nvarying float buildingOpacity;\n${t.fragmentShader}`.replace(`#include <alphahash_fragment>`,`float windowDistance = length((gl_FragCoord.xy - playerWindow.xy) / playerWindow.zw);\nfloat windowClear = 1.0 - smoothstep(1.0, 1.18, windowDistance);\ndiffuseColor.a *= mix(1.0, ${this.config.camera.occlusionShellOpacity.toFixed(4)} * (1.0 - windowClear), 1.0 - buildingOpacity);\n#include <alphahash_fragment>`)},e.customProgramCacheKey=()=>`city-foreground-depth-hash-perspective-aperture-v5`;let r=new $i({depthPacking:it});r.onBeforeCompile=e=>{e.vertexShader=`attribute float instanceOpacity;\nvarying float buildingOpacity;\n${e.vertexShader}`.replace(`#include <begin_vertex>`,`#include <begin_vertex>
buildingOpacity = instanceOpacity;`),e.fragmentShader=`varying float buildingOpacity;\n${e.fragmentShader}`.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>
if (buildingOpacity < 0.5) discard;`)},r.customProgramCacheKey=()=>`city-foreground-depth-v1`,s.customDepthMaterial=r}return s.name=e,s.instanceMatrix.setUsage(dt),e===`grass`&&s.material.color.setRGB(.7,1.15,.4),r&&[`road`,`lane`,`crosswalk`,`arrow`].includes(e)&&s.material.color.set(this.config.presentation.roadTint),r&&e===`pavement`&&s.material.color.set(this.config.presentation.pavementTint),s.castShadow=!r,s.receiveShadow=!0,!r&&!s.customDepthMaterial&&(s.customDepthMaterial=new $i),s.frustumCulled=!1,n.add(s),s}setTransform(e,t,n,r,i,a,o,s=0){this.position.set(n,r,i),this.scale.setScalar(o),this.rotation.setFromEuler(this.euler.set(s,a,s*.5)),this.matrix.compose(this.position,this.rotation,this.scale),e.setMatrixAt(t,this.matrix)}objectModel(e){let t=this.config.presentation.modelVariants[e.model];return t?.[e.id%t.length]??e.model}rebuild(e){this.clearGroup(this.feedback),this.dust=[],this.feedbackAt=this.contactAt=-1/0,this.skyColor.set(e.map.definition.sky),this.clearGroup(this.city),this.clearGroup(this.holes),this.holeViews=[],this.batches.clear(),this.opacityByObject.clear();let t=new Map;for(let n of e.CurrentFallingObjects){let e=this.objectModel(n),r=this.assets.models.get(e),i=this.bodySupports.get(e);if(!i){i={minX:1/0,maxX:-1/0,minZ:1/0,maxZ:-1/0};let t=r.geometry.attributes.position,n=r.size.y*this.config.physics.supportHeightFraction;for(let e=0;e<t.count;e++)t.getY(e)<=n&&(i.minX=Math.min(i.minX,t.getX(e)),i.maxX=Math.max(i.maxX,t.getX(e)),i.minZ=Math.min(i.minZ,t.getZ(e)),i.maxZ=Math.max(i.maxZ,t.getZ(e)));this.bodySupports.set(e,i)}n.ConfigureBody(r.size,i,r.hull);let a=t.get(e);a||(a=[],t.set(e,a)),a.push(n)}for(let[e,n]of t){let t=this.instanced(e,n.length,this.city);this.batches.set(e,t),t.count=0}let n=new Map;for(let t of e.map.ground){let e=n.get(t.model);e||(e=[],n.set(t.model,e)),e.push(t)}for(let[e,t]of n){let n=this.instanced(e,t.length,this.city,!0);t.forEach((t,r)=>this.setTransform(n,r,t.x,e===`grass`||e===`manhole`?.035:0,t.z,t.rotation,t.scale)),n.instanceMatrix.needsUpdate=!0}for(let t of e.CurrentHoles)this.holeViews.push(this.makeHole(t.color,t.PlayerId,t.skinId));this.follow.set(e.player.x,0,e.player.z),this.cameraFollow.Reset(e.cameraTarget.distance,e.cameraTarget.height)}makeHole(e,t,n){let r=new Dn,i=this.assets.models.get(`holeInterior`),a=i.geometry.clone(),o=a.attributes.position,s=new Float32Array(o.count*3);for(let e=0;e<o.count;e++){let t=eu(.001,.035,$l(o.getY(e)/i.size.y,0,1));s[e*3]=t,s[e*3+1]=t*1.1,s[e*3+2]=t*1.4}a.setAttribute(`color`,new mr(s,3));let c=new vi(a,this.maskUnderground(new oi({vertexColors:!0,side:2})));c.position.y=-i.size.y,r.add(c);let l=this.config.presentation.rimOuterRatio,u=new vi(new Vi(1,l,64),new oi({color:e,side:2,depthWrite:!1,toneMapped:!1}));u.renderOrder=1+t*2,u.rotation.x=-Math.PI/2,u.position.y=.06,r.add(u);let d=new vi(new Vi(1,this.config.presentation.rimGlintRatio,64),new oi({color:14940415,side:2,depthWrite:!1,toneMapped:!1}));d.renderOrder=2+t*2,d.rotation.x=-Math.PI/2,d.position.y=.07,r.add(d);let f=new vi(new Vi(l+.04,l+.07,64),new oi({color:e,transparent:!0,opacity:0,side:2,depthWrite:!1,toneMapped:!1}));f.rotation.x=-Math.PI/2,f.position.y=.1,r.add(f);let p=new Dn;for(let[e,r]of _(n).layers.entries()){let n=new Bi(r.width,r.height);n.rotateX(-Math.PI/2),n.translate(r.x,e*.002,r.z);let i=new oi({map:this.assets.textures.get(r.texture),alphaTest:.08,side:2,depthWrite:!1,toneMapped:!1});i.onBeforeCompile=e=>{e.vertexShader=`varying vec2 skinPoint;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
skinPoint = position.xz;`);let t=r.circle?`\nif (length((skinPoint - vec2(${r.x.toFixed(4)}, ${r.z.toFixed(4)})) / vec2(${(r.width/2).toFixed(4)}, ${(r.height/2).toFixed(4)})) > 1.0) discard;`:``;e.fragmentShader=`varying vec2 skinPoint;
`+e.fragmentShader.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>
if (length(skinPoint) < 1.015) discard;`+t)},i.customProgramCacheKey=()=>`skin-aperture-v2-`+(r.circle?[r.x,r.z,r.width,r.height].join(`,`):`free`);let a=new vi(n,i);a.renderOrder=20+t*20+e,p.add(a)}p.position.y=.08,r.add(p),d.renderOrder=190;let m=this.assets.models.get(`crown`),h=new vi(m.geometry.clone(),this.material(m.texture));return h.visible=!1,r.add(h),this.holes.add(r),{group:r,rim:u,glint:d,crown:h,ring:f,skin:p,radius:this.config.hole.radiusMin}}processEvent(e,t){if(e.id===0){if((e.type===`capture`||e.type===`fall`)&&(e.type===`capture`&&(this.feedbackAt=t),!this.reducedMotion&&e.x!==void 0&&e.z!==void 0)){let n=this.quality===`low`?Math.min(12,this.config.feedback.maxParticles):this.config.feedback.maxParticles,r=Math.min(6,Math.max(2,Math.ceil(Math.sqrt(e.value??1))));for(let i=0;i<r;i++){let a=this.dust.find(e=>t-e.born>=.55);if(!a&&this.dust.length<n){let e=new $r(new zr({map:this.assets.textures.get(`captureDust`),color:14931649,depthWrite:!1,transparent:!0}));this.feedback.add(e),a={sprite:e,born:-1/0,angle:0,size:1,x:0,z:0},this.dust.push(a)}if(!a)break;Object.assign(a,{born:t,angle:i*Math.PI*2/r+t,size:Math.min(2.2,.55+Math.sqrt(e.value??1)*.12),x:e.x,z:e.z})}}e.type===`contact`&&(this.contactAt=t)}}setQuality(e){this.quality=e,this.renderer.shadowMap.enabled=e===`high`,this.resize()}ToggleGrayscale(e){this.grayscale!==e&&(this.grayscale=e,this.renderer.domElement.style.filter=e?`grayscale(1)`:``)}resize(){this.width=Math.max(1,window.innerWidth),this.height=Math.max(1,window.innerHeight),this.pixelRatio=Math.min(window.devicePixelRatio||1,this.quality===`high`?1.75:1),this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(this.width,this.height,!1),this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix()}render(e,t){if(!this.disposed){this.elapsed+=t,this.isMenu=e.phase===`MENU`,this.feedback.visible=!this.isMenu&&!this.reducedMotion;for(let t of this.dust){let n=Math.max(0,e.time-t.born)/.55;t.sprite.visible=n<1,t.sprite.visible&&(t.sprite.position.set(t.x+Math.cos(t.angle)*n*t.size,.25+n*.8,t.z+Math.sin(t.angle)*n*t.size),t.sprite.scale.setScalar(t.size*(1+n)),t.sprite.material.opacity=(1-n)*.4)}if(this.ToggleGrayscale(e.phase===`PLAYING`&&e.player.IsDead),this.city.visible=!this.isMenu,this.holes.visible=!this.isMenu,this.scene.background=this.isMenu?null:this.skyColor,this.isMenu)this.visibleObjectCount=0,this.renderer.info.reset();else{{let n=e.player;this.follow.lerp(this.position.set(n.x,0,n.z),1-Math.exp(-this.config.camera.followSpeed*t)),this.cameraFollow.SetDistance(e.cameraTarget.distance),this.cameraFollow.SetHeight(e.cameraTarget.height),this.cameraFollow.SetZoom(this.config.camera.zoom*(this.width<this.height?this.config.camera.portraitZoom:1)),this.cameraFollow.LateUpdate(t);let r=this.config.ai.worldScale*this.cameraFollow.zoom,i=this.cameraFollow.distance*r*Math.SQRT1_2,a=this.cameraFollow.height*r;this.camera.position.set(this.follow.x+i,a,this.follow.z+i),this.camera.lookAt(this.follow.x,0,this.follow.z),this.undergroundCamera.value.copy(this.camera.position),this.sun.position.set(this.follow.x-70,150,this.follow.z+50),this.sun.target.position.copy(this.follow),this.camera.updateMatrixWorld(),this.position.set(n.x,0,n.z).project(this.camera);let o=2*Math.hypot(i,a,i)*Math.tan(this.camera.fov*Math.PI/360),s=n.Size*this.height/o;this.playerWindow.value.set((this.position.x+1)*this.width/2*this.pixelRatio,(this.position.y+1)*this.height/2*this.pixelRatio,(s+14)*this.pixelRatio,(s*Math.SQRT1_2+14)*this.pixelRatio),this.frustum.setFromProjectionMatrix(this.frustumMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse));let c=Math.hypot(Math.abs(this.follow.x)+e.map.boundary,Math.abs(this.follow.z)+e.map.boundary)+this.config.camera.boundsPadding,l=0;for(let e=0;e<4;e++){if(this.queryCorner.set(e&1?1:-1,e&2?1:-1,.5).unproject(this.camera).sub(this.camera.position),this.queryCorner.y>=-1e-6){l=c;break}this.queryCorner.multiplyScalar(-this.camera.position.y/this.queryCorner.y).add(this.camera.position),l=Math.max(l,this.queryCorner.distanceTo(this.follow))}l=Math.min(c,l+this.config.camera.boundsPadding),e.index.query(this.follow.x,this.follow.z,l,this.nearby);for(let t of e.ConsumingObjects)this.nearby.push(t);for(let e of this.batches.values())e.count=0;let u=0;for(let e of this.nearby){let r=this.objectModel(e),i=this.assets.models.get(r);if(e.body?this.sphere.center.copy(e.body.position):this.sphere.center.set(e.x,e.y+i.size.y*e.scale/2,e.z),this.sphere.radius=i.size.length()*e.scale/2,!this.frustum.intersectsSphere(this.sphere))continue;let a=this.batches.get(r),o=a.count++,s=a.geometry.getAttribute(`instanceOpacity`);if(s){let r=Math.max(i.size.x,i.size.z)*e.scale/2;this.occlusionBox.min.set(e.x-r,e.y,e.z-r),this.occlusionBox.max.set(e.x+r,e.y+i.size.y*e.scale,e.z+r);let a=!1,c=Math.hypot(i.size.x,i.size.z)*e.scale/2<=n.Size;if(!c&&(!e.body||e.body.boundsMax.y>0)){let e=n.Size*.6;for(let t=0;t<5;t++){let r=t===1?e:t===2?-e:0,i=t===3?e:t===4?-e:0;if(this.occlusionRay.origin.set(n.x+r,.15,n.z+i),this.occlusionRay.direction.subVectors(this.camera.position,this.occlusionRay.origin).normalize(),this.occlusionRay.intersectsBox(this.occlusionBox)){a=!0;break}}}let l=a?this.config.camera.occlusionOpacity:1,u=c?1:eu(this.opacityByObject.get(e.id)??1,l,1-Math.exp(-this.config.camera.occlusionFadeSpeed*t));this.opacityByObject.set(e.id,u),s.setX(o,u)}e.body?(this.position.set(e.x,e.y,e.z),this.scale.setScalar(e.scale),this.matrix.compose(this.position,e.body.orientation,this.scale),a.setMatrixAt(o,this.matrix)):this.setTransform(a,o,e.x,e.y,e.z,e.rotation,e.scale),this.color.setHSL(e.id*.61803%1,e.model.includes(`building`)?.16:.04,.85),a.setColorAt(o,this.color),u++}for(let e of this.batches.values()){e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0);let t=e.geometry.getAttribute(`instanceOpacity`);t&&(t.needsUpdate=!0)}this.visibleObjectCount=u,this.uniforms.value.forEach(e=>e.set(0,0,-1,0)),e.CurrentHoles.forEach((n,r)=>{let i=this.holeViews[r];i.radius=n.IsDead?eu(i.radius,0,1-Math.exp(-12*t)):n.Size,i.group.position.set(n.x,0,n.z),i.group.scale.set(i.radius,Math.max(1,i.radius*.6),i.radius),i.rim.position.y=.06/i.group.scale.y,i.skin.position.y=.08/i.group.scale.y,i.skin.scale.y=1/i.group.scale.y;for(let[t,r]of _(n.skinId).layers.entries()){if(!r.frames?.length)continue;let n=i.skin.children[t];n.material.map=this.assets.textures.get(this.reducedMotion?r.texture:r.frames[Math.floor(e.time*(r.fps??12))%r.frames.length])}i.glint.position.y=.07/i.group.scale.y,i.ring.position.y=.1/i.group.scale.y,i.group.visible=i.radius>.01,this.uniforms.value[r].set(n.x,n.z,i.radius,0);let a=e.time<n.protectedUntil,o=n.HoleMode===`FrenzyMode`?`#ffbd45`:n.color;i.rim.material.color.set(a&&Math.sin(this.elapsed*10)<0?`#ffffff`:o);let s=$l((e.time-n.levelChangedAt)/this.config.presentation.levelPulseSeconds,0,1);if(i.ring.scale.setScalar(1+s*.7),i.ring.material.opacity=this.reducedMotion?0:(1-s)*.8,n.IsLocalPlayer&&!this.reducedMotion){let t=$l(1-(e.time-this.feedbackAt)/this.config.feedback.capturePulseSeconds,0,1),n=$l(1-(e.time-this.contactAt)/.12,0,1);i.glint.material.color.set(t>0?`#ffffff`:n>0?`#ffe9b3`:`#e3f8ff`),t>0&&(i.ring.scale.setScalar(1+(1-t)*.2),i.ring.material.opacity=Math.max((1-s)*.8,t*.6))}n.crown.Update(t),i.crown.visible=n.CrownVisible&&!n.IsDead;let c=this.config.ai.worldScale;i.crown.position.y=n.crown.height*c/i.group.scale.y;let l=n.crown.scale*c;i.crown.scale.set(l/Math.max(.01,i.radius),l/i.group.scale.y,l/Math.max(.01,i.radius)),i.crown.rotation.y=n.crown.rotation})}this.renderer.render(this.scene,this.camera)}}}project(e,t,n){return this.position.set(e,t,n).project(this.camera),{x:(this.position.x+1)*this.width/2,y:(1-this.position.y)*this.height/2,visible:this.position.z>=-1&&this.position.z<=1&&Math.abs(this.position.x)<1.2&&Math.abs(this.position.y)<1.2}}metrics(){return{width:this.width,height:this.height,dpr:this.pixelRatio,calls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,visibleObjectsEstimate:this.visibleObjectCount,quality:this.quality,camera:{projection:this.isMenu?`original-sprite`:`perspective`,distance:this.cameraFollow.distance,height:this.cameraFollow.height,zoom:this.cameraFollow.zoom,fov:this.camera.fov}}}get visibleObjects(){return this.visibleObjectCount}clearGroup(e){e.traverse(e=>{e instanceof Ai?(e.dispose(),e.customDepthMaterial?.dispose(),e.userData.ownedGeometry&&e.geometry.dispose(),e.material.dispose()):e instanceof vi?(e.geometry.dispose(),e.material.dispose()):e instanceof $r&&e.material.dispose()}),e.clear()}dispose(){this.disposed=!0,this.clearGroup(this.city),this.clearGroup(this.holes),this.clearGroup(this.feedback),this.dust=[],this.sun.shadow.dispose(),this.renderer.dispose()}},au=class{_canMove=!1;_hole;config;constructor(e,t){this._hole=e,this.config=t}get CanMove(){return this._canMove}set CanMove(e){this._canMove=e}StartMoving(){this.CanMove=!0}TryTranslate(e,t,n,r){let i=this._hole;if(!this.CanMove||i.IsDead)return;let a=Math.hypot(e,t);a>0&&i.SetRotation(Math.atan2(e,t)),a>1&&(e/=a,t/=a);let o=i.Speed*this.config.movement.baseSpeed,s=e*o,c=t*o,l=a>0?this.config.movement.acceleration:this.config.movement.damping,u=Math.exp(-l*n),d=s*n+(i.vx-s)*(1-u)/l,f=c*n+(i.vz-c)*(1-u)/l;i.vx=s+(i.vx-s)*u,i.vz=c+(i.vz-c)*u,i.TranslatePosition(d,f);let p=Math.max(0,r-i.Size),m=$l(i.x,-p,p),h=$l(i.z,-p,p);i.x!==m&&(i.vx=0),i.z!==h&&(i.vz=0),i.x=m,i.z=h,Math.hypot(i.vx,i.vz)<this.config.movement.stopEpsilon&&a===0&&(i.vx=i.vz=0)}},ou=class extends au{changeTargetTimer=0;targetObject=null;farTarget=null;_sensitivity;difficulty;state=`seek`;random;candidates=[];nextThink=0;limit=1/0;now=0;stalled=0;lastDistance=1/0;ignored=new Map;roam=null;constructor(e,t,n){super(e,t),this.random=new nu(n),this._sensitivity=t.bots.sensitivity,this.difficulty=t.ai.profiles[(e.PlayerId-1)%t.ai.profiles.length]}valid(e){if(e.state!==`IDLE`||e.OnlyForPlayer||e.y<this.config.objectBehavior.minTargetY||(this.ignored.get(e.id)??0)>this.now)return!1;let t=e.body?.position??e;return Math.hypot(e.bodySize[0],e.bodySize[2])*e.scale/2+Math.hypot(t.x-$l(t.x,-this.limit,this.limit),t.z-$l(t.z,-this.limit,this.limit))<=this._hole.Size*.99}FindClosestTarget(e,t=null){e.query(this._hole.x,this._hole.z,this.config.ai.perceptionRadius,this.candidates);let n=this.candidates.filter(e=>e!==t&&this.valid(e)).sort((e,t)=>tu(e,this._hole)-tu(t,this._hole)).slice(0,this.config.ai.nearestChoices);return n.length?this.random.pick(n):null}FindFurthestTarget(e){let t=e.filter(e=>this.valid(e)).sort((e,t)=>tu(e,this._hole)-tu(t,this._hole)).slice(0,this.config.ai.nearestChoices);return t.length?this.random.pick(t):null}AreHoleAround(e){return e.some(e=>e!==this._hole&&!e.IsDead&&tu(e,this._hole)<this.config.ai.nearHoleDistanceSquared)}SetDirection(e){this._hole.SetRotation(Math.atan2(e.x,e.z))}Update(e,t,n,r,i,a){if(!this.CanMove||this._hole.IsDead)return;let o=this._hole;if(this.now=t,this.limit=a-this.config.hole.radiusMax,o.SetSpeedMultiplier(this.config.ai.movementMultiplier*(o.HoleMode===`FrenzyMode`?this.config.combat.frenzySpeedMultiplier:1)),t>=this.nextThink){this.nextThink=t+this.config.ai.thinkSeconds;for(let[e,n]of this.ignored)n<=t&&this.ignored.delete(e);let e=this.targetObject?.state===`CONSUMING`&&this.targetObject.ownerId===o.PlayerId&&!this.targetObject.scored;(!this.targetObject&&!this.roam||this.targetObject&&!e&&!this.valid(this.targetObject)||t>=this.changeTargetTimer)&&(this.roam=null,this.random.next()<this.config.ai.closeTargetChance?(this.targetObject=this.FindClosestTarget(n)??this.FindFurthestTarget(r),this.state=`seek`):(this.targetObject=null,this.state=`roam`,this.roam={x:$l(o.x+this.random.range(-48,48),-this.limit,this.limit),z:$l(o.z+this.random.range(-48,48),-this.limit,this.limit)}),this.changeTargetTimer=t+this.random.range(...this.config.ai.targetSeconds),this.stalled=0,this.lastDistance=1/0)}let s=this.targetObject?.body?.position??this.targetObject??this.roam;if(s){let n=$l(s.x,-this.limit,this.limit),r=$l(s.z,-this.limit,this.limit),i=n-o.x,a=r-o.z,c=Math.hypot(i,a);this.lastDistance-c<e*.15&&!(this.targetObject?.body&&this.targetObject.body.velocity.y<-.1)?this.stalled+=e:this.stalled=0,this.lastDistance=c,this.stalled>=this.config.ai.stuckSeconds&&(this.targetObject&&this.ignored.set(this.targetObject.id,t+5),this.targetObject=null,this.roam=null,this.nextThink=0),c<=o.Speed*this.config.movement.baseSpeed*e?(o.x=n,o.z=r,o.vx=o.vz=0,this.roam&&=null):this.TryTranslate(i/c,a/c,e,this.limit+o.Size)}else this.TryTranslate(0,0,e,this.limit+o.Size);o.x=$l(o.x,-this.limit,this.limit),o.z=$l(o.z,-this.limit,this.limit)}},su=class extends ou{targetHole=null;localTargetCount=()=>0;aggressionTimer=0;huntUntil=0;battleRandom=new nu(1);initialize(e){this.battleRandom=new nu(e),this.aggressionTimer=this.battleRandom.range(2.5,10),this._hole.OverrideMaxLevel(this.config.modes.battleRoyale.botMaxLevel)}GetAggressivityRatio(e){return Math.min(1,e/this.config.modes.battleRoyale.aggressionSeconds)}Update(e,t,n,r,i,a){if(!this.CanMove||this._hole.IsDead){this.targetHole=null;return}this.targetHole&&(this.targetHole.IsDead||this.targetHole.Size>=this._hole.Size||t>=this.huntUntil)&&(this.targetHole=null);let o=this.GetAggressivityRatio(t);if(!this.targetHole&&t>=this.aggressionTimer){this.aggressionTimer=t+this.battleRandom.range(2.5,10);let e=this.battleRandom.range(200+19800*o,500+4999500*o)*this.config.ai.worldScale**2,n=this.battleRandom.next()>o&&this.localTargetCount()<2;this.targetHole=null;for(let t of i)if(!(t===this._hole||t.IsDead||t.Size>=this._hole.Size||tu(t,this._hole)>e)&&(!this.targetHole||tu(t,this._hole)<tu(this.targetHole,this._hole))&&(this.targetHole=t,n&&t.IsLocalPlayer))break;this.huntUntil=t+(this.targetHole?.IsLocalPlayer?5+25*o:this.battleRandom.range(3,8))}if(!this.targetHole){super.Update(e,t,n,r,i,a);return}this.state=`hunt`,this._hole.SetSpeedMultiplier(1);let s=this.targetHole.x-this._hole.x,c=this.targetHole.z-this._hole.z,l=Math.hypot(s,c);this.TryTranslate(l?s/l:0,l?c/l:0,e,a-this.config.hole.radiusMax+this._hole.Size)}},cu=class{references;config;height=0;scale=1;rotation=0;constructor(e){this.config=e,this.references={rotationSpeed:e.crown.rotationSpeed},this.SetSize(0)}Update(e){this.rotation+=this.references.rotationSpeed*Math.PI/180*e}SetSize(e){let t=this.config.crown,n=$l(e,0,1);this.height=eu(t.minHeight,t.maxHeight,n),this.scale=eu(t.minScale,t.maxScale,n)}},lu=class{config;_playerId;_isLocalPlayer;_isBot;_pseudo;color;x=0;z=0;vx=0;vz=0;previousX=0;previousZ=0;skinId=`classic-0`;_points=0;_xp=0;_level;_size;_rank=1;_isDead=!1;_holeMode=`NormalMode`;_maxLevelOverride=!1;_maxLevelOverrideValue=0;maxSizeOverride=1/0;isVisible=!0;position=0;MassCollected=0;Corked=!1;WillLevelDown=!1;rotation=0;CrownVisible=!1;crown;_speed=1;_speedMultiplier=1;kills=0;eaten=0;deaths=0;lastKillTime=-1/0;consecutiveKillCount=0;frenzyUntil=0;respawnAt=0;protectedUntil=0;levelChangedAt=-1/0;OnLevelChanged;SizeChanged;constructor(e,t,n,r){this.config=e,this._playerId=t,this._isLocalPlayer=t===0,this._isBot=!this.IsLocalPlayer,this._pseudo=n,this.color=r,this._level=e.hole.levelMin,this._size=e.hole.radiusMin,this.crown=new cu(e),this.SetLevel(e.hole.levelMin)}get PlayerId(){return this._playerId}set PlayerId(e){this._playerId=e}get IsLocalPlayer(){return this._isLocalPlayer}set IsLocalPlayer(e){this._isLocalPlayer=e}get IsBot(){return this._isBot}set IsBot(e){this._isBot=e}get Pseudo(){return this._pseudo}get Points(){return this._points}set Points(e){this._points=e}get Xp(){return this._xp}get Level(){return this._level}get Size(){return this._size}get Rank(){return this._rank}get IsDead(){return this._isDead}get HoleMode(){return this._holeMode}get Position(){return this.position}set Position(e){this.position=e}get CurrentPosition(){return this}get ForwardDirection(){return{x:Math.sin(this.rotation),z:Math.cos(this.rotation)}}get Speed(){return this._speed*this._speedMultiplier}AddXp(e,t,n){this.IsDead||(this._xp+=e,t!==-1&&(this._maxLevelOverride&&this.Level>=this._maxLevelOverrideValue?this._xp=Math.min(this._xp,t):this.Xp>=t&&(n!==-1||this.Level<this.config.hole.levelMax)&&(this.SetLevel(this.Level+1),this._xp-=t,this._maxLevelOverride&&this.Level>=this._maxLevelOverrideValue&&(this._xp=Math.min(this._xp,n)))))}AddPoints(e){this.Points+=e,this.MassCollected+=e*this.config.hole.massPerPoint}SetLevel(e,t=!1,n=0,r=!1){if(this._maxLevelOverride&&e>this._maxLevelOverrideValue)return;let i=this.config.hole;this._level=$l(e,i.levelMin,i.levelMax);let a=(this.Level-i.levelMin)/(i.levelMax-i.levelMin);this.SetSpeed(eu(i.speedMin,i.speedMax,a)),this.SetSize(eu(i.radiusMin,i.radiusMax,a)),this.crown.SetSize(a),r||this.OnLevelChanged?.(this.Level,this.PlayerId)}SetSpeed(e){this._speed=e}SetSpeedMultiplier(e){this._speedMultiplier=e}SetSize(e){this._size=Math.min(e,this.maxSizeOverride),this.SizeChanged?.(this._size)}SetMode(e){this._holeMode=e}SetPseudo(e){this._pseudo=e}SetRank(e){this._rank=e}SetRotation(e){this.rotation=e}ShowCrown(e){this.CrownVisible=e}OnVisible(){this.IsLocalPlayer||(this.isVisible=!0)}OnInvisible(){this.IsLocalPlayer||(this.isVisible=!1)}get IsVisible(){return this.isVisible}OverrideMaxLevel(e){this._maxLevelOverride=!0,this._maxLevelOverrideValue=e}OverrideMaxSize(e){this.maxSizeOverride=e,this.SetSize(this._size)}GetTargetTransform(){return this}TranslatePosition(e,t){this.x+=e,this.z+=t}IsValidTarget(e){return this.Level<e&&!this.IsDead}Die(e){this._isDead=!0,this.vx=this.vz=0,this.deaths++,this.consecutiveKillCount=0,this.frenzyUntil=0,this.SetMode(`NormalMode`),this.SetSpeedMultiplier(1),this.respawnAt=e+this.config.combat.respawnSeconds}Respawn(e,t,n){this._isDead=!1,this.x=e,this.z=t,this.vx=this.vz=0,this.previousX=e,this.previousZ=t,this.SetLevel(this.Level,!1,0,!0),this.protectedUntil=n+this.config.combat.protectionSeconds}},uu=class{_parentHole;_currentSize=1;config;constructor(e,t){this._parentHole=e,this.config=t}SetMinimumSize(e){this._currentSize=e}IsHoleCorked(){return this._parentHole.Corked||this._parentHole.HoleMode===`WeakOpponentMode`}OnTriggerStay(e){let t=this._parentHole;if(this.SetMinimumSize(t.Level),t.IsDead||this.IsHoleCorked()||e.state!==`IDLE`||t.HoleMode===`ChaseMode`&&e.CanBeTransparent||t.IsBot&&e.OnlyForPlayer)return!1;let n=t.Size*this.config.capture.inset;if(e.body)return e.body.worldPoints.some(e=>e.y<this.config.physics.contactSkin&&(e.x-t.x)**2+(e.z-t.z)**2<n**2);let r=this.config.physics.footprints[e.model]??1,i=e.bodySize[0]*e.scale*r/2,a=e.bodySize[2]*e.scale*r/2,o=t.x-e.x,s=t.z-e.z,c=Math.cos(e.rotation),l=Math.sin(e.rotation),u=o*c-s*l,d=o*l+s*c,f=e.bodySupport,p=f?Math.max(f.minX*e.scale,Math.min(f.maxX*e.scale,u)):Math.max(-i,Math.min(i,u)),m=f?Math.max(f.minZ*e.scale,Math.min(f.maxZ*e.scale,d)):Math.max(-a,Math.min(a,d));return(u-p)**2+(d-m)**2<n**2}OnTriggerEnter(e){return this.OnTriggerStay(e)}},du=class{static OnTriggerStay(e,t,n,r=!1){if(e.IsDead||t.IsDead||e.PlayerId===t.PlayerId||e.Size<=t.Size||n<e.protectedUntil||n<t.protectedUntil)return!1;let i=e.Size-t.Size;if(tu(e,t)<=i**2+1e-8)return!0;if(!r)return!1;let a=e.previousX-t.previousX,o=e.previousZ-t.previousZ,s=e.x-t.x-a,c=e.z-t.z-o,l=s*s+c*c,u=l?Math.max(0,Math.min(1,-(a*s+o*c)/l)):0;return(a+u*s)**2+(o+u*c)**2<=i**2+1e-8}},fu=new q(0,1,0),pu=class e{position=new q;orientation=new jt;velocity=new q;angularVelocity=new q;half=new q;inverseInertia=new q;origin=new q;points=[];previousPoints=[];worldPoints=[];planes=[];collisionParts=[];boundsMin=new q;boundsMax=new q;inverseMass=1;sleeping=!1;quietTime=0;contacts=0;rimContacts=0;lastHoleId=-1;submerged=!1;contactTopY=0;contactList=[];r=new q;cross=new q;velocityAtPoint=new q;inertiaResult=new q;impulseVector=new q;inverseOrientation=new jt;spin=new jt;delta=new q;axes=[new q,new q,new q];collisionAxis=new q;collisionNormal=new q;contactPoint=new q;otherOffset=new q;otherVelocity=new q;localPoint=new q;segmentA=new q;segmentB=new q;segmentDirection=new q;rimNormal=new q;static rings=new Map;constructor(e,t,n,r,i,a,o,s,c,l){this.half.set(i[0],i[1],i[2]).multiplyScalar(a/2),this.position.set(e,t+this.half.y,n),this.orientation.setFromAxisAngle(fu,r);let{x:u,y:d,z:f}=this.half,p=Math.max(.2,u*d*f*8*s);if(this.inverseMass=1/p,this.inverseInertia.set(3/(p*(d*d+f*f)),3/(p*(u*u+f*f)),3/(p*(u*u+d*d))),l?.vertices.length&&l.planes.length){for(let e of l.vertices)this.points.push(new q().fromArray(e).multiplyScalar(a).addScaledVector(fu,-d));for(let e of l.planes)this.planes.push({normal:new q().fromArray(e.normal),constant:e.constant*a-e.normal[1]*d});for(let e of l.parts??[])this.collisionParts.push(e.planes.map(e=>({normal:new q().fromArray(e.normal),constant:e.constant*a-e.normal[1]*d})))}else{for(let e=-1;e<=1;e+=2)for(let t=-1;t<=1;t+=2)for(let n=-1;n<=1;n+=2){let r=e<0?o:1,i=e<0&&c?(t<0?c.minX:c.maxX)*a:t*u*r,s=e<0&&c?(n<0?c.minZ:c.maxZ)*a:n*f*r;this.points.push(new q(i,e*d,s))}for(let[e,t,n]of[[0,1,3],[4,6,7],[0,4,5],[2,3,7],[0,2,6],[1,5,7]]){let r=new q().subVectors(this.points[t],this.points[e]).cross(new q().subVectors(this.points[n],this.points[e])).normalize(),i=r.dot(this.points[e]);i<0&&(r.negate(),i=-i),this.planes.push({normal:r,constant:i})}}for(let e=0;e<this.points.length;e++)this.previousPoints.push(new q),this.worldPoints.push(new q);this.updateBounds()}rimCapsule(e,t,n,r,i,a,o=this.planes){this.inverseOrientation.copy(this.orientation).conjugate(),this.segmentA.set(e,i,t).sub(this.position).applyQuaternion(this.inverseOrientation),this.segmentB.set(n,i,r).sub(this.position).applyQuaternion(this.inverseOrientation),this.segmentDirection.subVectors(this.segmentB,this.segmentA);let s=0,c=1;for(let e of o){let t=e.normal.dot(this.segmentA)-e.constant-a,n=e.normal.dot(this.segmentDirection);if(Math.abs(n)<1e-9){if(t>0)return;continue}let r=-t/n;if(n<0?s=Math.max(s,r):c=Math.min(c,r),s>c)return}this.localPoint.copy(this.segmentA).addScaledVector(this.segmentDirection,(s+c)/2);let l=-1/0;for(let e of o){let t=e.normal.dot(this.localPoint)-e.constant;t>l&&(l=t,this.rimNormal.copy(e.normal).negate())}l>=a||(this.rimNormal.applyQuaternion(this.orientation),this.localPoint.applyQuaternion(this.orientation).addScaledVector(this.rimNormal,a),this.contactList.push({offset:this.localPoint.clone(),normal:this.rimNormal.clone(),depth:a-l,impulse:0,surfaceX:0,surfaceZ:0,rim:!0}))}addRimContacts(t,n,r,i){let a=i.physics,o=a.rimRadius;if(this.boundsMin.y>a.contactSkin||this.boundsMax.y<-a.rimDepth-o)return;let s=e.rings.get(a.rimSegments);s||(s=Array.from({length:a.rimSegments},(e,t)=>({x:Math.cos(t*2*Math.PI/a.rimSegments),z:Math.sin(t*2*Math.PI/a.rimSegments)})),e.rings.set(a.rimSegments,s));let c=2*Math.PI/a.rimSegments;for(let e of t){if(e.IsDead||e.Corked||e.HoleMode===`WeakOpponentMode`||r&&e.IsBot)continue;let l=e.Size*i.capture.inset,u=Math.max(this.boundsMin.x,Math.min(this.boundsMax.x,e.x))-e.x,d=Math.max(this.boundsMin.z,Math.min(this.boundsMax.z,e.z))-e.z,f=Math.max(Math.abs(this.boundsMin.x-e.x),Math.abs(this.boundsMax.x-e.x)),p=Math.max(Math.abs(this.boundsMin.z-e.z),Math.abs(this.boundsMax.z-e.z));if(u*u+d*d>(l+o*2)**2||f*f+p*p<l**2)continue;let m=this.position.x-e.x,h=this.position.z-e.z,g=Math.hypot(m,h),_=Math.hypot(this.boundsMax.x-this.boundsMin.x,this.boundsMax.z-this.boundsMin.z)/2,v=Math.atan2(h,m),y=g>_?Math.asin(Math.min(1,_/g)):Math.PI,b=Math.floor((v-y)/c)-1,x=Math.min(a.rimSegments,Math.ceil((v+y)/c)-b+2),S=Math.max(1,Math.ceil((a.rimDepth-2*o)/(2*o))+1);for(let c=0;c<x;c++){let u=((b+c)%a.rimSegments+a.rimSegments)%a.rimSegments,d=s[u],f=s[(u+1)%a.rimSegments],p=l+o,m=e.x+d.x*p,h=e.z+d.z*p,g=e.x+f.x*p,_=e.z+f.z*p,v=this.apertureAt((m+g)/2,(h+_)/2,t,n,r,i.capture.inset);if(!(v&&v!==e))for(let e=0;e<S;e++){let t=-o-(S>1?e/(S-1)*(a.rimDepth-2*o):0);if(this.collisionParts.length)for(let e of this.collisionParts)this.rimCapsule(m,h,g,_,t,o,e);else this.rimCapsule(m,h,g,_,t,o)}}}}applyInverseInertia(e,t){return this.inverseOrientation.copy(this.orientation).conjugate(),t.copy(e).applyQuaternion(this.inverseOrientation).multiply(this.inverseInertia).applyQuaternion(this.orientation)}applyImpulse(e,t){this.velocity.addScaledVector(e,this.inverseMass),this.cross.crossVectors(t,e),this.applyInverseInertia(this.cross,this.inertiaResult),this.angularVelocity.add(this.inertiaResult)}effectiveMass(e,t){return this.cross.crossVectors(e,t),this.applyInverseInertia(this.cross,this.inertiaResult),this.cross.crossVectors(this.inertiaResult,e),this.inverseMass+t.dot(this.cross)}updateBounds(){this.boundsMin.set(1/0,1/0,1/0),this.boundsMax.set(-1/0,-1/0,-1/0);for(let e=0;e<this.points.length;e++){let t=this.worldPoints[e].copy(this.points[e]).applyQuaternion(this.orientation).add(this.position);this.boundsMin.min(t),this.boundsMax.max(t)}this.contactTopY=this.boundsMax.y,this.origin.set(0,-this.half.y,0).applyQuaternion(this.orientation).add(this.position),this.axes[0].set(1,0,0).applyQuaternion(this.orientation),this.axes[1].set(0,1,0).applyQuaternion(this.orientation),this.axes[2].set(0,0,1).applyQuaternion(this.orientation),this.delta.set(Math.abs(this.axes[0].x)*this.half.x+Math.abs(this.axes[1].x)*this.half.y+Math.abs(this.axes[2].x)*this.half.z,Math.abs(this.axes[0].y)*this.half.x+Math.abs(this.axes[1].y)*this.half.y+Math.abs(this.axes[2].y)*this.half.z,Math.abs(this.axes[0].z)*this.half.x+Math.abs(this.axes[1].z)*this.half.y+Math.abs(this.axes[2].z)*this.half.z),this.boundsMin.copy(this.position).sub(this.delta),this.boundsMax.copy(this.position).add(this.delta)}collide(e,t,n){if(this.boundsMax.x<e.boundsMin.x||this.boundsMin.x>e.boundsMax.x||this.boundsMax.y<e.boundsMin.y||this.boundsMin.y>e.boundsMax.y||this.boundsMax.z<e.boundsMin.z||this.boundsMin.z>e.boundsMax.z)return!1;this.delta.subVectors(this.position,e.position);let r=1/0;for(let t=0;t<15;t++){t<3?this.collisionAxis.copy(this.axes[t]):t<6?this.collisionAxis.copy(e.axes[t-3]):this.collisionAxis.crossVectors(this.axes[Math.floor((t-6)/3)],e.axes[(t-6)%3]);let n=this.collisionAxis.length();if(n<1e-7)continue;this.collisionAxis.multiplyScalar(1/n);let i=0;for(let t=0;t<3;t++)i+=Math.abs(this.collisionAxis.dot(this.axes[t]))*this.half.getComponent(t)+Math.abs(this.collisionAxis.dot(e.axes[t]))*e.half.getComponent(t);let a=this.delta.dot(this.collisionAxis),o=i-Math.abs(a);if(o<=0)return!1;o<r&&(r=o,this.collisionNormal.copy(this.collisionAxis).multiplyScalar(a<0?-1:1))}this.contactPoint.set(0,0,0);let i=0;for(let[t,n]of[[this,e],[e,this]]){this.inverseOrientation.copy(n.orientation).conjugate();for(let e of t.worldPoints)this.localPoint.copy(e).sub(n.position).applyQuaternion(this.inverseOrientation),Math.abs(this.localPoint.x)<=n.half.x+.02&&Math.abs(this.localPoint.y)<=n.half.y+.02&&Math.abs(this.localPoint.z)<=n.half.z+.02&&(this.contactPoint.add(e),i++)}i?this.contactPoint.multiplyScalar(1/i):this.contactPoint.addVectors(this.position,e.position).multiplyScalar(.5),this.r.subVectors(this.contactPoint,this.position),this.otherOffset.subVectors(this.contactPoint,e.position),this.velocityAtPoint.crossVectors(this.angularVelocity,this.r).add(this.velocity),this.otherVelocity.crossVectors(e.angularVelocity,this.otherOffset).add(e.velocity);let a=this.velocityAtPoint.sub(this.otherVelocity).dot(this.collisionNormal),o=this.effectiveMass(this.r,this.collisionNormal)+e.effectiveMass(this.otherOffset,this.collisionNormal),s=n.physics,c=Math.max(0,-a*(1+s.restitution)/o);this.impulseVector.copy(this.collisionNormal).multiplyScalar(c),this.applyImpulse(this.impulseVector,this.r),this.impulseVector.multiplyScalar(-1),e.applyImpulse(this.impulseVector,this.otherOffset);let l=Math.min(s.maxDepenetrationSpeed*t,Math.max(0,r-s.penetrationSlop)*s.positionBias)/(this.inverseMass+e.inverseMass);return this.position.addScaledVector(this.collisionNormal,l*this.inverseMass),e.position.addScaledVector(this.collisionNormal,-l*e.inverseMass),this.sleeping=e.sleeping=!1,this.quietTime=e.quietTime=0,this.updateBounds(),e.updateBounds(),!0}apertureAt(e,t,n,r,i,a){let o=null,s=1/0;for(let r of n){if(r.IsDead||r.Corked||r.HoleMode===`WeakOpponentMode`||i&&r.IsBot)continue;let n=e-r.x,c=t-r.z,l=r.Size*a,u=n*n+c*c;u<l*l&&u/(l*l)<s&&(o=r,s=u/(l*l))}return o}step(e,t,n,r,i){let a=i.physics;if(this.sleeping){if(!this.worldPoints.some(e=>e.y<a.contactSkin&&this.apertureAt(e.x,e.z,t,n,r,i.capture.inset)))return;this.sleeping=!1,this.quietTime=0}let o=e/a.substeps,s=0,c=0;for(let e=0;e<a.substeps;e++){for(let e=0;e<this.points.length;e++)this.previousPoints[e].copy(this.worldPoints[e]);this.velocity.y-=a.gravity*o,this.velocity.multiplyScalar(Math.exp(-a.linearDamping*o)),this.angularVelocity.multiplyScalar(Math.exp(-a.angularDamping*o));let e=this.angularVelocity.length();e>a.maxAngularSpeed&&this.angularVelocity.multiplyScalar(a.maxAngularSpeed/e),this.position.addScaledVector(this.velocity,o);let l=this.angularVelocity.length();if(l>1e-9&&(this.delta.copy(this.angularVelocity).multiplyScalar(1/l),this.spin.setFromAxisAngle(this.delta,l*o),this.orientation.premultiply(this.spin).normalize()),this.updateBounds(),this.contactList.length=0,this.contactTopY<0&&(this.submerged=!0),!this.submerged){let e=this.apertureAt(this.position.x,this.position.z,t,n,r,i.capture.inset);e&&(this.lastHoleId=e.PlayerId);for(let o=0;o<this.worldPoints.length;o++){let s=this.worldPoints[o];if(s.y>a.contactSkin)continue;let c=this.apertureAt(s.x,s.z,t,n,r,i.capture.inset);if(c){e||(this.lastHoleId=c.PlayerId);continue}let l=this.previousPoints[o];s.y<=this.position.y&&(l.y>=-a.contactSkin*2||s.y>=-a.contactSkin*2)&&this.contactList.push({offset:s.clone().sub(this.position),normal:fu,depth:Math.max(0,-s.y),impulse:0,surfaceX:0,surfaceZ:0,rim:!1})}}this.addRimContacts(t,n,r,i);for(let e=0;e<a.solverIterations;e++)for(let t=0;t<this.contactList.length;t++){let n=this.contactList[e%2?this.contactList.length-t-1:t],{offset:r,normal:i}=n;this.velocityAtPoint.crossVectors(this.angularVelocity,r).add(this.velocity),this.velocityAtPoint.x-=n.surfaceX,this.velocityAtPoint.z-=n.surfaceZ;let o=this.velocityAtPoint.dot(i),s=e===0&&o<-a.bounceThreshold?-o*a.restitution:0,c=n.impulse;n.impulse=Math.max(0,c+(s-o)/this.effectiveMass(r,i)),this.impulseVector.copy(i).multiplyScalar(n.impulse-c),this.applyImpulse(this.impulseVector,r),this.velocityAtPoint.crossVectors(this.angularVelocity,r).add(this.velocity),this.velocityAtPoint.x-=n.surfaceX,this.velocityAtPoint.z-=n.surfaceZ,this.velocityAtPoint.addScaledVector(i,-this.velocityAtPoint.dot(i));let l=this.velocityAtPoint.length();if(l>1e-8){this.delta.copy(this.velocityAtPoint).multiplyScalar(1/l);let e=l/this.effectiveMass(r,this.delta),t=n.impulse/a.solverIterations,i=e<=t*a.staticFriction?e:Math.min(e,t*a.friction);this.impulseVector.copy(this.delta).multiplyScalar(-i),this.applyImpulse(this.impulseVector,r)}}for(let e of this.contactList){let t=Math.min(a.maxDepenetrationSpeed*o,Math.max(0,e.depth-a.penetrationSlop)*a.positionBias);if(!t)continue;let n=t/this.effectiveMass(e.offset,e.normal);this.position.addScaledVector(e.normal,n*this.inverseMass),this.cross.crossVectors(e.offset,e.normal).multiplyScalar(n),this.applyInverseInertia(this.cross,this.inertiaResult);let r=this.inertiaResult.length();r>1e-9&&(this.inertiaResult.multiplyScalar(1/r),this.spin.setFromAxisAngle(this.inertiaResult,r),this.orientation.premultiply(this.spin).normalize())}this.updateBounds(),s+=this.contactList.length,c+=this.contactList.filter(e=>e.rim).length}this.contacts=s,this.rimContacts=c,this.updateBounds(),this.inverseOrientation.copy(this.orientation).conjugate(),this.localPoint.copy(this.angularVelocity).applyQuaternion(this.inverseOrientation);let l=this.localPoint,u=this.inverseInertia;.5*(this.velocity.lengthSq()+this.inverseMass*(l.x*l.x/u.x+l.y*l.y/u.y+l.z*l.z/u.z))<a.sleepEnergy&&s>0?this.quietTime+=e:this.quietTime=0,this.quietTime>=a.sleepSeconds&&c===0&&!this.worldPoints.some(e=>e.y<a.contactSkin&&this.apertureAt(e.x,e.z,t,n,r,i.capture.inset))&&(this.sleeping=!0,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0))}},mu=class{id;model;config;x;z;y=0;rotation;scale;home;_sizeRequired;_botSizeRequired;_points;_onlyForPlayer=!1;_isShrunk=!1;_fallingStateListeners=[];_isFalling=!1;_objectTags=[];CanBeTransparent=!1;ObjectType;radius;respawnable;state=`IDLE`;ownerId=-1;captureTime=-1/0;removedAt=-1/0;respawnAt=1/0;scored=!1;generation=0;body=null;bodySize;bodySupport;bodyHull;moving=!1;directionX=0;directionZ=0;travel=0;dirty=!0;lostSupportFeedback=!1;constructor(e,t,n,r,i,a,o,s){this.id=e,this.model=t,this.x=n,this.z=r,this.rotation=i,this.scale=a,this.home={x:n,z:r,rotation:i},this._sizeRequired=this._botSizeRequired=o.level,this._points=o.points,this.radius=o.radius*a,this.respawnable=o.respawn,this.config=s,this.bodySize=[...s.physics.shapes[t]??g[t].shape],this.ObjectType=g[t]?.category??(t.startsWith(`building`)?`Building`:t===`person`?`People`:t===`car`||t===`van`?`Vehicle`:`InanimateObject`)}ConfigureBody(e,t,n){this.bodySize=[e.x,e.y,e.z],this.bodySupport=t,this.bodyHull=n}WakeBody(){if(!this.body&&(this.body=new pu(this.x,this.y,this.z,this.rotation,this.bodySize,this.scale,this.config.physics.footprints[this.model]??1,this.config.physics.density,this.bodySupport,this.bodyHull),this.moving)){let e=this.ObjectType===`Vehicle`?this.config.world.vehicleSpeed:this.config.world.pedestrianSpeed*Math.cos(this.travel+this.id)*2;this.body.velocity.set(this.directionX*e,0,this.directionZ*e)}this.body.sleeping=!1,this.body.quietTime=0}get SizeRequired(){return this._sizeRequired}FitsOpening(e){return Math.hypot(this.bodySize[0],this.bodySize[2])*this.scale/2<e*this.config.capture.inset}set SizeRequired(e){this._sizeRequired=e}get BotSizeRequired(){return this._botSizeRequired}set BotSizeRequired(e){this._botSizeRequired=e}get Points(){return this._points}set Points(e){this._points=e}get OnlyForPlayer(){return this._onlyForPlayer}set OnlyForPlayer(e){this._onlyForPlayer=e}get IsShrunk(){return this._isShrunk}get ObjectTags(){return this._objectTags}HasObjectTag(e){return this._objectTags.includes(e)}RegisterFallingStateListener(e){this._fallingStateListeners.push(e)}UnregisterFallingStateListener(e){let t=this._fallingStateListeners.indexOf(e);t>=0&&this._fallingStateListeners.splice(t,1)}RaiseFallingStateChanged(e){if(this._isFalling!==e){this._isFalling=e,this.state=e?`CONSUMING`:`IDLE`,this.dirty=!0;for(let t of this._fallingStateListeners)t.OnFallingStateChanged(e)}}Shrink(){this.IsShrunk||(this._isShrunk=!0,this.scale*=this.config.objectBehavior.shrinkFactor,this.radius*=this.config.objectBehavior.shrinkFactor,this.SizeRequired=Math.trunc(this.SizeRequired/this.config.objectBehavior.boundsDivisor),this.dirty=!0)}Attract(e,t){let n=e.x-this.x,r=e.z-this.z,i=Math.min(1,t/Math.max(Math.hypot(n,r),1e-4));this.x+=n*i,this.z+=r*i,this.dirty=!0}RecalculateSize(e){let t=e.size,n=this.config.objectBehavior,r=1;return t.x>1&&t.z>1&&(r=Math.max(Math.ceil(t.x*n.boundsFactor/n.boundsDivisor)+1,Math.ceil(t.z*n.boundsFactor/n.boundsDivisor)+1)),this.SizeRequired=r,this.BotSizeRequired=r>1?r+1:r,this.Points=r,r}},hu=class{_gameManager;_fallingObject;_holeId=-1;_isDestroyed=!1;constructor(e){this._fallingObject=e}get FallingObject(){return this._fallingObject}SetGameManager(e){this._gameManager=e}SetFallingObject(e){this._fallingObject=e}get IsDestroyed(){return this._isDestroyed}IsValidTarget(e){let t=this.FallingObject;if(this._isDestroyed||t.state!==`IDLE`||t.OnlyForPlayer)return!1;let n=t.config.objectBehavior;return t.BotSizeRequired<=n.smallTargetLevelMax&&t.y>n.smallTargetMaxY||t.y<n.minTargetY?!1:t.BotSizeRequired<=e}GetTargetTransform(){return this.FallingObject}},gu=class extends hu{EnterPipe(e){this._isDestroyed||(this._fallingObject.ownerId=this._holeId=e)}Reserve(e,t){let n=this.FallingObject;return n.state===`IDLE`&&(n.RaiseFallingStateChanged(!0),n.ownerId=this._holeId=e.PlayerId,n.captureTime=t,n.scored=!1,n.WakeBody(),n.body.lastHoleId=e.PlayerId,!0)}DisableObject(e){if(this._isDestroyed)return!1;this._isDestroyed=!0;let t=this.FallingObject;return this._gameManager?.ProcessCapture(t,this._holeId),t.removedAt=e+t.config.capture.destroyDelaySeconds,t.respawnAt=t.respawnable&&t.config.match.respawnObjects?t.removedAt+t.config.capture.respawnDelaySeconds:1/0,!0}ForceDisableObject(e){if(this._isDestroyed)return!1;this._isDestroyed=!0;let t=this.FallingObject;return this._gameManager?.ProcessCapture(t,this._holeId),t.removedAt=e,t.respawnAt=t.respawnable&&t.config.match.respawnObjects?e+t.config.capture.respawnDelaySeconds:1/0,this.DestroyObject(),!0}DestroyObject(){this.FallingObject.state=`REMOVED`,this.FallingObject.dirty=!0,this.FallingObject.body=null}Respawn(){let e=this.FallingObject;this._isDestroyed=!1,this._holeId=-1,e.RaiseFallingStateChanged(!1),e.x=e.home.x,e.z=e.home.z,e.y=0,e.rotation=e.home.rotation,e.ownerId=-1,e.scored=!1,e.body=null,e.captureTime=-1/0,e.respawnAt=1/0,e.generation++,e.dirty=!0,e.lostSupportFeedback=!1}},_u=class{objects=[];ground=[];spawnPoints=[];boundary;config;seed;rotation=0;definition;constructor(e,t,n=`city`){this.definition=v(n),this.config=e,this.seed=t;let r=e.world,i=new nu(t),a=r.blocksPerSide*r.blockSize/2,o=r.tileSize,s=a+Math.ceil(r.roadWidth/2/o)*o;if(this.boundary=s+o/2,this.definition.district){this.buildDistricts(i);return}if(this.definition.layout!==`city`){this.buildTheme(i);return}let c=e=>Math.abs(e-Math.round(e/r.blockSize)*r.blockSize);for(let e=-s;e<=s;e+=o)for(let t=-s;t<=s;t+=o){let n=c(e)<r.roadWidth/2,i=c(t)<r.roadWidth/2,a=`pavement`,s=0;(n||i)&&(a=`road`,n&&!i&&c(e)===0&&(a=`lane`),i&&!n&&c(t)===0&&(a=`lane`,s=Math.PI/2),n&&c(t)===o*2&&(a=`crosswalk`,s=Math.PI/2),i&&c(e)===o*2&&(a=`crosswalk`),a===`lane`&&Math.abs(e+t)%r.blockSize===o*3&&(a=`arrow`)),this.ground.push({model:a,x:e,z:t,rotation:s,scale:o/10})}for(let e=-a;e<=a;e+=r.blockSize)for(let t=-a;t<=a;t+=r.blockSize)this.ground.push({model:`manhole`,x:e+r.roadWidth/4,z:t-r.roadWidth/4,rotation:0,scale:1});let l=(t,n,i,a=0,o=1)=>{let s=new mu(this.objects.length,t,n,i,a,o,r.objects[t]??g[t],e);return this.objects.push(s),s};for(let t=0;t<r.blocksPerSide;t++)for(let n=0;n<r.blocksPerSide;n++){let s=-a+(t+.5)*r.blockSize,c=-a+(n+.5)*r.blockSize,u=(t+n*3)%7==0,d=null;if(u){for(let e=-8;e<=8;e+=8)for(let t=-8;t<=8;t+=8)this.ground.push({model:`grass`,x:s+e,z:c+t,rotation:0,scale:o/10});for(let[e,t]of[[-8,-8],[8,-8],[-8,8],[8,8]])l(`tree`,s+e,c+t,i.range(0,Math.PI*2),1.1)}else d=l(i.pick([`buildingSmall`,`buildingSmall`,`buildingCorner`,`buildingMedium`,`buildingTall`]),s,c,i.int(0,4)*Math.PI/2);let f=r.blockSize/2-r.roadWidth/2-2.5;for(let t=0;t<4;t++){let n=t*Math.PI/2,a=Math.cos(n),o=Math.sin(n),p=(t,i,l,u=1,f=0)=>{if(d){let a=e.physics.shapes[d.model],o=d.rotation-n,s=Math.abs(Math.cos(o)),c=Math.abs(Math.sin(o)),p=(a[0]*s+a[2]*c)/2,m=(a[0]*c+a[2]*s)/2,h=e.physics.shapes[l]??g[l].shape,_=r.sidewalkClearance,v=h[0]*u/2+f,y=h[2]*u/2;if(Math.abs(t)<p+v+_&&i<m+y+_){let e=r.blockSize/2-r.roadWidth/2,n=m+y+_;n+y<=e?i=n:t=Math.sign(t||1)*(p+v+_)}}return[s+t*a+i*o,c+i*a-t*o]};for(let e of[-14,-7,0,7,14]){let t=i.next()<.3?`hydrant`:`bin`,[r,a]=p(e,f,t);l(t,r,a,n)}for(let e of[-12,1,12]){let t=i.range(.9,1.1),[r,s]=p(e,f-2.4,`person`,t,2),c=l(`person`,r,s,n,t);c.moving=!0,c.directionX=a,c.directionZ=-o}let m=i.range(.85,1),[h,_]=p(10,f-4.5,`tree`,m);l(`tree`,h,_,n,m);let[v,y]=p(-5,f-3.5,`bench`);l(`bench`,v,y,n);let[b,x]=p(-15,f+1,`lamp`);if(l(`lamp`,b,x,n),t===0&&!u){let[e,t]=p(0,f-2,`dumpster`);l(`dumpster`,e,t,n)}}}for(let t=-a;t<=a;t+=r.blockSize)for(let n=-a;n<a;n+=r.blockSize/2)for(let a of[-1,1]){let o=r.roadWidth/3,s=this.boundary-e.hole.radiusMax,c=()=>Math.max(-s,Math.min(s,n+i.range(-8,8))),u=l(i.next()<.23?`van`:`car`,t+a*o,c(),a<0?Math.PI:0);u.moving=!0,u.directionZ=a;let d=l(i.next()<.23?`van`:`car`,c(),t+a*o,a>0?Math.PI/2:-Math.PI/2);d.moving=!0,d.directionX=a}let u=r.blockSize*2;this.spawnPoints.push({x:0,z:0},{x:-u,z:-u},{x:u,z:-u},{x:-u,z:u},{x:u,z:u},{x:0,z:-u},{x:0,z:u})}buildDistricts(e){let t=this.definition.district,n=this.config.world,r=this.boundary-n.tileSize/2,i=(e,t,n,r=0,i=1)=>{this.objects.push(new mu(this.objects.length,e,t,n,r,i,g[e],this.config))};for(let e=-r;e<=r;e+=n.tileSize)for(let i=-r;i<=r;i+=n.tileSize){let r=Math.abs(e-Math.round(e/84)*84),a=Math.abs(i-Math.round(i/84)*84),o=t.pattern===`avenues`?r<12||a<7:t.pattern===`rooms`?r<8||a<8:r<9||a<9;this.ground.push({model:this.definition.id+(o?`-path`:`-base`),x:e,z:i,rotation:0,scale:n.tileSize/10})}for(let n=0;n<6;n++)for(let r=0;r<6;r++){let a=(n-2.5)*84,o=(r-2.5)*84,s=n*6+r,c=s%4,l=e.int(0,4)*Math.PI/2,u=t.landmarks[s%t.landmarks.length]??t.large[s%t.large.length];if(t.pattern===`rooms`){i(u,a,o-16,l);for(let e of[-1,1])for(let n=0;n<3;n++)i(t.medium[(s+n)%t.medium.length],a+e*14,o-8+n*11,e<0?0:Math.PI,.85)}else if(t.pattern===`outposts`){if(c%2==0)i(t.landmarks[Math.floor(s/2)%t.landmarks.length]??u,a-10,o-8,l);else for(let e=0;e<4;e++)i(t.medium[(s+e)%t.medium.length],a-16+e*10,o+14,l);i(t.large[s%t.large.length],a+14,o-12,l,.75)}else if(t.pattern===`courts`){i(u,a,o,l);for(let e of[-1,1])i(t.medium[s%t.medium.length],a+e*19,o+18,l)}else if(c===0||c===3)i(u,a,o,l);else if(c===1)for(let e of[-11,11])for(let n of[-11,11])i(t.large[(s+ +(e>0))%t.large.length],a+e,o+n,l,.75);else for(let e=0;e<8;e++)i(t.medium[(s+e)%t.medium.length],a+Math.cos(e*Math.PI/4)*14,o+Math.sin(e*Math.PI/4)*14,l);for(let n of[-1,1])for(let r=-30;r<=30;r+=6){let c=s+Math.round((r+30)/6);i(t.small[c%t.small.length],a+r,o+n*32,0,e.range(.85,1)),i(t.small[(c+1)%t.small.length],a+n*32,o+r,0,e.range(.85,1)),r%12==0&&i(t.medium[c%t.medium.length],a+r,o+n*25,l)}for(let e of[-1,1])i(t.large[s%t.large.length],a+e*26,o,l,.85)}this.spawnPoints.push({x:0,z:0},{x:-168,z:-168},{x:168,z:-168},{x:-168,z:168},{x:168,z:168},{x:0,z:-168},{x:0,z:168})}buildTheme(e){let t=this.definition,n=this.config.world,r=this.boundary-n.tileSize/2,i=(e,t,r,i=0,a=1)=>{let o=g[e]??n.objects[e],s=new mu(this.objects.length,e,t,r,i,a,o,this.config);return this.objects.push(s),s};for(let e=-r;e<=r;e+=n.tileSize)for(let i=-r;i<=r;i+=n.tileSize){let r=Math.abs(e-Math.round(e/84)*84),a=Math.abs(i-Math.round(i/84)*84),o=t.layout===`wharves`?e<-24?r<9||a<9:a<17:t.layout===`fields`?r<8||a<8:r<10||a<10||Math.abs(e)<10;this.ground.push({model:t.id+(o?`-path`:`-base`),x:e,z:i,rotation:t.layout===`wharves`?Math.PI/2:0,scale:n.tileSize/10})}for(let n=0;n<6;n++)for(let r=0;r<6;r++){let a=(n-2.5)*84,o=(r-2.5)*84,s=e.int(0,4)*Math.PI/2;if(t.layout===`courtyards`){if((n+r)%3!=1)i(`japanCastle`,a,o,s,(n+r)%3==0?1:.72);else for(let e=-15;e<=15;e+=6)for(let t=-15;t<=15;t+=6)i(`ricePlant`,a+e,o+t);for(let e of[-24,24])for(let t of[-21,21])i(`cherry`,a+e,o+t,s);(n+r)%3==1&&i(`gardenBridge`,a,o+23,0)}else if(t.layout===`fields`){if((n+r)%3==0)i(`barn`,a,o,s);else if((n+r)%3==1)i(`farmhouse`,a,o,s);else for(let t=-18;t<=18;t+=6)for(let n=-18;n<=18;n+=6)i(`pumpkin`,a+t,o+n,e.range(0,6.28));i(`cow`,a-10,o+29,s),i(`cow`,a+10,o+29,s),i(`chickenCoop`,a+24,o-14,s),i(`wheelbarrow`,a-24,o-14,s),i(`tractor`,a-30,o,Math.PI/2),i(`tractor`,a+30,o,-Math.PI/2);for(let e of[-24,24])for(let t of[-20,-10,10,20])i(`hay`,a+e,o+t,s)}else{n<3?i((n+r)%2?`harborHut`:`warehouse`,a,o,s):(i((n+r)%3==0?`ship`:`boat`,a,o,Math.PI/2),i(`boat`,a+21,o+8,Math.PI/2));for(let e of[-23,23])for(let t of[-22,22])i(`palm`,a+e,o+t,s);i(`well`,a,o-23)}let c=t.layout===`courtyards`?`stoneLantern`:t.layout===`fields`?`hayStack`:`cargoCrate`;for(let e of[-24,0,24])i(c,a+42,o+e,s),i(c,a+e,o+42,s);for(let e of[-1,1])for(let t of[-12,0,12])i(c,a+e*20,o+t,s,.9);let l=t.layout===`courtyards`?`riceBasket`:t.layout===`fields`?`pumpkin`:`barrel`,u=t.layout===`courtyards`?`lantern`:t.layout===`fields`?`hay`:`barrel`;for(let t of[-1,1])for(let n=-30;n<=30;n+=6)if(i(l,a+n,o+t*32,0,e.range(.85,1)),i(l,a+t*32,o+n,0,e.range(.85,1)),n%12==0){i(u,a+n,o+t*26);let e=i(`person`,a+t*37,o+n,0,.95);e.moving=!0,e.directionZ=t}}this.spawnPoints.push({x:0,z:0},{x:-168,z:-168},{x:168,z:-168},{x:-168,z:168},{x:168,z:168},{x:0,z:-168},{x:0,z:168})}GetSpawnPoints(e){return this.spawnPoints[e%this.spawnPoints.length]}Rotate(e){let t=(e-this.rotation)*Math.PI/180,n=Math.cos(t),r=Math.sin(t),i=e=>{let t=e.x;e.x=t*n+e.z*r,e.z=e.z*n-t*r};for(let e of this.objects){i(e),i(e.home),e.rotation+=t,e.home.rotation+=t;let a=e.directionX;e.directionX=a*n+e.directionZ*r,e.directionZ=e.directionZ*n-a*r}for(let e of this.ground)i(e),e.rotation+=t;for(let e of this.spawnPoints)i(e);this.rotation=e}},vu=class{cells=new Map;membership=new Map;cellSize;constructor(e){this.cellSize=e}key(e,t){return`${Math.floor(e/this.cellSize)},${Math.floor(t/this.cellSize)}`}insert(e){let t=this.key(e.x,e.z);if(this.membership.get(e.id)===t)return;this.remove(e);let n=this.cells.get(t);n||(n=new Set,this.cells.set(t,n)),n.add(e),this.membership.set(e.id,t)}remove(e){let t=this.membership.get(e.id);t!==void 0&&this.cells.get(t)?.delete(e),this.membership.delete(e.id)}query(e,t,n,r=[]){r.length=0;let i=Math.floor((e-n)/this.cellSize),a=Math.floor((e+n)/this.cellSize),o=Math.floor((t-n)/this.cellSize),s=Math.floor((t+n)/this.cellSize);for(let c=i;c<=a;c++)for(let i=o;i<=s;i++){let a=this.cells.get(`${c},${i}`);if(a)for(let i of a)(i.x-e)**2+(i.z-t)**2<=n**2&&r.push(i)}return r}clear(){this.membership.clear();for(let e of this.cells.values())e.clear()}get size(){return this.membership.size}},yu=class{_hasGameLoaded=!1;_hasGameStarted=!1;_hasGameEnded=!1;GameIsPaused=!1;config;_currentHole=[];_currentHoleDictionary=new Map;constructor(e){this.config=e}CurrentHole(e){return this._currentHole[e]}HasHole(e){return e>=0&&e<this._currentHole.length}PlayerHolesCount(){return this._currentHole.length}RemovePlayerHole(e){this._currentHole.splice(e,1)}HalfTimeDone(){this.GameIsPaused=!1}MaxPlayerSize(e){this._currentHole[e]?.SetLevel(this.config.hole.levelMax)}MinPlayerSize(e){this._currentHole[e]?.SetLevel(0)}GameStart(){this._hasGameStarted=!0}GameEnd(){this._hasGameEnded=!0}ProcessCapture(e,t){return!1}IsTimeBasedMode(){return!1}FinishGame(){this.GameEnd()}},bu=class extends yu{get GAME_KILL_COOLDOWN(){return this.config.scoring.killStreakWindowSeconds}get NB_KILL_STREAK_FOR_FRENZY_MODE(){return this.config.scoring.frenzyKillStreak}get POINTS_PER_SIZE_TABLE(){return this.config.scoring.pointsPerSizeTable}get STAR_REWARD_TABLE(){return this.config.match.starRewardsByRank}get XP_TABLE(){return x(this.config)}get GAME_DURATION_IN_SECONDS(){return this.config.match.durationSeconds}modeId=`classic`;endless;powerups=new a;selectedPowerUp=`None`;stageReady=!1;stageRevision=0;endlessSpawnAt=0;baseConfig;totalClearPoints=0;completion=0;eliminationOrder=[];phase=`MENU`;CurrentHoles=[];CurrentFallingObjects=[];map;index;controllers=[];bots=[];triggers=[];behaviours=[];events=[];time=0;remaining;countdown;seed;result=null;input={x:0,z:0};cameraTarget={distance:0,height:0};accumulator=0;moving=[];consuming=new Set;respawns=[];nextRanking=0;candidates=[];claims=new Map;random;maxObjectReach=0;collisionBodies=[];maxSizeAt=1/0;contactPairs=0;captureCount=0;constructor(e,t){super(structuredClone(e)),this.baseConfig=structuredClone(e),this.seed=t,this.random=new nu(t),this.index=new vu(e.world.spatialCellSize),this.remaining=e.match.durationSeconds,this.countdown=e.presentation.countdownSeconds,this.GameInit(t)}get player(){return this.CurrentHoles[0]}get ConsumingObjects(){return this.consuming}get ranking(){return[...this.CurrentHoles].sort((e,t)=>(this.modeId===`battleRoyale`?Number(e.IsDead)-Number(t.IsDead)||t.Level-e.Level:0)||t.Points-e.Points||e.PlayerId-t.PlayerId)}GameInit(e,t=`Player`,n=this.config.world.colors[0],r=`city`,i=`classic-0`,a=this.modeId,o=d()){this.endless=new p(this.baseConfig,o),this.stageReady=!1,this.stageRevision=0,this.endlessSpawnAt=0,this.powerups.selected=`None`,this.powerups.expiresAt=0,this.modeId=a,Object.assign(this.config,c(this.baseConfig,a)),this.completion=0,this.eliminationOrder=[];let s=this.config.camera.levelCurves.NormalMode;this.cameraTarget.distance=s.distance[0],this.cameraTarget.height=s.height[0],this.seed=e,this.random=new nu(e),this.map=new _u(this.config,e,v(r).id),this.map.Rotate(this.random.int(0,4)*90),this.phase=`MENU`,this._hasGameLoaded=!0,this._hasGameStarted=this._hasGameEnded=this.GameIsPaused=!1,this.time=this.accumulator=this.nextRanking=this.captureCount=0,this.maxSizeAt=1/0,this.countdown=this.config.presentation.countdownSeconds,this.remaining=this.config.match.durationSeconds,this.result=null,this.events.length=0,this.input.x=this.input.z=0,this.consuming.clear(),this.respawns.length=0,this.claims.clear(),this.index.clear(),this.CurrentFallingObjects=this.map.objects,this.totalClearPoints=this.map.objects.reduce((e,t)=>e+Math.max(0,t.Points),0),this.maxObjectReach=Math.max(...this.map.objects.map(e=>Math.hypot(e.bodySize[0],e.bodySize[2])*e.scale/2)),this.behaviours=this.map.objects.map(e=>{let t=new gu(e);return t.SetGameManager(this),t}),this.moving=this.map.objects.filter(e=>e.moving);for(let e of this.map.objects)this.RegisterFallingObject(e);this.CurrentHoles=[],this.controllers=[],this.bots=[],this.triggers=[],this._currentHole=[],this._currentHoleDictionary.clear();for(let r=0;r<this.config.match.totalHoles;r++){let a=new lu(this.config,r,r===0?t:this.config.world.botNames[(r-1)%this.config.world.botNames.length]+(r>this.config.world.botNames.length?` `+r:``),r===0?n:this.config.world.colors[r%this.config.world.colors.length]);a.skinId=r===0?_(i).id:y[(r-1)%y.length];let o=this.modeId===`battleRoyale`?{x:Math.cos(r*Math.PI*2/this.config.match.totalHoles)*this.map.boundary*.7,z:Math.sin(r*Math.PI*2/this.config.match.totalHoles)*this.map.boundary*.7}:this.map.GetSpawnPoints(r),s=this.map.boundary-(r?this.config.hole.radiusMax:a.Size);if(a.x=$l(o.x,-s,s),a.z=$l(o.z,-s,s),a.previousX=a.x,a.previousZ=a.z,a.OnLevelChanged=(e,t)=>this.OnHoleLevelUp(e,t),this.CurrentHoles.push(a),this.triggers.push(new uu(a,this.config)),this._currentHoleDictionary.set(r,a),a.IsLocalPlayer&&this._currentHole.push(a),r===0)this.controllers.push(new au(a,this.config));else{let t=this.modeId===`battleRoyale`?new su(a,this.config,e+r*7919):new ou(a,this.config,e+r*7919);t instanceof su&&t.initialize(e+r*7919),this.bots.push(t),this.controllers.push(t)}}this.UpdateBotLimits();for(let e of this.bots)e instanceof su&&(e.localTargetCount=()=>this.bots.filter(e=>e instanceof su&&!e._hole.IsDead&&e.targetHole?.IsLocalPlayer).length);this.modeId===`endless`&&(this.BuildEndlessStage(),this.stageReady=this.endless.data.stagePoints>=this.endless.required)}CountdownStart(){this.phase=`COUNTDOWN`,this.countdown=this.config.presentation.countdownSeconds,this.events.push({type:`countdown`,id:0,value:Math.ceil(this.countdown)})}GameStart(){if(!(this._hasGameStarted||this._hasGameEnded)){super.GameStart(),this.phase=`PLAYING`,this.powerups.start(this,this.selectedPowerUp);for(let e of this.controllers)e.StartMoving();this.events.push({type:`start`,id:0})}}GameEnd(e=`time`){if(this._hasGameEnded)return;super.GameEnd(),this.phase=`RESULTS`,e===`time`&&(this.remaining=0),this.UpdateRanking();for(let e of this.controllers)e.CanMove=!1,e._hole.vx=e._hole.vz=0;let t=this.player,n=this.modeId===`battleRoyale`?t.IsDead?this.CurrentHoles.length-this.eliminationOrder.indexOf(t.PlayerId):1:t.Rank;this.result={modeId:this.modeId,completion:this.completion,rank:n,score:t.Points,eaten:t.eaten,kills:t.kills,stars:this.modeId===`speedrun`?l(this.completion,this.config):this.GetStarRewardByRank(n-1),level:t.Level,seed:this.seed,reason:e,elapsed:this.time},this.events.push({type:`end`,id:0})}RegisterFallingObject(e){if(e.body){let t=e.body,n=Math.max(Math.abs(t.boundsMin.x-e.x),Math.abs(t.boundsMax.x-e.x)),r=Math.max(Math.abs(t.boundsMin.z-e.z),Math.abs(t.boundsMax.z-e.z));this.maxObjectReach=Math.max(this.maxObjectReach,Math.hypot(n,r))}this.index.insert(e)}UnregisterFallingObject(e){this.index.remove(e)}IsTimeBasedMode(){return this.config.match.durationSeconds>0}ProcessCapture(e,t){if(this._hasGameEnded||t<0||e.ownerId!==t||e.scored||e.state!==`CONSUMING`)return!1;let n=this.CurrentHoles[t];if(!n)return!1;e.scored=!0;let r=this.POINTS_PER_SIZE_TABLE[e.Points]??0,i=this.modeId===`speedrun`||this.modeId===`endless`?e.Points:r;return i>0&&this.modeId!==`endless`&&(n.AddXp(r*(n.IsBot?this.config.ai.xpMultiplier:1),S(this.config,n.Level,n.IsBot),S(this.config,n.Level+1,n.IsBot)),n.AddPoints(i)),n.eaten++,this.captureCount++,this.events.push({type:`capture`,id:t,value:i,target:e.id,x:e.x,z:e.z}),this.modeId===`endless`&&(n.AddPoints(i*(1+this.endless.data.upgrades.value)),this.endless.add(i)&&!this.stageReady&&(this.stageReady=!0,this.events.push({type:`stage`,id:0,value:this.endless.data.stage}))),this.modeId===`speedrun`&&(this.completion=this.totalClearPoints?Math.min(1,this.player.Points/this.totalClearPoints):1,this.completion>=1&&this.GameEnd(`cleared`)),!0}ProcessKill(e,t,n=!1){let r=this.CurrentHoles[e],i=this.CurrentHoles[t];if(this.phase!==`PLAYING`||this._hasGameEnded||!r||!i||r===i||r.IsDead||i.IsDead||!du.OnTriggerStay(r,i,this.time,n))return!1;let a=this.config.combat.killPointsPerLevel*i.Level;return r.AddXp(a,S(this.config,r.Level,r.IsBot),S(this.config,r.Level+1,r.IsBot)),r.AddPoints(a),i.Die(this.time),this.UpdateCameraTarget(i),this.modeId===`battleRoyale`&&(i.respawnAt=1/0,this.eliminationOrder.push(i.PlayerId)),r.kills++,r.consecutiveKillCount=this.time-r.lastKillTime<=this.GAME_KILL_COOLDOWN?r.consecutiveKillCount+1:1,r.lastKillTime=this.time,this.events.push({type:`kill`,id:e,target:t,value:a}),this.modeId!==`battleRoyale`&&r.consecutiveKillCount>=this.NB_KILL_STREAK_FOR_FRENZY_MODE&&(r.SetMode(`FrenzyMode`),r.frenzyUntil=this.time+this.config.combat.frenzySeconds,r.SetSpeedMultiplier(this.config.combat.frenzySpeedMultiplier),r.consecutiveKillCount=0,this.events.push({type:`frenzy`,id:e})),this.modeId===`battleRoyale`&&(i.IsLocalPlayer?this.GameEnd(`eaten`):this.CurrentHoles.filter(e=>!e.IsDead).length===1&&this.GameEnd(`survived`)),!0}UpdateRanking(){let e=this.ranking;e.forEach((t,n)=>{t.SetRank(n+1),t.Position=n,t.ShowCrown(n===0&&e[0].Points>0)})}OnHoleLevelUp(e,t){let n=this.CurrentHoles[t];this.UpdateCameraTarget(n),n.levelChangedAt=this.time,n.WillLevelDown=!1,this.events.push({type:`level`,id:t,value:e}),t===0?(e===this.config.hole.levelMax&&(this.maxSizeAt=Math.min(this.maxSizeAt,this.time)),this.UpdateBotLimits()):this.config.ai.playerRelativeGrowth&&n.SetSize(Math.min(n.Size,this.player.Size*this.BotSizeRatio(n.PlayerId)))}BotSizeRatio(e){return this.config.ai.sizeRatios[(e-1)%this.config.ai.sizeRatios.length]}UpdateBotLimits(){if(this.config.ai.playerRelativeGrowth){for(let e of this.CurrentHoles)if(e.IsBot){let t=this.player.Size*this.BotSizeRatio(e.PlayerId),n=Math.max(this.config.hole.levelMin,Math.floor((t-this.config.hole.radiusMin)/(this.config.hole.radiusMax-this.config.hole.radiusMin)*(this.config.hole.levelMax-1)+1));e.OverrideMaxLevel(n),e.OverrideMaxSize(t),e.Level>n&&e.SetLevel(n);let r=(e.Level-this.config.hole.levelMin)/(this.config.hole.levelMax-this.config.hole.levelMin);e.SetSize(Math.min(eu(this.config.hole.radiusMin,this.config.hole.radiusMax,r),t))}}}UpdateCameraTarget(e){if(e.IsLocalPlayer&&e.HoleMode!==`WeakOpponentMode`){let t=this.config.camera.levelCurves[e.HoleMode],n=$l((e.Level-this.config.hole.levelMin)/(this.config.hole.levelMax-this.config.hole.levelMin),0,1);this.cameraTarget.distance=eu(t.distance[0],t.distance[1],n),this.cameraTarget.height=eu(t.height[0],t.height[1],n)}}GetStarRewardByRank(e){return this.STAR_REWARD_TABLE[Math.max(0,e)]??0}Advance(e){if(this.GameIsPaused||this.phase===`MENU`||this.phase===`RESULTS`){this.accumulator=0;return}this.accumulator+=$l(e,0,this.config.simulation.maxFrameSeconds);let t=this.config.simulation.fixedStep,n=0;for(;this.accumulator+1e-10>=t&&n<this.config.simulation.maxStepsPerFrame;)this.Update(t),this.accumulator-=t,n++}Update(e){if(this.GameIsPaused)return;if(this.phase===`COUNTDOWN`){let t=Math.ceil(this.countdown);this.countdown=Math.max(0,this.countdown-e),Math.ceil(this.countdown)!==t&&this.events.push({type:`countdown`,id:0,value:Math.ceil(this.countdown)}),this.countdown<1e-8&&this.GameStart();return}if(this.phase!==`PLAYING`)return;if(this.modeId===`endless`&&this.stageReady){this.player.vx=this.player.vz=0;return}if(this.time=this.IsTimeBasedMode()?Math.min(this.config.match.durationSeconds,this.time+e):this.time+e,this.remaining=this.IsTimeBasedMode()?Math.max(0,this.config.match.durationSeconds-this.time):0,this.IsTimeBasedMode()&&this.remaining<1e-7){this.GameEnd();return}for(let e of this.CurrentHoles){if(e.IsDead&&this.time>=e.respawnAt){if(e.IsLocalPlayer&&this.config.match.endOnPlayerDeath){this.GameEnd(`eaten`);return}let t=this.map.GetSpawnPoints(this.random.int(0,this.CurrentHoles.length)),n=-1/0;for(let r of this.map.spawnPoints){let i=1/0;for(let t of this.CurrentHoles)t!==e&&!t.IsDead&&(i=Math.min(i,tu(r,t)-t.Size**2));i>n&&(t=r,n=i)}let r=this.map.boundary-(e.IsBot?this.config.hole.radiusMax:e.Size);e.Respawn($l(t.x,-r,r),$l(t.z,-r,r),this.time),this.events.push({type:`respawn`,id:e.PlayerId})}e.HoleMode===`FrenzyMode`&&this.time>=e.frenzyUntil&&(e.SetMode(`NormalMode`),e.SetSpeedMultiplier(1),this.UpdateCameraTarget(e))}for(let e of this.CurrentHoles)e.previousX=e.x,e.previousZ=e.z;this.powerups.update(this,e),this.modeId===`endless`&&this.UpdateEndless(e);let t=this.map.boundary-(this.modeId===`battleRoyale`?this.config.hole.radiusMax-this.player.Size:0);this.controllers[0].TryTranslate(this.input.x,this.input.z,e,t);for(let t of this.bots)t.Update(e,this.time,this.index,this.CurrentFallingObjects,this.CurrentHoles,this.map.boundary);this.UpdateMovables(e),this.ClaimObjects(),this.UpdateFalling(e);for(let e of this.CurrentHoles)if(!e.IsDead)for(let t of this.CurrentHoles)e!==t&&du.OnTriggerStay(e,t,this.time,!0)&&this.ProcessKill(e.PlayerId,t.PlayerId,!0);if(this.time>=this.nextRanking&&(this.nextRanking=this.time+this.config.ranking.intervalSeconds,this.UpdateRanking()),this.modeId===`battleRoyale`&&!this.player.IsDead&&this.CurrentHoles.every(e=>e.IsDead||e.Level>=20)&&this.GameEnd(`survived`),this.modeId!==`classic`)return;this.player.Rank===1&&Number.isFinite(this.maxSizeAt)&&(this.remaining=Math.min(this.remaining,Math.max(0,Math.max(this.config.match.minimumVictorySeconds,this.maxSizeAt+this.config.match.victoryLapSeconds)-this.time)));let n=this.time>=Math.max(this.config.match.minimumVictorySeconds,this.maxSizeAt+this.config.match.victoryLapSeconds),r=this.player.Level>=15&&this.captureCount>=this.CurrentFallingObjects.length*this.config.match.finishConsumedRatio;!this.player.IsDead&&this.time>=this.config.match.minimumVictorySeconds&&(n||r)&&(this.UpdateRanking(),this.player.Rank===1&&this.GameEnd(`domination`))}BuildEndlessStage(){this.consuming.clear(),this.respawns.length=0,this.index.clear();let e=[...new Map(this.map.objects.map(e=>[e.model,e])).values()].filter(e=>e.Points>0),t=this.config.modes.endless.stageObjectCount,n=Math.max(.25,this.config.modes.endless.stageScale**(this.endless.data.stage-1));this.CurrentFallingObjects=Array.from({length:t},(t,r)=>{let i=e[(r+this.endless.data.stage-1)%e.length],a=Math.floor(r/24),o=r*Math.PI*2/24,s=Math.max(...i.bodySize),c=Math.min(1,(1.5+a*.7)*n/s),l=9+a*7;return new mu(r,i.model,Math.cos(o)*l,Math.sin(o)*l,o,c,{level:Math.min(20,a+1),points:Math.min(20,a+1),radius:i.radius,respawn:!0},this.config)}),this.behaviours=this.CurrentFallingObjects.map(e=>{let t=new gu(e);return t.SetGameManager(this),t}),this.moving=[],this.maxObjectReach=Math.max(...this.CurrentFallingObjects.map(e=>Math.hypot(e.bodySize[0],e.bodySize[2])*e.scale/2));for(let e of this.CurrentFallingObjects)this.RegisterFallingObject(e);this.ApplyEndlessUpgrades(),this.stageRevision++}ApplyEndlessUpgrades(){let e=this.config.modes.endless,t=this.endless.data.upgrades,n=Math.max(.25,e.stageScale**(this.endless.data.stage-1));this.player.SetSize(Math.min(this.config.hole.radiusMax,this.config.hole.radiusMin*(1+e.sizeMultiplier)**t.size*n)),this.player.SetSpeed(Math.min(this.config.hole.speedMax,this.config.hole.speedMin*(1+e.speedMultiplier)**t.speed))}ClaimEndlessStage(){return this.modeId!==`endless`||!this.stageReady||!this.endless.claimStage()?!1:(this.stageReady=!1,this.BuildEndlessStage(),!0)}UpgradeEndless(e){return this.modeId!==`endless`||!this.endless.upgrade(e)?!1:(this.ApplyEndlessUpgrades(),!0)}UpdateEndless(e){let t=this.endless.data.upgrades,n=this.config.modes.endless;if(t.magnet>0){this.index.query(this.player.x,this.player.z,this.player.Size+t.magnet,this.candidates);for(let n of this.candidates.slice(0,8))!n.body&&n.ObjectType!==`Building`&&n.FitsOpening(this.player.Size)&&(n.Attract(this.player,e*t.magnet),this.index.insert(n))}if(this.time<this.endlessSpawnAt||this.stageReady)return;this.endlessSpawnAt=this.time+Math.max(n.spawnMinCooldown,n.spawnCooldown/(1+t.spawn));let r=this.CurrentFallingObjects.find(e=>e.state===`REMOVED`);r&&(this.behaviours[r.id].Respawn(),r.Points=Math.min(20,1+Math.floor(r.id/24)+(this.random.next()<Math.min(.75,t.luck*.01)?5:0)),this.RegisterFallingObject(r))}UpdateMovables(e){let t=this.map.boundary-this.config.hole.radiusMax;for(let n of this.moving){if(n.state!==`IDLE`||n.body||!n.moving)continue;let r=n.ObjectType===`Vehicle`?this.config.world.vehicleSpeed:this.config.world.pedestrianSpeed;if(n.ObjectType===`People`){n.travel+=e*r;let t=Math.sin(n.travel+n.id)*2;n.x=n.home.x+n.directionX*t,n.z=n.home.z+n.directionZ*t}else n.x+=n.directionX*r*e,n.z+=n.directionZ*r*e,Math.abs(n.directionX)>.5&&n.x>t?n.x=-t:Math.abs(n.directionX)>.5&&n.x<-t&&(n.x=t),Math.abs(n.directionZ)>.5&&n.z>t?n.z=-t:Math.abs(n.directionZ)>.5&&n.z<-t&&(n.z=t);n.dirty=!0,this.index.insert(n)}}ClaimObjects(){this.claims.clear();for(let e of this.CurrentHoles)if(!e.IsDead){this.index.query(e.x,e.z,e.Size+this.maxObjectReach,this.candidates);for(let t of this.candidates){if(!this.triggers[e.PlayerId].OnTriggerStay(t))continue;let n=tu(e,t)/e.Size**2,r=this.claims.get(t.id);(!r||n<r.distance||n===r.distance&&e.PlayerId<r.hole.PlayerId)&&this.claims.set(t.id,{hole:e,distance:n})}}for(let[e,{hole:t}]of this.claims){let n=this.CurrentFallingObjects[e];this.behaviours[e].Reserve(t,this.time)&&(this.UnregisterFallingObject(n),this.consuming.add(n),this.events.push({type:`contact`,id:t.PlayerId,target:n.id,x:n.x,z:n.z}))}}UpdateFalling(e){this.collisionBodies.length=0,this.contactPairs=0;for(let t of this.consuming){if(t.state===`REMOVED`){this.consuming.delete(t),Number.isFinite(t.respawnAt)&&this.respawns.push(t);continue}let n=t.body;n.step(e,this.CurrentHoles,t.SizeRequired,t.OnlyForPlayer,this.config),!t.lostSupportFeedback&&n.boundsMin.y<-this.config.physics.contactSkin*2&&n.velocity.y<-.1&&(t.lostSupportFeedback=!0,this.events.push({type:`fall`,id:n.lastHoleId,target:t.id,x:t.x,z:t.z,value:t.Points})),n.boundsMax.y>-this.config.capture.fallDepth&&this.collisionBodies.push(t)}this.collisionBodies.sort((e,t)=>e.body.boundsMin.x-t.body.boundsMin.x);for(let t=0;t<this.collisionBodies.length;t++){let n=this.collisionBodies[t].body;for(let r=t+1;r<this.collisionBodies.length;r++){let t=this.collisionBodies[r].body;if(t.boundsMin.x>n.boundsMax.x)break;n.collide(t,e,this.config)&&this.contactPairs++}}for(let e of this.consuming){let t=e.body;e.x=t.origin.x,e.y=t.origin.y,e.z=t.origin.z,e.dirty=!0,!e.scored&&t.boundsMax.y<-this.config.physics.scoreDepth&&(t.lastHoleId>=0&&this.behaviours[e.id].EnterPipe(t.lastHoleId),this.behaviours[e.id].DisableObject(this.time)),!e.scored&&t.sleeping?(e.RaiseFallingStateChanged(!1),e.ownerId=-1,this.consuming.delete(e),this.RegisterFallingObject(e)):e.scored&&this.time>=e.removedAt&&(this.behaviours[e.id].DestroyObject(),this.consuming.delete(e),Number.isFinite(e.respawnAt)&&this.respawns.push(e))}for(let e=this.respawns.length-1;e>=0;e--)if(this.respawns[e].respawnAt<=this.time){let t=this.respawns[e];this.respawns.splice(e,1),this.behaviours[t.id].Respawn(),this.RegisterFallingObject(t)}}snapshot(){return{stage:this.endless.data.stage,stageReady:this.stageReady,modeId:this.modeId,completion:this.completion,totalClearPoints:this.totalClearPoints,mapId:this.map.definition.id,skinId:this.player.skinId,phase:this.phase,paused:this.GameIsPaused,time:this.time,remaining:this.remaining,seed:this.seed,objectCount:this.CurrentFallingObjects.length,indexed:this.index.size,consuming:this.consuming.size,waitingRespawn:this.respawns.length,captureCount:this.captureCount,contactPairs:this.contactPairs,holes:this.CurrentHoles.map(e=>({id:e.PlayerId,name:e.Pseudo,x:e.x,z:e.z,vx:e.vx,vz:e.vz,skinId:e.skinId,level:e.Level,radius:e.Size,points:e.Points,xp:e.Xp,eaten:e.eaten,kills:e.kills,dead:e.IsDead,mode:e.HoleMode,mass:e.MassCollected,protectedUntil:e.protectedUntil})),result:this.result}}},xu=class{x=0;z=0;active=!1;originX=0;originY=0;offsetX=0;offsetY=0;pointer=null;keys=new Set;canvas;config;abort=new AbortController;onPause;constructor(e,t){this.canvas=e,this.config=t;let n={signal:this.abort.signal};e.addEventListener(`pointerdown`,t=>{(t.pointerType!==`mouse`||t.button===0)&&this.pointer===null&&(t.preventDefault(),this.pointer=t.pointerId,e.setPointerCapture(t.pointerId),this.active=!0,this.originX=t.clientX,this.originY=t.clientY,this.offsetX=this.offsetY=0,this.update())},n),e.addEventListener(`pointermove`,e=>{e.pointerId===this.pointer&&(this.offsetX=e.clientX-this.originX,this.offsetY=e.clientY-this.originY,this.update())},n);for(let t of[`pointerup`,`pointercancel`,`lostpointercapture`])e.addEventListener(t,e=>{e.pointerId===this.pointer&&this.endPointer()},n);window.addEventListener(`keydown`,e=>{e.code===`Escape`?(e.preventDefault(),e.repeat||this.onPause?.(),this.reset()):e.target?.matches(`input,select,textarea`)||[`KeyW`,`KeyA`,`KeyS`,`KeyD`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(e.code)&&(e.preventDefault(),this.keys.add(e.code),this.update())},n),window.addEventListener(`keyup`,e=>{this.keys.delete(e.code),this.update()},n),window.addEventListener(`blur`,()=>this.reset(),n)}update(){let e=0,t=0;if(this.active){let n=Math.hypot(this.offsetX,this.offsetY),r=$l((n-this.config.movement.deadzone)/this.config.movement.joystickRadius,0,1);n>0&&(e=this.offsetX/n*r,t=this.offsetY/n*r)}(this.keys.has(`KeyA`)||this.keys.has(`ArrowLeft`))&&--e,(this.keys.has(`KeyD`)||this.keys.has(`ArrowRight`))&&(e+=1),(this.keys.has(`KeyW`)||this.keys.has(`ArrowUp`))&&--t,(this.keys.has(`KeyS`)||this.keys.has(`ArrowDown`))&&(t+=1);let n=Math.hypot(e,t);n>1&&(e/=n,t/=n),this.x=(e+t)*Math.SQRT1_2,this.z=(-e+t)*Math.SQRT1_2}endPointer(){let e=this.pointer;this.pointer=null,this.active=!1,this.offsetX=this.offsetY=0,e!==null&&this.canvas.hasPointerCapture(e)&&this.canvas.releasePointerCapture(e),this.update()}reset(){this.keys.clear(),this.endPointer()}dispose(){this.reset(),this.abort.abort()}},Su=class{assets;context=null;gain=null;buffers=new Map;files=new Map;preloading=null;initializing=null;lastSwallow=0;voices=0;activeVoices=new Map;moveSource=null;moveGain=null;music=null;volume=.5;muted=!1;loaded=0;played=0;failures=[];constructor(e){this.assets=e}preload(){return this.preloading||=Promise.all(Object.entries(this.assets.manifest.audio).map(async([e,t])=>{if(e!==`music`)try{let n=await fetch(b(t));if(!n.ok)throw Error(t);this.files.set(e,await n.arrayBuffer())}catch{this.failures.push(e)}})).then(()=>{}),this.preloading}async unlock(){this.context||(this.context=new AudioContext,this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.applyVolume());let e=this.context.state===`suspended`?this.context.resume():Promise.resolve();this.initializing||=this.preload().then(()=>Promise.all([...this.files].map(async([e,t])=>{try{this.buffers.set(e,await this.context.decodeAudioData(t)),this.loaded++}catch{this.failures.push(e)}finally{this.files.delete(e)}}))).then(()=>{}),await Promise.all([e,this.initializing])}applyVolume(){this.gain&&this.context&&this.gain.gain.setTargetAtTime(this.muted?0:this.volume*.7,this.context.currentTime,.02),this.music&&(this.music.muted=this.muted)}startMusic(){this.assets.manifest.audio.music&&(this.music||(this.music=new Audio(b(this.assets.manifest.audio.music)),this.music.loop=!0,this.music.preload=`none`),this.music.muted=this.muted,this.music.volume=0,this.music.play().catch(()=>{}))}updateMovement(e,t,n,r,i){if(this.music&&(this.music.volume=this.volume*i,n?this.music.paused&&this.music.play().catch(()=>{}):this.music.pause()),!this.context||!this.gain)return;!this.moveSource&&this.buffers.has(`move`)&&(this.moveSource=this.context.createBufferSource(),this.moveSource.buffer=this.buffers.get(`move`),this.moveSource.loop=!0,this.moveGain=this.context.createGain(),this.moveGain.gain.value=0,this.moveSource.connect(this.moveGain),this.moveGain.connect(this.gain),this.moveSource.start());let a=n?Math.max(0,Math.min(1,e/Math.max(1,t))):0;this.moveGain?.gain.setTargetAtTime(a*r,this.context.currentTime,.05)}play(e,t=1){if(!this.context||!this.gain||this.muted)return;let n=this.buffers.get(e);if(!n)return;let r=[`level`,`kill`,`victory`,`end`,`defeat`].includes(e)?2:0;if(this.voices>=10){let e=[...this.activeVoices].find(([,e])=>e<r);if(!e)return;e[0].stop(),this.activeVoices.delete(e[0]),this.voices--}if(e.startsWith(`swallow`)){if(this.context.currentTime-this.lastSwallow<.065)return;this.lastSwallow=this.context.currentTime}let i=this.context.createBufferSource();i.buffer=n,i.playbackRate.value=t,i.connect(this.gain),this.voices++,this.played++,this.activeVoices.set(i,r),i.onended=()=>{this.activeVoices.delete(i)&&this.voices--,i.disconnect()},i.start()}get state(){return this.context?.state??`locked`}dispose(){this.music?.pause(),this.music&&(this.music.removeAttribute(`src`),this.music.load()),this.moveSource?.stop(),this.context?.close(),this.buffers.clear(),this.files.clear()}},Cu=class{data;saveFailed=!1;key;config;constructor(n){this.config=n,this.key=n.storage.key;let r={progress:e(),version:4,modeId:`classic`,records:{},legacyRecords:{},endless:d(),endlessByMap:{},reducedMotion:!1,bestScore:0,stars:0,matches:0,volume:n.storage.defaultVolume,muted:!1,quality:n.storage.defaultQuality,name:`Player`,color:0,skinId:`classic-0`,mapId:`city`},i={};try{let e=JSON.parse(localStorage.getItem(this.key)??`{}`);e&&typeof e==`object`&&!Array.isArray(e)&&(i=e)}catch{}let a=(e,t,n)=>typeof e==`number`&&Number.isFinite(e)?$l(e,0,n):t,o=Math.floor(a(i.color,0,n.world.colors.length-1)),c=v(typeof i.mapId==`string`?i.mapId:`city`).id,l={};if((i.version??0)>=3&&i.endlessByMap&&typeof i.endlessByMap==`object`&&!Array.isArray(i.endlessByMap))for(let e of h)Object.hasOwn(i.endlessByMap,e.id)&&(l[e.id]=f(i.endlessByMap[e.id],n));l[c]??=(i.version??0)>=3?d():f(i.endless,n);let u=e=>e&&typeof e==`object`&&!Array.isArray(e)?Object.fromEntries(Object.entries(e).filter(([e,t])=>/^[a-zA-Z]+:[a-zA-Z-]+$/.test(e)&&typeof t==`number`&&Number.isFinite(t)&&t>=0)):{},p=u(i.records),m=u(i.legacyRecords);if((i.version??0)<4)for(let e of Object.keys(p))e.startsWith(`classic:`)&&(m[e]=p[e],delete p[e]);this.data={progress:t(i.progress),version:4,modeId:s(i.modeId??`classic`).id,endless:l[c],endlessByMap:l,reducedMotion:typeof i.reducedMotion==`boolean`&&i.reducedMotion,records:p,legacyRecords:m,skinId:_(typeof i.skinId==`string`?i.skinId:`classic-`+o).id,mapId:c,bestScore:Math.floor(a(i.bestScore,0,1e9)),stars:Math.floor(a(i.stars,0,1e9)),matches:Math.floor(a(i.matches,0,1e6)),volume:a(i.volume,r.volume,1),muted:typeof i.muted==`boolean`&&i.muted,quality:i.quality===`low`||i.quality===`high`?i.quality:r.quality,name:typeof i.name==`string`&&i.name.trim()?i.name.trim().slice(0,16):r.name,color:Math.floor(a(i.color,0,n.world.colors.length-1))}}endlessFor(e,t=Date.now()){let n=new p(this.config,this.data.endlessByMap[v(e).id]??d());return n.accrueOffline(t),n.data}storeEndless(e,t){let n=v(e).id;this.data.endlessByMap[n]=structuredClone(t),n===this.data.mapId&&(this.data.endless=this.data.endlessByMap[n])}recordResult(e,t,n){let r=e+`:`+v(t).id,i=this.data.records[r]??0;return this.data.records[r]=Math.max(i,n),e===`classic`&&(this.data.bestScore=Math.max(this.data.bestScore,n)),i}persist(){try{return localStorage.setItem(this.key,JSON.stringify(this.data)),this.saveFailed=!1,!0}catch{return this.saveFailed=!0,!1}}};function wu(e){let t=50/Math.max(2,...e.layers.flatMap(e=>[Math.abs(e.x)+e.width/2,Math.abs(e.z)+e.height/2]));return`<span class="skin-avatar" style="--aperture:${t*2*1.015}%;--skin:${e.color}"><i class="avatar-hole" style="width:${t*2}%;height:${t*2}%"></i><span class="skin-art">${e.layers.map(e=>`<img loading="lazy" src="${b(e.path)}" alt="" draggable="false" style="left:${50+e.x*t}%;top:${50+e.z*t}%;width:${e.width*t}%;height:${e.height*t}%;${e.circle?`clip-path:ellipse(50% 50%)`:``}">`).join(``)}</span></span>`}var Tu=new Intl.NumberFormat(`zh-CN`,{notation:`compact`,maximumFractionDigits:1}),Eu=class{root;config;assets;save;labels=[];popups=[];popupIndex=0;lastHud=-1/0;lastPhase=``;toastUntil=0;bannerUntil=0;previousFocus=null;elements={};onAction;constructor(e,t,n,i){this.root=e,this.config=t,this.assets=n,this.save=i,document.documentElement.style.setProperty(`--menu-plane`,`url("${new URL(n.sprite(`menuPattern`),document.baseURI).href}")`);let a=(e,t=``)=>`<img class="${t}" src="${n.sprite(e)}" alt="" draggable="false">`;e.innerHTML=`
      <aside id="save-warning" class="save-warning hidden" role="status">进度尚未保存，关闭页面会丢失本次更改。<button data-action="retry-save">重试保存</button><button data-action="export-save">导出当前进度</button></aside>
      <section id="menu" class="menu" aria-label="游戏主菜单">
        ${a(`menuIsland`,`menu-island`)}
        <div class="menu-level level-medallion">${a(`menuLevelRing`,`menu-level-ring`)}<strong id="career-level">1</strong><span>level</span></div>
        <div class="personal-best"><span>最高纪录</span><b id="best-score">0</b><span class="stars">${a(`star`)}<b id="total-stars">0</b></span></div>
        <button class="icon-button menu-settings" data-action="settings" aria-label="设置">${a(`settings`)}</button>
        <div class="play-dock"><div class="content-pickers"><button data-action="maps"><span>场景</span><b id="selected-map"></b><small>更换 ›</small></button><button data-action="skins"><span id="selected-skin-preview"></span><b id="selected-skin"></b><small>更换 ›</small></button></div><label class="mode-picker" for="mode-select">玩法<select id="mode-select" aria-label="玩法模式">${o.map(e=>`<option value="${e.id}">${e.name}</option>`).join(``)}</select><select id="powerup-select" aria-label="开局道具">${Object.entries(r).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}</select></label><label class="nickname"><span>你的名字</span><input id="nickname" maxlength="16" placeholder="Player" aria-label="你的名字"></label><button id="play" class="play-button" data-action="play">PLAY</button><p id="mode-description"></p></div>
        <button class="collection-open" data-action="collection">图鉴与任务</button><nav class="menu-nav" aria-label="主菜单导航"><button data-action="help"><span>玩法</span><span class="nav-symbol">?</span></button><button class="selected" data-action="home" aria-label="城市主菜单">${a(`menuHome`,`home-symbol`)}</button><button data-action="skins"><span>HOLES</span><span class="mini-hole"></span></button></nav>
      </section>
      <section id="hud" class="hud hidden" aria-label="对局状态">
        <div class="player-hud"><div class="level-medallion small"><strong id="level">1</strong><span>LEVEL</span></div><div class="player-progress"><strong id="score">0</strong><span>分</span><div class="xp-track"><i id="xp-fill"></i></div><small id="xp-text">0 / 10</small></div></div>
        <div id="timer" class="timer">${a(`timer`)}<b id="time">02:00</b></div>
        <div class="leaderboard"><div class="board-heading"><span>排行榜</span><strong id="rank">1 / 7</strong></div><ol id="rankings"></ol></div>
        <button class="icon-button pause-button" data-action="settings" aria-label="暂停游戏">${a(`settings`)}</button>
        <div id="control-hint" class="control-hint">按住拖动移动 <span>或 WASD / 方向键</span></div>
        <div id="next-food" class="next-food"></div>
        <button id="endless-open" class="endless-open hidden" data-action="upgrades">成长升级</button><div id="mode-progress" class="mode-progress"></div><div id="kill-count" class="kill-count"></div>
        <div id="frenzy" class="frenzy hidden"><b>狂暴！</b><span id="frenzy-time"></span></div>
      </section>
      <div id="hole-labels" class="hole-labels"></div><div id="score-popups" class="score-popups"></div>
      <div id="countdown" class="countdown hidden" aria-live="polite"></div>
      <div id="toast" class="game-toast hidden" aria-live="polite"></div>
      <div id="death" class="death hidden"><strong>被吞掉了！</strong><span id="respawn-time"></span><small>${t.match.endOnPlayerDeath?`本局结束，下一局再夺第一。`:`分数保留，换个街区再来。`}</small></div>
      <div id="joystick" class="joystick hidden"><i id="joystick-knob"></i></div>
      <button id="mute" class="icon-button mute-button" data-action="mute" aria-label="静音">${a(`soundOn`)}</button>
      <section id="results" class="overlay hidden" aria-label="对局结算" role="dialog" aria-modal="true"><div class="results-panel"><span id="result-reason" class="result-eyebrow">城市挑战完成</span><h1 id="result-title">再接再厉！</h1><div class="result-place"><img src="${n.sprite(`crown`)}" alt=""><strong id="result-rank">#1</strong></div><div class="result-score"><b id="result-score">0</b><span id="result-score-label">总分</span></div><p id="new-best" class="new-best hidden">新的最高纪录！</p><div class="result-stats"><div><b id="result-eaten">0</b><span>吞噬物体</span></div><div><b id="result-kills">0</b><span>吞噬对手</span></div><div><b id="result-level">1</b><span>最终等级</span></div></div><div class="reward">${a(`star`)}<strong id="result-stars">+50</strong><span>星级奖励</span></div><button class="play-button" data-action="replay">再来一局</button><button class="text-button" data-action="menu">返回城市</button></div></section>
      <section id="settings" class="overlay hidden" aria-label="设置" role="dialog" aria-modal="true"><div class="dialog-panel"><button class="close-button" data-action="close" aria-label="关闭设置">×</button><h2 id="settings-title">设置</h2><label class="setting-row" for="volume"><span>音量</span><output id="volume-value">50%</output></label><input id="volume" type="range" min="0" max="100" step="1" aria-label="音量"><div class="setting-row"><span>画质</span><div class="quality-switch"><button data-action="quality" data-value="high">高</button><button data-action="quality" data-value="low">流畅</button></div></div><label class="setting-row" for="reduced-motion"><span>减弱动态效果</span><input id="reduced-motion" type="checkbox"></label><p class="setting-help">高画质开启城市阴影。手机卡顿时可切换流畅。</p><button id="resume" class="play-button" data-action="close">继续游戏</button><button id="pause-menu" class="text-button" data-action="menu">结束本局，返回城市</button></div></section>
      <section id="help" class="overlay hidden" aria-label="玩法说明" role="dialog" aria-modal="true"><div class="dialog-panel"><button class="close-button" data-action="close" aria-label="关闭说明">×</button><h2>从小洞，吃成城市之王</h2><p>按住并拖动屏幕移动，键盘也可使用 WASD 或方向键。松开就会停下。</p><ol class="how-to"><li><b>先吃小的</b><span>垃圾桶、消防栓、行人都能让你长大。</span></li><li><b>越吃越大</b><span>从长椅、树木到汽车、大楼。洞口越大，能落进去的物体越多。</span></li><li><b>找准机会</b><span>对战中，比对手大，并用洞口完整盖住它就能吞掉。经典模式连续击杀可进入狂暴；淘汰模式被吞后结束本局。</span></li></ol><p id="help-mode"></p><button class="play-button" data-action="close">知道了</button></div></section>
      <section id="maps" class="overlay hidden" aria-label="选择场景" role="dialog" aria-modal="true"><div class="dialog-panel content-panel map-picker-panel"><header class="map-picker-header"><button class="close-button" data-action="close" aria-label="关闭场景选择">×</button><h2>下一站，吞哪里？</h2><p>${h.length} 个场景，全部免费。每局更换种子，探索不同物体组合。</p></header><div class="map-picker-list" role="region" aria-label="地图列表" tabindex="0"><div class="map-options">${h.map(e=>`<button data-action="map" data-value="${e.id}"><img loading="lazy" src="${b(e.preview)}" alt="${e.name}原素材场景风貌"><b>${e.name}</b><small>${e.subtitle}</small></button>`).join(``)}</div></div><footer class="map-picker-footer"><p class="content-status" aria-live="polite"></p><button class="retry-content hidden" data-action="retry-content">重试加载</button><button class="play-button" data-action="close">选好了</button></footer></div></section>
      <section id="skins" class="overlay hidden" aria-label="选择黑洞" role="dialog" aria-modal="true"><div class="dialog-panel content-panel"><button class="close-button" data-action="close" aria-label="关闭黑洞外观">×</button><h2>你的黑洞</h2><p>${m.length} 款 · 全部免费 · 只换外观</p><input id="skin-search" class="skin-search" type="search" placeholder="搜索皮肤" aria-label="搜索皮肤"><div class="skin-options">${m.map(e=>`<button data-action="skin" data-value="${e.id}" aria-label="${e.name}">${wu(e)}<span>${e.name}</span></button>`).join(``)}</div><p class="content-status" aria-live="polite"></p><button class="retry-content hidden" data-action="retry-content">重试加载</button><button class="play-button" data-action="close">选好了</button></div></section>
      <section id="collection" class="overlay hidden" role="dialog" aria-modal="true" aria-label="图鉴与任务"><div class="dialog-panel content-panel"><button class="close-button" data-action="close" aria-label="关闭图鉴">×</button><h2>每一口，都有记录</h2><p id="career-summary"></p><div class="mission-list">${t.career.missions.map(e=>`<div><span>${e.name}</span><b id="mission-${e.id}"></b><button data-action="claim-mission" data-value="${e.id}">领取 ${e.stars} 星</button></div>`).join(``)}</div><h3>吞噬图鉴</h3><input id="collection-search" type="search" class="skin-search" placeholder="搜索物件" aria-label="搜索吞噬图鉴"><div id="collection-list" class="collection-list"></div></div></section>
      <section id="upgrades" class="overlay hidden" role="dialog" aria-modal="true" aria-label="无尽成长"><div class="dialog-panel"><button class="close-button" data-action="close" aria-label="关闭成长面板">×</button><h2>无尽成长</h2><p id="endless-summary"></p><button id="claim-stage" class="play-button" data-action="claim-stage">领取奖励，进入下一阶段</button><button id="claim-offline" class="text-button" data-action="claim-offline">领取离线收益</button><div class="upgrade-list">${Object.entries(u).map(([e,t])=>`<button data-action="upgrade" data-value="${e}"><span>${t}</span><b id="upgrade-${e}"></b></button>`).join(``)}</div></div></section>
      <section id="recovery" class="overlay hidden" role="alertdialog" aria-modal="true" aria-labelledby="recovery-title"><div class="dialog-panel"><h2 id="recovery-title" tabindex="-1">正在恢复画面…</h2><p>游戏已暂停，当前进度会保留。</p></div></section>`,e.querySelectorAll(`[id]`).forEach(e=>this.elements[e.id]=e);for(let e=0;e<Math.max(t.match.totalHoles,t.modes.battleRoyale.totalHoles);e++){let e=document.createElement(`div`);e.className=`hole-label`,e.innerHTML=`<b></b><span></span><div class="mini-xp"><i></i></div>`,this.elements[`hole-labels`].append(e),this.labels.push(e)}for(let e=0;e<24;e++){let e=document.createElement(`div`);e.className=`score-popup hidden`,this.elements[`score-popups`].append(e),this.popups.push({element:e,until:0,x:0,z:0,born:0,value:0})}this.elements[`skin-search`].addEventListener(`input`,()=>{let e=this.elements[`skin-search`].value.trim().toLowerCase();this.root.querySelectorAll(`[data-action="skin"]`).forEach(t=>t.hidden=!((t.getAttribute(`aria-label`)??``)+t.dataset.value).toLowerCase().includes(e))}),e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-action]`);t&&this.onAction?.(t.dataset.action,t.dataset.value)}),this.elements[`powerup-select`].addEventListener(`change`,()=>this.onAction?.(`powerup`,this.elements[`powerup-select`].value)),this.elements[`collection-search`].addEventListener(`input`,()=>this.refreshCollection()),this.elements[`mode-select`].addEventListener(`change`,()=>this.onAction?.(`mode`,this.elements[`mode-select`].value)),this.elements[`reduced-motion`].addEventListener(`change`,()=>this.onAction?.(`reduced-motion`,String(this.elements[`reduced-motion`].checked))),this.elements.volume.addEventListener(`input`,()=>this.onAction?.(`volume`,this.elements.volume.value)),e.addEventListener(`keydown`,t=>{if(t.key!==`Tab`)return;let n=e.querySelector(`.overlay:not(.hidden):not([inert])`);if(!n)return;let r=Array.from(n.querySelectorAll(`button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]`)).filter(e=>e.getClientRects().length),i=r[0],a=r[r.length-1];i?t.shiftKey&&document.activeElement===i?(t.preventDefault(),a.focus()):!t.shiftKey&&document.activeElement===a&&(t.preventDefault(),i.focus()):t.preventDefault()}),this.elements.nickname.value=i.data.name,this.refreshSaved()}text(e,t){this.elements[e].textContent=String(t)}show(e,t){this.elements[e].classList.toggle(`hidden`,!t)}refreshSaved(){this.refreshCollection();let e=this.save.data;this.elements[`mode-select`].value=e.modeId,this.elements[`reduced-motion`].checked=e.reducedMotion,this.text(`mode-description`,s(e.modeId).description),this.text(`help-mode`,s(e.modeId).name+`：`+s(e.modeId).description),this.elements[`powerup-select`].disabled=e.modeId===`endless`,this.elements[`powerup-select`].querySelector(`option[value=MoreTime]`).disabled=e.modeId===`battleRoyale`||e.modeId===`endless`;for(let[t,n]of[[`best-score`,e.bestScore],[`total-stars`,e.stars]])this.text(t,n<1e5?n:Tu.format(n)),this.elements[t].title=String(n),this.elements[t].setAttribute(`aria-label`,String(n));this.text(`selected-map`,v(e.mapId).name),this.text(`selected-skin`,_(e.skinId).name),this.elements[`selected-skin-preview`].innerHTML=wu(_(e.skinId)),this.root.querySelectorAll(`[data-action="map"]`).forEach(t=>{let n=t.dataset.value===e.mapId;t.classList.toggle(`selected`,n),t.setAttribute(`aria-pressed`,String(n))});let t=this.root.querySelector(`.menu-island`),n=b(v(e.mapId).menuPreview);if(t.dataset.requested!==n){t.dataset.requested=n;let r=new Image;r.onload=()=>{t.dataset.requested===n&&(t.src=n,t.alt=v(e.mapId).name+`小岛`)},r.onerror=()=>{t.dataset.requested===n&&(delete t.dataset.requested,this.contentStatus(!1,!0))},r.src=n}let r=1+Math.floor(e.stars/this.config.storage.starsPerCareerLevel);this.text(`career-level`,r),this.elements[`career-level`].style.fontSize=`${Math.min(44,108/String(r).length)}px`,this.elements.volume.value=String(Math.round(e.volume*100)),this.text(`volume-value`,`${Math.round(e.volume*100)}%`),this.elements.mute.querySelector(`img`).src=this.assets.sprite(e.muted?`soundOff`:`soundOn`),this.elements.mute.setAttribute(`aria-label`,e.muted?`开启声音`:`静音`),this.root.querySelectorAll(`[data-action="quality"]`).forEach(t=>{let n=t.dataset.value===e.quality;t.classList.toggle(`selected`,n),t.setAttribute(`aria-pressed`,String(n))}),this.root.querySelectorAll(`[data-action="skin"]`).forEach(t=>{let n=t.dataset.value===e.skinId;t.classList.toggle(`selected`,n),t.setAttribute(`aria-pressed`,String(n))})}refreshCollection(){let e=this.save.data.progress;this.text(`career-summary`,`吞噬 ${e.eaten} 个物体 · ${e.kills} 次击杀 · ${e.played} 局 · ${Object.keys(e.collection).length} 种收藏`);for(let t of this.config.career.missions){this.text(`mission-`+t.id,`${Math.min(e[t.counter],t.target)} / ${t.target}`);let n=this.root.querySelector(`[data-action="claim-mission"][data-value="${t.id}"]`),r=e.claimed.includes(t.id);n.disabled=r||e[t.counter]<t.target,n.textContent=r?`已领取`:`领取 ${t.stars} 星`}let t=this.elements[`collection-search`].value.trim().toLowerCase(),n=this.elements[`collection-list`];n.replaceChildren();for(let[r,i]of Object.entries(this.assets.manifest.models)){if([`plane`,`hole`].includes(i.kind)||r===`crown`)continue;let a=i.label??r;if(!`${r} ${a}`.toLowerCase().includes(t))continue;let o=document.createElement(`div`),s=document.createElement(`span`),c=document.createElement(`b`);s.textContent=a,c.textContent=e.collection[r]?`已吞噬 ${e.collection[r]}`:`尚未发现`,o.append(s,c),n.append(o)}}contentStatus(e,t=!1){this.root.querySelectorAll(`.content-status`).forEach(n=>n.textContent=e?`正在加载所选素材…`:t?`加载失败，已保留原选择。请重试。`:``),this.root.querySelectorAll(`[data-action="map"],[data-action="skin"],[data-action="play"],[data-action="close"],[data-action="menu"]`).forEach(t=>t.disabled=e),this.root.querySelectorAll(`.retry-content`).forEach(e=>e.classList.toggle(`hidden`,!t))}name(){return this.elements.nickname.value.trim().slice(0,16)||`Player`}updateModalBackground(){let e=this.root.querySelector(`.overlay:not(.hidden)`),t=!!e;(e??this.root).append(this.elements[`save-warning`]);for(let e of[`menu`,`hud`,`mute`])this.elements[e].inert=t;let n=document.querySelector(`#city-canvas`);n&&(n.inert=t)}openDialog(e,t){this.dialogOpen()||(this.previousFocus=document.activeElement),this.closeDialogs(!1),e===`collection`&&this.refreshCollection(),this.show(e,!0),this.updateModalBackground(),this.text(`settings-title`,t?`游戏已暂停`:`设置`),this.text(`resume`,t?`继续游戏`:`完成`),this.show(`pause-menu`,t),this.elements[e].querySelector(`button`)?.focus()}closeDialogs(e=!0){for(let e of[`settings`,`help`,`skins`,`maps`,`upgrades`,`collection`])this.show(e,!1);this.updateModalBackground(),e&&this.previousFocus?.isConnected&&this.previousFocus.getClientRects().length&&this.previousFocus.focus({preventScroll:!0}),e&&(this.previousFocus=null)}dialogOpen(){return[`settings`,`help`,`skins`,`maps`,`upgrades`,`collection`].some(e=>!this.elements[e].classList.contains(`hidden`))}setRecovering(e){this.elements.results.inert=e,e?(this.dialogOpen()||(this.previousFocus=document.activeElement),this.closeDialogs(!1),this.show(`recovery`,!0),this.updateModalBackground(),this.elements[`recovery-title`].focus()):(this.show(`recovery`,!1),this.closeDialogs())}notify(e,t=2){this.text(`toast`,e),this.toastUntil=performance.now()/1e3+t,this.show(`toast`,!0)}processEvent(e,t){if(e.id===0||e.type===`countdown`){if(e.type===`capture`){let n=this.popups[(this.popupIndex+this.popups.length-1)%this.popups.length];if(n.until>t.time&&t.time-n.born<this.config.presentation.scorePopupMergeSeconds){n.value+=e.value??0,n.element.textContent=`+${n.value}`;return}let r=this.popups[this.popupIndex++%this.popups.length];r.until=t.time+this.config.presentation.scorePopupSeconds,r.born=t.time,r.x=e.x??t.player.x,r.z=e.z??t.player.z,r.value=e.value??0,r.element.textContent=`+${r.value}`,r.element.classList.remove(`hidden`)}e.type===`level`&&this.notify(`LEVEL ${e.value} · 变大了！`,1.3),e.type===`kill`&&this.notify(`吞掉 ${t.CurrentHoles[e.target].Pseudo}  +${e.value}`,1.8),e.type===`frenzy`&&this.notify(`${this.config.scoring.frenzyKillStreak} 连杀 · 狂暴开始！`,1.8),e.type===`start`&&(this.bannerUntil=performance.now()/1e3+.6),e.type===`respawn`&&this.notify(`重新出发 · ${this.config.combat.protectionSeconds} 秒保护`,1.8)}}showResults(e,t){let n=e.result;this.text(`result-reason`,n.reason===`cleared`?`清图完成！`:n.reason===`survived`?`最后的幸存者！`:n.reason===`eaten`?`被吞掉了 · 本局结束`:n.reason===`domination`?`称霸城市 · 挑战完成`:`时间到 · 城市挑战完成`),this.text(`result-title`,n.reason===`eaten`?`下次，吞回来！`:n.rank===1?`城市之王！`:n.rank<=3?`漂亮的一局！`:n.level>=this.config.hole.levelMax?`抢建筑，冲前三！`:`再大一点，就能赢！`),this.text(`result-score-label`,n.modeId===`speedrun`?`清图进度`:`总分`),this.text(`result-rank`,`#${n.rank}`),this.text(`result-score`,n.modeId===`speedrun`?`${(n.completion*100).toFixed(2)}%`:n.score),this.text(`result-eaten`,n.eaten),this.text(`result-kills`,n.kills),this.text(`result-level`,n.level),this.text(`result-stars`,`+${n.stars}`),this.show(`new-best`,(n.modeId===`speedrun`?n.completion*100:n.score)>t),this.show(`results`,!0),this.updateModalBackground(),this.elements.results.querySelector(`[data-action="replay"]`)?.focus()}reset(){this.lastPhase=``,this.lastHud=-1/0,this.toastUntil=this.bannerUntil=0,this.show(`toast`,!1),this.show(`results`,!1),this.show(`death`,!1);for(let e of this.popups)e.until=0,e.element.classList.add(`hidden`);this.closeDialogs()}update(e,t,n){this.show(`save-warning`,this.save.saveFailed);let r=performance.now()/1e3,i=e.player;if(e.modeId===`endless`){let t=e.endless;this.text(`endless-summary`,`${e.map.definition.name} · 第 ${t.data.stage} 阶段 · ${t.data.stagePoints} / ${t.required} · 可用星星 ${t.data.points}`),this.elements[`claim-stage`].disabled=!e.stageReady,this.elements[`claim-offline`].disabled=t.data.offlinePending<=0,this.text(`claim-offline`,`领取离线收益 +${t.data.offlinePending}`);for(let e of Object.keys(u)){this.text(`upgrade-`+e,`Lv.${t.data.upgrades[e]} · ${t.price(e)} 星`);let n=this.elements[`upgrade-`+e].closest(`button`);n.disabled=t.data.points<t.price(e)||t.data.upgrades[e]>=this.config.modes.endless.maxUpgradeLevel}}if(this.show(`endless-open`,e.modeId===`endless`),this.text(`mode-progress`,e.modeId===`speedrun`?`已清理 ${(e.completion*100).toFixed(2)}%`:e.modeId===`battleRoyale`?`存活 ${e.CurrentHoles.filter(e=>!e.IsDead).length} / ${e.config.match.totalHoles}`:e.modeId===`endless`?`阶段 ${e.endless.data.stage} · ${e.endless.data.stagePoints} / ${e.endless.required}${e.stageReady?` · 可领取奖励`:``}`:``),this.lastPhase!==e.phase&&(document.documentElement.dataset.phase=e.phase,this.lastPhase=e.phase,this.show(`menu`,e.phase===`MENU`),this.show(`hud`,e.phase===`PLAYING`||e.phase===`COUNTDOWN`),this.show(`hole-labels`,e.phase!==`MENU`&&e.phase!==`RESULTS`),e.phase===`MENU`&&this.refreshSaved()),this.show(`countdown`,e.phase===`COUNTDOWN`||e.phase===`PLAYING`&&r<this.bannerUntil),this.text(`countdown`,e.phase===`COUNTDOWN`?Math.ceil(e.countdown):`GO!`),r>=this.toastUntil&&this.show(`toast`,!1),this.show(`death`,i.IsDead&&e.phase===`PLAYING`),i.IsDead&&this.text(`respawn-time`,`${Math.max(0,Math.ceil(i.respawnAt-e.time))} 秒后${this.config.match.endOnPlayerDeath?`查看本局成绩`:`重返城市`}`),this.show(`joystick`,n.active&&e.phase===`PLAYING`&&!e.GameIsPaused),n.active){this.elements.joystick.style.transform=`translate(${n.originX}px,${n.originY}px)`;let e=Math.hypot(n.offsetX,n.offsetY),t=e?Math.min(e,42)/e:0;this.elements[`joystick-knob`].style.transform=`translate(${n.offsetX*t}px,${n.offsetY*t}px)`}if(e.phase===`MENU`||e.phase===`RESULTS`)return;for(let n=0;n<this.labels.length;n++){let r=e.CurrentHoles[n],i=this.labels[n];if(!r){i.classList.add(`hidden`);continue}let a=t.project(r.x,0,r.z),o=r.IsDead||!a.visible;if(i.classList.toggle(`hidden`,o),o)continue;let s=t.project(r.x-r.Size*Math.SQRT1_2,0,r.z-r.Size*Math.SQRT1_2);i.style.transform=`translate(${a.x}px,${s.y-6}px) translate(-50%,-100%)`,i.style.color=r.color,i.children[0].textContent=`LVL ${r.Level}`,i.children[1].textContent=e.time<r.protectedUntil?`🛡 ${Math.ceil(r.protectedUntil-e.time)}s · ${r.Pseudo}`:r.Pseudo;let c=S(this.config,r.Level,r.IsBot);i.children[2].children[0].style.width=`${c<0?100:Math.min(100,r.Xp/c*100)}%`}for(let n of this.popups){if(e.time>=n.until){n.element.classList.add(`hidden`);continue}let r=t.project(n.x,0,n.z),i=(e.time-n.born)/this.config.presentation.scorePopupSeconds;n.element.style.transform=`translate(${r.x}px,${r.y-30-i*55}px)`,n.element.style.opacity=String(1-i)}if(r-this.lastHud<.09)return;this.lastHud=r,this.text(`level`,i.Level),this.text(`score`,i.Points);let a=S(this.config,i.Level),o=a<0?1:Math.min(1,i.Xp/a);this.elements[`xp-fill`].style.width=`${o*100}%`,this.text(`xp-text`,a<0?`MAX`:`${i.Xp} / ${a}`);let c=Math.ceil(e.remaining);this.text(`time`,e.IsTimeBasedMode()?`${Math.floor(c/60).toString().padStart(2,`0`)}:${(c%60).toString().padStart(2,`0`)}`:s(e.modeId).name),this.elements.timer.classList.toggle(`urgent`,e.IsTimeBasedMode()&&c<=30),this.text(`rank`,`${i.Rank} / ${e.config.match.totalHoles}`);let l=this.elements.rankings;if(l.children.length!==e.CurrentHoles.length&&l.replaceChildren(),!l.children.length)for(let t=0;t<e.CurrentHoles.length;t++){let e=document.createElement(`li`);e.innerHTML=`<span class="rank-dot"></span><span class="rank-name"></span><b></b>`,l.append(e)}e.ranking.forEach((e,t)=>{let n=l.children[t];n.classList.toggle(`you`,e.IsLocalPlayer),n.children[0].style.background=e.color,n.children[1].textContent=e.Pseudo,n.children[2].textContent=String(e.Points)}),this.show(`control-hint`,e.time<12),this.text(`next-food`,{city:`从路边小物开始 · 洞口容得下才能吞`,japan:`沿稻田和灯笼成长 · 留意庭院里的大物体`,pirates:`先清木桶和货箱 · 再挑战船只与仓库`,farm:`沿田边收集南瓜和草捆 · 再吞农舍`}[e.map.definition.id]??`从小物体开始，让洞口完整容纳目标`),this.text(`kill-count`,i.kills?`吞噬对手 ${i.kills}`:``),this.show(`frenzy`,i.HoleMode===`FrenzyMode`),i.HoleMode===`FrenzyMode`&&this.text(`frenzy-time`,`${Math.ceil(i.frenzyUntil-e.time)}s`)}},Du=document.querySelector(`#app`);Du.innerHTML=`<div class="loading"><strong>HOLE CITY</strong><p id="loading-text">城市正在醒来…</p><div class="loading-track"><i id="loading-fill"></i></div></div>`;async function Ou(){let e=new Ql,t=await C(),r=new Cu(t);r.storeEndless(r.data.mapId,r.endlessFor(r.data.mapId)),r.persist(),await e.load(e=>{let t=document.querySelector(`#loading-fill`);t&&(t.style.width=`${e*100}%`)},r.data.mapId,r.data.skinId);let a=new Su(e);a.volume=r.data.volume,a.muted=r.data.muted,a.preload(),Du.innerHTML=`<canvas id="city-canvas" tabindex="0" aria-label="黑洞吞噬城市游戏画面；按住拖动或使用 WASD 移动"></canvas><div id="ui"></div>`;let o=document.querySelector(`#city-canvas`),c=()=>crypto.getRandomValues(new Uint32Array(1))[0],l=new bu(t,c());l.GameInit(l.seed,r.data.name,_(r.data.skinId).color,r.data.mapId,r.data.skinId,r.data.modeId,r.data.endless);let d=new iu(o,t,e);d.setQuality(r.data.quality),d.rebuild(l);let f=new xu(o,t),p=new Eu(document.querySelector(`#ui`),t,e,r),m=!1,h=performance.now(),g=-1,y=()=>{D(),r.data.name=p.name(),r.persist(),f.reset(),p.reset(),l.GameInit(c(),r.data.name,_(r.data.skinId).color,r.data.mapId,r.data.skinId,r.data.modeId,r.data.endless),d.rebuild(l),e.releaseUnused(),l.CountdownStart(),h=performance.now(),g=-1,o.focus({preventScroll:!0}),a.startMusic(),a.unlock().then(()=>a.play(`tick`)).catch(()=>{})},b=()=>{p.closeDialogs(),l.GameIsPaused=!1,f.reset(),h=performance.now(),l.phase!==`MENU`&&o.focus({preventScroll:!0})},x=!1,S=null,w=async(t,n)=>{if(!x){x=!0,S={mapId:t,skinId:n},p.contentStatus(!0);try{await e.loadSelection(t,n),D();let i=r.endlessFor(t);l.GameInit(c(),r.data.name,_(n).color,t,n,r.data.modeId,i),d.rebuild(l),e.releaseUnused(),r.data.mapId=t,r.data.skinId=n,r.storeEndless(t,i),n.startsWith(`classic-`)&&(r.data.color=Number(n.slice(8))),r.persist(),p.refreshSaved(),p.contentStatus(!1),S=null}catch(e){console.warn(`Content selection failed`,e),p.contentStatus(!1,!0)}finally{x=!1,h=performance.now()}}},T=!1,E=0,D=()=>{E=performance.now(),l.modeId===`endless`&&(l.endless.data.lastSeen=Math.max(l.endless.data.lastSeen,Date.now()),r.storeEndless(l.map.definition.id,l.endless.data)),T=!r.persist()};window.addEventListener(`pagehide`,D),p.onAction=(e,o)=>{if(e===`retry-save`)D();else if(e===`export-save`){D();let e=URL.createObjectURL(new Blob([JSON.stringify(r.data)],{type:`application/json`})),t=document.createElement(`a`);t.href=e,t.download=`hole-city-progress.json`,t.click(),setTimeout(()=>URL.revokeObjectURL(e),1e3)}else if(!(m||x)){if(e!==`volume`&&a.unlock().then(()=>a.play(`click`)).catch(()=>{}),e===`claim-mission`){let e=t.career.missions.find(e=>e.id===o);e&&(r.data.stars+=n(r.data.progress,e),r.persist(),p.refreshSaved())}else if(e===`powerup`)l.selectedPowerUp=i(o??`None`);else if(e===`mode`)D(),r.data.modeId=s(o??``).id,r.persist(),l.GameInit(c(),r.data.name,_(r.data.skinId).color,r.data.mapId,r.data.skinId,r.data.modeId,r.data.endless),d.rebuild(l),p.reset(),p.refreshSaved();else if(e===`reduced-motion`)r.data.reducedMotion=o===`true`,r.persist(),p.refreshSaved();else if(e===`claim-stage`)l.ClaimEndlessStage()&&(d.rebuild(l),D(),a.play(`level`));else if(e===`claim-offline`)l.endless.claimOffline(),D();else if(e===`upgrade`&&o&&o in u)l.UpgradeEndless(o),D();else if(e===`play`||e===`replay`)y();else if(e===`close`)b();else if(e===`home`)p.closeDialogs();else if(e===`settings`||e===`help`||e===`skins`||e===`maps`||e===`upgrades`||e===`collection`){let t=l.phase===`PLAYING`||l.phase===`COUNTDOWN`;l.GameIsPaused=t,f.reset(),p.openDialog(e,t)}else e===`menu`?(D(),l.phase=`MENU`,l.GameIsPaused=!1,f.reset(),p.reset(),p.refreshSaved()):e===`quality`?(r.data.quality=o===`low`?`low`:`high`,d.setQuality(r.data.quality),r.persist(),p.refreshSaved()):e===`volume`?(r.data.volume=Math.max(0,Math.min(1,Number(o)/100)),a.volume=r.data.volume,a.applyVolume(),r.persist(),p.refreshSaved()):e===`mute`?(r.data.muted=!r.data.muted,a.muted=r.data.muted,a.applyVolume(),r.persist(),p.refreshSaved()):e===`skin`?w(r.data.mapId,_(o??``).id):e===`map`?w(v(o??``).id,r.data.skinId):e===`retry-content`&&S&&w(S.mapId,S.skinId)}},f.onPause=()=>{p.dialogOpen()?b():(l.phase===`PLAYING`||l.phase===`COUNTDOWN`)&&p.onAction?.(`settings`)};let O=()=>{D(),l.phase!==`PLAYING`&&l.phase!==`COUNTDOWN`||l.GameIsPaused||p.onAction?.(`settings`)};document.addEventListener(`visibilitychange`,()=>{document.hidden&&O()}),window.addEventListener(`blur`,O),window.addEventListener(`resize`,()=>{f.reset(),d.resize()}),o.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),m=!0,l.GameIsPaused=!0,f.reset(),p.setRecovering(!0)}),o.addEventListener(`webglcontextrestored`,()=>{m=!1,f.reset(),d.resize(),h=performance.now(),p.setRecovering(!1);let e=l.phase===`PLAYING`||l.phase===`COUNTDOWN`;l.GameIsPaused=e,e&&p.openDialog(`settings`,!0)});let k=e=>{let n=Math.max(0,(e-h)/1e3),i=Math.min(n,t.simulation.maxFrameSeconds);h=e,l.input.x=f.x,l.input.z=f.z,l.Advance(i);for(let e of l.events)if(p.processEvent(e,l),d.processEvent(e,l.time),e.id===0){if(e.type===`capture`){r.data.progress.eaten++;let n=l.CurrentFallingObjects[e.target],i=t.presentation.modelVariants[n.model],a=i?.[n.id%i.length]??n.model;r.data.progress.collection[a]=(r.data.progress.collection[a]??0)+1}else e.type===`kill`?r.data.progress.kills++:e.type===`start`?r.data.progress.played++:e.type===`end`&&l.result.rank===1&&l.result.reason!==`eaten`&&r.data.progress.wins++;if(e.type===`capture`)a.play(`swallow${Math.min(4,e.value??1)}`,1+l.player.Level*.008);else if(e.type===`level`)a.play(`level`);else if(e.type===`kill`)a.play(`kill`);else if(e.type===`countdown`&&e.value&&e.value<t.presentation.countdownSeconds)a.play(`tick`);else if(e.type===`end`){let e=l.modeId===`speedrun`?l.completion*100:l.player.Points,t=r.recordResult(l.modeId,l.map.definition.id,e);r.data.stars+=l.result.stars,r.data.matches++,r.persist(),p.showResults(l,t),a.play(l.result.reason===`eaten`?`defeat`:l.result.rank===1?`victory`:`end`)}}if(l.events.some(e=>e.id===0&&[`capture`,`kill`,`start`].includes(e.type))&&(T=!0),T&&e-E>=1e3&&D(),l.events.length=0,l.phase===`PLAYING`&&!l.GameIsPaused){let e=Math.ceil(l.remaining);e!==g&&e<=5&&e>0&&a.play(`tick`),g=e}a.updateMovement(Math.hypot(l.player.vx,l.player.vz),l.player.Speed*t.movement.baseSpeed,l.phase===`PLAYING`&&!l.GameIsPaused&&!l.player.IsDead,t.feedback.movementGain,t.feedback.musicGain),d.reducedMotion=r.data.reducedMotion,m||d.render(l,i),p.update(l,d,f),requestAnimationFrame(k)};requestAnimationFrame(k),document.documentElement.dataset.ready=`true`}Ou().catch(e=>{console.error(e),Du.innerHTML=`<div class="loading"><strong>城市暂时没有加载成功</strong><p class="error"></p><button class="play-button" style="width:220px" id="retry">重新加载</button></div>`;let t=Du.querySelector(`.error`);t.setAttribute(`role`,`alert`),t.textContent=e instanceof Error&&e.message.startsWith(`THREE.WebGLRenderer:`)?`当前浏览器无法启动 3D 画面。请开启硬件加速，或换用支持 WebGL 2 的浏览器后重试。`:`游戏数据或素材未能完整加载，请重新加载。`,document.querySelector(`#retry`).addEventListener(`click`,()=>location.reload())});