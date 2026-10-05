// Paints the whole PCB artwork (copper traces, silkscreen, annotations) on a
// 2D canvas that is used as the board's map texture. Repainted once webfonts
// are ready so the silkscreen uses IBM Plex Mono / Space Grotesk.

export const BOARD_W = 36;
export const BOARD_D = 22;
export const TEX_W = 3072;
export const TEX_H = 1877;

const SILK = 'rgba(226,220,206,';
const COPPER = '#a86a30';
const COPPER_LIGHT = 'rgba(240,190,130,';

function mulberry32(a) {
    return function rand() {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export function paintBoard(canvas) {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const U = W / BOARD_W; // px per world unit
    const X = (x) => (x + BOARD_W / 2) * U;
    const Y = (z) => (z + BOARD_D / 2) * (H / BOARD_D);
    const rng = mulberry32(20270118);

    // ── Solder mask base ────────────────────────────────────────────
    ctx.fillStyle = '#0e1116';
    ctx.fillRect(0, 0, W, H);

    // Fine prototyping dot grid
    ctx.fillStyle = 'rgba(233,228,216,0.05)';
    for (let gx = -17.5; gx <= 17.5; gx += 1) {
        for (let gz = -10.5; gz <= 10.5; gz += 1) {
            ctx.fillRect(X(gx) - 1, Y(gz) - 1, 2, 2);
        }
    }

    // ── Helpers ─────────────────────────────────────────────────────
    const path = (pts) => {
        ctx.beginPath();
        pts.forEach(([x, z], i) => (i ? ctx.lineTo(X(x), Y(z)) : ctx.moveTo(X(x), Y(z))));
    };

    const trace = (pts, w = 0.085) => {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#4a2f16';
        ctx.lineWidth = w * 1.9 * U;
        path(pts);
        ctx.stroke();
        ctx.strokeStyle = COPPER;
        ctx.lineWidth = w * U;
        path(pts);
        ctx.stroke();
        ctx.strokeStyle = `${COPPER_LIGHT}0.35)`;
        ctx.lineWidth = w * 0.4 * U;
        path(pts);
        ctx.stroke();
    };

    const via = (x, z, r = 0.1) => {
        ctx.beginPath();
        ctx.arc(X(x), Y(z), r * U, 0, Math.PI * 2);
        ctx.fillStyle = '#c68a4a';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(X(x), Y(z), r * 0.45 * U, 0, Math.PI * 2);
        ctx.fillStyle = '#0e1116';
        ctx.fill();
    };

    const hatchPour = (x0, z0, x1, z1) => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(X(x0), Y(z0), X(x1) - X(x0), Y(z1) - Y(z0));
        ctx.clip();
        ctx.strokeStyle = `${COPPER_LIGHT}0.10)`;
        ctx.lineWidth = 2;
        for (let d = -30; d < 42; d += 0.55) {
            ctx.beginPath();
            ctx.moveTo(X(x0) + d * U - 400, Y(z1) + 400);
            ctx.lineTo(X(x0) + d * U + 400, Y(z0) - 400);
            ctx.stroke();
        }
        ctx.strokeStyle = `${COPPER_LIGHT}0.28)`;
        ctx.lineWidth = 3;
        ctx.strokeRect(X(x0), Y(z0), X(x1) - X(x0), Y(z1) - Y(z0));
        ctx.restore();
    };

    // ── Copper pours ────────────────────────────────────────────────
    hatchPour(-17.4, -9.9, -11.6, -7.1);
    hatchPour(11.6, 7.1, 17.4, 9.9);
    hatchPour(-8.9, -10.6, -2.1, -8.6);

    // ── Trace buses ─────────────────────────────────────────────────
    const busA = [
        [-18, 8.9], [-16.6, 7.5], [-13.6, 7.5], [-11.1, 5.0], [-8.1, 5.0],
        [-5.6, 7.5], [-2.6, 7.5], [-0.1, 5.0], [2.9, 5.0], [5.4, 7.5],
        [8.4, 7.5], [10.9, 5.0], [13.9, 5.0], [16.2, 7.3], [18, 7.3],
    ];
    const busB = [
        [-18, -5.4], [-15.4, -5.4], [-13.2, -7.6], [-9.2, -7.6], [-7.0, -5.4],
        [-3.0, -5.4], [-0.8, -7.6], [3.2, -7.6], [5.4, -5.4], [9.4, -5.4],
        [11.6, -7.6], [15.6, -7.6], [17.2, -6.2], [18, -6.2],
    ];

    [-0.45, 0, 0.45].forEach((dz) => trace(busA.map(([x, z]) => [x, z + dz]), 0.06));
    [-0.45, 0, 0.45].forEach((dz) => trace(busB.map(([x, z]) => [x, z + dz]), 0.06));

    // Vertical connectors + stubs
    const zoneX = [-15, -10, -5, 0, 5, 10, 15];
    zoneX.forEach((x, i) => {
        trace([[x, 5.0], [x, 2.2], [x + 0.9, 1.4]], 0.05);
        trace([[x, -5.4], [x, -2.6], [x - 0.9, -1.8]], 0.05);
        via(x, 5.0, 0.09);
        via(x, -5.4, 0.09);
        if (i % 2 === 0) trace([[x + 1.6, -9.9], [x + 1.6, -8.4]], 0.045);
    });
    trace([[-14, 9.9], [-14, 8.9]], 0.045);

    // Random vias for texture density
    for (let i = 0; i < 46; i += 1) {
        const x = -17 + rng() * 34;
        const z = -9.6 + rng() * 19.2;
        if (Math.abs(x) < 24 && z > -7 && z < 7) via(x, z, 0.07 + rng() * 0.04);
    }

    // ── Zone silkscreen ─────────────────────────────────────────────
    const zoneTitles = ['', 'PROFIL', 'FORMATION', 'EXPÉRIENCE', 'PROJETS', 'COMPÉTENCES', 'CONTACT'];
    const zoneDocs = ['', 'DOC 01', 'DOC 02', 'DOC 03', 'DOC 04', 'DOC 05', 'DOC 06'];
    const letterSpacing = (v) => {
        if (typeof ctx.letterSpacing === 'string') ctx.letterSpacing = v;
    };

    const cornerTicks = (x0, z0, x1, z1, l = 0.6, color = `${SILK}0.5)`) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        const corners = [
            [x0, z0, 1, 1], [x1, z0, -1, 1], [x0, z1, 1, -1], [x1, z1, -1, -1],
        ];
        corners.forEach(([cx, cz, sx, sz]) => {
            ctx.beginPath();
            ctx.moveTo(X(cx + sx * l), Y(cz));
            ctx.lineTo(X(cx), Y(cz));
            ctx.lineTo(X(cx), Y(cz + sz * l));
            ctx.stroke();
        });
    };

    for (let i = 1; i <= 6; i += 1) {
        const cx = zoneX[i];
        cornerTicks(cx - 2.35, -9.7, cx + 2.35, 9.7);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `${SILK}0.3)`;
        letterSpacing('0.22em');
        ctx.font = '700 68px "Space Grotesk Variable", "IBM Plex Sans Variable", sans-serif';
        ctx.fillText(zoneTitles[i], X(cx), Y(-7.35));
        letterSpacing('0.32em');
        ctx.fillStyle = `${SILK}0.22)`;
        ctx.font = '400 30px "IBM Plex Mono", monospace';
        ctx.fillText(`${zoneDocs[i]} · RÉV. 2026.10`, X(cx), Y(-6.3));
        letterSpacing('0px');
    }

    // ── Title zone (hero) ───────────────────────────────────────────
    cornerTicks(-17.55, -9.7, -12.45, 9.7, 0.75, `${COPPER_LIGHT}0.6)`);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    letterSpacing('0.26em');
    ctx.fillStyle = `${SILK}0.5)`;
    ctx.font = '500 34px "IBM Plex Mono", monospace';
    ctx.fillText('FULL-STACK · BUT INFORMATIQUE', X(-15), Y(-8.55));
    letterSpacing('0.02em');
    ctx.fillStyle = '#ddd6c4';
    ctx.font = '700 168px "Space Grotesk Variable", "IBM Plex Sans Variable", sans-serif';
    ctx.fillText('JZ-2027', X(-15), Y(-4.6));
    letterSpacing('0.34em');
    ctx.fillStyle = `${SILK}0.4)`;
    ctx.font = '400 32px "IBM Plex Mono", monospace';
    ctx.fillText('CARTE MÈRE — PORTFOLIO', X(-15.2), Y(-1.6));
    letterSpacing('0.14em');
    ctx.fillStyle = `${SILK}0.6)`;
    ctx.font = '500 32px "IBM Plex Mono", monospace';
    ctx.fillText('RÉV. 2.0 — 2026.10', X(-15.2), Y(8.55));
    letterSpacing('0px');

    // Status LED pad
    ctx.beginPath();
    ctx.arc(X(-16.7), Y(-8.55), 0.3 * U, 0, Math.PI * 2);
    ctx.strokeStyle = `${COPPER_LIGHT}0.7)`;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(X(-16.7), Y(-8.55), 0.17 * U, 0, Math.PI * 2);
    ctx.fillStyle = '#ff5c34';
    ctx.fill();
    ctx.fillStyle = `${SILK}0.45)`;
    ctx.font = '400 26px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('PWR', X(-16.1), Y(-8.55));
    ctx.textAlign = 'center';

    // Small identification matrix (board logo block)
    (() => {
        const bx = -13.35;
        const bz = 8.55;
        const cell = 0.17;
        ctx.fillStyle = `${SILK}0.5)`;
        for (let gx = 0; gx < 5; gx += 1) {
            for (let gz = 0; gz < 5; gz += 1) {
                if (rng() > 0.48) {
                    ctx.fillRect(X(bx + gx * cell), Y(bz + gz * cell), cell * U - 1.5, (cell * U) - 1.5);
                }
            }
        }
    })();

    // ── Edge connector (gold fingers) ───────────────────────────────
    const fingerH = 1.35;
    for (let k = 0; k < 16; k += 1) {
        const z0 = -8.6 + k * 1.12;
        ctx.fillStyle = '#a87f3c';
        ctx.fillRect(X(-18), Y(z0), fingerH * U, 0.62 * U);
        ctx.fillStyle = 'rgba(90,60,20,0.55)';
        ctx.fillRect(X(-18), Y(z0), fingerH * U, 4);
        ctx.fillRect(X(-18), Y(z0 + 0.62), fingerH * U, 4);
        if (k % 4 === 0) {
            ctx.save();
            ctx.translate(X(-18) + fingerH * U + 22, Y(z0 + 0.31));
            ctx.rotate(-Math.PI / 2);
            ctx.fillStyle = `${SILK}0.4)`;
            ctx.font = '400 22px "IBM Plex Mono", monospace';
            ctx.textAlign = 'center';
            ctx.fillText(String(k + 1), 0, 0);
            ctx.restore();
        }
    }

    // ── Mounting holes ──────────────────────────────────────────────
    [[-17.2, -10.2], [-17.2, 10.2], [17.2, -10.2], [17.2, 10.2]].forEach(([x, z]) => {
        ctx.beginPath();
        ctx.arc(X(x), Y(z), 0.5 * U, 0, Math.PI * 2);
        ctx.fillStyle = '#a8773a';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(X(x), Y(z), 0.32 * U, 0, Math.PI * 2);
        ctx.fillStyle = '#05060a';
        ctx.fill();
        ctx.beginPath();
        ctx.setLineDash([7, 7]);
        ctx.arc(X(x), Y(z), 0.64 * U, 0, Math.PI * 2);
        ctx.strokeStyle = `${SILK}0.32)`;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.setLineDash([]);
    });

    // ── Drawing annotations ─────────────────────────────────────────
    ctx.strokeStyle = `${SILK}0.28)`;
    ctx.lineWidth = 2;
    // Top dimension
    ctx.beginPath();
    ctx.moveTo(X(-18), Y(-10.75));
    ctx.lineTo(X(18), Y(-10.75));
    ctx.moveTo(X(-18), Y(-10.4));
    ctx.lineTo(X(-18), Y(-11));
    ctx.moveTo(X(18), Y(-10.4));
    ctx.lineTo(X(18), Y(-11));
    ctx.stroke();
    ctx.fillStyle = `${SILK}0.45)`;
    ctx.font = '400 26px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    letterSpacing('0.12em');
    ctx.fillText('360.00', X(0), Y(-10.35) - 8);
    // Right dimension (rotated)
    ctx.save();
    ctx.moveTo(X(17.75), Y(-10));
    ctx.lineTo(X(17.75), Y(10));
    ctx.moveTo(X(17.45), Y(-10));
    ctx.lineTo(X(18.05), Y(-10));
    ctx.moveTo(X(17.45), Y(10));
    ctx.lineTo(X(18.05), Y(10));
    ctx.stroke();
    ctx.save();
    ctx.translate(X(17.75) - 34, Y(0));
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = `${SILK}0.45)`;
    ctx.fillText('220.00', 0, 0);
    ctx.restore();

    // Bottom annotation
    ctx.textAlign = 'left';
    ctx.fillStyle = `${SILK}0.34)`;
    ctx.font = '400 25px "IBM Plex Mono", monospace';
    ctx.fillText('ÉCHELLE 1:1 — COUCHE : SÉRIGRAPHIE / CUIVRE / FR-4', X(-17.2), Y(10.75));
    ctx.textAlign = 'right';
    ctx.fillText('Ø 3.2', X(15.9), Y(10.75));

    // Leader line to a via + net label
    ctx.strokeStyle = `${SILK}0.3)`;
    ctx.beginPath();
    ctx.moveTo(X(-2.0), Y(6.0));
    ctx.lineTo(X(-0.6), Y(6.9));
    ctx.lineTo(X(0.9), Y(6.9));
    ctx.stroke();
    ctx.textAlign = 'left';
    ctx.fillStyle = `${SILK}0.45)`;
    ctx.font = '400 24px "IBM Plex Mono", monospace';
    ctx.fillText('NET : DISPO_STAGE_2027', X(1.0), Y(6.9) - 6);
    letterSpacing('0px');
}
