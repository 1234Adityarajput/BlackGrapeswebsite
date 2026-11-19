import React from 'react';

// SS1-Matched Clean Straight Pointer Lines with generous breathing room (Never overlapping the 3D visual)
export default function WhyChooseUsConnectors() {
  return (
    <svg
      className="why-us-connectors-overlay"
      viewBox="0 0 1200 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {/* Glowing Orange Arrowhead Marker */}
        <marker
          id="connectorArrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7.5"
          markerHeight="7.5"
          orient="auto"
        >
          <path
            d="M 1 1.5 L 9 5 L 1 8.5 z"
            fill="#f86200"
            stroke="#ffffff"
            strokeWidth="0.8"
          />
        </marker>
      </defs>

      {/* ========================================================
          LEFT PILLARS CONNECTORS (Point towards Mascot with breathing room)
          ======================================================== */}

      {/* LINE 1: Top-Left Card -> Mascot Head (Stops ~40px before head) */}
      <g className="connector-group">
        <circle cx="330" cy="45" r="4.5" fill="#f86200" stroke="#ffffff" strokeWidth="1.5" />
        <line
          x1="335"
          y1="45"
          x2="486"
          y2="107"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#connectorArrow)"
        />
      </g>

      {/* LINE 2: Middle-Left Card -> Mascot Torso (Stops ~40px before back) */}
      <g className="connector-group">
        <circle cx="330" cy="235" r="4.5" fill="#f86200" stroke="#ffffff" strokeWidth="1.5" />
        <line
          x1="335"
          y1="235"
          x2="490"
          y2="235"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#connectorArrow)"
        />
      </g>

      {/* LINE 3: Bottom-Left Card -> Mascot Leg (Stops ~40px before legs) */}
      <g className="connector-group">
        <circle cx="330" cy="425" r="4.5" fill="#f86200" stroke="#ffffff" strokeWidth="1.5" />
        <line
          x1="335"
          y1="425"
          x2="490"
          y2="407"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#connectorArrow)"
        />
      </g>

      {/* ========================================================
          RIGHT PILLARS CONNECTORS (Point towards Question Mark with breathing room)
          ======================================================== */}

      {/* LINE 4: Top-Right Card -> Question Mark Top (Stops ~40px before curve) */}
      <g className="connector-group">
        <circle cx="870" cy="45" r="4.5" fill="#f86200" stroke="#ffffff" strokeWidth="1.5" />
        <line
          x1="865"
          y1="45"
          x2="733"
          y2="102"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#connectorArrow)"
        />
      </g>

      {/* LINE 5: Middle-Right Card -> Question Mark Stem (Stops ~40px before stem) */}
      <g className="connector-group">
        <circle cx="870" cy="235" r="4.5" fill="#f86200" stroke="#ffffff" strokeWidth="1.5" />
        <line
          x1="865"
          y1="235"
          x2="708"
          y2="235"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#connectorArrow)"
        />
      </g>

      {/* LINE 6: Bottom-Right Card -> Question Mark Dot (Stops ~40px before dot) */}
      <g className="connector-group">
        <circle cx="870" cy="425" r="4.5" fill="#f86200" stroke="#ffffff" strokeWidth="1.5" />
        <line
          x1="865"
          y1="425"
          x2="700"
          y2="385"
          stroke="rgba(255, 255, 255, 0.75)"
          strokeWidth="1.8"
          strokeDasharray="5 4"
          markerEnd="url(#connectorArrow)"
        />
      </g>
    </svg>
  );
}
