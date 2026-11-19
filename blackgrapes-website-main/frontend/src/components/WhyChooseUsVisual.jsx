import React from 'react';

// SS1-Matched 3D Central Visual: Orange Stylized Mascot Leaning on Glossy Chrome 3D Question Mark
export default function WhyChooseUsVisual() {
  return (
    <div className="why-us-center-visual-wrap">
      {/* Background Ambient Warm Glow */}
      <div className="center-visual-ambient-glow" aria-hidden="true" />

      <svg
        viewBox="0 0 460 480"
        className="why-us-center-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Chrome Gradients */}
          <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#e2e8f0" />
            <stop offset="45%" stopColor="#94a3b8" />
            <stop offset="70%" stopColor="#f1f5f9" />
            <stop offset="90%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="chromeBevelShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <radialGradient id="chromeSphereGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#e2e8f0" />
            <stop offset="65%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>

          {/* Orange 3D Mascot Gradients */}
          <radialGradient id="mascotHeadGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffb080" />
            <stop offset="40%" stopColor="#f86200" />
            <stop offset="85%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </radialGradient>

          <linearGradient id="mascotTorsoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9e42" />
            <stop offset="35%" stopColor="#f86200" />
            <stop offset="80%" stopColor="#c2410c" />
            <stop offset="100%" stopColor="#7c2d12" />
          </linearGradient>

          <linearGradient id="mascotLimbGrad" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ff9e42" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          {/* Floor Shadow */}
          <radialGradient id="floorShadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.85)" />
            <stop offset="50%" stopColor="rgba(0, 0, 0, 0.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Floor Cast Shadows */}
        <ellipse cx="230" cy="430" rx="160" ry="22" fill="url(#floorShadowGrad)" />
        <ellipse cx="180" cy="428" rx="55" ry="14" fill="rgba(0,0,0,0.6)" />
        <ellipse cx="270" cy="428" rx="45" ry="12" fill="rgba(0,0,0,0.7)" />

        {/* ========================================================
            3D CHROME METALLIC QUESTION MARK
            ======================================================== */}
        <g id="chromeQuestionMark" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.75))">
          {/* Question Mark Extrusion Depth / Bevel Side */}
          <path
            d="M 235 155 C 235 110, 260 85, 305 85 C 345 85, 370 110, 370 148 C 370 180, 345 202, 318 226 C 290 250, 280 270, 280 305 L 240 305 C 240 258, 256 238, 286 212 C 310 192, 326 175, 326 148 C 326 126, 314 115, 298 115 C 276 115, 265 130, 265 155 Z"
            fill="url(#chromeBevelShadow)"
            transform="translate(10, 8)"
          />
          <circle cx="277" cy="378" r="23" fill="url(#chromeBevelShadow)" />

          {/* Question Mark Front Chrome Face */}
          <path
            d="M 235 155 C 235 110, 260 85, 305 85 C 345 85, 370 110, 370 148 C 370 180, 345 202, 318 226 C 290 250, 280 270, 280 305 L 240 305 C 240 258, 256 238, 286 212 C 310 192, 326 175, 326 148 C 326 126, 314 115, 298 115 C 276 115, 265 130, 265 155 Z"
            fill="url(#chromeGradient)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />

          {/* Specular White Highlights on Metallic Curve */}
          <path
            d="M 248 150 C 248 118, 270 95, 305 95 C 335 95, 358 114, 360 142"
            stroke="#ffffff"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          <path
            d="M 292 216 C 305 202, 318 185, 320 162"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Question Mark Base Dot (Metallic 3D Sphere) */}
          <circle
            cx="270"
            cy="370"
            r="23"
            fill="url(#chromeSphereGrad)"
            stroke="#ffffff"
            strokeWidth="1.2"
          />
          {/* Specular Highlight on Sphere */}
          <ellipse cx="262" cy="362" rx="9" ry="5" fill="#ffffff" opacity="0.85" transform="rotate(-30 262 362)" />
        </g>

        {/* ========================================================
            ORANGE 3D MASCOT LEANING NATURALLY ON QUESTION MARK
            ======================================================== */}
        <g id="orangeMascot" filter="drop-shadow(0 12px 20px rgba(0,0,0,0.65))">
          {/* Supporting Right Leg */}
          <path
            d="M 175 270 C 182 310, 185 360, 182 414 C 180 420, 194 422, 197 416 C 202 360, 200 310, 193 270 Z"
            fill="url(#mascotLimbGrad)"
          />
          {/* Right Shoe */}
          <ellipse cx="188" cy="418" rx="14" ry="6" fill="#9a3412" />

          {/* Crossing Left Leg (Casually Crossed at Ankles) */}
          <path
            d="M 160 270 C 160 305, 175 345, 188 375 C 192 385, 194 395, 176 414 C 172 418, 166 414, 168 408 C 174 390, 168 375, 155 340 C 146 315, 148 290, 150 270 Z"
            fill="url(#mascotTorsoGrad)"
          />
          {/* Left Shoe Tip Touching Floor */}
          <ellipse cx="172" cy="414" rx="10" ry="5" fill="#7c2d12" />

          {/* Mascot Torso (Smooth Athletic Mannequin Shape, Leaning ~12°) */}
          <path
            d="M 142 165 C 158 160, 188 162, 205 168 C 210 185, 205 220, 196 250 C 194 265, 192 278, 182 280 C 168 280, 156 265, 150 245 C 142 215, 138 185, 142 165 Z"
            fill="url(#mascotTorsoGrad)"
          />
          {/* Subtle Torso Specular Light Highlight */}
          <path
            d="M 152 175 C 156 200, 154 235, 158 255"
            stroke="#ffb080"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Left Arm (Resting Casually on Hip) */}
          <path
            d="M 144 170 C 130 190, 122 215, 128 230 C 132 238, 140 236, 144 228 C 148 220, 146 205, 152 185 Z"
            fill="url(#mascotLimbGrad)"
          />

          {/* Right Arm (FIRMLY RESTING ON THE QUESTION MARK CURVE) */}
          {/* Upper Arm extending to elbow */}
          <path
            d="M 200 170 C 215 178, 228 192, 238 206 C 242 212, 248 210, 246 202 C 238 188, 222 174, 206 166 Z"
            fill="url(#mascotLimbGrad)"
          />
          {/* Forearm & Hand Resting Over the Metallic Curve at X=240-265 */}
          <path
            d="M 234 204 C 245 200, 258 198, 268 205 C 274 210, 272 218, 264 218 C 254 218, 242 216, 232 212 Z"
            fill="url(#mascotTorsoGrad)"
          />

          {/* Mascot Neck */}
          <path
            d="M 166 142 C 166 152, 178 152, 178 142 Z"
            fill="#c2410c"
          />

          {/* Mascot 3D Head (Smooth Stylized Sphere) */}
          <circle cx="172" cy="126" r="26" fill="url(#mascotHeadGrad)" />
          {/* Head 3D Specular Highlight */}
          <ellipse cx="163" cy="118" rx="10" ry="6" fill="#ffffff" opacity="0.8" transform="rotate(-25 163 118)" />
          <circle cx="160" cy="116" r="3" fill="#ffffff" opacity="0.95" />
        </g>

        {/* Ambient Tech Sparkles */}
        <circle cx="345" cy="75" r="2.5" fill="#ff9e42" opacity="0.8" />
        <circle cx="225" cy="70" r="2" fill="#f86200" opacity="0.7" />
        <circle cx="380" cy="210" r="2" fill="#ffb080" opacity="0.8" />
        <circle cx="115" cy="215" r="2.5" fill="#ff9e42" opacity="0.7" />
        <circle cx="295" cy="410" r="2.5" fill="#f86200" opacity="0.8" />
      </svg>
    </div>
  );
}
