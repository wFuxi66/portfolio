# Lessons & Patterns learned during development

## Core Rules enforced by the User

1. **NO SHELL ONE-LINERS WITHOUT RTK**: Never use native PowerShell commands like `Get-Content`, `dir`, `ls`, or `cat`. Always use `rtk read`, `rtk ls`, or `rtk tree`. 
   - **Reason**: `rtk` (Rust Token Killer) optimizes output for LLMs, reducing token consumption by 60-90%. Using native commands is a waste of context and quota.
   - **Trigger**: Any file reading or listing task.

2. **NO COMMAND CHAINING WITH &&**: The environment is PowerShell, not Bash. Always use `;` for sequential commands.
   - **Reason**: `&&` is not a valid separator in PowerShell and will cause syntax errors.

3. **ABSOLUTE THEME CONSISTENCY**: For premium "Linear/Vercel" styles, use strictly:
   - Background: Pure black `#000000`.
   - Accents: Slate, white, and glassmorphism (`bg-white/5`, `border-white/10`).
   - Animations: `framer-motion` (spring/bounce physics) over native CSS animations.

4. **SECURE GIT TRACKING**: Always double-check `.gitignore` before a `git add .` to avoid committing local-only directories like `.agent/`.

## Progress Status
- Portfolio theme harmonized (Black/White Premium).
- Globe 3D and Stars interaction active.
- Bento Grid and Spotlight Hover implemented.
- Choken project added and text encoding fixed.
- Favicon updated.
