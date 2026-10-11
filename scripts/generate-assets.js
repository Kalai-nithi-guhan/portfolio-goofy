const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

fs.mkdirSync(path.join(__dirname, '../public/avatars'), { recursive: true });
fs.mkdirSync(path.join(__dirname, '../public/skill-art'), { recursive: true });

// Refined Kalai Head & Portrait Likeness:
// - Brown skin tone (#BD7A4E / #A7653C)
// - Voluminous short dark wavy hair with distinct side sweep to the right
// - Black rectangular glasses
// - Light moustache and chin stubble
// - White collared shirt base
function getKalaiHead(options = {}) {
  const { accessory = '' } = options;
  return `
    <g id="kalai-portrait">
      <!-- Neck -->
      <path d="M224 265 L224 330 L288 330 L288 265 Z" fill="#99572F"/>
      <!-- Neck Shading & Collar Shadow -->
      <path d="M224 265 C240 286 272 286 288 265 L288 300 C272 315 240 315 224 300 Z" fill="#884A24"/>

      <!-- White Collared Shirt (Standard Likeness Base) -->
      <path d="M214 310 L256 360 L298 310 L318 332 L256 385 L194 332 Z" fill="#F8FAFC"/>
      <path d="M256 360 L256 420" stroke="#CBD5E1" stroke-width="2.5"/>
      <!-- Collar Left -->
      <path d="M214 310 L256 355 L242 320 Z" fill="#E2E8F0"/>
      <!-- Collar Right -->
      <path d="M298 310 L256 355 L270 320 Z" fill="#E2E8F0"/>

      <!-- Face Base Shape -->
      <path d="M184 150 C184 95 328 95 328 150 C328 220 312 282 256 282 C200 282 184 220 184 150 Z" fill="#BD7A4E"/>
      
      <!-- Jawline & Cheek Contouring -->
      <path d="M192 200 C192 245 220 278 256 278 C292 278 320 245 320 200 C305 240 280 270 256 270 C232 270 207 240 192 200 Z" fill="#A86337" opacity="0.6"/>
      <ellipse cx="204" cy="225" rx="14" ry="7" fill="#A86337" opacity="0.4"/>
      <ellipse cx="308" cy="225" rx="14" ry="7" fill="#A86337" opacity="0.4"/>

      <!-- Ears with inner fold -->
      <path d="M176 172 C168 172 168 215 184 215 Z" fill="#A86337"/>
      <path d="M178 185 C174 185 174 202 182 202 Z" fill="#8E4F28"/>
      <path d="M336 172 C344 172 344 215 328 215 Z" fill="#A86337"/>
      <path d="M334 185 C338 185 338 202 330 202 Z" fill="#8E4F28"/>

      <!-- Voluminous Dark Wavy Hair with Side Sweep (Swept up & right) -->
      <!-- Back hair volume -->
      <path d="M176 155 C164 115 174 72 210 50 C240 32 288 32 322 45 C350 56 362 95 350 140 C340 120 332 95 310 78 C285 62 245 62 222 72 C196 82 182 105 176 155 Z" fill="#0E0D14"/>
      
      <!-- Voluminous Textured Hair Top & Wave Clusters -->
      <path d="M182 135 C176 95 204 55 242 46 C275 38 316 42 342 62 C356 74 362 95 352 120 C344 90 318 68 285 64 C250 60 216 72 196 98 C188 108 184 120 182 135 Z" fill="#14131C"/>
      
      <!-- Swept Quiff Waves across top -->
      <path d="M205 78 C225 52 265 44 298 52 C325 58 344 76 348 98 C336 82 312 68 282 66 C248 64 220 74 205 78 Z" fill="#1C1B26"/>
      <path d="M230 65 C255 46 295 44 326 56 C344 64 355 80 354 96 C345 78 325 66 298 64 C268 62 244 70 230 65 Z" fill="#252433"/>

      <!-- Wavy Strands falling at temples / side sweep fringe -->
      <path d="M184 135 C186 112 198 98 218 92 C206 102 198 116 196 132 Z" fill="#14131C"/>
      <path d="M216 94 C236 84 266 82 292 88 C272 84 246 86 226 94 Z" stroke="#252433" stroke-width="3" fill="none"/>
      <path d="M270 82 C295 82 322 92 334 110 C322 98 300 90 278 88 Z" fill="#1C1B26"/>

      <!-- Eyebrows (Defined & expressive) -->
      <path d="M202 160 C216 155 232 158 238 165" stroke="#100F17" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M310 160 C296 155 280 158 274 165" stroke="#100F17" stroke-width="6" stroke-linecap="round" fill="none"/>

      <!-- Eyes & White catchlights -->
      <ellipse cx="218" cy="180" rx="9" ry="10" fill="#100F17"/>
      <circle cx="221" cy="177" r="3.5" fill="#FFFFFF"/>
      <circle cx="216" cy="183" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      
      <ellipse cx="294" cy="180" rx="9" ry="10" fill="#100F17"/>
      <circle cx="297" cy="177" r="3.5" fill="#FFFFFF"/>
      <circle cx="292" cy="183" r="1.5" fill="#FFFFFF" opacity="0.8"/>

      <!-- Black Rectangular Glasses -->
      <rect x="194" y="164" width="48" height="33" rx="6" fill="none" stroke="#12131C" stroke-width="6.5"/>
      <rect x="270" y="164" width="48" height="33" rx="6" fill="none" stroke="#12131C" stroke-width="6.5"/>
      <!-- Glasses Bridge -->
      <path d="M242 177 Q256 173 270 177" fill="none" stroke="#12131C" stroke-width="6.5" stroke-linecap="round"/>
      <!-- Temples arms extending to ears -->
      <path d="M194 174 L175 168" stroke="#12131C" stroke-width="5" stroke-linecap="round"/>
      <path d="M318 174 L337 168" stroke="#12131C" stroke-width="5" stroke-linecap="round"/>
      <!-- Lens reflection streak -->
      <path d="M198 168 L214 168 L204 193 L198 193 Z" fill="#7CFF6B" opacity="0.25"/>
      <path d="M274 168 L290 168 L280 193 L274 193 Z" fill="#7CFF6B" opacity="0.25"/>

      <!-- Nose Bridge & Contour -->
      <path d="M256 180 L252 216 Q256 222 263 216" stroke="#99572F" stroke-width="4.5" stroke-linecap="round" fill="none"/>

      <!-- Light Moustache (Trimmed above upper lip) -->
      <path d="M235 228 Q256 224 277 228 Q256 235 235 228 Z" fill="#221B17"/>
      <path d="M242 227 Q256 223 270 227" stroke="#14110E" stroke-width="2" fill="none"/>

      <!-- Stubble dots along jaw and chin -->
      <g fill="#52321E" opacity="0.6">
        <circle cx="238" cy="260" r="1.5"/>
        <circle cx="244" cy="264" r="1.5"/>
        <circle cx="250" cy="266" r="1.5"/>
        <circle cx="256" cy="268" r="1.5"/>
        <circle cx="262" cy="266" r="1.5"/>
        <circle cx="268" cy="264" r="1.5"/>
        <circle cx="274" cy="260" r="1.5"/>
        <circle cx="248" cy="254" r="1.2"/>
        <circle cx="264" cy="254" r="1.2"/>
        <circle cx="256" cy="256" r="1.2"/>
      </g>

      <!-- Friendly Smile Mouth with Teeth -->
      <path d="M234 238 Q256 256 278 238" stroke="#121017" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M237 239 Q256 253 275 239 Z" fill="#FFFFFF"/>
      <path d="M244 246 Q256 252 268 246" stroke="#BD7A4E" stroke-width="1.5" fill="none"/>

      ${accessory}
    </g>
  `;
}

// 8 Avatars (512x512) - Consistent face likeness with themed outfits & props
const avatars = {
  // 1. About: Casual olive green hoodie over white collared shirt, waving hand
  about: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_about" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#181B2E"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_about)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#7CFF6B" stroke-width="2" opacity="0.3"/>

      <!-- Body / Casual Hoodie open at neck revealing white collar -->
      <path d="M118 512 L118 395 C118 335 180 320 220 315 L292 315 C332 320 394 335 394 395 L394 512 Z" fill="#3D5A45"/>
      <path d="M205 315 Q256 370 307 315 Q282 390 256 390 Q230 390 205 315 Z" fill="#2E4434"/>
      <!-- Hoodie Strings -->
      <path d="M232 345 L230 425" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round"/>
      <path d="M280 345 L282 425" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round"/>

      ${getKalaiHead()}

      <!-- Waving Hand -->
      <g transform="translate(385, 230) rotate(-15)">
        <path d="M-15 100 L-10 60 L15 60 L20 100 Z" fill="#3D5A45"/>
        <path d="M-12 60 C-15 35 -5 10 0 0 C5 10 10 25 10 40 L18 20 C22 25 22 40 18 55 L28 42 C30 48 28 58 22 68 Z" fill="#BD7A4E"/>
        <circle cx="0" cy="35" r="16" fill="#BD7A4E"/>
      </g>
    </svg>
  `,

  // 2. Skills: RPG adventurer with toolbox
  skills: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_skills" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#1C2138"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_skills)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#FF5CAA" stroke-width="2" opacity="0.3"/>

      <!-- Adventurer Armor & Cape over white shirt -->
      <path d="M110 512 L130 360 L180 320 L332 320 L382 360 L402 512 Z" fill="#332438"/>
      <!-- Leather Pauldrons & Tunic -->
      <path d="M150 512 L165 380 L210 325 L302 325 L347 380 L362 512 Z" fill="#6B4226"/>
      <path d="M165 350 L340 450" stroke="#3D2617" stroke-width="18"/>
      <rect x="240" y="388" width="32" height="24" rx="4" fill="#E2B348" stroke="#3D2617" stroke-width="3"/>

      ${getKalaiHead({
        accessory: `
          <!-- Adventurer Headband -->
          <path d="M180 135 C200 115 312 115 332 135" stroke="#7A4822" stroke-width="10" stroke-linecap="round" fill="none"/>
          <circle cx="256" cy="122" r="8" fill="#7CFF6B"/>
        `
      })}

      <!-- Toolbox held in foreground -->
      <g transform="translate(196, 400)">
        <rect x="0" y="20" width="120" height="75" rx="8" fill="#A83232" stroke="#161722" stroke-width="4"/>
        <rect x="10" y="10" width="100" height="20" rx="4" fill="#7A2222" stroke="#161722" stroke-width="3"/>
        <rect x="42" y="0" width="36" height="15" rx="3" fill="none" stroke="#D1D5DB" stroke-width="5"/>
        <circle cx="60" cy="50" r="10" fill="#E2B348" stroke="#161722" stroke-width="2"/>
        <rect x="25" y="-10" width="8" height="25" fill="#9CA3AF" transform="rotate(-15 25 0)"/>
        <circle cx="95" cy="5" r="7" fill="#7CFF6B"/>
      </g>
    </svg>
  `,

  // 3. Projects: Retro cartridge dealer
  projects: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_proj" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#1B1736"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_proj)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#38BDF8" stroke-width="2" opacity="0.3"/>

      <!-- Retro Bomber Jacket with neon collar over white shirt -->
      <path d="M120 512 L130 380 L190 320 L322 320 L382 380 L392 512 Z" fill="#1E2038"/>
      <path d="M190 320 L240 385 L256 385 L272 385 L322 320" stroke="#FF5CAA" stroke-width="12" stroke-linecap="round" fill="none"/>

      ${getKalaiHead()}

      <!-- Holding glowing ROM Cartridge -->
      <g transform="translate(320, 330) rotate(-10)">
        <rect x="0" y="0" width="70" height="90" rx="8" fill="#475569" stroke="#0F172A" stroke-width="4"/>
        <rect x="10" y="15" width="50" height="50" rx="4" fill="#7CFF6B"/>
        <circle cx="35" cy="40" r="14" fill="#0B0B12"/>
        <path d="M15 75 L55 75" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
        <ellipse cx="20" cy="85" rx="14" ry="10" fill="#BD7A4E"/>
        <ellipse cx="38" cy="88" rx="12" ry="9" fill="#BD7A4E"/>
        <ellipse cx="54" cy="85" rx="12" ry="9" fill="#BD7A4E"/>
      </g>
    </svg>
  `,

  // 4. Case Files: Detective with magnifier
  casefiles: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_case" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#261E1A"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_case)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#F59E0B" stroke-width="2" opacity="0.3"/>

      <!-- Detective Trenchcoat with lapels over white shirt & red tie -->
      <path d="M120 512 L130 380 L195 320 L317 320 L382 380 L392 512 Z" fill="#8C6D46"/>
      <path d="M180 325 L230 420 L256 360 L282 420 L332 325" fill="#705534" stroke="#4A371F" stroke-width="4"/>
      <!-- Red detective tie -->
      <path d="M251 360 L261 360 L266 430 L256 445 L246 430 Z" fill="#DC2626"/>

      ${getKalaiHead({
        accessory: `
          <!-- Fedora Hat -->
          <path d="M140 120 C180 115 332 115 372 120 C340 110 320 65 256 65 C192 65 172 110 140 120 Z" fill="#5C4528"/>
          <ellipse cx="256" cy="118" rx="100" ry="16" fill="#705534"/>
          <path d="M166 114 C200 108 312 108 346 114" stroke="#DC2626" stroke-width="6" fill="none"/>
        `
      })}

      <!-- Magnifying Glass -->
      <g transform="translate(130, 290) rotate(20)">
        <circle cx="60" cy="60" r="45" fill="#7CFF6B" fill-opacity="0.25" stroke="#E2B348" stroke-width="9"/>
        <path d="M92 92 L140 140" stroke="#5C4528" stroke-width="14" stroke-linecap="round"/>
        <circle cx="120" cy="120" r="16" fill="#BD7A4E"/>
      </g>
    </svg>
  `,

  // 5. Experience: Git-commit historian with scroll
  experience: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_exp" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#1B242A"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_exp)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#10B981" stroke-width="2" opacity="0.3"/>

      <!-- Historian Scholar Vest over white shirt -->
      <path d="M120 512 L130 380 L190 320 L322 320 L382 380 L392 512 Z" fill="#F8FAFC"/>
      <path d="M130 512 L150 400 L210 330 L235 512 Z" fill="#1E3A34"/>
      <path d="M382 512 L362 400 L302 330 L277 512 Z" fill="#1E3A34"/>

      ${getKalaiHead()}

      <!-- Holding Parchment Scroll with Git Nodes -->
      <g transform="translate(166, 380)">
        <rect x="0" y="0" width="180" height="90" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/>
        <circle cx="10" cy="45" r="12" fill="#B45309"/>
        <circle cx="170" cy="45" r="12" fill="#B45309"/>
        <circle cx="45" cy="45" r="6" fill="#10B981"/>
        <line x1="51" y1="45" x2="85" y2="45" stroke="#10B981" stroke-width="3"/>
        <circle cx="91" cy="45" r="6" fill="#3B82F6"/>
        <path d="M91 45 C105 25 115 25 130 25" stroke="#EC4899" stroke-width="3" fill="none"/>
        <circle cx="136" cy="25" r="6" fill="#EC4899"/>
        <line x1="97" y1="45" x2="135" y2="65" stroke="#3B82F6" stroke-width="3"/>
        <circle cx="141" cy="65" r="6" fill="#3B82F6"/>
      </g>
    </svg>
  `,

  // 6. Education: Scholar with graduation cap
  education: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_edu" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#1B1C33"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_edu)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#A855F7" stroke-width="2" opacity="0.3"/>

      <!-- Academic Gown with Stole over white shirt -->
      <path d="M120 512 L130 380 L195 320 L317 320 L382 380 L392 512 Z" fill="#18182E"/>
      <path d="M195 320 L225 512 L245 512 L215 320 Z" fill="#3B82F6"/>
      <path d="M317 320 L287 512 L267 512 L297 320 Z" fill="#F59E0B"/>

      ${getKalaiHead({
        accessory: `
          <!-- Graduation Cap / Mortarboard -->
          <g transform="translate(0, -10)">
            <polygon points="256,38 372,78 256,118 140,78" fill="#111222" stroke="#25283D" stroke-width="4"/>
            <rect x="216" y="102" width="80" height="25" rx="6" fill="#18182E"/>
            <circle cx="256" cy="78" r="6" fill="#E2B348"/>
            <path d="M256 78 Q310 95 330 140" stroke="#E2B348" stroke-width="4" fill="none"/>
            <circle cx="330" cy="144" r="5" fill="#E2B348"/>
          </g>
        `
      })}

      <!-- Holding Gold Medal -->
      <g transform="translate(230, 410)">
        <rect x="0" y="0" width="52" height="70" rx="4" fill="#FFFFFF" stroke="#94A3B8" stroke-width="3"/>
        <circle cx="26" cy="35" r="16" fill="#E2B348"/>
        <path d="M18 55 L26 45 L34 55" stroke="#DC2626" stroke-width="4" fill="none"/>
      </g>
    </svg>
  `,

  // 7. Terminal: Hacker with laptop
  terminal: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_term" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#12241F"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_term)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#7CFF6B" stroke-width="2" opacity="0.4"/>

      <!-- Dark Tech Hoodie over white shirt -->
      <path d="M120 512 L130 380 L195 320 L317 320 L382 380 L392 512 Z" fill="#141824"/>
      <path d="M195 320 L230 450" stroke="#7CFF6B" stroke-width="3" opacity="0.6"/>
      <path d="M317 320 L282 450" stroke="#7CFF6B" stroke-width="3" opacity="0.6"/>

      ${getKalaiHead({
        accessory: `
          <!-- Hacker Headset with mic -->
          <path d="M168 180 C160 120 352 120 344 180" stroke="#334155" stroke-width="8" stroke-linecap="round" fill="none"/>
          <ellipse cx="170" cy="185" rx="10" ry="16" fill="#7CFF6B"/>
          <ellipse cx="342" cy="185" rx="10" ry="16" fill="#7CFF6B"/>
          <path d="M170 195 Q200 230 230 225" stroke="#334155" stroke-width="4" stroke-linecap="round" fill="none"/>
          <circle cx="230" cy="225" r="4" fill="#7CFF6B"/>
        `
      })}

      <!-- Glowing Open Laptop -->
      <g transform="translate(156, 380)">
        <polygon points="10,0 190,0 180,80 20,80" fill="#0B0B12" stroke="#7CFF6B" stroke-width="3"/>
        <rect x="25" y="10" width="150" height="60" rx="3" fill="#112218"/>
        <line x1="35" y1="20" x2="80" y2="20" stroke="#7CFF6B" stroke-width="3"/>
        <line x1="35" y1="32" x2="110" y2="32" stroke="#7CFF6B" stroke-width="3"/>
        <line x1="35" y1="44" x2="70" y2="44" stroke="#7CFF6B" stroke-width="3"/>
        <line x1="35" y1="56" x2="130" y2="56" stroke="#7CFF6B" stroke-width="3"/>
        <polygon points="0,80 200,80 220,110 -20,110" fill="#1E293B" stroke="#334155" stroke-width="2"/>
      </g>
    </svg>
  `,

  // 8. Contact: Chief Officer holding envelope
  contact: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
      <defs>
        <radialGradient id="bg_cont" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#241B2E"/>
          <stop offset="100%" stop-color="#0B0B14"/>
        </radialGradient>
      </defs>
      <rect width="512" height="512" fill="url(#bg_cont)"/>
      <circle cx="256" cy="256" r="230" fill="none" stroke="#EC4899" stroke-width="2" opacity="0.3"/>

      <!-- Formal Dark Blazer over white shirt & tie -->
      <path d="M120 512 L130 380 L195 320 L317 320 L382 380 L392 512 Z" fill="#1E1E2E"/>
      <path d="M250 380 L262 380 L266 470 L256 485 L246 470 Z" fill="#7C3AED"/>
      <rect x="248" y="415" width="16" height="4" rx="2" fill="#7CFF6B"/>
      <path d="M195 320 L240 440 L220 512" stroke="#2D2D44" stroke-width="6" fill="none"/>
      <path d="M317 320 L272 440 L292 512" stroke="#2D2D44" stroke-width="6" fill="none"/>

      ${getKalaiHead()}

      <!-- Holding Sealed Transmission Envelope -->
      <g transform="translate(196, 390)">
        <rect x="0" y="0" width="120" height="80" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
        <path d="M0 0 L60 45 L120 0" stroke="#CBD5E1" stroke-width="3" fill="none"/>
        <circle cx="60" cy="45" r="14" fill="#7CFF6B" stroke="#161722" stroke-width="2"/>
        <circle cx="60" cy="45" r="6" fill="#0B0B12"/>
      </g>
    </svg>
  `
};

async function buildAll() {
  for (const [name, svgContent] of Object.entries(avatars)) {
    const dest = path.join(__dirname, `../public/avatars/${name}.webp`);
    const info = await sharp(Buffer.from(svgContent.trim()))
      .resize(512, 512)
      .webp({ quality: 80 })
      .toFile(dest);
    console.log(`Avatar ${name}.webp: ${info.size} bytes (target < 40KB)`);
  }
  console.log('All 8 improved likeness avatars compiled to WebP!');
}

buildAll().catch(console.error);
